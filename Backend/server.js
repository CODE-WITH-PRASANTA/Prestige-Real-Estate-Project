const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");


const propertyRoutes = require("./routes/property.routes")
const testimonialRoutes = require("./routes/testimonial.routes");
const blogRoutes = require("./routes/blog.routes");



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

app.use("/uploads", express.static("uploads"));


app.use("/api/property", propertyRoutes)
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);




/* PORT */
const PORT = process.env.PORT || 5000;

/* Start Server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});