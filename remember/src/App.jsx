import { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import Navbar from './layout/nav/navbar'
import Student from './layout/student/student'
import StudentDetails from './pages/studentDetails/studentDetails'
import Home from './pages/home/home'
import AddStudent from './component/addStudent/addStudent'
import Login from './pages/auth/login/login'
import Register from './pages/auth/register/register'
import OtpPage from './pages/auth/otp/otp';


function Private({children}){
  const token = localStorage.getItem("token")  || sessionStorage.getItem("token");
  return token != null || token != undefined?(
    children
  ): (
    <>
    <Navigate to={"/"} />
    {alert("login first")}
    </>
  )
}
function App() {
    const [students, setStudent] = useState([])
    /*{
      id:1,
      name: "Alipta Ghosh",
      class: "2nd year",
    },
    {
      id:2,
      name: "riya",
      class: "1",
    },
    {
      id:3,
      name: "rahul",
      class: "2",
    },
    {
      id:4,
      name: "ankit",
      class: "3",
    },
    {
      id:5,
      name: "raj",
      class: "4",
    },
  ]);
 */
 useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudent(storedStudents);
  }, []);
  const addStudent = (newStudent) =>{
     
    // Get the last ID from localStorage (default 0)
    const lastId = parseInt(localStorage.getItem("lastStudentId") || "0", 10);
    const newId = lastId + 1;

    // Create updated student list
    const updatedList = [...students, { id: newId, ...newStudent }];

    // Save new data
    setStudent(updatedList);
    localStorage.setItem("students", JSON.stringify(updatedList));
    localStorage.setItem("lastStudentId", newId.toString()); 
  }
  const publicRoute = [
    {
      path:'/',
      component: <Login />
    },
    {
      path: '/auth/register',
      component: <Register />
    },
    {
      path: `/auth/otp`,
      component: <OtpPage />,
    },
  ]

  const privateRoute = [
    {
      path:'/student/home',
      component: <Home />
    },
    {
      path:'/student/details/:id',
      component:<StudentDetails />
    }
  ]
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<Home students={students}  addStudent={ addStudent}/>} />
      <Route path='/studentDetails/:id' element={<StudentDetails />} /> */}
       {/* <Route path="/addStudent" element={<AddStudent />} /> */}

       {
        publicRoute.map((item)=>{
          return <Route path={item.path} element={item.component} />
        })
       }
       {
        privateRoute.map((item)=>{
            return <Route path={item.path} element={<Private>{item.component}</Private>} />;
        })
       }
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
