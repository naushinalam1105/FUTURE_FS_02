const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  status: { type: String, default: 'new' },
  notes: String,
  addedDate: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// Routes
app.get('/api/leads', async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

app.post('/api/leads', async (req, res) => {
  const newLead = new Lead(req.body);
  await newLead.save();
  res.json(newLead);
});

app.listen(5000, () => console.log("Server running on port 5000"));