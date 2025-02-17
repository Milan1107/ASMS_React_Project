const bcrypt = require('bcrypt');
const { User } = require('../models/user'); // Adjust the path based on your file structure

const validator = require('validator');

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, username, email, contactNumber, password } = req.body;

        // Input validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }
        if (!validator.isMobilePhone(contactNumber, 'any')) {
            return res.status(400).json({ message: "Invalid contact number", success: false });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
        }

        // Check for existing user
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({
                message: "User already exists, please sign in.",
                success: false
            });
        }

        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({
                message: "Username already taken, please choose another.",
                success: false
            });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, username, email, contactNumber, password: hashedPassword });
        await newUser.save();

        console.log(`User registered successfully: ${email}`);
        return res.status(201).json({
            message: "Signup successful!",
            success: true
        });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            success: false
        });
    }
};

//Login contoller
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required.", 
                success: false 
            });
        }

        // Find user by email
        const user = await User.findOne({ email }); // Adjust `User` import as needed
        if (!user) {
            return res.status(404).json({ 
                message: "User not found. Please sign up first.", 
                success: false 
            });
        }

        // Check password validity
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Invalid password. Please try again.", 
                success: false 
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key from .env
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Expiration time with fallback
        );

        // Set token in an HTTP-only cookie for added security
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour in milliseconds
        });

        // Return success response
        return res.status(200).json({ 
            message: "Login successful!", 
            success: true, 
            token, // Optional: Send the token in the response for client-side use
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                contactNumber: user.contactNumber
            }
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ 
            message: "Something went wrong. Please try again later.", 
            success: false 
        });
    }
};


module.exports = { signup, login };
