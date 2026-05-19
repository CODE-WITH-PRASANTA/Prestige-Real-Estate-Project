const mongoose = require("mongoose");

const customerActivitySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
      },

      designation: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      contactedDate: {
        type: String,
        default: "",
      },

      propertyView: {
        type: String,
        enum: [
          "Property Viewed",
          "Not Viewed",
        ],
        default: "",
      },

      interest: {
        type: String,
        enum: [
          "Interested",
          "Not Interested",
        ],
        default: "",
      },

      feedback: {
        type: String,
        default: "",
      },

      nextVisitDate: {
        type: String,
        default: "",
      },

      nextVisitTime: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "CustomerActivity",
  customerActivitySchema
);