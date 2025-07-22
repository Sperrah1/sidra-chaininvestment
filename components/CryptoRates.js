// components/CryptoRates.js
import { useEffect, useState } from 'react';

export default function CryptoRates() {
  const [prices, setPrices] = useState({ BTC: null, ETH: null, LTC: null });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd'
        );
        const data = await res.json();
        setPrices({
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          LTC: data.litecoin.usd,
        });
      } catch (err) {
        console.error('Error fetching crypto prices:', err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>Live Crypto Prices (USD)</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <p><strong>BTC:</strong> {prices.BTC ? `$${prices.BTC}` : 'Loading...'}</p>
        <p><strong>ETH:</strong> {prices.ETH ? `$${prices.ETH}` : 'Loading...'}</p>
        <p><strong>LTC:</strong> {prices.LTC ? `$${prices.LTC}` : 'Loading...'}</p>
      </div>
    </div>
  );
}
