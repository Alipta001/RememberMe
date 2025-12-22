import { useState } from "react";
import "../../css/homeDashboardCss/homeDashboard.css";
import AddStudent from "../../component/addStudent/addStudent";
import DashboardCard from "../../component/dashboardCard/dashboardCard";

export default function HomeDashboard({ addStudent }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="home-dashboard">
      <div className="home-dashboard-container">
        <h3 className="dashboard-heading">Dashboard</h3>

        <DashboardCard />

        <div className="add-student-btn">
          <button onClick={openModal}>Add Student</button>
        </div>

        {showModal && (
  <AddStudent
    onClose={closeModal}
    addStudent={addStudent}
  />
)}
      </div>
    </div>
  );
}
