const express = require("express");
const cors = require("cors");
const path = require("path");

/* Load env FIRST */
require("dotenv").config();

/* 🔹 Import DB */
const connectDB = require("./configs/db");

/* 🔹 Import Routes */
const faqRoutes = require("./routes/faqRoutes");
const propertyRoutes = require("./routes/property.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");
const coldLeadRoutes = require("./routes/coldLeadRoutes");
const galleryRoutes = require("./routes/gallery.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const rentRoutes = require("./routes/rent.routes");
const userPropertyRoutes = require("./routes/userProperty.routes");
const propertyInquiryRoutes = require("./routes/propertyinquiry.routes");

const app = express();

/* ================= DATABASE ================= */
connectDB();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔹 Static Folder (for images/files) */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// API Routes
app.use("/api/faqs", faqRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/cold-leads", coldLeadRoutes);
app.use("/api/user-properties", userPropertyRoutes);
app.use("/api/property-inquiries", propertyInquiryRoutes);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    url: req.originalUrl,
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
