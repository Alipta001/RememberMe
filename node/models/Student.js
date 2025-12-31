// // server/models/Student.js

// const mongoose = require('mongoose');

// const StudentSchema = new mongoose.Schema({
//     name: { type: String, required: true, trim: true },
//     class: { type: String, required: true },
//     email: { type: String, trim: true },
//     createdBy: { 
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     enrollmentDate: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Student', StudentSchema);



const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  schoolName: { type: String, required: true },
  phone: { type: String, required: true },
  admissionDate: { type: Date, required: true },
  address: { type: String },

  // Monthly fees tracking
  feesPaidMonths: [
    {
      type: String, // e.g. "January", "February"
    },
  ],

  // Attendance tracking
  attendance: [
    {
      date: { type: String, required: true },
      present: { type: Boolean, default: true },
    },
  ],

  // Weekdays selected by admin
  weekdays: [
    {
      type: String, // e.g., "Mon", "Tue", etc.
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.model("Student", StudentSchema);
