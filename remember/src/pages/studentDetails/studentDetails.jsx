import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/studentDetails/studentDetails.css";
import MonthCard from "../../component/monthCard/monthCard.jsx";
import { useEffect, useState } from "react";
import AxiosInstance from "../../api/axios/axios.js";
import { endPoints } from "../../api/endPoints/endPoints.js";
import UpdateStudentDetails from "../../component/updateStudentDetails/updateStudentDetails.jsx";

export default function StudentDetails() {
  const { id } = useParams();
  /*  console.log(id); */
  const [data, setData] = useState({});
  const [feesPaidMonth, setFeesPaidMonth] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [showFeesMonth, setShowFeesMonth] = useState(4);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    try {
      const response = await AxiosInstance.get(
        `${endPoints.student.details}/${id}`
      );
      console.log(response.data.data);
      setData(response.data.data);
      setFeesPaidMonth(response.data.data.feesPaidMonths);
      console.log(response.data.data.feesPaidMonths, "feesPaidMonths array");
      /* console.log(response.data.data.weekdays, "weekdays"); */
      setWeekDays(response.data.data.weekdays);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    const handler = () => getData();
    window.addEventListener("student-updated", handler);
    return () => window.removeEventListener("student-updated", handler);
  }, []);

  const fessPaid = async (month) => {
    console.log(month);

    try {
      const response = await AxiosInstance.put(
        `${endPoints.student.details}/${id}/fees`,
        {
          month,
        }
      );
      /* console.log(response); */
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //Delete student fees paid month
  const deletePaidMonth = async (month) => {
    if (feesPaidMonth.includes(month)) {
      try {
        const deleteFeesPaidMonth = await AxiosInstance.put(
          `${endPoints.student.details}/${id}/fees/remove`,
          { month }
        );

        if (deleteFeesPaidMonth.data.success === true) {
          /* console.log(deleteFeesPaidMonth, "After deleteFeesPaidMonth") */
          getData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Add Weekdays in the database
  const addWeekDays = async (day) => {
    if (weekDays.includes(day)) {
      try {
        const deleteDay = await AxiosInstance.put(
          `${endPoints.student.details}/${id}/weekdays/remove`,
          { day }
        );
        getData();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await AxiosInstance.put(
          `${endPoints.student.details}/${id}/weekdays`,
          { day }
        );
        /* console.log(response, "Weekdays response"); */
        if (response.data.success === true) {
          /*  console.log(response.data.success); */
          getData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //set how many month to show
  const handleShowMonth = () => {
    if (showFeesMonth !== 4) setShowFeesMonth(4);
    else setShowFeesMonth(12);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  return (
    <div className="detilsSection">
      <div className="container my-4">
        {!showModal && (
          <div className="header">
            <h3>STUDENT DETAILS</h3>
          </div>
        )}
        <div className="details">
          <p>Name: {data.name}</p>
          <p>class: {data.class}</p>
          <p>Phone Number: {data.phone}</p>
          <p>School: {data.schoolName}</p>
          <p>
            Admission Date: {new Date(data.admissionDate).toLocaleDateString()}
          </p>
          <p>Address: {data.address}</p>
          <div className="days">
            <p>Days:</p>
            <div className="dayButtons">
              {days.map((day) => (
                <button
                  key={day}
                  className={`dayBtn ${
                    weekDays.includes(day) ? "activeDay" : ""
                  }`}
                  onClick={() => {
                    addWeekDays(day);
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <p>Time: 6-8</p>
          <div className="actionButtons">
  <div className="editBtn">
    <button
      className="edit-details-btn"
      onClick={() => setShowModal(true)}
    >
      ✏️ Edit Details
    </button>

    {showModal && (
      <UpdateStudentDetails onClose={() => setShowModal(false)} />
    )}
  </div>

  <button className="attendance-btn">
    📊 View Attendance
  </button>
</div>

        </div>
        {!showModal && (
          <div className="monthSection">
            <div className="row g-3 justify-content-center custom-grid">
              {months.slice(0, showFeesMonth).map((month, index) => {
                return (
                  <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3">
                    <MonthCard
                      month={month}
                      monthId={index}
                      onPaid={fessPaid}
                      deletePaidMonth={deletePaidMonth}
                      feesPaidMonth={feesPaidMonth}
                    />
                  </div>
                );
              })}
              <div className="showBtn">
                <button
                  className="show-toggle-btn"
                  onClick={() => handleShowMonth()}
                >
                  {showFeesMonth === 4 ? "SHOW ALL" : "ShOW LESS"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
