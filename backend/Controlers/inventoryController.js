// const Inventory = require("../Models/inventoryModel");

// // Get all inventory items
// const getInventory = async (req, res) => {
//   try {
//     const inventory = await Inventory.find();
//     res.status(200).json(inventory);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add new inventory item
// const addInventory = async (req, res) => {
//   try {
//     const { name, category, weight, qty, description, price, expiryDate } = req.body;
//     const productId = `HUL00${(await Inventory.countDocuments()) + 1}`;
//     const status = qty >= 50 ? "Available" : qty >= 10 ? "Low Stock" : "Out of Stock";

//     const newItem = new Inventory({ productId, name, category, weight, qty, status, description, price, expiryDate });
//     await newItem.save();
    
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update inventory quantity
// const updateQuantity = async (req, res) => {
//   try {
//     const { productId, change } = req.body;
//     const item = await Inventory.findOne({ productId });

//     if (!item) return res.status(404).json({ message: "Item not found" });

//     item.qty += change;
//     item.status = item.qty >= 50 ? "Available" : item.qty >= 10 ? "Low Stock" : "Out of Stock";
    
//     await item.save();
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete inventory item
// const deleteInventory = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     await Inventory.findOneAndDelete({ productId });
//     res.status(200).json({ message: "Item deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { getInventory, addInventory, updateQuantity, deleteInventory };







const Inventory = require("../Models/inventoryModel");
const Image = require("../Models/inventory_img");

// Get inventory with images
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.aggregate([
      {
        $lookup: {
          from: "images", // Matches collection name in MongoDB
          localField: "name",
          foreignField: "productName",
          as: "images",
        },
      },
    ]);

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new inventory item
const addInventory = async (req, res) => {
  try {
    const { name, category, weight, qty, description, price, expiryDate } = req.body;
    
    // Find the latest product ID and increment
    const lastProduct = await Inventory.findOne().sort({ productId: -1 });
    let newProductId = "HUL001"; // Default for first product

    if (lastProduct) {
      const lastIdNum = parseInt(lastProduct.productId.replace("HUL", ""), 10);
      newProductId = `HUL${(lastIdNum + 1).toString().padStart(3, "0")}`;
    }

    const status = qty >= 50 ? "Available" : qty >= 10 ? "Low Stock" : "Out of Stock";

    const newItem = new Inventory({ 
      productId: newProductId, 
      name, 
      category, 
      weight, 
      qty, 
      status, 
      description, 
      price, 
      expiryDate 
    });

    await newItem.save();
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update inventory quantity
const updateQuantity = async (req, res) => {
  try {
    const { productId, change } = req.body;
    const item = await Inventory.findOne({ productId });

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty += change;
    item.status = item.qty >= 50 ? "Available" : item.qty >= 10 ? "Low Stock" : "Out of Stock";
    
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete inventory item
const deleteInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedItem = await Inventory.findOneAndDelete({ productId });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found!" });
    }

    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInventory, addInventory, updateQuantity, deleteInventory };
