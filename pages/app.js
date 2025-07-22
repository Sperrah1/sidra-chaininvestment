import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { UserContextProvider } from "../contexts/UserContext";
// pages/_app.js
import '../styles/globals.css';
 // ✅ Now allowed here


export default function App({ Component, pageProps: { session, ...pageProps } }) {

  useEffect(() => {
    fetch("/api/socket");
  }, []);

  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </SessionProvider>
  );
}
