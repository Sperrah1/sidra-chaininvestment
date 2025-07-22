import { useState } from "react";
import { getSession } from "next-auth/react";

export default function AddBalancePage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBalance = async (e) => {
    e.preventDefault();

    if (!email || !amount) {
      alert("Please provide both email and amount.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/add-balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount: parseFloat(amount) }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Balance updated successfully!");
      setEmail("");
      setAmount("");
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Add Balance to User</h1>

      <form onSubmit={handleAddBalance} style={formStyle}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Amount to Add:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          {loading ? "Processing..." : "Add Balance"}
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  backgroundColor: "#121212",
  minHeight: "100vh",
  padding: "20px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "30px",
  color: "#ffc107",
  marginBottom: "30px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
  gap: "20px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ffc107",
  backgroundColor: "#1e1e1e",
  color: "#fff",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.user.isAdmin) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
}
