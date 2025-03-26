const Order = require("../Models/Order"); // Import Order Model

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, customerId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      customerId,
      items,
      totalPrice,
      status: "Pending",
      createdAt: new Date(),
    });

    await newOrder.save(); // Save order in database

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error, please try again." });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerId"); // Fetch all orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error, please try again." });
  }
};
