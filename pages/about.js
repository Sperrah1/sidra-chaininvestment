import { getSession } from "next-auth/react";

export default function AboutPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>About SIDRA-CHAIN</h1>
        <p style={styles.text}>
          SIDRA-CHAIN is a modern investment platform designed to help users grow their wealth through secure and transparent trading plans. 
        </p>
        <p style={styles.text}>
          We offer multiple investment options that are easy to understand, flexible to manage, and provide reliable daily returns.
        </p>
        <p style={styles.text}>
          Our mission is to make online investments simple, accessible, and profitable for everyone.
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
};

// ✅ Optional: Protect this page if needed
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: {} };
}
