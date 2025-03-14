// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const router = express.Router();

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Images will be saved in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   }
// });

// // File filter to allow only image uploads
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// // ✅ Upload Endpoint
// router.post("/upload-image", upload.single("image"), async (req, res) => {
//     const { productName } = req.body;
  
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded!" });
//     }
  
//     const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
//     try {
//       const newImage = new Image({ productName, imageUrl });
//       await newImage.save();
//       res.status(201).json(newImage);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to upload image!" });
//     }
//   });
  
// module.exports = router;


const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../Models/inventory_img");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Upload endpoint
router.post("/upload-image", upload.single("image"), async (req, res) => {
  const { productName } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
  try {
    const newImage = new Image({ productName, imageUrl });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error("Error saving image to database:", error);
    res.status(500).json({ error: "Failed to save image details in MongoDB!" });
  }
});

module.exports = router;
