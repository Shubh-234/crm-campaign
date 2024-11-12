const express = require('express')
const router = express.Router()

const CommunicationLog = require('../models/CommunicationLog')

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

module.exports = router;