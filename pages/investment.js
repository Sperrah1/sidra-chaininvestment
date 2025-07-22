import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function InvestmentPlans() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setPageVisible(true), 100); // Smooth fade-in effect
  }, []);

  const plans = [
    { name: "Basic Plan", min: 100, returnRate: "5% daily for 3 days" },
    { name: "Advanced Plan", min: 500, returnRate: "12% daily for 7 days" },
    { name: "Premium Plan", min: 1000, returnRate: "20% daily for 30 days" },
    { name: "Promo Plan", min: 1000, returnRate: "70% daily for 2 days" },
  ];

  const handleInvest = async (plan) => {
    const amount = prompt(`Enter amount to invest (minimum: $${plan.min})`);
    if (!amount || isNaN(amount) || amount < plan.min) {
      alert(`Minimum deposit for ${plan.name} is $${plan.min}`);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/plans/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        planName: plan.name,
        amount: parseFloat(amount),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Investment successful!");
      router.push("/dashboard");
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
        opacity: pageVisible ? 1 : 0,
        transform: pageVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <h1 style={{ fontSize: "36px", color: "#ffc107", textAlign: "center", marginBottom: "30px" }}>
        Investment Plans
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ffc107",
              borderRadius: "8px",
              padding: "20px",
              margin: "15px",
              width: "300px",
              background: "#1e1e1e",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 15px #ffc107";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
            }}
          >
            <h2 style={{ color: "#ffc107" }}>{plan.name}</h2>
            <p style={{ margin: "10px 0" }}>Minimum: ${plan.min}</p>
            <p style={{ marginBottom: "15px" }}>{plan.returnRate}</p>

            <button
              onClick={() => handleInvest(plan)}
              disabled={loading}
              style={{
                backgroundColor: "#ffc107",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "transform 0.2s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {loading ? "Processing..." : "Invest"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
