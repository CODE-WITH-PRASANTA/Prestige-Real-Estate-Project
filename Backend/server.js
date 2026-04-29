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


const propertyRoutes = require("./routes/property.routes")
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");
const coldLeadRoutes = require("./routes/coldLeadRoutes");
const galleryRoutes = require("./routes/gallery.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const rentRoutes = require("./routes/rent.routes");




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

<<<<<<< HEAD
/* ================= ROUTES ================= */

// Test route
=======
app.use("/api/cold-leads", coldLeadRoutes);

/* Test Route */
>>>>>>> b7eb17c900db5eaae1d030a1c0ce409d6d08da93
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

<<<<<<< HEAD
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
=======


app.use("/api/property", propertyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/cold-leads", coldLeadRoutes);





/* PORT */
>>>>>>> b7eb17c900db5eaae1d030a1c0ce409d6d08da93
const PORT = process.env.PORT || 5000;

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});