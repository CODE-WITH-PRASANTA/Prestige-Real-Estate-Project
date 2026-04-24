const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

/* Load env first */
dotenv.config();

/* Import DB */
const connectDB = require("./configs/db");


const propertyRoutes = require("./routes/property.routes")
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");
const galleryRoutes = require("./routes/gallery.routes");
const enquiryRoutes = require("./routes/enquiry.routes");





const app = express();

/* Connect Database */
connectDB();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static folder for images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* Routes */
app.use("/api/blogs", blogRoutes);

/* Test Route */
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});



app.use("/api/property", propertyRoutes)
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiryRoutes);





/* PORT */
const PORT = process.env.PORT || 5000;

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});