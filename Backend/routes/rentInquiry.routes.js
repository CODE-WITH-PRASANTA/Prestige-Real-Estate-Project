const express = require("express");

const router =
  express.Router();

const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require(
  "../controllers/rentInquiry.controller"
);

// CREATE

router.post(
  "/",
  createInquiry
);

// GET ALL

router.get(
  "/",
  getAllInquiries
);

// GET SINGLE

router.get(
  "/:id",
  getInquiryById
);

// UPDATE STATUS

router.put(
  "/:id",
  updateInquiryStatus
);

// DELETE

router.delete(
  "/:id",
  deleteInquiry
);

module.exports = router;