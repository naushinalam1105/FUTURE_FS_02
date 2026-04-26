const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected 🚀"))
  .catch(err => console.error("Connection Error:", err));

// 2. Lead Schema (Includes Notes)
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: { type: String, default: 'LinkedIn' },
  status: { type: String, default: 'new' },
  notes: { type: String, default: '' },
  addedDate: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// 3. API ROUTES

// GET ALL LEADS
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ addedDate: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE LEAD
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json(newLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE LEAD (The missing piece!)
app.put('/api/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document
    );
    if (!updatedLead) return res.status(404).json({ message: "Lead not found" });
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE LEAD
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PORT (Render uses process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));