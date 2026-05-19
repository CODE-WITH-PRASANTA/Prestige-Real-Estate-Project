const express = require("express");

const router = express.Router();

const {
  createCustomerActivity,
  getAllCustomerActivities,
  getSingleCustomerActivity,
  updateCustomerActivity,
  deleteCustomerActivity,
} = require(
  "../controllers/customeractivity.controller"
);

/* =========================================
   CREATE
========================================= */

router.post(
  "/create",
  createCustomerActivity
);

/* =========================================
   GET ALL
========================================= */

router.get(
  "/",
  getAllCustomerActivities
);

/* =========================================
   GET SINGLE
========================================= */

router.get(
  "/:id",
  getSingleCustomerActivity
);

/* =========================================
   UPDATE
========================================= */

router.put(
  "/update/:id",
  updateCustomerActivity
);

/* =========================================
   DELETE
========================================= */

router.delete(
  "/delete/:id",
  deleteCustomerActivity
);

module.exports = router;