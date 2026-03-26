const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log(err));

// Schema matches your NEW super-simple UI
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String
});
const Contact = mongoose.model('Contact', contactSchema);

app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
  const newContact = new Contact({ name: req.body.name, phone: req.body.phone });
  await newContact.save();
  res.json(newContact);
});

app.delete('/api/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log(" Server running"));