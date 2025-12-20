// server/models/User.js - UPDATED

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name: { // <-- ADD THIS FIELD
        type: String,
        required: true, 
        trim: true
    },
    isVerified: { type: Boolean, default: false },
    otpCode: { type: String }, 
    otpExpires: { type: Date }, 
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);