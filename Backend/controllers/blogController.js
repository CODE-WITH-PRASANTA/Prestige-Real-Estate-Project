const fs = require("fs");
const path = require("path");
const Blog = require("../models/Blog");

const buildImageUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: blogs.length,
    blogs,
  });
};

const getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.status(200).json({
    success: true,
    blog,
  });
};

const createBlog = async (req, res) => {
  const { title, category, owner, ownerdesignation, date, content, reviews } = req.body;

  let tags = [];
  if (req.body.tags) {
    try {
      tags = JSON.parse(req.body.tags);
      if (!Array.isArray(tags)) tags = [];
    } catch (error) {
      tags = [];
    }
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Blog image is required");
  }

  const blog = await Blog.create({
    title,
    category,
    owner,
    ownerdesignation,
    date,
    content,
    reviews,
    tags,
    image: buildImageUrl(req, req.file.filename),
  });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    blog,
  });
};

const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  let tags = blog.tags;
  if (req.body.tags) {
    try {
      tags = JSON.parse(req.body.tags);
      if (!Array.isArray(tags)) tags = blog.tags;
    } catch (error) {
      tags = blog.tags;
    }
  }

  let updatedImage = blog.image;

  if (req.file) {
    const oldImageName = blog.image.split("/uploads/")[1];
    if (oldImageName) {
      const oldImagePath = path.join(__dirname, "../uploads", oldImageName);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    updatedImage = buildImageUrl(req, req.file.filename);
  }

  blog.title = req.body.title || blog.title;
  blog.category = req.body.category || blog.category;
  blog.owner = req.body.owner || blog.owner;
  blog.ownerdesignation = req.body.ownerdesignation || blog.ownerdesignation;
  blog.date = req.body.date || blog.date;
  blog.content = req.body.content || blog.content;
  blog.reviews = req.body.reviews || blog.reviews;
  blog.tags = tags;
  blog.image = updatedImage;

  const updatedBlog = await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog: updatedBlog,
  });
};

const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const imageName = blog.image.split("/uploads/")[1];
  if (imageName) {
    const imagePath = path.join(__dirname, "../uploads", imageName);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
};

module.exports = {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};