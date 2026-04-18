const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

/* ================= ROUTES ================= */

// CREATE (with image)
router.post(
  "/",
  upload.single("image"),
  convertToWebp,
  createTestimonial
);

// GET ALL
router.get("/", getTestimonials);

// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  convertToWebp,
  updateTestimonial
);

// DELETE
router.delete("/:id", deleteTestimonial);

module.exports = router;