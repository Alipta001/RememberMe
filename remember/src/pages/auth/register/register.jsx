import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { endPoints } from "../../../api/endPoints/endPoints";
import AxiosInstance from "../../../api/axios/axios";
import "../../../css/registerCss/register.css"

const schema = yup.object().shape({
  name: yup
    .string()
    // .firstName("First is required")
    .required("Name is required"),

  email: yup.string().email("Invalid Email").required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "password cannot exceed 20 characters")
    .required("Password is required"),
  
});
export default function Register() {


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  

  const handleClick = async (data) => {
    console.log("Name", data.name);
    // console.log("lastname", data.lastName);
    // console.log("email", data.email);
    // console.log("password", data.password);
    // console.log("confirm Password", data.password);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    console.log(formData.get("name"));
    try {
      const response = await AxiosInstance.post(
        endPoints.auth.register,
        formData
      );
      console.log("API RESPONSE:", response.data);

      if (response.data.status === true) {
        alert(response.data.msg);
         console.log("NAVIGATING TO OTP PAGE");
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        navigate("/auth/otp");
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);
    }
  };
  return (
    <>
     <div className="register-page">
  <div className="register-container">
    <h1 className="register-title">Register</h1>
    <form onSubmit={handleSubmit(handleClick)} className="register-form">

      <div className="form-group">
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder=" "
        />
        <label>First Name</label>
        {errors.name && <span className="error-msg">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder=" "
        />
        <label>Email</label>
        {errors.email && <span className="error-msg">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder=" "
        />
        <label>Password</label>
        {errors.password && <span className="error-msg">{errors.password.message}</span>}
      </div>

      <input type="submit" className="submit-btn" value="Register" />

      <Link to="/" className="login-link">Already have an account? Login</Link>

    </form>
  </div>
</div>
    </>
  );
}