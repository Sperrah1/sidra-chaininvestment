import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyPage() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      axios.post('/api/verify', { token })
        .then(res => setMessage(res.data.message))
        .catch(err => setMessage(err.response?.data?.message || "Verification failed"));
    }
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{message}</h1>
      {message.includes("successfully") && <a href="/login">Go to Login</a>}
    </div>
  );
}
