const redis = require("redis");
const mongoose = require("mongoose");
const CommunicationLog = require('../models/CommunicationLog');

const redisSubscriber = redis.createClient();
redisSubscriber.connect().catch(console.error);

// Connect to MongoDB
async function connectToMongoDB() {
    await mongoose.connect("mongodb+srv://shubhankarbhanot:s8TqPviLB5HdF1m9@cluster0.th1qq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));
}

let messageBatch = [];          // Temporary storage for batched messages
const batchSize = 100;           // Number of messages to process in a batch
const batchInterval = 5000;      // Time interval in milliseconds (e.g., 5 seconds)
let batchTimer;                  // Timer for batch interval

// Function to process the batch and update the database
async function processBatch() {
    if (messageBatch.length === 0) return; // Exit if there's nothing to process

    // Prepare bulk update operations
    const bulkOperations = messageBatch.map(({ logId, status }) => ({
        updateOne: {
            filter: { _id: logId },
            update: { status: status }
        }
    }));

    try {
        await CommunicationLog.bulkWrite(bulkOperations); // Perform bulk update
        console.log(`Batch processed: Updated ${messageBatch.length} entries.`);
    } catch (error) {
        console.error("Failed to process batch", error);
    }

    // Clear the batch array after processing
    messageBatch = [];
    clearTimeout(batchTimer); // Reset the timer after batch processing
}

// Subscribe to the Redis channel
redisSubscriber.subscribe("deliveryReceiptChannel", (message) => {
    const updateData = JSON.parse(message);
    messageBatch.push(updateData); // Add message to the batch

    // If batch size is reached, process the batch immediately
    if (messageBatch.length >= batchSize) {
        processBatch();
    } else {
        // Otherwise, set or reset the timer to process the batch after a time interval
        clearTimeout(batchTimer);
        batchTimer = setTimeout(processBatch, batchInterval);
    }
});

// Ensure the batch is processed when the application exits
process.on('exit', processBatch);         // For normal exits
process.on('SIGINT', () => {              // For Ctrl+C (interrupt signal)
    processBatch().then(() => process.exit(0));
});
process.on('SIGTERM', () => {             // For termination signals
    processBatch().then(() => process.exit(0));
});

// Start the batch processor by connecting to MongoDB
connectToMongoDB().then(() => {
    console.log("Batch processor is ready and listening for messages...");
});
