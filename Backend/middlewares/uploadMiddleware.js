const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* ================= MULTER MEMORY STORAGE ================= */
const storage = multer.memoryStorage();

/* ================= FILE FILTER ================= */
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, and webp image files are allowed"));
  }
};

/* ================= MULTER INSTANCE ================= */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* ================= WEBP CONVERSION MIDDLEWARE ================= */
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const filePath = path.join(uploadPath, fileName);

    await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(filePath);

    req.file.filename = fileName;
    req.file.path = filePath;
    req.file.mimetype = "image/webp";

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  convertToWebp,
};