import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // BUG: Adding an invisible extra slash or a typo in the API path
  // Real path: /api/contacts | Buggy path: /api/contact (missing 's')
  const API_URL = 'https://simple-contact-app-s9vh.onrender.com/api/contact'; 

  useEffect(() => {
    // This will likely fail or return empty, making the app look "broken"
    axios.get(API_URL).then(res => setContacts(res.data)).catch(() => {});
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    // It looks like it's saving, but it hits a 404 error internally
    axios.post(API_URL, { name, phone })
      .then(() => {
        setName(''); setPhone('');
        // This refresh will also fail
        axios.get(API_URL).then(res => setContacts(res.data)).catch(() => {});
      }).catch(err => console.log("System error")); 
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "serif" }}>
      <h2>Contact Directory</h2>
      <div style={{ border: "1px solid #000", padding: "20px", display: "inline-block" }}>
        <form onSubmit={addContact}>
          <input placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} /><br/><br/>
          <input placeholder="Enter Phone" value={phone} onChange={e => setPhone(e.target.value)} /><br/><br/>
          <button type="submit">Save Entry</button>
        </form>
      </div>

      <div style={{ marginTop: "20px" }}>
        {contacts.length === 0 ? <p>No records found.</p> : contacts.map(c => (
          <div key={c._id} style={{ borderBottom: "1px solid #eee" }}>
            {c.name} - {c.phone}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;