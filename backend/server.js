// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();
// require('./Models/db'); // Ensure MongoDB connection is set up
// const AuthRouter = require('./Routes/AuthRouter'); // Import Auth Routes
// const InventoryRouter = require('./Routes/inventoryRoutes'); // Import Inventory Routes

// const PORT = process.env.PORT || 8080;

// // Middleware setup
// // app.use(express.json());
// // app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(cors());

// // Routes setup
// app.use('/auth', AuthRouter);
// app.use('/inventory', InventoryRouter); // New Inventory Routes

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is Running on http://localhost:${PORT}`);
// });


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db'); // Ensure MongoDB connection is set up

const AuthRouter = require('./Routes/AuthRouter'); // Import Auth Routes
const InventoryRouter = require('./Routes/inventoryRoutes'); // Import Inventory Routes

const PORT = process.env.PORT || 8080;

// Middleware setup using body-parser
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());

// Routes setup
app.use('/auth', AuthRouter);
app.use('/inventory', InventoryRouter); // Inventory Routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
