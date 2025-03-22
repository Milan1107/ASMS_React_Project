// const express = require("express");
// const multer = require("multer");
// const Image = require("../Models/inventory_img");

// const router = express.Router();

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save images in "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   }
// });

// // Multer file filter
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// // Upload endpoint
// router.post("/upload-image", upload.single("image"), async (req, res) => {
//   const { productName, price, weight } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded!" });
//   }

//   const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;

//   try {
//     const newImage = new Image({ productName, imageUrl, price, weight });
//     const savedImage = await newImage.save();
//     res.status(201).json(savedImage);
//   } catch (error) {
//     console.error("Error saving image to database:", error);
//     res.status(500).json({ error: "Failed to save image details in MongoDB!" });
//   }
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Image = require("../Models/inventory_img");

const router = express.Router();

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s+/g, "_")}`);
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

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Upload endpoint
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const { productName, price, weight } = req.body;

    if (!productName || !price || !weight) {
      return res.status(400).json({ error: "All fields (productName, price, weight) are required!" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newImage = new Image({ productName, imageUrl, price, weight });
    const savedImage = await newImage.save();

    res.status(201).json({ 
      message: "Image uploaded successfully!", 
      imageUrl, 
      image: savedImage 
    });

  } catch (error) {
    console.error("Error saving image to database:", error);
    res.status(500).json({ error: "Failed to save image details in MongoDB!" });
  }
});

// Serve uploaded images statically
router.use("/uploads", express.static(uploadDir));

// Fetch image URL by product name
router.get("/get-image/:productName", async (req, res) => {
  try {
    const { productName } = req.params;
    const image = await Image.findOne({ productName });

    if (!image) {
      return res.status(404).json({ error: "Image not found for this product!" });
    }

    res.json({ imageUrl: image.imageUrl });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to retrieve image!" });
  }
});

module.exports = router;
