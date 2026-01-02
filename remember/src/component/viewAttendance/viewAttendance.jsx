/* import React, { useEffect, useState } from "react";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";
import { useParams } from "react-router-dom";

export default function ViewAttendance() {
    const [data, setData] = useState();
    const {id} = useParams();
    const getData = async() =>{
        try{
            const response = await AxiosInstance.get(`${endPoints.student.viewAttendance}/${id}/attendance-report`)
            console.log("Attendance Report:", response)
        }catch(error){
            console.log("Error in getting attendance report:", error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
      <div className="viewAttendance-section">
        <div className="container">
          <div className="row">
            <ol>
              <li>
                <div className="date"></div>
                <div className="day"></div>
                <div className="status"></div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
 */


import React, { useEffect, useState } from "react";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";
import { useParams } from "react-router-dom";
import "../../css/viewAttendanceModalCss/viewAttendance.css"
export default function ViewAttendance({onClose}) {
    const [data, setData] = useState([]);
    const {id} = useParams();
    const getData = async() =>{
        try{
            const response = await AxiosInstance.get(`${endPoints.student.viewAttendance}/${id}`)
            console.log("Attendance Report:", response.data.data.attendance)
            setData(response.data.data.attendance)
        }catch(error){
            console.log("Error in getting attendance report:", error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
      <div className="attendance-overlay">
  <div className="attendance-modal">

    {/* Header */}
    <div className="attendance-header">
      <h3>Attendance Report</h3>
      <button className="attendance-close" onClick={onClose}>✕</button>
    </div>

    {/* List */}
    <ol className="attendance-list">
        {
            data.map((item,index)=>{
                return <li className="attendance-row">
        <span className="attendance-date">{item.date}</span>
        <span className="attendance-day">Monday</span>
        <span className="attendance-status present">{item.present===true? "Present": "Absent"}</span>
      </li>
            })
        }

      {/* <li className="attendance-row">
        <span className="attendance-date">29 Dec 2025</span>
        <span className="attendance-day">Sunday</span>
        <span className="attendance-status absent">Absent</span>
      </li> */}
    </ol>

  </div>
</div>

    </>
  );
}