import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    loadDeposits();
  }, []);

  const loadDeposits = async () => {
    try {
      const res = await fetch("/api/admin/deposits");
      const data = await res.json();
      setDeposits(data);
    } catch (error) {
      console.error("Failed to fetch deposits:", error);
    }
  };

  const handleApprove = async (depositId) => {
    if (!confirm("Are you sure you want to approve this deposit?")) return;

    const res = await fetch("/api/admin/approveDeposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ depositId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Deposit approved successfully!");
      loadDeposits();
    } else {
      alert("Approval failed: " + data.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Manage Deposits</h1>

      {deposits.length === 0 ? (
        <p style={{ textAlign: "center" }}>No deposits found.</p>
      ) : (
        <ul style={depositListStyle}>
          {deposits.map((deposit, index) => (
            <li key={index} style={depositItemStyle}>
              <strong style={{ color: "#ffc107" }}>{deposit.userId}</strong>
              <p>Amount: ${deposit.amount}</p>
              <p>Method: {deposit.method}</p>
              <p>Status: {deposit.status}</p>
              <div style={{ marginTop: "10px" }}>
                {deposit.status === "pending" && (
                  <button
                    onClick={() => handleApprove(deposit._id)}
                    style={approveButtonStyle}
                  >
                    Approve
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
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

const depositListStyle = {
  maxWidth: "600px",
  margin: "auto",
  listStyle: "none",
  padding: 0,
  width: "100%",
};

const depositItemStyle = {
  border: "1px solid #ffc107",
  padding: "15px",
  borderRadius: "5px",
  marginBottom: "15px",
  backgroundColor: "#1e1e1e",
  wordWrap: "break-word",
};

const approveButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4caf50",
  color: "#fff",
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
