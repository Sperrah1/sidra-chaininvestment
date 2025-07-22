import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Example: Fetch news from API
    // You can later connect this to your admin news post system
    const fetchedNews = [
      { id: 1, title: "Promo Plan Now Available", content: "Earn 70% daily for 2 days with our new promo plan!" },
      { id: 2, title: "System Upgrade", content: "We are upgrading our system for faster transactions." },
      { id: 3, title: "Welcome Bonus", content: "Get $10 bonus when you refer a friend." },
    ];
    setNews(fetchedNews);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Platform News</h1>

        {news.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>No news available at the moment.</p>
        ) : (
          news.map((item) => (
            <div key={item.id} style={styles.newsItem}>
              <h2 style={styles.newsTitle}>{item.title}</h2>
              <p style={styles.newsContent}>{item.content}</p>
            </div>
          ))
        )}
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
  newsItem: {
    borderBottom: "1px solid #ffc107",
    paddingBottom: "15px",
    marginBottom: "15px",
  },
  newsTitle: {
    color: "#ffc107",
    fontSize: "22px",
    marginBottom: "8px",
  },
  newsContent: {
    color: "#ddd",
    fontSize: "16px",
  },
};

// ✅ Optional: Protect this page
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  return { props: {} };
}
