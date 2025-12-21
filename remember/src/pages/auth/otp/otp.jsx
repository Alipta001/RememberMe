import React from "react";
import axios from "axios";
import { endPoints } from "../../../api/endPoints/endPoints";
import AxiosInstance from "../../../api/axios/axios";
import { Link, useNavigate } from "react-router-dom";

export default function OtpPage() {
  const email = localStorage.getItem("email");

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = value;
    if (value) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let otpValue = "";
    for (let i = 0; i < 6; i++) {
      const box = document.getElementById(`otp-${i}`);
      otpValue += box.value;
    }
    const data = {
      email: email,
      otp: otpValue,
    };
    console.log("Payload sending to API:", data);
    try {
      const response = await AxiosInstance.post(endPoints.auth.otp, data);

      if (response.data.status === true) {
        alert("OTP Verified Successfully");
        navigate("/")
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("OTP verification failed", error);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>OTP Verification</h2>
      <p>
        Your mail id is - <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                fontSize: "20px",
              }}
            />
          ))}
        </div>

        <br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Verify OTP
        </button>
        <Link to="/"></Link>
      </form>
    </div>
  );
}