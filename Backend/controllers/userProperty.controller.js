const { deleteImageFile } = require("../middlewares/upload");
const Property = require("../models/userProperty.model");

/* ================= SAFE PARSER ================= */
const parseData = (field, defaultVal) => {
  if (!field) return defaultVal;

  if (typeof field === "object") return field;

  try {
    return JSON.parse(field);
  } catch (err) {
    console.log("Parse error:", field);
    return defaultVal;
  }
};

/* ================= BOOLEAN FIX ================= */
const normalizeBooleans = (details) => {
  if (!details) return details;

  const boolFields = ["tv", "waterPurifier", "microwave", "ac", "fridge"];

  boolFields.forEach((key) => {
    if (details[key] !== undefined) {
      details[key] =
        details[key] === true ||
        details[key] === "true" ||
        details[key] === 1 ||
        details[key] === "1";
    }
  });

  return details;
};

/* ================= CREATE ================= */
exports.createProperty = async (req, res) => {
  try {
    const data = req.body;

    /* ================= SAFE PARSE ================= */
    const basicInfo = parseData(data.basicInfo, {});
    let details = parseData(data.details, {});
    const amenities = parseData(data.amenities, []);
    const video = parseData(data.video, {});
    const location = parseData(data.location, {});
    const floorPlans = parseData(data.floorPlans, []);

    details = normalizeBooleans(details);

    /* ================= FILES ================= */
    const gallery = data.gallery || [];
    const documents = data.documents || [];
    const thumbnail = data.thumbnail ? data.thumbnail[0] : "";

    /* 🔥 FIX: GET FILES FROM req.files */
    const floorPlanPhotos = req.files?.floorPlansPhotos || [];

    /* 🔥 FIX: PROPER IMAGE MAPPING */
    let photoIndex = 0;

    const updatedFloorPlans = Array.isArray(floorPlans)
      ? floorPlans.map((plan) => {
          const photos = [];

          if (floorPlanPhotos[photoIndex]) {
            photos.push(floorPlanPhotos[photoIndex].path);
            photoIndex++;
          }

          return {
            name: plan.name || "",
            type: plan.type || "",
            category: plan.category || "",
            currency: plan.currency || "",
            salePrice: Number(plan.salePrice) || 0,
            offerPrice: Number(plan.offerPrice) || 0,
            description: plan.description || "",
            photos,
          };
        })
      : [];

    /* ================= CREATE ================= */
    const property = new Property({
      basicInfo: {
        name: basicInfo.name || "",
        type: basicInfo.type || "",
        category: basicInfo.category || "",
        currency: basicInfo.currency || "",
        salePrice: Number(basicInfo.salePrice) || 0,
        offerPrice: Number(basicInfo.offerPrice) || 0,
      },
      details,
      amenities,
      documents,
      gallery,
      video,
      description: data.description || "",
      floorPlans: updatedFloorPlans,
      location,
      thumbnail,
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL ================= */
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ONE ================= */
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const data = req.body;

    /* ================= SAFE PARSE ================= */
    const basicInfo = parseData(data.basicInfo, null);
    let details = parseData(data.details, null);
    const amenities = parseData(data.amenities, null);
    const video = parseData(data.video, null);
    const location = parseData(data.location, null);
    const floorPlans = parseData(data.floorPlans, null);

    details = normalizeBooleans(details);

    /* ================= FILES ================= */
    const gallery = data.gallery || [];
    const documents = data.documents || [];
    const thumbnail = data.thumbnail ? data.thumbnail[0] : null;
    const floorPlanPhotos = data.floorPlansPhotos || [];

    /* ================= FLOOR PLAN ================= */
    let updatedFloorPlans = property.floorPlans;

    if (floorPlans) {
      updatedFloorPlans = floorPlans.map((plan, index) => ({
        ...plan,
        photos: floorPlanPhotos[index]
          ? [floorPlanPhotos[index]]
          : plan.photos || [],
      }));
    }

    /* ================= DELETE OLD FILES ================= */
    if (gallery.length > 0) {
      property.gallery.forEach(deleteImageFile);
      property.gallery = gallery;
    }

    if (documents.length > 0) {
      property.documents.forEach(deleteImageFile);
      property.documents = documents;
    }

    if (thumbnail) {
      if (property.thumbnail) deleteImageFile(property.thumbnail);
      property.thumbnail = thumbnail;
    }

    /* ================= MERGE UPDATE ================= */
    if (basicInfo) {
      property.basicInfo = { ...property.basicInfo, ...basicInfo };
    }

    if (details) {
      property.details = { ...property.details, ...details };
    }

    if (amenities) property.amenities = amenities;

    if (video) {
      property.video = { ...property.video, ...video };
    }

    if (location) {
      property.location = { ...property.location, ...location };
    }

    if (data.description) property.description = data.description;

    property.floorPlans = updatedFloorPlans;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.gallery.forEach(deleteImageFile);
    property.documents.forEach(deleteImageFile);

    if (property.thumbnail) deleteImageFile(property.thumbnail);

    property.floorPlans.forEach((plan) => {
      plan.photos.forEach(deleteImageFile);
    });

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};