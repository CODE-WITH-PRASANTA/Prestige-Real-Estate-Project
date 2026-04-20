const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    owner: String,
    ownerdesignation: String,
    date: String,
    content: String,
    tags: [String],
    reviews: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);