// server/models/AudienceSegment.js
const mongoose = require('mongoose');

const audienceSegmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  criteria: { type: Object, required: true }, // Store criteria as a JSON object
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AudienceSegment', audienceSegmentSchema);
