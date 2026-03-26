import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 1. Fetch contacts on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://simple-contact-app-s9vh.onrender.com/api/contacts')
      .then(res => setContacts(res.data));
  };

  // 2. Add Contact (No Email)
  const addContact = (e) => {
    e.preventDefault();
    axios.post('https://simple-contact-app-s9vh.onrender.com/api/contacts', { name, phone })
      .then(() => {
        setName(''); setPhone('');
        fetchData();
      });
  };

  // 3. Delete Contact (To clean up your list)
  const deleteContact = (id) => {
    axios.delete(`https://simple-contact-app-s9vh.onrender.com/api/contacts/${id}`)
      .then(() => fetchData());
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>Contact List</h1>
      
      <form onSubmit={addContact} style={{ marginBottom: "30px", border: "1px solid black", padding: "20px", display: "inline-block" }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br/><br/>
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required /><br/><br/>
        <button type="submit">Submit</button>
      </form>

      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        {contacts.map(c => (
          <div key={c._id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>{c.name}: {c.phone}</span>
            <button onClick={() => deleteContact(c._id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;