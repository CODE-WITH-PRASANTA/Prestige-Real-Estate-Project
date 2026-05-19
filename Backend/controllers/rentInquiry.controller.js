const RentInquiry =
  require("../models/rentInquiry.model");

// ================= CREATE =================

exports.createInquiry =
  async (req, res) => {

    try {

      const inquiry =
        new RentInquiry(req.body);

      const saved =
        await inquiry.save();

      res.status(201).json({
        success: true,
        data: saved,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  };

// ================= GET ALL =================

exports.getAllInquiries =
  async (req, res) => {

    try {

      const data =
        await RentInquiry.find()
          .sort({
            createdAt: -1,
          });

      res.json(data);

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  };

// ================= GET SINGLE =================

exports.getInquiryById =
  async (req, res) => {

    try {

      const data =
        await RentInquiry.findById(
          req.params.id
        );

      if (!data) {

        return res.status(404).json({
          message:
            "Inquiry not found",
        });

      }

      res.json(data);

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  };

// ================= UPDATE STATUS =================

exports.updateInquiryStatus =
  async (req, res) => {

    try {

      const updated =
        await RentInquiry.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      res.json(updated);

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  };

// ================= DELETE =================

exports.deleteInquiry =
  async (req, res) => {

    try {

      const deleted =
        await RentInquiry.findByIdAndDelete(
          req.params.id
        );

      if (!deleted) {

        return res.status(404).json({
          message:
            "Inquiry not found",
        });

      }

      res.json({
        success: true,
        message:
          "Inquiry deleted",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  };