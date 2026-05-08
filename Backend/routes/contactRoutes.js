const express = require("express");
const router = express.Router();

const {
  getContact,
  saveContact,
} = require("../controllers/contactController");

// ✅ CORRECT (NO EXTRA /contact)
router.get("/", getContact);
router.post("/", saveContact);

module.exports = router;