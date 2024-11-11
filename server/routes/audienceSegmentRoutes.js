const express = require("express")

const router = express.router();

const AudienceSegment = require('../models/AudienceSegment');

router.post('/add',async (req,res)=> {
    try {
        const audienceSegment = new AudienceSegment(req.body);
        audienceSegment.save();
        res.status(201).json({message:'Added audience segment',audienceSegment})
    } catch (error) {
        res.status(500).json({message:'Error occurred while adding audience segment',details: error.message});
    }
});

router.get('/get',async (req,res)=> {
    try {
        const audienceSegments = AudienceSegment.find();
        res.status(200).json(audienceSegments);
    } catch (error) {
        res.status(500).json({message:'An error occurred while fetching audience segments',details:error.message})
    }
});