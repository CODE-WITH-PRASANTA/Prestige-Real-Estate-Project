const express = require("express");

const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require(
  "../controllers/category.controller"
);

/* =========================================
   CREATE CATEGORY
========================================= */

router.post(
  "/create",
  createCategory
);

/* =========================================
   GET ALL CATEGORY
========================================= */

router.get(
  "/",
  getAllCategories
);

/* =========================================
   GET SINGLE CATEGORY
========================================= */

router.get(
  "/:id",
  getSingleCategory
);

/* =========================================
   UPDATE CATEGORY
========================================= */

router.put(
  "/update/:id",
  updateCategory
);

/* =========================================
   DELETE CATEGORY
========================================= */

router.delete(
  "/delete/:id",
  deleteCategory
);

module.exports = router;