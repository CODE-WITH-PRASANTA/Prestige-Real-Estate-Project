const Rent = require("../models/rent.model");

// CREATE
exports.createRent = async (req, res) => {
  try {
    let amenities = [];

    // ✅ safe JSON parse
    try {
      amenities = JSON.parse(req.body.amenities || "[]");
    } catch {
      amenities = [];
    }

    const rentData = new Rent({
      ...req.body,
      amenities,
      images: req.body.images || [],
    });

    const saved = await rentData.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllRent = async (req, res) => {
  try {
    const data = await Rent.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE
exports.getRentById = async (req, res) => {
  try {
    const data = await Rent.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Rent not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteRent = async (req, res) => {
  try {
    const deleted = await Rent.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Rent not found" });
    }

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};