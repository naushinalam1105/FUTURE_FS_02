const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET ALL LEADS
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD LEAD
router.post("/add", async (req, res) => {
  try {
    console.log("Incoming lead:", req.body);

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

// UPDATE LEAD
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedLead);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;