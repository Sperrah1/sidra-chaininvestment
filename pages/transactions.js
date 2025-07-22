import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TransactionsPage({ user }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(`/api/user/transactions?userId=${user.id}`);
      const data = await res.json();
      setTransactions(data);
    }
    loadData();
  }, [user.id]);

  const getIcon = (type) => {
    switch (type) {
      case "deposit": return "💰";
      case "withdrawal": return "💸";
      case "subscription": return "📈";
      default: return "🔄";
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "deposit": return "#28a745";       // green
      case "withdrawal": return "#dc3545";    // red
      case "subscription": return "#007bff";  // blue
      default: return "#666";
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#ffc107" }}>
        Transaction History
      </h1>

      {transactions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No transactions yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((txn, idx) => (
            <li
              key={idx}
              style={{
                borderLeft: `6px solid ${getColor(txn.type)}`,
                backgroundColor: "#1c1c1c",
                color: "#f1f1f1",
                marginBottom: "15px",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <strong style={{ color: "#ffc107", fontSize: "18px" }}>
                {getIcon(txn.type)} {txn.type.toUpperCase()}
              </strong>{" "}
              — ${txn.amount}
              <br />
              <span style={{ fontSize: "14px", color: "#bbb" }}>
                {new Date(txn.date).toLocaleString()}
              </span>
              {txn.planName && (
                <>
                  <br />
                  <span style={{ fontStyle: "italic", color: "#ccc" }}>
                    Plan: {txn.planName}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
