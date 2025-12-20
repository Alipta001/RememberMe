// // server/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const auth = (req, res, next) => {
//   // Get token from header (usually sent as 'x-auth-token')
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user; // Attach user ID to the request object
//     next();
//   } catch (e) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = auth;

/*chatGpt*/

// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  let token = null;

  // 1️⃣ Check Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Fallback to x-auth-token
  if (!token && req.header("x-auth-token")) {
    token = req.header("x-auth-token");
  }

  // ❌ No token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded payload: { user: { id: ... }, iat, exp }
    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
