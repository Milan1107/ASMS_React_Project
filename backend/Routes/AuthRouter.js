// const express = require('express');
// const router = express.Router();
// const { signupValidation, loginValidation } = require('../Middleware/AuthValidation.js'); // Import validation middleware
// const {signup,login, getusers} = require("../Controlers/AuthControler.js");

// // Login route
// router.post('/login', loginValidation, (req, res) => {
//     // Placeholder for login logic
//     login(req,res);
// });

// // Signup route
// router.post('/signup', signupValidation, (req, res) => {
//     // Placeholder for signup logic
//     signup(req,res)
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup, login } = require("../Controlers/AuthControler");

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
