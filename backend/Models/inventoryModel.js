// const mongoose = require("mongoose");
// const Image = require("./inventory_img");

// const inventorySchema = new mongoose.Schema({
//   productId: { type: String, required: true, unique: true },
//   name: { type: String, required: true }, // Product name, used to reference the Image schema
//   category: { type: String, required: true },
//   weight: { type: String, required: true },
//   qty: { type: Number, required: true },
//   status: { type: String, default: "Available" },
//   description: { type: String },
//   price: { type: String, required: true },
//   expiryDate: { type: String, required: true },
// });

// const Inventory = mongoose.model("inventories", inventorySchema);

// module.exports = { Image, Inventory };



const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // Used to reference the Image schema
  category: { type: String, required: true },
  weight: { type: String, required: true },
  qty: { type: Number, required: true },
  status: { type: String, default: "Available" },
  description: { type: String },
  price: { type: String, required: true },
  expiryDate: { type: String, required: true },
});

const Inventory = mongoose.model("inventories", inventorySchema);
module.exports = Inventory;
