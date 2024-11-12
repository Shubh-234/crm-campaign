const express = require('express');

const router = express.Router()

const Campaign = require('../models/Campaign');

router.post('/add',async (req,res)=> {
    try {
        const campaign = new Campaign(req.body);
        campaign.save();
        res.status(201).json({message:'Added new campaign',campaign});
    } catch (error) {
        res.status(500).json({message:'An error occurred while adding campaigns',details: error.message});
    }
})

router.get('/get',async (req,res)=> {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({message: 'An error occurred while fetching campaigns',details:error.message});
    }
})

module.exports = router;