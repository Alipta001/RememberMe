// // server/routes/studentRoutes.js -- /*Gemini*/

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/authMiddleware'); // Import the JWT checker
// const Student = require('../models/Student'); // Student Model

// // @route POST /api/students
// // @desc Create a new student record
// // @access Private (Requires JWT token)
// router.post('/', auth, async (req, res) => {
//     try {
//         const { name, grade, email } = req.body;

//         const newStudent = new Student({
//             name,
//             grade,
//             email,
//             createdBy: req.user.id // ID comes securely from the validated JWT token
//         });

//         const student = await newStudent.save();
//         res.status(201).json(student);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route GET /api/students
// // @desc Get all student records created by the logged-in user
// // @access Private (Requires JWT token)
// router.get('/', auth, async (req, res) => {
//     try {
//         // Find only students created by the currently logged-in user
//         const students = await Student.find({ createdBy: req.user.id }).sort({ enrollmentDate: -1 });
//         res.json(students);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;



/*chatGpt*/
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Student = require("../models/Student");

/* =====================================================
   CREATE STUDENT
   ===================================================== */
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      class: studentClass,
      schoolName,
      phone,
      admissionDate,
      address
    } = req.body;

    if (!admissionDate) {
      return res.status(400).json({ msg: "Admission date is required" });
    }

     // 🔍 DUPLICATE CHECK (ADD HERE)
    const exists = await Student.findOne({
      phone,
      createdBy: req.user.id
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        msg: "Student already exists"
      });
    }


    const student = new Student({
      name,
      class: studentClass,
      schoolName,
      phone,
      admissionDate: new Date(admissionDate),
      address,
      createdBy: req.user.id,
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


/* =====================================================
   LIST ALL STUDENTS (LOGGED-IN USER)
   ===================================================== */
router.get("/list", auth, async (req, res) => {
  try {
    const students = await Student
      .find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

/* =====================================================
   GET SINGLE STUDENT BY ID (LOGGED-IN USER)
   ===================================================== */
router.get("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.user.id, // 🔐 security check
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});



// /* =====================================================
//    GET ALL STUDENTS (LOGGED-IN USER)
//    ===================================================== */
// router.get("/", auth, async (req, res) => {
//   try {
//     const students = await Student.find({ createdBy: req.user.id });
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

/* =====================================================
   UPDATE STUDENT
   ===================================================== */
router.put("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* =====================================================
   DELETE STUDENT
   ===================================================== */
router.delete("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* =====================================================
   ADD MONTHLY FEES
   ===================================================== */
router.post("/:id/fees", auth, async (req, res) => {
  const { month } = req.body;

  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (!student.feesPaidMonths.includes(month)) {
      student.feesPaidMonths.push(month);
    }

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* =====================================================
   ADD ATTENDANCE
   ===================================================== */
router.post("/:id/atendence", auth, async (req, res) => {
  const { date, present } = req.body;

  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!student) return res.status(404).json({ msg: "Student not found" });

    student.attendance.push({ date, present });
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* =====================================================
   ATTENDANCE REPORT
   ===================================================== */
router.get("/:id/attendance-report", auth, async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!student) return res.status(404).json({ msg: "Student not found" });

    const totalDays = student.attendance.length;
    const presentDays = student.attendance.filter(a => a.present).length;

    res.json({
      totalDays,
      presentDays,
      absentDays: totalDays - presentDays,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;
