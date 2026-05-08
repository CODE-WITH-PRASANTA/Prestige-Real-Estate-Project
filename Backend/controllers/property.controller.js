
const Property = require("../models/Property.model");
const { deleteImageFile } = require("../middlewares/upload");
const fs = require("fs");
const path = require("path");

// ================= ADD PROPERTY =================
const addProperty = async (req, res) => {
  try {
    const body = req.body;

    const property = new Property({
      title: body.title,
      description: body.description,
      location: body.location,
      price: body.price,
      downPayment: body.downPayment,
      loanTerms: body.loanTerms,
      interestRate: body.interestRate,
      sqft: body.sqft,
      category: body.category,
      rating: body.rating,
      lastUpdate: body.lastUpdate,

      // ✅ FILE PATHS FROM YOUR MULTER
      banner: body.banner?.[0] || "",
      ownerImage: body.ownerImage?.[0] || "",
      images: body.images || [],

      features: JSON.parse(body.features || "{}"),
      amenities: JSON.parse(body.amenities || "[]"),

      fullDescription: body.fullDescription,
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property Added Successfully ✅",
      data: property,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET ALL =================
const getAllProperties = async (req, res) => {
  try {
    const data = await Property.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const togglePropertyStatus = async (req, res) => {

  try {

    const property = await Property.findById(
      req.params.id
    );

    if (!property) {

      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status =
      property.status === "published"
        ? "draft"
        : "published";

    await property.save();

    res.json({
      success: true,
      message: "Status Updated",
      data: property,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET SINGLE =================
const getSingleProperty = async (req, res) => {
  try {
    const data = await Property.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Property not found ❌",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ================= DELETE =================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found ❌",
      });
    }

    // 🔥 DELETE BANNER
    if (property.banner) {
      deleteImageFile(property.banner);
    }

    // 🔥 DELETE OWNER IMAGE
    if (property.ownerImage) {
      deleteImageFile(property.ownerImage);
    }

    // 🔥 DELETE MULTIPLE IMAGES
    if (property.images && property.images.length > 0) {
      property.images.forEach((img) => {
        deleteImageFile(img);
      });
    }

    // 🔥 DELETE FROM DB
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property & Images Deleted Successfully 🗑️",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found ❌",
      });
    }

    const body = req.body;

    // ================= IMAGE HANDLING =================

    // ✅ Banner
    if (body.banner && body.banner.length > 0) {
      if (property.banner) deleteImageFile(property.banner);
      property.banner = body.banner[0];
    }

    // ✅ Owner Image
    if (body.ownerImage && body.ownerImage.length > 0) {
      if (property.ownerImage) deleteImageFile(property.ownerImage);
      property.ownerImage = body.ownerImage[0];
    }

    // ✅ Multiple Images
    if (body.images && body.images.length > 0) {
      if (property.images && property.images.length > 0) {
        property.images.forEach((img) => deleteImageFile(img));
      }
      property.images = body.images;
    }

    // ================= TEXT UPDATE =================

    property.title = body.title || property.title;
    property.description = body.description || property.description;
    property.location = body.location || property.location;
    property.price = body.price || property.price;
    property.downPayment = body.downPayment || property.downPayment;
    property.loanTerms = body.loanTerms || property.loanTerms;
    property.interestRate = body.interestRate || property.interestRate;
    property.sqft = body.sqft || property.sqft;
    property.category = body.category || property.category;
    property.rating = body.rating || property.rating;
    property.lastUpdate = body.lastUpdate || property.lastUpdate;
    property.fullDescription =
      body.fullDescription || property.fullDescription;

    // ================= JSON SAFE PARSE =================

    if (body.features) {
      property.features = JSON.parse(body.features);
    }

    if (body.amenities) {
      property.amenities = JSON.parse(body.amenities);
    }

    // ================= SAVE =================
    await property.save();

    res.json({
      success: true,
      message: "Property Updated Successfully ✅",
      data: property,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getSingleProperty,
  deleteProperty,
  updateProperty,
  togglePropertyStatus,
};