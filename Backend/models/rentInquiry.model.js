const mongoose = require("mongoose");

const rentInquirySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rent",
      },

      propertyTitle: {
        type: String,
      },

      location: {
        type: String,
      },

      message: {
        type: String,
      },

      status: {
        type: String,

        enum: [
          "New",
          "Contacted",
          "Closed",
        ],

        default: "New",
      },
    },

    { timestamps: true }
  );

module.exports =
  mongoose.model(
    "RentInquiry",
    rentInquirySchema
  );