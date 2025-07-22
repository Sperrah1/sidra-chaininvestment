import { useState } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
  const { token, email } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, newPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Password reset successfully!");
      router.push("/login");
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleReset} style={styles.form}>
        <h1 style={styles.title}>Reset Password</h1>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  form: {
    backgroundColor: "#1e1e1e",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)",
    textAlign: "center",
  },
  title: {
    color: "#ffc107",
    marginBottom: "20px",
    fontSize: "28px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ffc107",
    marginBottom: "20px",
    backgroundColor: "#121212",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    color: "red",
  },
};
