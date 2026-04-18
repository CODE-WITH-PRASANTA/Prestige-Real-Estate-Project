const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const { upload, convertToWebp } = require("../middlewares/upload");

/* CREATE */
router.post(
  "/",
  upload.single("image"),
  convertToWebp,
  createBlog
);

/* GET */
router.get("/", getBlogs);

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