const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const customerRoutes = require('./routes/customerRoutes')
const orderRoutes = require('./routes/orderRoutes')
const audienceSegmentRoutes = require('./routes/audienceSegmentRoutes')
const campaignRoutes = require('./routes/campaignRoutes')
const communicationLogRoutes = require('./routes/communicationLogRoutes')
const authRoutes = require('./routes/authRoutes');
const {authenticateJwt} = require('./middlware/auth')


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

app.use('/api/customers', authenticateJwt, customerRoutes);
app.use('/api/orders', authenticateJwt, orderRoutes);
app.use('/api/audience-segment', authenticateJwt, audienceSegmentRoutes);
app.use('/api/campaign', authenticateJwt, campaignRoutes);
app.use('/api/communication-log', authenticateJwt, communicationLogRoutes);
app.use('/auth',authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Mini CRM Campaign API');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
