
import '../styles/globals.css'; // Must be here
import { SessionProvider } from 'next-auth/react';
import { UserContextProvider } from '../contexts/UserContext';
import { useEffect } from 'react';



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

