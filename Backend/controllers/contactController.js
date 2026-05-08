const Contact = require("../models/Contact");
const ContactHistory = require("../models/ContactHistory");
const ContactLog = require("../models/ContactLog");

// ✅ GET latest contact
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });

    res.status(200).json(contact || {});
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Failed to fetch contact" });
  }
};

// ✅ CREATE OR UPDATE (IMPORTANT FIX)
exports.saveContact = async (req, res) => {
  try {
    const {
      email1,
      email2,
      phone1,
      phone2,
      address,
      city,
      country,
    } = req.body;

    // 🔥 BASIC VALIDATION
    if (!email1 || !phone1) {
      return res.status(400).json({
        message: "Primary email and phone are required",
      });
    }

    // 🔥 REMOVE _id if coming from frontend
    const cleanData = {
      email1,
      email2,
      phone1,
      phone2,
      address,
      city,
      country,
    };

    // ✅ SAVE MAIN DATA
    const contact = await Contact.create(cleanData);

    // ✅ SAVE HISTORY
    await ContactHistory.create({ data: cleanData });

    // ✅ SAVE LOG
    await ContactLog.create({
      action: "CONTACT_UPDATED",
      message: "Contact updated successfully",
    });

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (err) {
    console.error("SAVE ERROR:", err); // 👈 VERY IMPORTANT

    res.status(500).json({
      message: "Failed to save contact",
      error: err.message, // 👈 will show real error
    });
  }
};