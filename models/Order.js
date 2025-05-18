const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientId: String, // Heroku, Railway, etc.
  product: String,
  amount: Number,
  paymentIntentId: String,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
