const mongoose = require("mongoose");

const basicInfoSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    category: String,
    currency: String,
    salePrice: Number,
    offerPrice: Number,
  },
  { _id: false }
);

const detailsSchema = new mongoose.Schema(
  {
    propertyId: String,
    pricePerSqft: Number,
    structureType: String,
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,
    parking: Number,
    balcony: String,
    floor: Number,
    wardrobe: Number,
    tv: Boolean,
    waterPurifier: Boolean,
    microwave: Boolean,
    ac: Boolean,
    fridge: Boolean,
    garageSize: Number,
    availableFrom: Date,
    curtains: String,
    yearConstructed: Date,
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    platform: String,
    link: String,
  },
  { _id: false }
);

const floorPlanSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    category: String,
    currency: String,
    salePrice: Number,
    offerPrice: Number,
    description: String,
    photos: [String],
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    address: String,
    country: String,
    state: String,
    city: String,
    landmark: String,
    zipcode: String,
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    basicInfo: basicInfoSchema,
    details: detailsSchema,
    amenities: [String],
    documents: [String], // store file URLs
    gallery: [String], // image URLs
    video: videoSchema,
    description: String,
    floorPlans: [floorPlanSchema],
    location: locationSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProperty", propertySchema);