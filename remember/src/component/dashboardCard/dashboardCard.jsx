import React from "react";
import "../../componentCss/dashboardCard/dashboardCard.css";

export default function DashboardCard() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-col">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <h5 className="dashboard-title">Total Students</h5>
            <p className="dashboard-value primary">25</p>
            <p className="dashboard-text">Active Students</p>
            <button className="dashboard-btn primary">
              View Students
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-col">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <h5 className="dashboard-title">Fees Paid</h5>
            <p className="dashboard-value success">18</p>
            <p className="dashboard-text">This Month</p>
            <button className="dashboard-btn success">
              Payment Report
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-col">
        <div className="dashboard-card">
          <div className="dashboard-card-body">
            <h5 className="dashboard-title">Pending Fees</h5>
            <p className="dashboard-value danger">7</p>
            <p className="dashboard-text">Students Remaining</p>
            <button className="dashboard-btn danger">
              View Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
