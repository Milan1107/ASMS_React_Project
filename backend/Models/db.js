const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = process.env.mon;
mongoose.connect(mongo_url)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));
