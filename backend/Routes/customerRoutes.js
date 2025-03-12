const express = require("express");
const router = express.Router();
const Customer = require("../Models/customerModel");

// API to get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    const customersWithStatus = customers.map((customer) => ({
      ...customer.toObject(),
      status: "Active", // Assigning default status as 'Active'
    }));
    res.json(customersWithStatus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
});

module.exports = router;
