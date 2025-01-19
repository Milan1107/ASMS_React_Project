const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter'); // Import Auth Router
require('dotenv').config();
require('./retailer/Models/db'); // Ensure this file sets up MongoDB connection

const PORT = process.env.PORT || 8080;

// Ping endpoint for testing
app.get('/ping', (req, res) => {
    res.send("Hello Milan");
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors()); // Fixed: Invoke cors as a function

// Routes setup
app.use('/auth', AuthRouter); // Fixed: Add leading slash for the route

// Start the server
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
