import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Registration successful! You can now log in.");
      router.push("/success");
    } else {
      alert(data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h1 style={styles.title}>SIDRA-CHAIN Register</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registering..." : "Register"}
        </button>
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
    borderRadius: "10px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#ffc107",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
  },
  input: {
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ffc107",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  },
  button: {
    padding: "12px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
