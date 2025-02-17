const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  sku: String,
  stock: Number,
  price: Number,
  minOrder: Number,
});

module.exports = mongoose.model("Product", productSchema);
