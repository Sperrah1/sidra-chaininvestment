import { useState } from "react";
import { getSession } from "next-auth/react";

export default function AdminEmails() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmails = async () => {
    if (!subject || !message) {
      alert("Please fill in both subject and message.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/sendEmails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Emails sent successfully!");
      setSubject("");
      setMessage("");
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Send Bulk Emails to Users</h1>

      <div style={formStyle}>
        <label style={labelStyle}>Email Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
          placeholder="Enter email subject"
        />

        <label style={labelStyle}>Email Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          style={textareaStyle}
          placeholder="Enter your message"
        ></textarea>

        <button
          onClick={handleSendEmails}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Sending..." : "Send Emails"}
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: "20px",
  backgroundColor: "#121212",
  minHeight: "100vh",
  color: "#fff",
};

const titleStyle = {
  color: "#ffc107",
  textAlign: "center",
  fontSize: "30px",
  marginBottom: "30px",
};

const formStyle = {
  maxWidth: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const labelStyle = {
  fontSize: "18px",
  color: "#ffc107",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  resize: "vertical",
};

const buttonStyle = {
  backgroundColor: "#ffc107",
  color: "#000",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "16px",
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user.isAdmin) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
}
