const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  audienceSegmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment', required: true },
  message: { type: String, required: true },
  audienceSize: { type: Number, required: true }, // Added audience size
  statistics: { // Added campaign statistics
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
