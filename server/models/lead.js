const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  source: String,
  status: {
    type: String,
    default: "new"
  },
  notes: { type: String, default: "" }

});

module.exports = mongoose.model("Lead", leadSchema);