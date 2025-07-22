import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/InvestmentPlans.module.css"; // ✅ You will create this CSS module

export default function InvestmentPlans() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      setModalMessage("Investment successful!");
      setShowModal(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } else {
      setModalMessage("Error: " + data.message);
      setShowModal(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Investment Plans</h1>

      <div className={styles.plansWrapper}>
        {plans.map((plan, index) => (
          <div key={index} className={styles.planCard}>
            <h2 className={styles.planTitle}>{plan.name}</h2>
            <p>Minimum: ${plan.min}</p>
            <p>{plan.returnRate}</p>

            <button
              onClick={() => handleInvest(plan)}
              disabled={loading}
              className={styles.investButton}
            >
              {loading ? "Processing..." : "Invest"}
            </button>
          </div>
        ))}
      </div>

      {/* Success/Error Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
