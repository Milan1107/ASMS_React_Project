const express = require("express");
const { getInventory, addInventory, updateQuantity, deleteInventory } = require("../Controlers/inventoryController");

const router = express.Router();

router.get("/", getInventory);
router.post("/", addInventory);
router.put("/update-qty", updateQuantity);
router.delete("/:productId", deleteInventory);

module.exports = router;
