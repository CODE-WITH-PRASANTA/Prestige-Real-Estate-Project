// ============================================
// BACKEND
// blog.routes.js
// ============================================

const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const {
  upload,
  convertToWebp,
} = require("../middlewares/upload");

/* CREATE */
router.post(
  "/",
  upload.single("image"),
  convertToWebp,
  createBlog
);

/* GET ALL */
router.get("/", getBlogs);

/* GET SINGLE BLOG */
router.get("/:id", getSingleBlog);

/* UPDATE */
router.put(
  "/:id",
  upload.single("image"),
  convertToWebp,
  updateBlog
);

/* DELETE */
router.delete("/:id", deleteBlog);

module.exports = router;