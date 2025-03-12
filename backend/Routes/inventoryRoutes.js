const express = require("express");
const { getInventory, addInventory, updateQuantity, deleteInventory } = require("../Controlers/inventoryController");

const router = express.Router();

router.get("/", getInventory);
router.post("/", addInventory);
router.put("/update-qty", updateQuantity);

// ✅ Corrected Delete Route
router.delete("/inventory/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedItem = await Inventory.findOneAndDelete({ productId }); // ✅ Corrected to delete by productId
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found!" });
    }
    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item!" });
  }
});

module.exports = router;


// const express = require("express");
// const multer = require("multer");
// const {
//   getInventory,
//   addInventory,
//   updateQuantity,
//   deleteInventory,
// } = require("../Controlers/inventoryController");

// const router = express.Router();

// // Multer configuration for storing images in the 'uploads' folder
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// // Routes
// router.get("/", getInventory);
// router.post("/", upload.single("image"), addInventory);
// router.put("/update-qty", updateQuantity);
// router.delete("/:productId", deleteInventory);

// module.exports = router;
