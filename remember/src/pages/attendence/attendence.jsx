// import { useEffect, useState } from "react";
// import "../../css/attendencePageCss/attendence.css";
// import AxiosInstance from "../../api/axios/axios";
// import { endPoints } from "../../api/endPoints/endPoints";
// import { useParams } from "react-router-dom";

// export default function Attendance() {
//   const [dateInfo, setDateInfo] = useState({
//     date: "",
//     day: "",
//   });

//   const [attendance, setAttendance] = useState({});
//   const [studentList, setStudentList] = useState([]);
//   const getList = async () => {
//     try {
//       const response = await AxiosInstance.get(endPoints.student.list);
//       console.log(response.data.data.attendance);
//       setStudentList(response.data.data);
//       /* setAttendance(response.data.data); */
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getList();
//     const today = new Date();
//   }, []);

//   const getIndianDate = () => {
//     const now = new Date();
//     const istOffset = 5.5 * 60 * 60 * 1000;
//     const istDate = new Date(now.getTime() + istOffset);

//     return istDate.toISOString().split("T")[0]; // YYYY-MM-DD
//   };

//   //Add Attendance
//   const markAttendance = async (studentId) => {
//     const payload = {
//       status: true,
//     };

//     try {
//       const response = await AxiosInstance.post(
//         `${endPoints.student.attendance}/${studentId}/attendance`,
//         payload
//       );
//       console.log("sending attendence to database", response.data);
//     } catch (error) {
//       console.log("Error in posting attendence info to database", error);
//     }
//   };

//   //Delete Attendance
//   const deleteAttendance = async (studentId) => {
//     const date = getIndianDate();

//     const payload = {
//       date: date,
//       present: false,
//     };
//     try {
//       const res = await AxiosInstance.delete(
//         `${endPoints.student.attendance}/${studentId}/attendance`,
//         payload
//       );
//       console.log(res);
//     } catch (error) {
//       console.log("error in attendance deletion", error);
//     }
//   };

//   return (
//     <div className="attendance-container">
//       <h2>Student Attendance</h2>

//       <div className="date-box">
//         {dateInfo.date} | {dateInfo.day}
//       </div>

//       <table className="attendance-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Student Name</th>
//             <th>Attendance</th>
//           </tr>
//         </thead>

//         <tbody>
//           {studentList.map((student, index) => (
//             <tr key={student._id}>
//               <td>{index + 1}</td>
//               <td>{student.name}</td>
//               <td>
//                 <button
//                   className={`btn present ${attendance ? "active" : ""}`}
//                   onClick={() => markAttendance(student._id, "Present")}
//                 >
//                   Present
//                 </button>

//                 <button
//                   className={`btn absent ${attendance ? "active" : ""}`}
//                   onClick={() => deleteAttendance(student._id, "Absent")}
//                 >
//                   Absent
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import "../../css/attendencePageCss/attendence.css";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";

export default function Attendance() {
  const [dateInfo, setDateInfo] = useState({ date: "", day: "" });
  const [studentList, setStudentList] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});

  // =============================
  // UI Date (ONLY for display)
  // =============================
  const getIndianDateForUI = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);

    return {
      date: istDate.toISOString().split("T")[0],
      day: istDate.toLocaleDateString("en-IN", { weekday: "long" }),
    };
  };

  // =============================
  // Load students + attendance
  // =============================
  const loadStudents = async () => {
    console.log("📡 Loading students from backend...");

    try {
      const res = await AxiosInstance.get(endPoints.student.list);

      console.log("📦 Students received:", res.data.data);

      const students = res.data.data;
      const { date, day } = getIndianDateForUI();

      console.log("📅 UI Indian Date:", date);

      setDateInfo({ date, day });

      const map = {};

      students.forEach((student) => {
        const todayAttendance = student.attendance?.find(
          (a) => a.date === date
        );

        map[student._id] = todayAttendance
          ? todayAttendance.present
          : null;

        console.log(
          `🧑 ${student.name} | Today Attendance:`,
          todayAttendance
        );
      });

      setStudentList(students);
      setAttendanceMap(map);
    } catch (error) {
      console.error("🔥 Error loading students:", error);
    }
  };

  // =============================
  // Initial Load
  // =============================
  useEffect(() => {
    console.log("📄 Attendance page mounted");
    loadStudents();
  }, []);

  // =============================
  // Mark Present
  // =============================
  const markAttendance = async (studentId) => {
    console.log("➡️ Marking PRESENT");
    console.log("Student ID:", studentId);

    try {
      const res = await AxiosInstance.post(
        `${endPoints.student.attendance}/${studentId}/attendance`,
        { present: true }
      );

      console.log("✅ Backend response (Present):", res.data);

      setAttendanceMap((prev) => ({
        ...prev,
        [studentId]: true,
      }));
    } catch (error) {
      console.error(
        "❌ Present error:",
        error.response?.data || error
      );
    }
  };

  // =============================
  // Mark Absent (Delete)
  // =============================
  const markAbsent = async (studentId) => {
    console.log("➡️ Marking ABSENT");
    console.log("Student ID:", studentId);
    console.log("Date sent to backend:", dateInfo.date);

    try {
      const res = await AxiosInstance.delete(
        `${endPoints.student.attendance}/${studentId}/attendance`,
        {
          data: {
            date: dateInfo.date,
            present: false,
          },
        }
      );

      console.log("🗑️ Backend response (Delete):", res.data);

      setAttendanceMap((prev) => ({
        ...prev,
        [studentId]: null,
      }));
    } catch (error) {
      console.error(
        "❌ Delete error:",
        error.response?.data || error
      );
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="attendance-container">
      <h2>Student Attendance</h2>

      <div className="date-box">
        {dateInfo.date} | {dateInfo.day}
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Attendance</th>
          </tr>
        </thead>

        <tbody>
          {studentList.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>
                <button
                  className={`btn present ${
                    attendanceMap[student._id] === true ? "active" : ""
                  }`}
                  onClick={() => markAttendance(student._id)}
                  disabled={attendanceMap[student._id] === true}
                >
                  Present
                </button>

                <button
                  className={`btn absent ${
                    attendanceMap[student._id] === false ? "active" : ""
                  }`}
                  onClick={() => markAbsent(student._id)}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}

          {studentList.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
