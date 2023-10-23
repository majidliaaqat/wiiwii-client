import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    console.log("Username:", username);

    axios
      .get(`/api/users/${username}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [username]);

  return (
    <div className="profile-container">
      {user ? (
        <div>
          <h2>Profile Page</h2>
          <div>
            <img src={user.profilepic} alt="Profile Pic" />
          </div>
          <div>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Profile;
