import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function DepositHistory({ user }) {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    async function loadDeposits() {
      try {
        const res = await fetch(`/api/user/deposits?userId=${user.email}`);
        const data = await res.json();
        setDeposits(data);
      } catch (error) {
        console.error("Error loading deposits:", error);
      }
    }

    loadDeposits();
  }, [user.email]);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Deposit History</h1>

      {deposits.length === 0 ? (
        <p style={{ textAlign: "center" }}>No deposits found.</p>
      ) : (
        <ul style={listStyle}>
          {deposits.map((deposit, index) => (
            <li key={index} style={cardStyle}>
              <strong style={{ color: "#ffc107" }}>Amount:</strong> ${deposit.amount}
              <br />
              <strong style={{ color: "#ffc107" }}>Method:</strong> {deposit.method}
              <br />
              <strong style={{ color: "#ffc107" }}>Details:</strong> {deposit.details}
              <br />
              <strong style={{ color: "#ffc107" }}>Status:</strong>{" "}
              <span style={{ color: deposit.status === "approved" ? "lightgreen" : "orange" }}>
                {deposit.status}
              </span>
              <br />
              <strong style={{ color: "#ffc107" }}>Date:</strong>{" "}
              {new Date(deposit.requestedAt).toLocaleDateString()}
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
};

const titleStyle = {
  fontSize: "30px",
  color: "#ffc107",
  textAlign: "center",
  marginBottom: "30px",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  maxWidth: "600px",
  margin: "auto",
};

const cardStyle = {
  border: "1px solid #ffc107",
  borderRadius: "8px",
  marginBottom: "15px",
  padding: "15px",
  background: "#1e1e1e",
  wordWrap: "break-word",
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: { user: session.user } };
}
