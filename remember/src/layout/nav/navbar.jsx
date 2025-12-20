/* import React from 'react'
import '../../css/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
  <div className="logo">
    <span>Remember<span className="highlight">Me</span></span>
  </div>
  <ul className="links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Student Details</a></li>
    <li><a href="#">Pay</a></li>
  </ul>
</nav>


  )
} */


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for collapse toggle
import "../../css/navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email")
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid px-4">
        {/* Brand / Logo */}
        <a className="navbar-brand logo-text" href="#">
          Remember<span className="highlight">Me</span>
        </a>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Student Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pay
              </a>
            </li>
            <li><button onClick={handleLogout}>LogOut</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

