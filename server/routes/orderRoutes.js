const express = require("express");
const router = express.router();

const Order = require('../models/Order')

router.post('/add',async (req,res)=> {
    try {
        const order = new Order(req.body);
        order.save();
        res.status(201).json({message: 'New order has been added',order});
    } catch (error) {
        res.status(500).json({message:'Error adding the order',details:error.message});
    }
});

router.get('/get',async (req,res)=> {
    try {
        const orders = Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message:'There was an error in finding the customers',details: error.message});
    }
});

