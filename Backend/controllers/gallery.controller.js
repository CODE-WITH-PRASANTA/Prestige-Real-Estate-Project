const Gallery = require("../models/gallery.models");
const { deleteImageFile } = require("../middlewares/upload");

/* ================= CREATE ================= */
exports.createGallery = async (req, res) => {
  try {
    const { topCity, cityName, properties } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const gallery = await Gallery.create({
      topCity,
      cityName,
      properties,
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      data: gallery,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL (WITH PAGINATION) ================= */
exports.getGallery = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 50;

    const total = await Gallery.countDocuments();

    const data = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      data,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleGallery = async (req, res) => {
  try {
    const data = await Gallery.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateGallery = async (req, res) => {
  try {
    const { topCity, cityName, properties } = req.body;

    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    // If new image uploaded → delete old
    if (req.file) {
      deleteImageFile(gallery.image);
      gallery.image = req.file.path;
    }

    gallery.topCity = topCity || gallery.topCity;
    gallery.cityName = cityName || gallery.cityName;
    gallery.properties = properties || gallery.properties;

    const updated = await gallery.save();

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    deleteImageFile(gallery.image);
    await gallery.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};