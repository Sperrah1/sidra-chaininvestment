import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function AdminWallets() {
  const [wallets, setWallets] = useState([]);
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadWallets();
  }, []);

  const loadWallets = async () => {
    const res = await fetch("/api/wallets");
    const data = await res.json();
    setWallets(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/wallets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, address }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Wallet updated successfully!");
      setMethod("");
      setAddress("");
      loadWallets();
    } else {
      alert("Update failed: " + data.message);
    }
  };

  const handleDelete = async (walletId) => {
    if (!confirm("Are you sure you want to delete this wallet?")) return;

    const res = await fetch("/api/admin/wallets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: walletId }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Wallet deleted successfully!");
      loadWallets();
    } else {
      alert("Delete failed: " + data.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Admin Wallet Management</h1>

      <form onSubmit={handleUpdate} style={formStyle}>
        <label>Method:</label>
        <input
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={inputStyle}
          placeholder="USDT, Bitcoin, Bank..."
          required
        />

        <label>Wallet/Account Details:</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
          placeholder="Wallet Address or Bank Details"
          required
        />

        <button type="submit" style={buttonStyle}>
          Update Wallet
        </button>
      </form>

      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Current Wallets</h2>

      <ul style={walletListStyle}>
        {wallets.map((w, index) => (
          <li key={index} style={walletItemStyle}>
            <strong>{w.method}</strong>: {w.address}

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleDelete(w._id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
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
  maxWidth: "400px",
  width: "100%",
  marginBottom: "30px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ffc107",
  backgroundColor: "#1e1e1e",
  color: "#fff",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const walletListStyle = {
  maxWidth: "600px",
  width: "100%",
  margin: "auto",
  listStyle: "none",
  padding: 0,
};

const walletItemStyle = {
  border: "1px solid #ffc107",
  borderRadius: "5px",
  padding: "15px",
  marginBottom: "15px",
  backgroundColor: "#1e1e1e",
  wordWrap: "break-word",
};

const deleteButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#ff4444",
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
