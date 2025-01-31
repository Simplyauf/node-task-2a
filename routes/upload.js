const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Upload } = require("../models");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

// Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Save to database
    await Upload.create({
      filename: req.file.filename,
      path: imageUrl,
    });

    res.json({
      success: true,
      path: imageUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Get latest image
router.get("/latest-image", async (req, res) => {
  try {
    const latestImage = await Upload.findOne({
      order: [["created_at", "DESC"]],
    });

    if (!latestImage) {
      return res.json({ path: null });
    }

    res.json({ path: latestImage.path });
  } catch (error) {
    console.error("Error fetching latest image:", error);
    res.status(500).json({ error: "Failed to fetch latest image" });
  }
});

module.exports = router;
