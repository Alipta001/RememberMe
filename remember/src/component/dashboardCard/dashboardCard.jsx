import React from 'react'
import '../../componentCss/dashboardCard/dashboardCard.css'
export default function DashboardCard() {
  return (
    <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Students</h5>
                <p className="card-value text-primary">25</p>
                <p className="card-text">Active Students</p>
                <button className="btn btn-outline-primary w-100">
                  View Students
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Fees Paid</h5>
                <p className="card-value text-success">18</p>
                <p className="card-text">This Month</p>
                <button className="btn btn-outline-success w-100">
                  Payment Report
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5 className="card-title">Pending Fees</h5>
                <p className="card-value text-danger">7</p>
                <p className="card-text">Students Remaining</p>
                <button className="btn btn-outline-danger w-100">
                  View Pending
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}
