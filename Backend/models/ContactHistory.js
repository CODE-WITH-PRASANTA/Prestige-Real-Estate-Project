const mongoose = require("mongoose");

const contactHistorySchema = new mongoose.Schema(
  {
    data: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactHistory", contactHistorySchema);