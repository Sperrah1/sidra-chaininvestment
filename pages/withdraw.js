import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Withdraw() {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !method || !accountDetails) {
      alert("All fields are required.");
      return;
    }

    const res = await fetch("/api/withdraw", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: session.user.email, // or session.user.id
    amount,
    method,
    accountDetails,
    email: session.user.email, // Send user email to API
  }),
});


    const data = await res.json();

    if (res.ok) {
      alert("Withdrawal request submitted successfully.");
      setAmount("");
      setMethod("");
      setAccountDetails("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "40px", color: "#fff" }}>
      <h1 style={{ fontSize: "36px", color: "#ffc107", textAlign: "center" }}>
        Withdraw Funds
      </h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <label style={{ display: "block", marginBottom: "10px" }}>Withdrawal Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Method</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="USDT">USDT</option>
        </select>

        <label style={{ display: "block", marginBottom: "10px" }}>Account/Wallet Details:</label>
        <input
          type="text"
          value={accountDetails}
          onChange={(e) => setAccountDetails(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Submit Withdrawal</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ffc107",
  marginBottom: "20px",
  backgroundColor: "#1e1e1e",
  color: "#fff",
};

const buttonStyle = {
  backgroundColor: "#ffc107",
  color: "#000",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  width: "100%",
};
