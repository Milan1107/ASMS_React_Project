// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     name: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     contactNumber: { type: String, required: true, match: /^\d{10}$/ },
//     password: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Users_Retailer', UserSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, match: /^\d{10}$/ },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('users_retailers', UserSchema);
