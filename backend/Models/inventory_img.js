// const imageSchema = new mongoose.Schema({
//     productName: { type: String, required: true, unique: true },
//     imageUrl: { type: String, required: true },
//   });
  
//   module.exports = mongoose.model("Image", imageSchema);
  



const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true }, // Unique product name for the image
  imageUrl: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;