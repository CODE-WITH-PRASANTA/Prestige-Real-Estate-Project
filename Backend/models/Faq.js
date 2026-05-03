const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["General", "Admission", "Course"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);