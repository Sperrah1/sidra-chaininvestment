import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ForgotPasswordSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={styles.container}>
      <div style={styles.animationBox}>
        <div style={styles.checkmark}>✔</div>
        <h1 style={styles.text}>Password Reset Email Sent!</h1>
        <p style={styles.subtext}>Redirecting to login...</p>
      </div>
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
  animationBox: {
    textAlign: "center",
    backgroundColor: "#1e1e1e",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(255, 193, 7, 0.5)",
  },
  checkmark: {
    fontSize: "60px",
    color: "#00ff7f",
    animation: "pop 0.6s ease",
  },
  text: {
    color: "#ffc107",
    fontSize: "28px",
    marginTop: "20px",
  },
  subtext: {
    color: "#aaa",
    marginTop: "10px",
  },
};
