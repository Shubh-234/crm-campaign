const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
    field: { type: String, required: true }, // 'totalSpending', 'visitCount', 'lastVisitInMonths'
    operator: { type: String, required: true }, // e.g., '>', '<=', etc.
    value: { type: Number, required: true }
});

const audienceSegmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    conditions: [conditionSchema], // Array of conditions
    logic: { type: String, enum: ['AND', 'OR'], default: 'AND' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AudienceSegment', audienceSegmentSchema);
