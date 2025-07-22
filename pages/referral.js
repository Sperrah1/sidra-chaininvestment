import { getSession } from "next-auth/react";
import { useState } from "react";

export default function ReferralPage({ user }) {
  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${user.email}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Referral Program</h1>

        <p style={{ color: "#ddd", textAlign: "center", marginBottom: "20px" }}>
          Invite friends and earn rewards when they join!
        </p>

        <div style={styles.linkBox}>
          <input
            type="text"
            value={referralLink}
            readOnly
            style={styles.input}
          />
          <button onClick={handleCopy} style={styles.copyButton}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p style={{ color: "#aaa", textAlign: "center", marginTop: "20px" }}>
          Share this link with your friends.
        </p>
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
  card: {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 0 15px rgba(255, 193, 7, 0.5)",
    animation: "slideIn 1s ease",
  },
  title: {
    color: "#ffc107",
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  linkBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ffc107",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    textAlign: "center",
    fontSize: "16px",
  },
  copyButton: {
    padding: "12px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

// ✅ Protect the page
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: { user: session.user } };
}
