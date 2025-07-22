// pages/admin/chat.js

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

let socket;

export default function AdminChatPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [notificationUsers, setNotificationUsers] = useState([]);

  useEffect(() => {
    if (!session || !session.user.isAdmin) return router.push("/login");

    fetch("/api/socket");
    socket = io();

    loadUsers();

    socket.on("receive-message", (msg) => {
      if (msg.receiverId === session.user.email) {
        if (msg.senderId !== selectedUser) {
          setNotificationUsers((prev) => [...new Set([...prev, msg.senderId])]);
        } else {
          setMessages((prev) => [...prev, msg]);
        }
        playSound();
      }
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [session, selectedUser, router]);

  const playSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.filter((u) => !u.isAdmin));
  };

  const loadMessages = async (userId) => {
    setSelectedUser(userId);
    setNotificationUsers((prev) => prev.filter((id) => id !== userId));
    const res = await fetch(`/api/chat?userId=${session.user.email}&otherUserId=${userId}`);
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    const msg = {
      senderId: session.user.email,
      receiverId: selectedUser,
      message,
    };

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });

    socket.emit("new-message", msg);
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#121212", color: "#fff" }}>
      {/* User List */}
      <div style={{ width: "250px", borderRight: "1px solid #ffc107", padding: "20px", backgroundColor: "#1f1f1f" }}>
        <h2 style={{ color: "#ffc107", marginBottom: "20px" }}>Users</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => loadMessages(user.email)}
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: selectedUser === user.email ? "#ffc107" : "#2c2c2c",
                color: selectedUser === user.email ? "#000" : "#fff",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {user.name} {notificationUsers.includes(user.email) && <span style={{ color: "red" }}>•</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ marginBottom: "20px", color: "#ffc107" }}>Admin Chat</h1>

        {selectedUser ? (
          <>
            <div
              style={{
                height: "400px",
                overflowY: "auto",
                border: "1px solid #ffc107",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#1f1f1f",
                borderRadius: "5px",
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: "15px",
                    textAlign: msg.senderId === session.user.email ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: msg.senderId === session.user.email ? "#ffc107" : "#333",
                      color: msg.senderId === session.user.email ? "#000" : "#fff",
                      padding: "10px",
                      borderRadius: "10px",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
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
                style={{ flex: 1, padding: "10px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ffc107", backgroundColor: "#1f1f1f", color: "#fff" }}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                style={{ padding: "10px 20px", backgroundColor: "#ffc107", border: "none", cursor: "pointer", borderRadius: "4px" }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: "#fff" }}>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}
