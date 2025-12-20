import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/homeDashboard.css"
import AddStudent from "../../component/addStudent/addStudent";
import DashboardCard from "../../component/dashboardCard/dashboardCard";
export default function HomeDashboard({addStudent}) {

   const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);



  return (
    <div className="HomeDashboard">
      <div className="container">
        <h3 className="text-center mb-4 dashboard-heading">Dashboard</h3>
        <DashboardCard />
        
        <div className="addStdBtn">
            <button onClick={openModal}>Add Student</button>
        </div>

        {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <AddStudent onClose={closeModal} addStudent={addStudent}/>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
