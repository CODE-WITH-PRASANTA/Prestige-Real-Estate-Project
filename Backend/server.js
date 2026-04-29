const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env FIRST
dotenv.config();

// Correct DB path (not "configs")
const connectDB = require("./config/db");

// Import Routes
const faqRoutes = require("./routes/faqRoutes");
const path = require("path");
const dotenv = require("dotenv");

/* Load env first */
dotenv.config();

/* Import DB */
const connectDB = require("./configs/db");

/* Import Routes */
const blogRoutes = require("./routes/blogRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
/* Connect Database */
connectDB();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
connectDB();
/* Static folder for images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* Routes */
app.use("/api/blogs", blogRoutes);

/* ================= ROUTES ================= */

// Test route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// FAQ API Route
app.use("/api/faqs", faqRoutes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});