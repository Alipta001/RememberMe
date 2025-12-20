// server/server.js

// Core Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// ---------------- Middleware ----------------
app.use(cors({
  origin: process.env.CLIENT_URL, // Vercel frontend URL
  credentials: true
}));

app.use(express.json());

// ---------------- Database ----------------
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
  }
}

connectDB();

// ---------------- Routes ----------------
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Health check (important for testing)
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running" });
});

// ❌ REMOVE app.listen()
// ✅ EXPORT app for Vercel
module.exports = app;
