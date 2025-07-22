import Link from "next/link";
import { getSession } from "next-auth/react";

export default function AdminDashboard() {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Admin Dashboard</h1>

      <div style={buttonContainer}>
        <Link href="/admin/deposits">
          <button style={buttonStyle}>Manage Deposits</button>
        </Link>

        <Link href="/admin/withdrawals">
          <button style={buttonStyle}>Manage Withdrawals</button>
        </Link>

        <Link href="/admin/add-balance">
          <button style={buttonStyle}>Add Balance to User</button>
        </Link>

        <Link href="/admin/wallets">
          <button style={buttonStyle}>Manage Wallets</button>
        </Link>

        <Link href="/admin/emails">
          <button style={buttonStyle}>Send Bulk Emails</button>
        </Link>

        <Link href="/adminChat">
          <button style={buttonStyle}>Support Chat Panel</button>
        </Link>
      </div>
    </div>
  );
}

const containerStyle = {
  backgroundColor: "#121212",
  minHeight: "100vh",
  padding: "20px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "30px",
  color: "#ffc107",
  marginBottom: "30px",
  textAlign: "center",
};

const buttonContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
  maxWidth: "400px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px 20px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.user.isAdmin) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
}
