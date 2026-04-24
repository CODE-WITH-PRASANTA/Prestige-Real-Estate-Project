const Enquiry = require("../models/enquiry.models");

/* CREATE */
const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const saved = await enquiry.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* GET ALL */
const getEnquiries = async (req, res) => {
  try {
    const data = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* GET ONE */
const getEnquiryById = async (req, res) => {
  try {
    const data = await Enquiry.findById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* UPDATE */
const updateEnquiry = async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* DELETE */
const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};