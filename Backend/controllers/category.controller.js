const Category = require(
  "../models/category.model"
);

/* =========================================
   CREATE CATEGORY
========================================= */

exports.createCategory =
  async (req, res) => {
    try {
      const { name } = req.body;

      /* VALIDATION */

      if (!name) {
        return res.status(400).json({
          success: false,
          message:
            "Category name is required",
        });
      }

      /* CHECK EXIST */

      const alreadyExist =
        await Category.findOne({
          name: name.trim(),
        });

      if (alreadyExist) {
        return res.status(400).json({
          success: false,
          message:
            "Category already exists",
        });
      }

      /* CREATE */

      const category =
        await Category.create({
          name,
        });

      res.status(201).json({
        success: true,
        message:
          "Category created successfully",
        data: category,
      });
    } catch (error) {
      console.log(
        "CREATE CATEGORY ERROR :",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to create category",
      });
    }
  };

/* =========================================
   GET ALL CATEGORY
========================================= */

exports.getAllCategories =
  async (req, res) => {
    try {
      const categories =
        await Category.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.log(
        "GET CATEGORY ERROR :",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch categories",
      });
    }
  };

/* =========================================
   GET SINGLE CATEGORY
========================================= */

exports.getSingleCategory =
  async (req, res) => {
    try {
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          success: false,
          message:
            "Category not found",
        });
      }

      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.log(
        "GET SINGLE CATEGORY ERROR :",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch category",
      });
    }
  };

/* =========================================
   UPDATE CATEGORY
========================================= */

exports.updateCategory =
  async (req, res) => {
    try {
      const { name } = req.body;

      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          success: false,
          message:
            "Category not found",
        });
      }

      /* DUPLICATE CHECK */

      const duplicate =
        await Category.findOne({
          name: name.trim(),
          _id: {
            $ne: req.params.id,
          },
        });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message:
            "Category already exists",
        });
      }

      /* UPDATE */

      category.name = name;

      await category.save();

      res.status(200).json({
        success: true,
        message:
          "Category updated successfully",
        data: category,
      });
    } catch (error) {
      console.log(
        "UPDATE CATEGORY ERROR :",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to update category",
      });
    }
  };

/* =========================================
   DELETE CATEGORY
========================================= */

exports.deleteCategory =
  async (req, res) => {
    try {
      const category =
        await Category.findById(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          success: false,
          message:
            "Category not found",
        });
      }

      await category.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Category deleted successfully",
      });
    } catch (error) {
      console.log(
        "DELETE CATEGORY ERROR :",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to delete category",
      });
    }
  };