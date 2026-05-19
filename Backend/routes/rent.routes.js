const express =
require("express");

const router =
express.Router();

// MIDDLEWARE

const {
  upload,
  convertToWebp,
} = require(
  "../middlewares/upload"
);

// CONTROLLER

const {

  createRent,

  getAllRent,

  getRentById,

  updateRent,

  deleteRent,

} = require(
  "../controllers/rent.controller"
);

// ================= CREATE =================

router.post(

  "/",

  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),

  convertToWebp,

  createRent
);

// ================= GET ALL =================

router.get(
  "/",
  getAllRent
);

// ================= GET SINGLE =================

router.get(
  "/:id",
  getRentById
);

// ================= UPDATE =================

router.put(

  "/:id",

  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),

  convertToWebp,

  updateRent
);

// ================= DELETE =================

router.delete(
  "/:id",
  deleteRent
);

module.exports =
router;