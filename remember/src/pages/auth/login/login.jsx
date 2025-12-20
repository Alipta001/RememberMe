/* import React from "react";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const handle = (e) => {
 console.log(e); 
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <>
      <div className="login">
        <div className="container">
          <form action="" onSubmit={handleSubmit}>
            <div className="name">
              <label htmlFor="name">USERNAME</label>
              <input type="text" name="name" onChange={handle} />
            </div>
            <div className="password">
              <label htmlFor="password">PASSWORD</label>
              <input type="password" name="password" onChange={handle} />
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
 */


import React, { useState } from "react";
import "../../../css/loginCss/login.css";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endPoints";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("password is required")
  .min(4,"Minimum 4 character")
})

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });


  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handle = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async(data) => {
    console.log(data);
    const loginData = {
      email:data.email,
      password:data.password
    }
    try{
      /* console.log(loginData) */
      const response = await AxiosInstance.post(
        endPoints.auth.login,
        loginData
      )
    console.log(response)
    if(response.data.status === true){
      alert(response.data.msg);
      sessionStorage.setItem("token",response.data.token)
      navigate("/student/home")
    }
  else {
      alert(response.data.msg);
    }
  }
    catch (error) {
    // 🔑 THIS IS THE FIX
    if (error.response && error.response.data) {
      alert(error.response.data.msg); // backend message
    } else {
      alert("Server not responding. Please try again later.");
    }

    console.error("Login error:", error);
  }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Avatar - given by chatgpt*/}
        <div className="avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="User Avatar"
          />
        </div>

        <form onSubmit={handleSubmit(handleClick)}>
          <div className="inputBox">
            <label>Email</label>
            <input
            id="email"
              type="email"
              placeholder="Enter your Email"
              {...register("email")}
            />
            {errors.email && (<span>{errors.email.message}</span>)}
          </div>

          <div className="inputBox">
            <label>Password</label>

            <div className="password-field">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (<span>{errors.password.message}</span>)}
            </div>
          </div>
          <input type="submit" className="login-btn" value={"LOGIN"}/>
          <Link to="/auth/register" className="create-account-link">
  Create an Account
</Link>
        </form>
      </div>
    </div>
  );
}
