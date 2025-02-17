const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt'); // For hashing passwords

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, match: /^\d{10}$/ },
    password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "15d" } // Token expiration
    );
    return token;
};

// Input Validation using Joi
const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        contactNumber: Joi.string().pattern(/^\d{10}$/).required(),
        password: passwordComplexity().required(), // Enforce password complexity
    });
    return schema.validate(user);
};

module.exports = {
    User: mongoose.model('Users_Retailer', UserSchema),
    validateUser
};
