const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    shortDesc: String,
    rent: Number,
    deposit: Number,
    sqft: Number,
    bedrooms: Number,
    bathrooms: Number,
    parking: String,
    balcony: String,
    amenities: [String],
    rating: Number,
    description: String,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rent", rentSchema);