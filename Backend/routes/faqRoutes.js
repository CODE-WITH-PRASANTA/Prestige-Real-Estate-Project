const express = require("express");
const router = express.Router();

const {
  createFaq,
  getFaqs,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");

/* ROUTES */

router.get("/", getFaqs);
router.post("/", createFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

module.exports = router;