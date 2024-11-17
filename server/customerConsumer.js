require('dotenv').config();
const mongoose = require('mongoose');
const redis = require('redis');
const Customer = require('./models/Customer');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

// Initialize Redis client and connect
const redisClient = redis.createClient({url : "redis://red-cssvf5t6l47c73ego4g0:6379"});
redisClient.connect().catch(console.error);

async function startCustomerConsumer() {
    // Subscribe to the customerChannel
    await redisClient.subscribe('customerChannel', async (message) => {
        const customerData = JSON.parse(message);

        try {
            // Check if the customer already exists
            const existingCustomer = await Customer.findOne({ email: customerData.email });
            if (existingCustomer) {
                console.log('Customer with this email already exists:', customerData.email);
                return;
            }

            // Create a new customer document and save it to MongoDB
            const newCustomer = new Customer(customerData);
            await newCustomer.save();
            console.log('Customer saved successfully:', customerData.email);
        } catch (error) {
            console.error('Failed to save customer data:', error.message);
        }
    });

    console.log('Subscribed to customerChannel');
}

startCustomerConsumer();
