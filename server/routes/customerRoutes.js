const express = require("express")
const router = express.Router();
const redis = require("redis");

const redisClient = redis.createClient({url:"redis://red-cssvf5t6l47c73ego4g0:6379"});
redisClient.connect().catch(console.error);

const Customer = require('../models/Customer')

router.post('/add',async(req,res)=> {
    try {
        const existingCustomer = await Customer.findOne({ email: req.body.email });
        
        if (existingCustomer) {
            // If customer already exists, return an error
            return res.status(500).json({ message: 'Email already exists' });
        }
        await redisClient.publish("customerChannel",JSON.stringify(req.body));
        res.status(201).json({message:"Customer data published succesfully"});
    } catch (error) {
        res.status(500).json({message: 'Failed to add customer',details: error.message});
    }
});

router.get('/get',async (req,res)=> {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({message: 'Error fetching customers',details: error.message});
    }
});


module.exports = router;
