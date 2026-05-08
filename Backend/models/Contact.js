const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email1: String,
    email2: String,
    phone1: String,
    phone2: String,
    address: String,
    city: String,
    country: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);