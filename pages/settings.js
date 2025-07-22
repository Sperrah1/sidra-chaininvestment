import { getSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage({ user }) {
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, name }),
    });

    setUpdating(false);

    if (res.ok) {
      alert("Profile updated successfully!");
    } else {
      alert("Error updating profile.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Settings</h1>

        <form onSubmit={handleUpdate} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email (Read Only)</label>
          <input
            type="email"
            value={email}
            readOnly
            style={{ ...styles.input, backgroundColor: "#333", cursor: "not-allowed" }}
          />

          <button type="submit" style={styles.button} disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
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
  },
  title: {
    color: "#ffc107",
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    color: "#aaa",
    fontSize: "16px",
  },
  input: {
    padding: "12px",
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
