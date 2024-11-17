const dotenv = require('dotenv');
dotenv.config(); 

const redis = require("redis");
const mongoose = require("mongoose");
const CommunicationLog = require('./models/CommunicationLog');

const redisSubscriber = redis.createClient({url : "redis://red-cssvf5t6l47c73ego4g0:6379"});
redisSubscriber.connect().catch(console.error);


async function connectToMongoDB() {
    await mongoose.connect(process.env.MONGODB_URI2, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));
}

let messageBatch = [];          
const batchSize = 100;           
const batchInterval = 5000;      
let batchTimer;                  

async function processBatch() {
    if (messageBatch.length === 0) return;

    const bulkOperations = messageBatch.map(({ logId, status }) => ({
        updateOne: {
            filter: { _id: logId },
            update: { status: status }
        }
    }));

    try {
        await CommunicationLog.bulkWrite(bulkOperations);
        console.log(`Batch processed: Updated ${messageBatch.length} entries.`);
    } catch (error) {
        console.error("Failed to process batch", error);
    }

    messageBatch = [];
    clearTimeout(batchTimer);
}

redisSubscriber.subscribe("deliveryReceiptChannel", (message) => {
    const updateData = JSON.parse(message);
    messageBatch.push(updateData);

    if (messageBatch.length >= batchSize) {
        processBatch();
    } else {
        clearTimeout(batchTimer);
        batchTimer = setTimeout(processBatch, batchInterval);
    }
});

process.on('exit', processBatch);
process.on('SIGINT', () => {
    processBatch().then(() => process.exit(0));
});
process.on('SIGTERM', () => {
    processBatch().then(() => process.exit(0));
});

connectToMongoDB().then(() => {
    console.log("Batch processor is ready and listening for messages...");
});
