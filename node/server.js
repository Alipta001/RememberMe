// server/server.js

// Core Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Middleware ---
// CORS: Allows your React app (usually on a different port like 3000) to connect to this server
app.use(cors()); 
// Body Parser: Allows Express to read JSON data sent from the React frontend
app.use(express.json()); 

// --- 2. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('DB Connection Error:', err.message));

// --- 3. Route Definitions ---

// Authentication Routes: Login, Register, Request-OTP, Verify-OTP
// All endpoints will start with /api/auth (e.g., /api/auth/login)
app.use('/api/auth', authRoutes);

// Student Data Routes: Create and Get Student Records (Protected)
// All endpoints will start with /api/students (e.g., /api/students)
app.use('/api/students', studentRoutes); 

// --- 4. Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to check the server status.`);
});