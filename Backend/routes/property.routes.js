const express = require("express");
const router = express.Router();

// ✅ CONTROLLER
const {
  addProperty,
  getAllProperties,
  getSingleProperty,
  deleteProperty,
} = require("../controllers/property.controller");

// ✅ YOUR MULTER
const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");


// ================= ROUTES =================

// ➕ ADD PROPERTY
router.post(
  "/add",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "ownerImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  convertToWebp,
  addProperty
);

// 📥 GET ALL
router.get("/", getAllProperties);

// 📥 GET SINGLE
router.get("/:id", getSingleProperty);

// ❌ DELETE
router.delete("/:id", deleteProperty);


module.exports = router;