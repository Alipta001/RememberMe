import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { endPoints } from "../../../api/endPoints/endPoints";
import AxiosInstance from "../../../api/axios/axios";

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
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit(handleClick)}
        // style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name">First Name:</label>
        <input
          {...register("name", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your name"
        />
        {errors.name && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.name.message}
          </span>
        )}
        <br />

        <label htmlFor="email">Email:</label>
        <input
          {...register("email", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your Email"
        />
        {errors.email && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.email.message}
          </span>
        )}
        <br />

        <label htmlFor="password">Password:</label>
        <input
          {...register("password", { required: true })}
          style={{ marginBottom: "10px", marginLeft: "10px" }}
          placeholder="Enter your Password"
        />
        {errors.password && (
          <span
            style={{ color: "red", marginBottom: "10px", marginLeft: "10px" }}
          >
            {errors.password.message}
          </span>
        )}
        <br />
        <br />

        <input type="submit" />
        <br />
        {/* <Link to="/auth/otp"></Link> */}
      </form>
    </>
  );
}