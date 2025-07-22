import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const loadWithdrawals = async () => {
    const res = await fetch("/api/admin/withdrawals");
    const data = await res.json();
    setWithdrawals(data);
  };

  const handleApprove = (id) => {
    fetch("/api/admin/approve-withdrawal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ withdrawalId: id }),
    })
      .then((r) => r.json().then((d) => ({ ok: r.ok, data: d })))
      .then(({ ok, data }) => {
        if (ok) {
          alert("Approved & email sent!");
          loadWithdrawals();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while approving withdrawal.");
      });
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Withdrawal Requests</h1>

      {withdrawals.length === 0 ? (
        <p style={{ textAlign: "center" }}>No withdrawal requests at the moment.</p>
      ) : (
        <div style={withdrawalListStyle}>
          {withdrawals.map((w) => (
            <div key={w._id} style={withdrawalItemStyle}>
              <p><strong>User:</strong> {w.userId}</p>
              <p><strong>Amount:</strong> ${w.amount}</p>
              <p><strong>Method:</strong> {w.method}</p>
              <p><strong>Details:</strong> {w.details}</p>
              <p><strong>Status:</strong> {w.status}</p>

              {w.status === "pending" && (
                <button
                  onClick={() => handleApprove(w._id)}
                  style={buttonStyle}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
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

const withdrawalListStyle = {
  maxWidth: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const withdrawalItemStyle = {
  border: "1px solid #ffc107",
  borderRadius: "8px",
  padding: "15px",
  background: "#1e1e1e",
  wordWrap: "break-word",
};

const buttonStyle = {
  backgroundColor: "#ffc107",
  color: "#000",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "10px",
  width: "100%",
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user.isAdmin) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
}
