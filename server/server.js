const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("CRM Backend Working 🚀");
});

// routes
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

console.log("Routes loading...");
console.log(require("./routes/leadRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));