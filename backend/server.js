const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter'); // Import Auth Router
require('dotenv').config();
require('./Models/db'); // Ensure this file sets up MongoDB connection
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

// Middleware setup
app.use(bodyParser.json());
app.use(cors()); // Fixed: Invoke cors as a function

// Routes setup
app.use('/auth', AuthRouter); // Fixed: Add leading slash for the route

// Start the server
app.listen(8080, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
