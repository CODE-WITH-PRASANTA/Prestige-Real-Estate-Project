const Faq = require("../models/Faq");

/* CREATE */
const createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL */
const getFaqs = async (req, res) => {
  try {
    const data = await Faq.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* UPDATE */
const updateFaq = async (req, res) => {
  try {
    const updated = await Faq.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "FAQ updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* DELETE */
const deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "FAQ deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
};