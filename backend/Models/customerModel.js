const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  orders: { type: Number, default: 0 },
});

module.exports = mongoose.model("Customer", customerSchema,"users_retailers"); 
// Assuming your signup data is stored in the 'signups' collection
