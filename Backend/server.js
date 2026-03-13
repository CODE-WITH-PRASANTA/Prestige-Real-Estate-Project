const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
require("dotenv").config();

/* Connect Database */
connectDB();

/* Test Route */
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

/* PORT */
const PORT = process.env.PORT || 5000;

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});