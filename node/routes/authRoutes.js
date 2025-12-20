// // server/routes/authRoutes.js

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const multer = require("multer");

// const User = require("../models/User");
// const sendOTP = require("../utils/sendEmail");

// require("dotenv").config();

// // Multer (for handling FormData)
// const upload = multer();

// /* =====================================================
//    1. REQUEST OTP (STEP 1 – REGISTRATION)
//    ===================================================== */
// // @route   POST /api/auth/request-otp
// // @desc    Create/update unverified user and send OTP
// // @access  Public
// router.post("/request-otp", upload.none(), async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     let user = await User.findOne({ email });

//     if (user && user.isVerified) {
//       return res
//         .status(400)
//         .json({ msg: "User already verified. Please login." });
//     }

//     if (!user) {
//       user = new User({ name, email, password, isVerified: false });
//     } else {
//       user.name = name;
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     const otpCode = crypto.randomInt(100000, 999999).toString();
//     user.otpCode = otpCode;
//     user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//     await user.save();
//     await sendOTP(email, otpCode);

//     res.status(200).json({
//       status: true,
//       msg: "OTP sent to email. Please verify.",
//       email: user.email,
//       userId: user._id,
//     });
//   } catch (err) {
//     console.error("Error in request-otp:", err.message);
//     res.status(500).json({ msg: "Server error during OTP request." });
//   }
// });

// /* =====================================================
//    2. VERIFY OTP (STEP 2 – REGISTRATION)
//    ===================================================== */
// // @route   POST /api/auth/verify-otp
// // @desc    Verify OTP and activate account (NO TOKEN)
// // @access  Public
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     if (!email || !otp) {
//       return res.status(400).json({ msg: "Email and OTP are required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     if (user.isVerified) {
//       return res
//         .status(400)
//         .json({ msg: "User already verified. Please login." });
//     }
//     console.log("OTP FROM DB:", user.otpCode, typeof user.otpCode);
// console.log("OTP FROM CLIENT:", otp, typeof otp);
// console.log("OTP EXPIRES AT:", new Date(user.otpExpires));
// console.log("NOW:", new Date());

//     if (user.otpCode !== otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ msg: "Invalid or expired OTP" });
//     }

//     user.isVerified = true;
//     user.otpCode = undefined;
//     user.otpExpires = undefined;

//     await user.save();

//     res.status(200).json({
//       status: true,
//       msg: "OTP verified successfully. Please login.",
//       email: user.email,
//       userId: user._id,
//     });
//   } catch (err) {
//     console.error("Error in verify-otp:", err.message);
//     res.status(500).json({ msg: "Server error during OTP verification." });
//   }
// });

// /* =====================================================
//    3. LOGIN (TOKEN GENERATED HERE ONLY)
//    ===================================================== */
// // @route   POST /api/auth/login
// // @desc    Login user and generate JWT
// // @access  Public
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Email and password required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     if (!user.isVerified) {
//       return res
//         .status(401)
//         .json({ msg: "Email not verified. Please verify OTP." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const payload = {
//       user: { id: user._id },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" },
//       (err, token) => {
//         if (err) throw err;

//         res.status(200).json({
//           status: true,
//           msg: "Login successful",
//           token,
//           userId: user._id,
//           email: user.email,
//         });
//       }
//     );
//   } catch (err) {
//     console.error("Error in login:", err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;








// // const express = require('express');
// // const router = express.Router();
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const crypto = require('crypto');
// // const User = require('../models/User'); // User Model (Must have 'name', 'isVerified', 'otpCode', 'otpExpires' fields)
// // const multer = require('multer');
// // const upload = multer();
// // const sendOTP = require('../utils/sendEmail'); // Email Utility (Make sure this file exists)
// // require('dotenv').config();

// // // --- 1. ENDPOINT: REQUEST OTP (STEP 1 OF REGISTRATION) ---
// // // @route POST /api/auth/request-otp
// // // @desc Step 1: Create/Update user record (unverified), generate OTP, and send email.
// // // @access Public
// // router.post('/request-otp', upload.none(), async (req, res) => {
// //     const {name, email, password } = req.body; // Including 'name'

// //     try {
// //         let user = await User.findOne({ email });

// //         // If user exists and is already verified, tell them to log in.
// //         if (user && user.isVerified) {
// //              return res.status(400).json({ msg: 'User already verified. Please login.' });
// //         }
        
// //         // If user is new OR exists but is UNVERIFIED
// //         if (!user) {
// //             // Create a new user record
// //             user = new User({ email, password, name, isVerified: false });
            
// //             // Hash password before saving
// //             const salt = await bcrypt.genSalt(10);
// //             user.password = await bcrypt.hash(password, salt);
// //         } else {
// //             // If user exists but is unverified, update fields and hash password again
// //             user.name = name;
// //             const salt = await bcrypt.genSalt(10);
// //             user.password = await bcrypt.hash(password, salt);
// //         }

// //         // Generate and store OTP
// //         const otpCode = crypto.randomInt(100000, 999999).toString();
// //         user.otpCode = otpCode;
// //         user.otpExpires = Date.now() + 600000; // 10 minutes from now

// //         await user.save(); // Mongoose generates the user._id here!

// //         // Send the email with the OTP code
// //         await sendOTP(email, otpCode);

// //         // Return the auto-generated ID immediately
// //         res.json({ 
// //             status: 'true',
// //             msg: 'OTP sent to email. Please verify.', 
// //             email: user.email,
// //             userId: user._id // <-- UNIQUE MONGODB ID RETURNED
// //         });

// //     } catch (err) {
// //         console.error("Error in request-otp:", err.message);
// //         res.status(500).send('Server error during OTP request.');
// //     }
// // });

// // // --- 2. ENDPOINT: VERIFY OTP (STEP 2 OF REGISTRATION) ---
// // // @route POST /api/auth/verify-otp
// // // @desc Step 2: Verify OTP code, finalize registration, and log the user in.
// // // @access Public
// // router.post('/verify-otp', async (req, res) => {
// //     const { email, otp } = req.body;

// //     try {
// //         const user = await User.findOne({ email });

// //         if (!user) {
// //             return res.status(400).json({ msg: 'User not found.' });
// //         }
// //         if (user.isVerified) {
// //             return res.status(400).json({ msg: 'User is already verified. Please log in.' });
// //         }

// //         // Check if OTP matches AND if the OTP has not expired
// //         if (user.otpCode !== otp || user.otpExpires < Date.now()) {
// //             return res.status(400).json({ msg: 'Invalid or expired OTP.' });
// //         }

// //         // Verification successful: 
// //         user.isVerified = true;
// //         user.otpCode = undefined; 
// //         user.otpExpires = undefined; 

// //         await user.save();

// //         // Log user in immediately by generating and sending the JWT token
// //         const payload = { user: { id: user.id } };
// //         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
// //             if (err) throw err;
            
// //             // Return JWT and the User ID
// //             res.json({ 
// //                 status: true,
// //                 token, 
// //                 userId: user._id, // <-- UNIQUE MONGODB ID RETURNED
// //                 msg: 'Verification successful. Welcome!' 
// //             });
// //         });

// //     } catch (err) {
// //         console.error("Error in verify-otp:", err.message);
// //         res.status(500).send('Server error during OTP verification.');
// //     }
// // });

// // // --- 3. ENDPOINT: LOGIN ---
// // // @route POST /api/auth/login
// // // @desc Authenticate user (Admin/Teacher) and get JWT token.
// // // @access Public
// // router.post('/login', async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         let user = await User.findOne({ email });
        
// //         if (!user) {
// //             return res.status(400).json({ msg: 'Invalid Credentials' });
// //         }
        
// //         // CRITICAL CHECK: User must be verified to log in
// //         if (!user.isVerified) {
// //             return res.status(401).json({ msg: 'Email not verified. Please complete OTP verification.' });
// //         }

// //         // Compare the submitted password with the stored hash
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(400).json({ msg: 'Invalid Credentials' });
// //         }

// //         // Login successful: Return JWT and User ID
// //         const payload = { user: { id: user.id } };
// //         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
// //             if (err) throw err;
// //             res.json({ status: 'success',token, userId: user._id }); // <-- UNIQUE MONGODB ID RETURNED
// //         });

// //     } catch (err) {
// //         console.error("Error in login:", err.message);
// //         res.status(500).send('Server error');
// //     }
// // });

// // module.exports = router; 


// server/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");

const User = require("../models/User");
const sendOTP = require("../utils/sendEmail");

require("dotenv").config();

// Multer (for FormData)
const upload = multer();

/* =====================================================
   1. REQUEST OTP (REGISTRATION – STEP 1)
   ===================================================== */
router.post("/request-otp", upload.none(), async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res
        .status(400)
        .json({ msg: "User already verified. Please login." });
    }

    if (!user) {
      user = new User({ name, email, password, isVerified: false });
    } else {
      user.name = name;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const otpCode = crypto.randomInt(100000, 999999).toString();
    user.otpCode = otpCode;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();
    await sendOTP(email, otpCode);

    res.status(200).json({
      status: true,
      msg: "OTP sent to email. Please verify.",
      email: user.email,
      userId: user._id,
    });
  } catch (err) {
    console.error("Error in request-otp:", err.message);
    res.status(500).json({ msg: "Server error during OTP request." });
  }
});

/* =====================================================
   2. VERIFY OTP (REGISTRATION – STEP 2)
   ===================================================== */
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ msg: "User already verified. Please login." });
    }

    if (
      String(user.otpCode) !== String(otp) ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      status: true,
      msg: "OTP verified successfully. Please login.",
    });
  } catch (err) {
    console.error("Error in verify-otp:", err.message);
    res.status(500).json({ msg: "Server error during OTP verification." });
  }
});

/* =====================================================
   3. LOGIN (USING NAME + PASSWORD ONLY)
   ===================================================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // 🔑 LOGIN USING NAME
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ msg: "Email not verified. Please verify OTP." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: { id: user._id },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          status: true,
          msg: "Login successful",
          token,
          userId: user._id,
          name: user.name,
          email: user.email,
        });
      }
    );
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

