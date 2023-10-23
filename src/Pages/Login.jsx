import React, { useState } from "react";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  //Email Validation

  function VerifyEmail(_email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(_email);
  }
  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      toast.error("Please fill out both fields before submitting!", {
        position: "top-right",
        autoClose: false,
        progress: false,
      });
      return;
    }
    let data;
    if (VerifyEmail(formData.username)) {
      data = {
        username: "",
        email: formData.username,
        password: formData.password,
      };
    } else {
      data = {
        username: formData.username,
        email: "",
        password: formData.password,
      };
    }
    const res = await axios.post("http://localhost:4000/auth/login", data);
    console.log("Response", res);
    if (!res) {
      console.log("Unauthorized");
      return;
    }
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate("/");
    } else if (res.status === 401) {
      console.log("Unauthorized");
    }

    // Clear the form data
    setFormData({
      username: "",
      password: "",
    });
  };

  // Updates Value after every change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-app-container">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;800&family=Raleway:wght@600&display=swap');
      </style>
      <div className="main-content">
        <div className="login-form">
          <h2>Login Here</h2>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input-field input"
              value={formData.password}
              onChange={handleChange}
            />
            <button onClick={handleSubmit} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
