const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

/* 🔹 Load ENV first */
dotenv.config();

/* 🔹 Import DB */
const connectDB = require("./configs/db");

/* 🔹 Import Routes */
const propertyRoutes = require("./routes/property.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");
const coldLeadRoutes = require("./routes/coldLeadRoutes");
const galleryRoutes = require("./routes/gallery.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const rentRoutes = require("./routes/rent.routes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ NEW

const app = express();

/* 🔹 Connect Database */
connectDB();

/* 🔹 Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔹 Static Folder (for images/files) */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* 🔹 API Routes (CLEAN STRUCTURE) */
app.use("/api/property", propertyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/cold-leads", coldLeadRoutes);
app.use("/api/contact", contactRoutes); // ✅ NEW CONTACT API

/* 🔹 Health Check Route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running 🚀",
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

/* 🔹 PORT */
const PORT = process.env.PORT || 5000;

/* 🔹 Start Server */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});