const Blog = require("../models/blog.model");
const { deleteImageFile } = require("../middlewares/upload");

/* CREATE */
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      image: req.body.image || "",
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL */
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
exports.updateBlog = async (req, res) => {
  try {
    const old = await Blog.findById(req.params.id);

    if (req.body.image && old.image) {
      deleteImageFile(old.image);
    }

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.image) deleteImageFile(blog.image);

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};