const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const Campaign = require('../models/Campaign');
const AudienceSegment = require('../models/AudienceSegment');
const Customer = require('../models/Customer');
const { buildQuery } = require('../utils/queryBuilder');
const CommunicationLog = require('../models/CommunicationLog');

router.post('/create', async (req, res) => {
    try {
        const { name, audienceSegmentId, message } = req.body;

        if (!name || !audienceSegmentId || !message) {
            return res.status(400).json({ message: "Campaign name, audience segment ID, and message are required." });
        }

        const audienceSegment = await AudienceSegment.findById(audienceSegmentId);
        if (!audienceSegment) {
            return res.status(404).json({ message: "Audience segment not found." });
        }
        const query = buildQuery(audienceSegment.conditions, audienceSegment.logic);
        
        // Retrieve matching customers
        const matchedCustomers = await Customer.find(query);
        
        // Check if there are any matched customers
        if (matchedCustomers.length === 0) {
            return res.status(404).json({ message: "No customers match the specified audience segment criteria." });
        }

        // Create and save the campaign with initial statistics set to 0
        const newCampaign = new Campaign({
            name,
            audienceSegmentId,
            message,
            audienceSize: matchedCustomers.length, // Save audience size
            statistics: { impressions: 0, clicks: 0, conversions: 0 } // Initial statistics
        });
        await newCampaign.save();

        res.status(201).json({
            message: "Campaign created successfully",
            campaign: newCampaign,
            audienceSize: matchedCustomers.length,
            matchedCustomers: matchedCustomers.map(customer => customer._id) // Return only IDs for brevity
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create campaign", details: error.message });
    }
});

// Route to retrieve campaigns with statistics
router.get('/get', async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 }); // Order by most recent

        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching campaigns', details: error.message });
    }
});



router.post('/send-messages/:campaignId', async (req, res) => {
    try {
        const { campaignId } = req.params;
        console.log("Received campaignId:", campaignId);

        // Convert campaignId to ObjectId
        const campaign = await Campaign.findById(new mongoose.Types.ObjectId(campaignId)).populate('audienceSegmentId');
        console.log("Found campaign:", campaign);

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found." });
        }

        const query = buildQuery(campaign.audienceSegmentId.conditions, campaign.audienceSegmentId.logic);
        const customers = await Customer.find(query);
        const communicationLogs = [];
        
        customers.forEach(customer => {
            const personalizedMessage = `Hi ${customer.name}, here’s 10% off on your next order!`;
            const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
            
            communicationLogs.push({
                campaignId: campaign._id,
                customerId: customer._id,
                message: personalizedMessage,
                status,
                sentAt: new Date()
            });
        });

        await CommunicationLog.insertMany(communicationLogs);

        res.status(200).json({ message: "Messages sent successfully", communicationLogs });
    } catch (error) {
        console.error("Error in send-messages route:", error);
        res.status(500).json({ message: "Failed to send messages", details: error.message });
    }
});

// Endpoint to get campaign statistics
router.get('/statistics/:campaignId', async (req, res) => {
    try {
        const { campaignId } = req.params;
        
        // Find campaign and calculate stats
        const sentCount = await CommunicationLog.countDocuments({ campaignId, status: 'SENT' });
        const failedCount = await CommunicationLog.countDocuments({ campaignId, status: 'FAILED' });

        res.status(200).json({
            campaignId,
            audienceSize: sentCount + failedCount,
            sentCount,
            failedCount
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch statistics", details: error.message });
    }
});


module.exports = router;
