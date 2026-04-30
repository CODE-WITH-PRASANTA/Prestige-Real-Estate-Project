const mongoose = require("mongoose");

const contactLogSchema = new mongoose.Schema(
  {
    action: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactLog", contactLogSchema);