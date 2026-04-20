const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  // ===== BASIC =====
  title: String,
  description: String,
  location: String,
  price: Number,
  downPayment: Number,
  loanTerms: String,
  interestRate: String,
  sqft: Number,
  category: String,
  rating: Number,
  lastUpdate: String,

  // ===== FILES =====
  banner: String,
  ownerImage: String,
  images: [String],

  // ===== FEATURES =====
  features: {
    bedroom: Number,
    bathroom: Number,
    parking: Number,
    balcony: Number,
    floor: Number,
    wardrobe: Number,
    tv: Number,
    purifier: Number,
    microwave: Number,
    ac: Number,
    fridge: Number,
    curtains: Number,
  },

  // ===== AMENITIES =====
  amenities: [String],

  // ===== DESCRIPTION =====
  fullDescription: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);