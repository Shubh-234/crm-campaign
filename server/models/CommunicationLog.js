// server/models/CommunicationLog.js
const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['SENT', 'FAILED'], required: true },
  deliveryReceipt: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunicationLog', communicationLogSchema);
