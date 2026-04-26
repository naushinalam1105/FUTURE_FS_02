const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// 1. GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ date: -1 }); // Sorting by date
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST (Create) a new lead - REQUIRED for the "+ Add Lead" button
router.post("/", async (req, res) => {
  const lead = new Lead({
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    notes: req.body.notes,
    source: req.body.source
  });
  try {
    const newLead = await lead.save();
    res.status(201).json(newLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. PUT (Update) - Changed from PATCH to PUT to match your frontend axios.put
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE lead
router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;