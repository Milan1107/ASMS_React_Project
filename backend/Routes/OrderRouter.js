const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders } = require("../Controlers/OrderController");

// Place order
router.post("/place", placeOrder);

// Get all orders
router.get("/", getAllOrders);

module.exports = router;
