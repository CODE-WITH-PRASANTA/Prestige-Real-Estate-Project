const express = require("express");
const router = express.Router();

const {
  createGallery,
  getGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/gallery.controller");

const { upload, convertToWebp } = require("../middlewares/upload");

/* CREATE */
router.post(
  "/",
  upload.single("image"),
  convertToWebp,
  createGallery
);

/* GET ALL */
router.get("/", getGallery);

/* GET SINGLE */
router.get("/:id", getSingleGallery);

/* UPDATE */
router.put(
  "/:id",
  upload.single("image"),
  convertToWebp,
  updateGallery
);

/* DELETE */
router.delete("/:id", deleteGallery);

module.exports = router;