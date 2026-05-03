const express = require("express");
const cors = require("cors");
const path = require("path");

<<<<<<< HEAD
/* 🔹 Load ENV first */
dotenv.config();
=======
/* Load env FIRST */
require("dotenv").config();
>>>>>>> 4e5b9a5967ae44063bd5af06e92f94ea001b7be7

/* 🔹 Import DB */
const connectDB = require("./configs/db");

<<<<<<< HEAD
/* 🔹 Import Routes */
=======
/* Import Routes */
const faqRoutes = require("./routes/faqRoutes");
>>>>>>> 4e5b9a5967ae44063bd5af06e92f94ea001b7be7
const propertyRoutes = require("./routes/property.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");
const coldLeadRoutes = require("./routes/coldLeadRoutes");
const galleryRoutes = require("./routes/gallery.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const rentRoutes = require("./routes/rent.routes");
<<<<<<< HEAD
const contactRoutes = require("./routes/contactRoutes"); // ✅ NEW

const app = express();

/* 🔹 Connect Database */
connectDB();

/* 🔹 Middleware */
=======
const userPropertyRoutes = require("./routes/userProperty.routes")

const app = express();

/* ================= DATABASE ================= */
connectDB();

/* ================= MIDDLEWARE ================= */
>>>>>>> 4e5b9a5967ae44063bd5af06e92f94ea001b7be7
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔹 Static Folder (for images/files) */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

<<<<<<< HEAD
/* 🔹 API Routes (CLEAN STRUCTURE) */
=======
/* ================= ROUTES ================= */

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// API Routes
app.use("/api/faqs", faqRoutes);
app.use("/api/blogs", blogRoutes);
>>>>>>> 4e5b9a5967ae44063bd5af06e92f94ea001b7be7
app.use("/api/property", propertyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/cold-leads", coldLeadRoutes);
<<<<<<< HEAD
app.use("/api/contact", contactRoutes); // ✅ NEW CONTACT API

/* 🔹 Health Check Route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running 🚀",
=======
app.use("/api/user-properties",userPropertyRoutes); 

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    url: req.originalUrl,
>>>>>>> 4e5b9a5967ae44063bd5af06e92f94ea001b7be7
  });
});

/* 🔹 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* 🔹 Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

<<<<<<< HEAD
/* 🔹 PORT */
const PORT = process.env.PORT || 5000;

/* 🔹 Start Server */
=======
/* PORT */
/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= SERVER ================= */
>>>>>>> 4e5b9a5967ae44063bd5af06e92f94ea001b7be7
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});