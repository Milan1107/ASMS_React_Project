// const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({
//   productName: { type: String, required: true, unique: true }, // Unique product name for the image
//   imageUrl: { type: String, required: true },
// });

// const Image = mongoose.model("Image", imageSchema);
// module.exports = Image;


const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  productName: { type: String, required: true }, // Reference product name
  imageUrl: { type: String, required: true },
  price: { type: String, required: true }, // Different price for same product
  weight: { type: String, required: true }, // Different weight for same product
});

const Image = mongoose.model("images", imageSchema);
module.exports = Image;
