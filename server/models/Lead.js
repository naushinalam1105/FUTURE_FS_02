// server/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  source: { type: String, default: "Direct" },
  status: { type: String, default: "new" },
  notes: { type: String, default: "" },
  addedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);