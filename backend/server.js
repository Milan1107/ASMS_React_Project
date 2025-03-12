const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db'); // Ensure MongoDB connection is set up

const AuthRouter = require('./Routes/AuthRouter'); // Auth Routes
const InventoryRouter = require('./Routes/inventoryRoutes'); // Inventory Routes
const CustomerRouter = require("./Routes/customerRoutes"); // New Customer Route


const PORT = process.env.PORT || 8080;


app.get('/api/config/paypal',(req,res)=>res.send(process.env.CLIENT_ID))




// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes setup
app.use('/auth', AuthRouter);
app.use('/inventory', InventoryRouter);
app.use("/customers", CustomerRouter); // New customer route

// Start the server
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
