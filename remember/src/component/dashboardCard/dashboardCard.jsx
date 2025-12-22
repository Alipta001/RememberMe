import React, { useEffect, useState } from "react";
import "../../componentCss/dashboardCard/dashboardCard.css";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";

export default function DashboardCard() {
  const [students, setStudents] = useState([]);
  const getData = async () => {
    try {
      const response = await AxiosInstance.get(endPoints.student.list);
      console.log(response);
      if (response.data.success === true) setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dashboard-grid">
      <div className="dashboard-col">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <h5 className="dashboard-title">Total Students</h5>
            <p className="dashboard-value primary">{students.length}</p>
            <p className="dashboard-text">Active Students</p>
            <button
              className="dashboard-btn primary"
              onClick={() => {
                window.scrollBy({
                  top: 500, // scrolls to 800px from top
                  behavior: "smooth",
                });
              }}
            >
              View Students
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-col">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <h5 className="dashboard-title">Fees Paid</h5>
            <p className="dashboard-value success">0</p>
            <p className="dashboard-text">This Month</p>
            <button className="dashboard-btn success">Payment Report</button>
          </div>
        </div>
      </div>

      <div className="dashboard-col">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <h5 className="dashboard-title">Pending Fees</h5>
            <p className="dashboard-value danger">0</p>
            <p className="dashboard-text">Students Remaining</p>
            <button className="dashboard-btn danger">View Pending</button>
          </div>
        </div>
      </div>
    </div>
  );
}
