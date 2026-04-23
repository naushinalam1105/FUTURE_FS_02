const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// TEST ROUTE
router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

module.exports = router;

router.post("/add", async (req, res) => {
  try {
    console.log("Incoming lead:", req.body); // 🔥 DEBUG LINE

    const lead = new Lead(req.body);
    await lead.save();

    res.json(lead);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE LEAD
router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE LEAD STATUS
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, source, status, notes } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, source, status, notes },
      { new: true }
    );

    res.json(updatedLead);
  } catch (err) {
    res.status(500).json(err);
  }
});