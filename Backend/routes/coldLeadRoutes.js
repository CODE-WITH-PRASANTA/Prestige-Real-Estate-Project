const express = require("express");
const router = express.Router();

const {
  createColdLead,
  getAllColdLeads,
  getSingleColdLead,
  updateColdLead,
  deleteColdLead,
} = require("../controllers/coldLeadController");

router.route("/").post(createColdLead).get(getAllColdLeads);
router.route("/:id").get(getSingleColdLead).put(updateColdLead).delete(deleteColdLead);

module.exports = router;