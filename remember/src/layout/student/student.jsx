// import { useEffect, useState } from "react";
// /* import "bootstrap/dist/css/bootstrap.min.css"; */
// import "../../css/student.css";
// import Card from "../../component/card/card";
// import AxiosInstance from "../../api/axios/axios";
// import { endPoints } from "../../api/endPoints/endPoints";
// import { useParams } from "react-router-dom";

// export default function Student() {
//   const [students, setStudents] = useState([]);

//   /*  useEffect(() => {
//   fetchStudents();
// },[]) */

// // useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await AxiosInstance.get("/api/students/list", {
// //           headers: {
// //             "x-auth-token": sessionStorage.getItem("token"),
// //           },
// //         });

// //         console.log("STUDENTS FROM API:", response.data);
// //         setStudents(response.data);

// //         /*  navigate("/student"); */
// //       } catch (err) {
// //         console.error(
// //           "Failed to fetch students",
// //           err.response?.data || err.message
// //         );
// //       }
// //     };
// //     fetchStudents()
// //   }, []);

// /* const { id }= useParams */

// const fetchStudents = async () => {
//       try {
//         const response = await AxiosInstance.get(endPoints.student.list);
//         console.log("FULL API RESPONSE:", response.data.data);

//         if (response.data.success === true) {
//           setStudents(response.data.data);
//         }
//       } catch (error) {
//         console.log("Error fetching products", error);
//       }
//     };

//   useEffect(() => {
//     fetchStudents();
//     const handler = () => fetchStudents();
//   window.addEventListener("student-added", handler);

//   return () => window.removeEventListener("student-added", handler);
//   }, []);

//   //delete student
//   const deleteStudent = async(id) =>{
//     try{
//       const response = await AxiosInstance.delete(`${endPoints.student.delete}/${id}`)
//       fetchStudents()
//     }catch(error){
//       console.log(error)
//     }
//   }

//   return (
//   <div className="container text-center my-5">
//     {students && students.length > 0 ? (
//       <div className="student-cards-container">
//         {students.map((item, idx) => (
//           <Card key={idx} student={item} deleteStudent={deleteStudent} />
//         ))}
//       </div>
//     ) : (
//       <div className="row g-4 justify-content-center">
//         <div className="col-12 col-md-6 col-lg-4">
//           <div className="card no-data-card shadow-sm border-0">
//             <div className="card-body py-5">
//               <h5 className="card-title text-secondary mb-3">
//                 No Students Available
//               </h5>
//               <p className="card-text text-muted no-student-text">
//                 You haven’t added any students yet.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
// }

import { useEffect, useState } from "react";
import Card from "../../component/card/card";
import "../../css/student.css";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(8);

  const fetchStudents = async () => {
    try {
      const response = await AxiosInstance.get(endPoints.student.list);
      if (response.data.success) setStudents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    const handler = () => fetchStudents();
    window.addEventListener("student-added", handler);
    return () => window.removeEventListener("student-added", handler);
  }, []);

 


  const deleteStudent = async (id) => {
    try {
      await AxiosInstance.delete(`${endPoints.student.delete}/${id}`);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="student-page-wrapper">
      <div className="student-page-header">
        <h2 className="student-title">STUDENTS</h2>
      </div>

      {students.length > 0 ? (
        <div className="student-cards-container">
          {students.slice(0, showStudents).map((student, idx) => (
            <Card key={idx} student={student} deleteStudent={deleteStudent} />
          ))}
        </div>
      ) : (
        <div className="no-data-card">
          <h5>No Students Available</h5>
          <p className="no-student-text">You haven’t added any students yet.</p>
        </div>
      )}
      <div className="showMore">
        <button onClick={()=>setShowStudents(showStudents + 4)}>SHOW MORE</button>
        <button onClick={()=>{if(showStudents !==8)setShowStudents(showStudents -4)}}>SHOW LESS</button>
      </div>
    </div>
  );
}
