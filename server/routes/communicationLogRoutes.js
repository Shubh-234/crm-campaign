const express = require('express')
const router = express.Router()

const CommunicationLog = require('../models/CommunicationLog');
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);


router.post('/add',async (req,res)=> {
    try {
        const communicationLog = new CommunicationLog(req.body);
        communicationLog.save();
        res.status(201).json({message: 'Communication log added successfully',communicationLog});
    } catch (error) {
        res.status(500).json({message:'An error occurred while adding communication log',details:error.message});
    }
})

router.get('/get',async (req,res)=> {
    try {
        const communicationLogs = await CommunicationLog.find();
        res.status(200).json(communicationLogs);
    } catch (error) {
        res.status(500).json({message: 'An error occurred while fetching communication logs',details:error.message});
    }
})

// Update delivery receipt for a specific communication log
router.put('/update-receipt/:logId', async (req, res) => {
    try {
        const { logId } = req.params;
        const status = Math.random() < 0.9 ? 'SENT' : 'FAILED'; // Random status

        // Publish the update message to the Redis channel
        await redisClient.publish("deliveryReceiptChannel", JSON.stringify({ logId, status }));

        res.status(200).json({ message: "Delivery status queued for update" });
    } catch (error) {
        res.status(500).json({ message: "Failed to queue delivery status update", details: error.message });
    }
});



module.exports = router;