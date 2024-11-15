// server/routes/audienceSegmentRoutes.js
const express = require('express');
const router = express.Router();
const AudienceSegment = require('../models/AudienceSegment');
const Customer = require('../models/Customer');
const { buildQuery } = require('../utils/queryBuilder');

router.post('/calculatesegmentsize', async (req, res) => {
    try {
        const { conditions, logic, saveSegment, segmentName } = req.body;
        const query = buildQuery(conditions, logic);

        const matchedCustomers = await Customer.find(query);
        const segmentSize = matchedCustomers.length;

        // Save segment if `saveSegment` is true
        if (saveSegment) {
            const newSegment = new AudienceSegment({
                name: segmentName || "Unnamed Segment",
                conditions,
                logic
            });
            await newSegment.save();
        }

        res.status(200).json({ segmentSize, matchedCustomers });
    } catch (error) {
        res.status(500).json({ message: "Failed to calculate segment size", details: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const audienceSegments = await AudienceSegment.find();
        res.status(200).json(audienceSegments);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve audience segments", details: error.message });
    }
});

router.post('/addSample', async (req, res) => {
    try {
        const sampleSegment = new AudienceSegment({
            name: "High-Spending Customers",
            conditions: [
                { field: "totalSpending", operator: ">=", value: 500 }
            ],
            logic: "AND"
        });
        await sampleSegment.save();
        res.status(201).json({ message: "Sample audience segment created" });
    } catch (error) {
        res.status(500).json({ message: "Failed to create sample segment", details: error.message });
    }
});

module.exports = router;
