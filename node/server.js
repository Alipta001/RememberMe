// server/server.js

// ---------------- Core Dependencies ----------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ---------------- App Init ----------------
const app = express();

// ---------------- Allowed Origins ----------------
const allowedOrigins = [
  "http://localhost:5173",                  // Local frontend
  "https://remember-me-i9kt.vercel.app",     // Vercel frontend
  "https://your-frontend.vercel.app"         // (optional future frontend)
];

// ---------------- Middleware ----------------
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow curl/Postman
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-auth-token"],
  credentials: true
}));

// Fix for Express + Node 22 wildcard issue


app.use(express.json());

// ---------------- Database ----------------
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

connectDB();

// ---------------- Routes ----------------
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// ---------------- Health Check ----------------
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend running successfully" });
});

// ---------------- Local Server Start ----------------
const PORT = process.env.PORT || 5000;

// Run server locally only (Vercel uses serverless)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`);
  });
}

// ---------------- Export for Vercel ----------------
module.exports = app;
