const express = require("express");

const {
createPlan,
getPlans,
getSinglePlan,
updatePlan,
deletePlan
} = require("../controllers/pricingController");

const router = express.Router();


// CREATE PLAN
router.post("/pricing-post",createPlan);


// GET ALL PLANS
router.get("/pricing-get",getPlans);


// GET SINGLE PLAN
router.get("/pricing-get/:id",getSinglePlan);


// UPDATE PLAN
router.put("/pricing-update/:id",updatePlan);


// DELETE PLAN
router.delete("/pricing-delete/:id",deletePlan);


module.exports = router;