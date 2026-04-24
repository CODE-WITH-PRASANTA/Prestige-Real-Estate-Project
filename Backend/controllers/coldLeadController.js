const ColdLead = require("../models/ColdLead");

// @desc    Create new cold lead
// @route   POST /api/cold-leads
// @access  Public
const createColdLead = async (req, res) => {
  try {
    const { name, phone, email, property, budget, city, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const coldLead = await ColdLead.create({
      name,
      phone,
      email,
      property,
      budget,
      city,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Cold lead created successfully",
      data: coldLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create cold lead",
      error: error.message,
    });
  }
};

// @desc    Get all cold leads
// @route   GET /api/cold-leads
// @access  Public
const getAllColdLeads = async (req, res) => {
  try {
    const coldLeads = await ColdLead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: coldLeads.length,
      data: coldLeads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cold leads",
      error: error.message,
    });
  }
};

// @desc    Get single cold lead
// @route   GET /api/cold-leads/:id
// @access  Public
const getSingleColdLead = async (req, res) => {
  try {
    const coldLead = await ColdLead.findById(req.params.id);

    if (!coldLead) {
      return res.status(404).json({
        success: false,
        message: "Cold lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: coldLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cold lead",
      error: error.message,
    });
  }
};

// @desc    Update cold lead
// @route   PUT /api/cold-leads/:id
// @access  Public
const updateColdLead = async (req, res) => {
  try {
    const updatedLead = await ColdLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Cold lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cold lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cold lead",
      error: error.message,
    });
  }
};

// @desc    Delete cold lead
// @route   DELETE /api/cold-leads/:id
// @access  Public
const deleteColdLead = async (req, res) => {
  try {
    const deletedLead = await ColdLead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Cold lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cold lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cold lead",
      error: error.message,
    });
  }
};

module.exports = {
  createColdLead,
  getAllColdLeads,
  getSingleColdLead,
  updateColdLead,
  deleteColdLead,
};