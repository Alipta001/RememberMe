// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../../css/card.css";
// import StudentDetails from "../../pages/studentDetails/studentDetails";
// import AxiosInstance from "../../api/axios/axios";
// import { endPoints } from "../../api/endPoints/endPoints";
// export default function Card({ student, deleteStudent }) {
//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">{student.name}</h5>
//         <p className="card-text">{student._id}</p>
//         <p className="card-text">{student.class}</p>
//         <div className="btn">
//           <Link
//             to={`/student/details/${student._id}`}
//             className="btn btn-primary"
//           >
//             View Details
//           </Link>
//           <button onClick={() => deleteStudent(student._id)}>DELETE</button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../deleteModal/deleteModal";
import "../../css/card.css";

export default function Card({ student, deleteStudent }) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <div className="student-card">
        <div className="student-card-info">
          <h3>{student.name}</h3>
          <p>Phone: <span>{student.phone}</span></p>
          <p>Class: <span>{student.class}</span></p>
        </div>

        <div className="student-card-actions">
          <Link to={`/student/details/${student._id}`} className="btn view-btn">
            View
          </Link>
          <button
            className="btn delete-btn"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {openDelete && (
        <DeleteModal
          studentName={student.name}
          onCancel={() => setOpenDelete(false)}
          onConfirm={() => {
            deleteStudent(student._id);
            setOpenDelete(false);
          }}
        />
      )}
    </>
  );
}
