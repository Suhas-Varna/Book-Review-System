const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Book Routes
const reviewRoutes = require('./routes/reviewRoutes'); 

const app = express();
app.use(express.json());

// Enable CORS for the frontend URL
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow necessary methods
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api', authRoutes); 
app.use('/api/books', bookRoutes); 
app.use('/api/reviews', reviewRoutes); 


// Remove redundant /books/:bookId handler
// Already defined in bookRoutes.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
