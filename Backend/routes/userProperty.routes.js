const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/userProperty.controller");

/* ✅ IMPORTANT: CORRECT PATH */
const { upload, convertToWebp } = require("../middlewares/upload");

/* ================= MULTER ================= */
const propertyUpload = upload.fields([
  { name: "gallery", maxCount: 10 },
  { name: "documents", maxCount: 5 },
  { name: "floorPlansPhotos", maxCount: 20 },
  { name: "thumbnail", maxCount: 1 },
]);

/* ================= DEBUG LOG ================= */
console.log("✅ userPropertyRoutes loaded");

/* ================= ROUTES ================= */
router.post(
  "/",
  (req, res, next) => {
    console.log("🔥 POST /api/user-properties hit");
    next();
  },
  propertyUpload,
  convertToWebp,
  createProperty
);

router.get("/", getProperties);
router.get("/:id", getProperty);

router.put("/:id", propertyUpload, convertToWebp, updateProperty);

router.delete("/:id", deleteProperty);

module.exports = router;