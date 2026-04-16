const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: String,
    location: String,
    feedback: String,
    rating: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);