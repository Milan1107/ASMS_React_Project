const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Email validation
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please use a valid 10-digit contact number'], // Simple contact number validation
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

const UserModel = mongoose.model('Users_Retailer', UserSchema);
module.exports = UserModel;
