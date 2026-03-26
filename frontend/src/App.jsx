import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('https://simple-contact-app-s9vh.onrender.com/api/contacts').then(res => setContacts(res.data));
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    axios.post('https://simple-contact-app-s9vh.onrender.com/api/contacts', { name, email, phone })
      .then(() => {
        setName(''); setEmail(''); setPhone('');
        axios.get('https://simple-contact-app-s9vh.onrender.com/api/contacts').then(res => setContacts(res.data));
      });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Contact List</h1>
      <form onSubmit={addContact} style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} /><br/>
        <button type="submit">Submit</button>
      </form>

      <div style={{ display: "inline-block", textAlign: "left" }}>
        {contacts.map(c => (
          <div key={c._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>{c.name} - {c.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;