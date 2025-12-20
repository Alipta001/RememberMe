// import { useState,useEffect } from "react";

// import Navbar from "../../layout/nav/navbar";
// import Student from "../../layout/student/student";
// import HomeDashboard from "../../layout/homeDashboard/homeDashboard";
// export default function Home({students}) {
//   /* const [students, setStudents] = useState([]); */

//   // Load students from localStorage when the page loads
//   /* useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("students")) || [];
//     setStudents(stored);
//   }, []); */
//   return (
//     <>
//       <Navbar />
//       <HomeDashboard />
//       <Student students={students}></Student>
//     </>
//   );
// }

import { useState } from "react";
import Navbar from "../../layout/nav/navbar";
import Student from "../../layout/student/student";
import HomeDashboard from "../../layout/homeDashboard/homeDashboard";
import AddStudent from "../../component/addStudent/addStudent";

export default function Home({ students, addStudent }) {
    /* const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false); */
  return (
    <>
      <Navbar />
      <HomeDashboard addStudent={addStudent}/>
      <Student students={students} />

     
        {/* <AddStudent
              onClose={() => setShowForm(false)}
              addStudent={addStudent}  // ✅ pass addStudent properly
            /> */}

    </>
  );
}
