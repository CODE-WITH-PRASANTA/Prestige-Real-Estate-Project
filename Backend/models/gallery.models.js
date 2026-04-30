const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    topCity: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    properties: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);