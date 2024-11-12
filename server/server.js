const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const customerRoutes = require('./routes/customerRoutes')
const orderRoutes = require('./routes/orderRoutes')
const audienceSegmentRoutes = require('./routes/audienceSegmentRoutes')
const campaignRoutes = require('./routes/campaignRoutes')
const communicationLogRoutes = require('./routes/communicationLogRoutes')


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/audience-segment', audienceSegmentRoutes);
app.use('/api/campaign', campaignRoutes);
app.use('/api/communication-log', communicationLogRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Mini CRM Campaign API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
