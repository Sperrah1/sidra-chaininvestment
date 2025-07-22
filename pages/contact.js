import { getSession } from "next-auth/react";

export default function ContactPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.text}>For any inquiries or support, you can reach us at:</p>

        <div style={styles.contactBox}>
          <p style={styles.contactItem}><strong>Email:</strong> sidrachaininvestment@gmail.com</p>
          <p style={styles.contactItem}><strong>Phone:</strong> +966 126029988</p>
          <p style={styles.contactItem}><strong>Office:</strong> Al Murjanah Tower Prince Sultan Street PO Box 118528 Jeddah 21312 Kingdom of Saudi Arabia</p>
        </div>

        <p style={styles.text}>We are available 24/7 to assist you.</p>
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
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0 0 15px rgba(255, 193, 7, 0.5)",
    textAlign: "center",
  },
  title: {
    color: "#ffc107",
    fontSize: "32px",
    marginBottom: "20px",
  },
  text: {
    color: "#ddd",
    fontSize: "18px",
    marginBottom: "15px",
    lineHeight: "1.6",
  },
  contactBox: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  contactItem: {
    color: "#ffc107",
    marginBottom: "10px",
    fontSize: "16px",
  },
};

// ✅ Optional: Protect this page if needed
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: {} };
}
