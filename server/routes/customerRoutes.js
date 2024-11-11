const express = require("express")
const router = express.Router();

const Customer = require('../models/Customer')

router.post('/add',async(req,res)=> {
    try {
        const customer = new Customer(req.body);
        customer.save();
        res.status(201).json({message: 'Customer added successfully'});
    } catch (error) {
        res.status(500).json({message: 'Failed to add customer',details: error.message});
    }
});

router.get('/get',async (req,res)=> {
    try {
        const customers = Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({message: 'Error fetching customers',details: error.message});
    }
});


module.exports = router;
