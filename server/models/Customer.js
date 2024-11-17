const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpending: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  lastVisitDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
