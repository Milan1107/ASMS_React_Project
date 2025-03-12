// const mongoose = require("mongoose");

// const inventorySchema = new mongoose.Schema({
//   productId: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   weight: { type: String, required: true },
//   qty: { type: Number, required: true },
//   status: { type: String, default: "Available" },
//   description: { type: String },
//   price: { type: String, required: true },
//   expiryDate: { type: String, required: true },
// });

// module.exports = mongoose.model("inventories", inventorySchema);


const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  weight: { type: String, required: true },
  qty: { type: Number, required: true },
  status: { type: String, default: "Available" },
  description: { type: String },
  price: { type: String, required: true },
  expiryDate: { type: String, required: true },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, // Reference to Image schema
});

module.exports = mongoose.model("Inventory", inventorySchema);

