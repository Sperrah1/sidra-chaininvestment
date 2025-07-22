import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.title}>SIDRA-CHAIN Login</h1>

        <input
          type="email"
          placeholder="Email"
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.linkWrapper}>
          <a href="/forgot-password" style={styles.link}>
            Forgot Password?
          </a>
        </p>
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
    width: "100%",
    maxWidth: "400px",
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
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "15px",
  },
  linkWrapper: {
    textAlign: "center",
  },
  link: {
    color: "#ffc107",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
  },
};
