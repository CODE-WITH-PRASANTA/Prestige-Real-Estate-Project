const express = require("express");
const router = express.Router();

// ✅ middleware
const { upload, convertToWebp } = require("../middlewares/upload");

// ✅ controller (MATCH FILE NAME EXACTLY)
const {
  createRent,
  getAllRent,
  getRentById,
  deleteRent,
} = require("../controllers/rent.controller");

// CREATE
router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 10 }]),
  convertToWebp,
  createRent
);

// GET ALL
router.get("/", getAllRent);

// GET SINGLE
router.get("/:id", getRentById);

// DELETE
router.delete("/:id", deleteRent);

module.exports = router;