const Testimonial = require("../models/testimonial.model");
const { deleteImageFile } = require("../middlewares/upload");

/* ================= CREATE ================= */
exports.createTestimonial = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file?.path || "",
    };

    const testimonial = await Testimonial.create(data);

    res.status(201).json({
      success: true,
      message: "Testimonial created",
      data: testimonial,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const old = await Testimonial.findById(id);
    if (!old) return res.status(404).json({ message: "Not found" });

    const updateData = { ...req.body };

    if (req.file?.path) {
      if (old.image) deleteImageFile(old.image);
      updateData.image = req.file.path;
    }

    const updated = await Testimonial.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Testimonial.findById(id);
    if (!data) return res.status(404).json({ message: "Not found" });

    if (data.image) deleteImageFile(data.image);

    await Testimonial.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};