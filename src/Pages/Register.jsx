import React, { useState } from "react";
import "../styles/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.username === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      toast.error("Please fill out all fields before submitting!", {
        position: "top-right",
        autoClose: false,
        progress: false,
      });
      return;
    } else if (!file) {
      toast.error("Please upload profile picture before submitting!", {
        position: "top-right",
        autoClose: false,
        progress: false,
      });
      return;
    }

    console.log(formData);
    console.log("File", file);

    const dataToSend = new FormData();
    dataToSend.append("profilepic", file);
    dataToSend.append("firstname", formData.firstName);
    dataToSend.append("lastname", formData.lastName);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    dataToSend.append("username", formData.username);

    //Print Form Data Object
    const formDataObject = {};
    for (const [key, value] of dataToSend.entries()) {
      formDataObject[key] = value;
    }

    console.log("Sent Data Object:", formDataObject);

    fetch("http://localhost:4000/auth/register", {
      method: "POST",
      body: dataToSend,
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          toast.success("User Registered Successfully!", {
            position: "top-right",
            autoClose: false,
            progress: false,
          });
          navigate("/login");

          // Clear the form data
          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
          });
          setFile(null);
        } else if (res.status === 409) {
          toast.error("User with this Email or Username already exist!", {
            position: "top-right",
            autoClose: false,
            progress: false,
          });
        } else if (res.status === 500) {
          console.log(res);
          toast.error("Failed to Save User!", {
            position: "top-right",
            autoClose: false,
            progress: false,
          });
        } else {
          toast.error("Internal Server Error!", {
            position: "top-right",
            autoClose: false,
            progress: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  //Updates Value after every change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // File Change Handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="signup-app-wrap">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;800&family=Raleway:wght@600&display=swap');
      </style>
      <div className="primary-content">
        <div className="signup-block">
          <h2>Register Now</h2>
          <form>
            <div className="fullname-group">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="fname-field"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="lname-field"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="user-field"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="mail-field"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="pass-field"
              value={formData.password}
              onChange={handleChange}
            />
            <h4>Upload Profile Picture</h4>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="img-upload-field"
            />
            <button onClick={handleSubmit} type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Register;
