import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function AdminDepositMethods() {
  const [methods, setMethods] = useState([]);
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    const res = await fetch("/api/deposit-methods");
    const data = await res.json();
    setMethods(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/deposit-methods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, address }),
    });

    if (res.ok) {
      alert("Method updated successfully!");
      fetchMethods();
      setMethod("");
      setAddress("");
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ color: "#ffc107", textAlign: "center", marginBottom: "20px" }}>Update Deposit Methods</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <label>Method:</label>
        <input
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />

        <label>Wallet Address / Bank Details:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#ffc107", border: "none", cursor: "pointer" }}>
          Save Method
        </button>
      </form>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "#ffc107" }}>Current Methods</h2>
        {methods.map((m) => (
          <div key={m.method} style={{ marginBottom: "15px" }}>
            <strong>{m.method}:</strong> {m.address}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user.isAdmin) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
}
