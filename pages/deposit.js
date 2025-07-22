import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Deposit() {
  const { data: session } = useSession();
  const router = useRouter();
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/wallets")
      .then((res) => res.json())
      .then((data) => setMethods(data))
      .catch((err) => console.error("Failed to load wallets", err));
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Payment details copied to clipboard!");
  };

  const handleDeposit = async () => {
    if (!selectedMethod || !amount) {
      alert("Please select a payment method and enter an amount.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/user/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.email,
        method: selectedMethod.method,
        details: selectedMethod.address,
        amount: parseFloat(amount),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Deposit request submitted! Please make the payment to the address below and wait for approval.");
      router.push("/deposit-history");
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Make a Deposit</h1>

      <div style={{ ...styles.section, animation: "fadeIn 1s ease-in" }}>
        <label style={styles.label}>Select Payment Method:</label>
        <select
          value={selectedMethod.method || ""}
          onChange={(e) => {
            const method = methods.find((m) => m.method === e.target.value);
            setSelectedMethod(method);
          }}
          style={styles.select}
        >
          <option value="">-- Select Method --</option>
          {methods.map((method, index) => (
            <option key={index} value={method.method}>
              {method.method}
            </option>
          ))}
        </select>

        {selectedMethod && (
          <div style={styles.detailsBox}>
            <p style={{ marginBottom: "10px", fontWeight: "bold", color: "red" }}>
              ⚠️ Only send {selectedMethod.method} assets to this address. Other assets will be lost forever.
            </p>
            <p style={{ marginBottom: "5px" }}>
              <strong>{selectedMethod.method} Address / Account:</strong>
            </p>
            <p style={styles.address}>{selectedMethod.address}</p>
            <button onClick={() => handleCopy(selectedMethod.address)} style={styles.copyButton}>
              Copy Payment Details
            </button>
          </div>
        )}

        <label style={styles.label}>Enter Deposit Amount ($):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleDeposit} style={styles.depositButton} disabled={loading}>
          {loading ? "Processing..." : "Submit Deposit"}
        </button>

        {selectedMethod && (
          <p style={styles.notice}>
            📌 Please make payment to the wallet address or bank details above and wait for deposit approval.
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "40px",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    animation: "fadeIn 1s ease-in",
  },
  header: {
    fontSize: "36px",
    color: "#ffc107",
    textAlign: "center",
    marginBottom: "30px",
  },
  section: {
    maxWidth: "600px",
    margin: "auto",
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ffc107",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ffc107",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ffc107",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  depositButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  detailsBox: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#2c2c2c",
    borderRadius: "5px",
    border: "1px dashed #ffc107",
  },
  address: {
    wordBreak: "break-all",
    fontSize: "16px",
    marginBottom: "10px",
  },
  copyButton: {
    padding: "10px 15px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  notice: {
    marginTop: "20px",
    textAlign: "center",
    color: "#ccc",
    fontSize: "14px",
  },
};
