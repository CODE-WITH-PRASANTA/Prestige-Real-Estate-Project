const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    type: String,
    budget: String,
    city: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);