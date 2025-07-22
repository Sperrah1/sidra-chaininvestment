import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchBalance() {
      const res = await fetch(`/api/user/balance?userId=${user.email}`);
      const data = await res.json();
      setBalance(data.balance);
    }

    fetchBalance();
  }, [user.email]);

  return (
    <div style={styles.dashboard}>
      {/* Slide-out Mobile Menu */}
      <div style={{ ...styles.menu, left: menuOpen ? "0" : "-260px" }}>
        <button style={styles.closeBtn} onClick={() => setMenuOpen(false)}>×</button>
        <nav style={styles.menuNav}>
          <Link href="/dashboard" style={styles.menuLink}>Dashboard</Link>
          <Link href="/profile" style={styles.menuLink}>Profile</Link>
          <Link href="/settings" style={styles.menuLink}>Settings</Link>
          <Link href="/about" style={styles.menuLink}>About</Link>
          <Link href="/contact" style={styles.menuLink}>Contact</Link>
          <Link href="/news" style={styles.menuLink}>News</Link>
          <Link href="/referral" style={styles.menuLink}>Referral</Link>
          <Link href="/deposit" style={styles.menuLink}>Deposit</Link>
          <Link href="/deposit-history" style={styles.menuLink}>Deposit History</Link>
          <Link href="/withdraw" style={styles.menuLink}>Withdraw</Link>
          <Link href="/plans" style={styles.menuLink}>Investment Plans</Link>
          <Link href="/chat" style={styles.menuLink}>Support Chat</Link>
          {user.isAdmin && (
            <>
              <Link href="/admin" style={styles.menuLink}>Admin Dashboard</Link>
              <Link href="/admin/deposits" style={styles.menuLink}>Manage Deposits</Link>
              <Link href="/admin/withdrawals" style={styles.menuLink}>Manage Withdrawals</Link>
              <Link href="/admin/wallets" style={styles.menuLink}>Manage Wallets</Link>
              <Link href="/admin/emails" style={styles.menuLink}>Send Emails</Link>
              <Link href="/adminChat" style={styles.menuLink}>Admin Chat Panel</Link>
            </>
          )}
          <button onClick={() => signOut()} style={{ ...styles.menuLink, background: "none", border: "none", textAlign: "left" }}>Logout</button>
        </nav>
      </div>

      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => setMenuOpen(true)} style={styles.menuToggle}>☰</button>
        <h1 style={styles.title}>Welcome, {user.name}</h1>
        <Link href="/profile">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile"
            style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", cursor: "pointer" }}
          />
        </Link>
      </header>

      {/* Wallet Balance */}
      <div style={styles.balanceBox}>
        <h2 style={styles.balanceTitle}>Wallet Balance</h2>
        <p style={styles.balanceAmount}>${balance}</p>
      </div>

      {/* Dashboard Cards */}
      <div style={styles.cardBox}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Your Profile</h3>
          <p>Email: {user.email}</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Referral Link</h3>
          <p>
            Share your link: <br />
            <span style={{ wordBreak: "break-word" }}>
              {`https://sidra-chain.com/register?ref=${user.email}`}
            </span>
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>News</h3>
          <p>Stay tuned for platform updates and promotions.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: { backgroundColor: "#121212", minHeight: "100vh", color: "#fff", padding: "20px", fontFamily: "Arial, sans-serif" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" },
  menuToggle: { backgroundColor: "#ffc107", border: "none", padding: "10px", fontSize: "24px", borderRadius: "5px", cursor: "pointer" },
  title: { color: "#ffc107", fontSize: "24px", margin: 0 },
  menu: { position: "fixed", top: 0, left: "-260px", width: "260px", height: "100%", backgroundColor: "#1e1e1e", padding: "20px", transition: "left 0.3s ease", zIndex: 1000, overflowY: "auto" },
  closeBtn: { backgroundColor: "transparent", border: "none", color: "#fff", fontSize: "28px", marginBottom: "20px", cursor: "pointer" },
  menuNav: { display: "flex", flexDirection: "column", gap: "10px" },
  menuLink: { color: "#ffc107", textDecoration: "none", fontSize: "16px", cursor: "pointer" },
  balanceBox: { textAlign: "center", marginBottom: "30px" },
  balanceTitle: { fontSize: "22px", color: "#ffc107" },
  balanceAmount: { fontSize: "32px", color: "#00ff7f" },
  cardBox: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  card: { backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)" },
  cardTitle: { color: "#ffc107", fontSize: "20px", marginBottom: "10px" },
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: "/login", permanent: false } };
  return { props: { user: session.user } };
}
 