import {useParams, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/studentDetails/studentDetails.css'
import MonthCard from "../../component/monthCard/monthCard.jsx";
import { useEffect, useState } from "react";
import AxiosInstance from "../../api/axios/axios.js";
import { endPoints } from "../../api/endPoints/endPoints.js";
export default function StudentDetails() {
  const { id } = useParams();
  console.log(id)
  const [data, setData] = useState({})

  const[activeDays, setActive] = useState([])
  
  const handleDayToggle = (day) => {
    setActive((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const getData = async() =>{
    try{
      const response= await AxiosInstance.get(`${endPoints.student.details}/${id}`)
      console.log(response.data.data)
      setData(response.data.data)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const fessPaid = async(month) =>{
console.log(month)
try{
  const response = await AxiosInstance.post(`${endPoints.student.details}/${id}/fees`, {
  month
});
  console.log(response)
  getData()
}catch(error){
  console.log(error)
}
  }


  



const months = ["January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];


  return (
    <div className="detilsSection">
      <div className="container my-4">
    <div className="header">
        <h3>STUDENT DETAILS</h3>
    </div>
    <div className="details">
      <p>Name: {data.name}</p>
      <p>class: {data.class}</p>
      <p>Phone Number: {data.phone}</p>
      <p>School: {data.schoolName}</p>
      <p>Admission Date: {new Date(data.admissionDate).toLocaleDateString()
}</p>
      <p>Address: {data.address}</p>
      <div className="days">
        <p>Days:</p> 
        <div className="dayButtons">
              {days.map((day) => (
                <button
                  key={day}
                  className={`dayBtn ${
                    activeDays.includes(day) ? "activeDay" : ""
                  }`}
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </button>
              ))}
            </div>

      </div>
      <p>Time: 6-8</p>
    </div>
    <div className="monthSection">
         <div className="row g-4 justify-content-center custom-grid">
           {months.map((month, index) => {
             return (
               <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                 <MonthCard month={month} monthId={index} onPaid={fessPaid}/>
               </div>
             );
           })}
         </div>
       </div>
</div>

    </div>
   


  )
}
