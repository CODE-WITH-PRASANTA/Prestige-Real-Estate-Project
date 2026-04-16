const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { upload, convertToWebp } = require("../middlewares/uploadMiddleware");

router
  .route("/")
  .get(getBlogs)
  .post(upload.single("image"), convertToWebp, createBlog);

router
  .route("/:id")
  .get(getSingleBlog)
  .put(upload.single("image"), convertToWebp, updateBlog)
  .delete(deleteBlog);

module.exports = router;