const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./Models/db"); // Ensure MongoDB connection is set up

const AuthRouter = require("./Routes/AuthRouter"); // Auth Routes
const InventoryRouter = require("./Routes/inventoryRoutes"); // Inventory Routes
const CustomerRouter = require("./Routes/customerRoutes"); // Customer Routes
const UploadRouter = require("./Routes/uploadRouters"); // Upload Routes

const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images statically

// Routes setup
app.use("/auth", AuthRouter);
app.use("/inventory", InventoryRouter);
app.use("/customers", CustomerRouter);
app.use("/upload", UploadRouter); // Add upload route

// Start the server
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
