const CustomerActivity = require(
  "../models/customeractivity.model"
);

/* =========================================
   CREATE
========================================= */

exports.createCustomerActivity =
  async (req, res) => {
    try {
      const activity =
        await CustomerActivity.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Customer activity created successfully",
        data: activity,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create customer activity",
      });
    }
  };

/* =========================================
   GET ALL
========================================= */

exports.getAllCustomerActivities =
  async (req, res) => {
    try {
      const activities =
        await CustomerActivity.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: activities.length,
        data: activities,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch customer activities",
      });
    }
  };

/* =========================================
   GET SINGLE
========================================= */

exports.getSingleCustomerActivity =
  async (req, res) => {
    try {
      const activity =
        await CustomerActivity.findById(
          req.params.id
        );

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Customer activity not found",
        });
      }

      res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch customer activity",
      });
    }
  };

/* =========================================
   UPDATE
========================================= */

exports.updateCustomerActivity =
  async (req, res) => {
    try {
      const activity =
        await CustomerActivity.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Customer activity not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Customer activity updated successfully",
        data: activity,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to update customer activity",
      });
    }
  };

/* =========================================
   DELETE
========================================= */

exports.deleteCustomerActivity =
  async (req, res) => {
    try {
      const activity =
        await CustomerActivity.findByIdAndDelete(
          req.params.id
        );

      if (!activity) {
        return res.status(404).json({
          success: false,
          message:
            "Customer activity not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Customer activity deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete customer activity",
      });
    }
  };