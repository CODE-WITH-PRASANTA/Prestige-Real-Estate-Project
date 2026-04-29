const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    owner: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    ownerdesignation: {
      type: String,
      required: [true, "Owner designation is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    reviews: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Blog image is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);