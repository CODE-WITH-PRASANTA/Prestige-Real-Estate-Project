const express = require("express");
const router = express.Router();

const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");

/* ROUTES */
router.post("/", createEnquiry);
router.get("/", getEnquiries);
router.get("/:id", getEnquiryById);
router.put("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);

module.exports = router;