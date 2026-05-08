const express = require("express");

const router = express.Router();

const {
  createInquiry,
  getAllInquiries,
  getSingleInquiry,
  updateInquiry,
  deleteInquiry,
  toggleConnection,
} = require("../controllers/propertyinquiry.controller");

/* ================= CREATE ================= */
router.post("/", createInquiry);

/* ================= GET ALL ================= */
router.get("/", getAllInquiries);

/* ================= GET SINGLE ================= */
router.get("/:id", getSingleInquiry);

/* ================= UPDATE ================= */
router.put("/:id", updateInquiry);

/* ================= DELETE ================= */
router.delete("/:id", deleteInquiry);

/* ================= CONNECT / DISCONNECT ================= */
router.patch("/:id/toggle", toggleConnection);

module.exports = router;