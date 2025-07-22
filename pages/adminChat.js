import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminChat() {
  const { data: session } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [lastMessages, setLastMessages] = useState({}); // 🔔 Track last message for each user

  useEffect(() => {
    if (!session || !session.user.isAdmin) return router.push("/login");

    async function loadUsers() {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    }

    loadUsers();
  }, [session, router]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      for (let user of data) {
        const res = await fetch(`/api/chat?userId=${user.email}&otherUserId=${session.user.email}`);
        const msgs = await res.json();

        if (msgs.length > 0) {
          const lastMsg = msgs[msgs.length - 1];

          if (!lastMessages[user.email] || lastMessages[user.email]._id !== lastMsg._id) {
            setLastMessages((prev) => ({
              ...prev,
              [user.email]: lastMsg,
            }));
          }
        }
      }
    }, 5000); // 🔔 Check every 5 seconds

    return () => clearInterval(interval);
  }, [session, lastMessages]);

  useEffect(() => {
    if (!selectedUser) return;

    async function loadMessages() {
      const res = await fetch(`/api/chat?userId=${session.user.email}&otherUserId=${selectedUser.email}`);
      const data = await res.json();
      setMessages(data);
    }

    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedUser, session]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: session.user.email,
        receiverId: selectedUser.email,
        message,
      }),
    });

    setMessage("");
  };

  return (
    <div style={{ padding: "50px", maxWidth: "1000px", margin: "auto" }}>
      <h1>Admin Chat Panel</h1>

      <div style={{ display: "flex" }}>
        {/* User List */}
        <div style={{ width: "30%", borderRight: "1px solid #ccc", paddingRight: "20px" }}>
          <h3>Users</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setLastMessages((prev) => ({
                    ...prev,
                    [user.email]: { ...prev[user.email], seen: true },
                  }));
                }}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  backgroundColor: selectedUser?.email === user.email ? "#ffc107" : "#f0f0f0",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                {user.name} <br /> {user.email}
                {/* 🔔 Notification Badge */}
                {lastMessages[user.email] && !lastMessages[user.email].seen && (
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px 10px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      fontSize: "12px",
                    }}
                  >
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div style={{ width: "70%", paddingLeft: "20px" }}>
          {selectedUser ? (
            <>
              <h3>Chat with {selectedUser.name}</h3>
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
            </>
          ) : (
            <p>Select a user to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.user.isAdmin) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  return { props: {} };
}
