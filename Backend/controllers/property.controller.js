const Property = require("../models/Property.model");


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

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property Deleted 🗑️",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {
  addProperty,
  getAllProperties,
  getSingleProperty,
  deleteProperty,
};