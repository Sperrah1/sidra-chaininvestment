import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

let socket;

export default function ChatPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false);

  const adminId = "admin@sidra.com"; // 🔔 Admin email

  useEffect(() => {
    if (!session) return router.push("/login");

    if (!socket) {
      socket = io();
    }

    socket.on("newMessage", (data) => {
      if (data.receiverId === session.user.email || data.senderId === session.user.email) {
        loadMessages();
        if (data.senderId !== session.user.email) {
          setNotification(true);
        }
      }
    });

    loadMessages();
    const interval = setInterval(loadMessages, 3000);

    return () => {
      clearInterval(interval);
      socket?.off("newMessage");
    };
  }, [session, router]);

  const loadMessages = async () => {
    const res = await fetch(`/api/chat?userId=${session.user.email}&otherUserId=${adminId}`);
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: session.user.email,
        receiverId: adminId,
        message,
      }),
    });

    setMessage("");
    setNotification(false);
  };

  if (loading) return <p>Loading chat...</p>;

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
      <h1>Chat with Admin {notification && <span style={{ color: "red" }}>• New Message</span>}</h1>
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "15px", textAlign: msg.senderId === session.user.email ? "right" : "left" }}>
            <div style={{
              display: "inline-block",
              backgroundColor: msg.senderId === session.user.email ? "#ffc107" : "#eee",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "70%",
            }}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: "10px", marginRight: "10px" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px 20px", backgroundColor: "#ffc107", border: "none", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
