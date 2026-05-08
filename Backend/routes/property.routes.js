const express = require("express");
const router = express.Router();

// ✅ CONTROLLER
const {
  addProperty,
  getAllProperties,
  getSingleProperty,
  deleteProperty,
  updateProperty,
  togglePropertyStatus
} = require("../controllers/property.controller");

// ✅ YOUR MULTER
const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

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

router.patch(
  "/toggle-status/:id",
  togglePropertyStatus
);

// 📥 GET ALL
router.get("/", getAllProperties);

// 📥 GET SINGLE
router.get("/:id", getSingleProperty);

// ❌ DELETE
router.delete("/:id", deleteProperty);

router.put(
  "/:id",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "ownerImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  convertToWebp,
  updateProperty
);


module.exports = router;