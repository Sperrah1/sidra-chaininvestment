import { useState } from 'react';
import axios from 'axios';

export default function SendAdminEmail() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const sendEmail = async () => {
    try {
      const res = await axios.post('/api/send-admin-email', { to, subject, message });
      setResponseMessage(res.data.message);
      setTo('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'Error sending email.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Send Email to User</h1>
      <input 
        type="email" 
        placeholder="User's Email" 
        value={to} 
        onChange={(e) => setTo(e.target.value)} 
        style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
      /><br />
      <input 
        type="text" 
        placeholder="Subject" 
        value={subject} 
        onChange={(e) => setSubject(e.target.value)} 
        style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
      /><br />
      <textarea 
        placeholder="Message" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        style={{ width: '300px', height: '150px', padding: '10px' }}
      /><br /><br />
      <button onClick={sendEmail} style={{ padding: '10px 20px', backgroundColor: '#f0ad4e', border: 'none', cursor: 'pointer' }}>
        Send Email
      </button>
      <p style={{ marginTop: '20px', color: 'green' }}>{responseMessage}</p>
    </div>
  );
}
