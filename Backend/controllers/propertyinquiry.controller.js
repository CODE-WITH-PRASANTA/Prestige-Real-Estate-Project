const PropertyInquiry = require("../models/propertyinquiry.model");

/* ================= CREATE ================= */
const createInquiry = async (req, res) => {
  try {
    const inquiry = await PropertyInquiry.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await PropertyInquiry.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET SINGLE ================= */
const getSingleInquiry = async (req, res) => {
  try {
    const inquiry = await PropertyInquiry.findById(
      req.params.id
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
const updateInquiry = async (req, res) => {
  try {
    const inquiry = await PropertyInquiry.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await PropertyInquiry.findByIdAndDelete(
      req.params.id
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= CONNECT / DISCONNECT ================= */
const toggleConnection = async (req, res) => {
  try {
    const inquiry = await PropertyInquiry.findById(
      req.params.id
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    inquiry.connected = !inquiry.connected;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: inquiry.connected
        ? "Inquiry connected"
        : "Inquiry disconnected",
      data: inquiry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getSingleInquiry,
  updateInquiry,
  deleteInquiry,
  toggleConnection,
};