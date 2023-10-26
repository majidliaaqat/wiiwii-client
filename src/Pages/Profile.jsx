import { React, useState } from "react";
import "../styles/Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Profile() {
  const JSONuser = localStorage.getItem("user");
  const user = JSON.parse(JSONuser);
  console.log("User Name:", user.firstname);
  console.log("User in Profile: ", user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleOldChange = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:4000/auth/update/${user._id}`,
        {
          oldPassword,
          newPassword,
        },
        axiosConfig
      );
      console.log("Response: ", res);
      if (res.status === 200) {
        toast.success("Password Updated Successfully!", {
          position: "top-right",
          autoClose: false,
          progress: false,
        });
      } else if (res.status === 221) {
        toast.error("Invalid Old Password!", {
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
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Internal Server Error!", {
        position: "top-right",
        autoClose: false,
        progress: false,
      });
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/auth/delete/${user._id}`
      );
      if (res.status === 200) {
        console.log("User Deleted!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };
  return (
    <div className="UserWrapper">
      <div className="UserHeaderArea">
        <img
          src={`http://localhost:4000/${user.profilepic}`}
          alt={`${user.firstname}'s Profile`}
        />
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>@{user.username}</p>
        <p>Email: {user.email}</p>
        <div className="ChangePassText">Update Your Password</div>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={handleOldChange}
        />
        <br />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handleNewChange}
        />
        <br />
        <button onClick={handleSubmit}>Update Password</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Profile;
