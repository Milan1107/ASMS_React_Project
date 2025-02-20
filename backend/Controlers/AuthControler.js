// const bcrypt = require('bcrypt');
// const UserModel = require("../Models/User");
// const validator = require('validator');

// // Signup Controller
// const signup = async (req, res) => {
//     try {
//         const { name, username, email, contactNumber, password } = req.body;

//         // Input validation
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ message: "Invalid email format", success: false });
//         }
//         if (!validator.isMobilePhone(contactNumber, 'any')) {
//             return res.status(400).json({ message: "Invalid contact number", success: false });
//         }
//         if (password.length < 6) {
//             return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
//         }

//         // Check for existing user
//         const existingEmail = await UserModel.findOne({ email });
//         if (existingEmail) {
//             return res.status(409).json({
//                 message: "User already exists, please sign in.",
//                 success: false
//             });
//         }

//         const existingUsername = await UserModel.findOne({ username });
//         if (existingUsername) {
//             return res.status(409).json({
//                 message: "Username already taken, please choose another.",
//                 success: false
//             });
//         }

//         // Create new user
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new UserModel({ name, username, email, contactNumber, password: hashedPassword });
//         await newUser.save();

//         console.log(`User registered successfully: ${email}`);
//         return res.status(201).json({
//             message: "Signup successful!",
//             success: true
//         });
//     } catch (err) {
//         console.error("Error during signup:", err);
//         return res.status(500).json({
//             message: "Something went wrong. Please try again later.",
//             success: false
//         });
//     }
// };

// // Login Controller
// const login = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Ensure either username or email is provided, but not both
//         if ((!username && !email) || (username && email)) {
//             return res.status(400).json({ 
//                 message: "Please provide either a username or an email, but not both.", 
//                 success: false 
//             });
//         }

//         if (!password) {
//             return res.status(400).json({ 
//                 message: "Password is required.", 
//                 success: false 
//             });
//         }

//         // Validate email format if email is provided
//         if (email && !validator.isEmail(email)) {
//             return res.status(400).json({ 
//                 message: "Invalid email format.", 
//                 success: false 
//             });
//         }

//         // Find user by email or username
//         const user = await UserModel.findOne({
//             $or: [{ email }, { username }]
//         });

//         if (!user) {
//             return res.status(404).json({ 
//                 message: "User not found. Please sign up first.", 
//                 success: false 
//             });
//         }

//         // Verify password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ 
//                 message: "Invalid password. Please try again.", 
//                 success: false 
//             });
//         }

//         // Successful login response
//         return res.status(200).json({ 
//             message: "Login successful!", 
//             success: true, 
//             user: {
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//                 contactNumber: user.contactNumber
//             }
//         });
//     } catch (err) {
//         console.error("Error during login:", err);
//         return res.status(500).json({ 
//             message: "Something went wrong. Please try again later.", 
//             success: false 
//         });
//     }
// };


// module.exports = { signup, login };



const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");
const validator = require('validator');
require('dotenv').config();

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, username, email, contactNumber, password } = req.body;

        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email format" });
        if (!validator.isMobilePhone(contactNumber, 'any')) return res.status(400).json({ message: "Invalid contact number" });

        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.status(409).json({ message: "User already exists, please sign in." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new UserModel({ name, username, email, contactNumber, password: hashedPassword }).save();

        const token = generateToken(newUser);
        res.status(201).json({ message: "Signup successful!", token, user: newUser });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (!user) return res.status(404).json({ message: "User not found." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });

        const token = generateToken(user);
        res.status(200).json({ message: "Login successful!", token, user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { signup, login };
