const express = require("express");
const router = express.Router();

const Order = require('../models/Order')

router.post('/add',async (req,res)=> {
    try {
        const customerExists = await Customer.findById(req.body.customerId);
        
        if (!customerExists) {
            // If customerId does not exist, return an error response
            return res.status(500).json({ message: 'Customer does not exist' });
        }
        const order = new Order(req.body);
        order.save();
        res.status(201).json({message: 'New order has been added',order});
    } catch (error) {
        res.status(500).json({message:'Error adding the order',details:error.message});
    }
});

router.get('/get',async (req,res)=> {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message:'There was an error in finding the orders',details: error.message});
    }
});

module.exports = router

