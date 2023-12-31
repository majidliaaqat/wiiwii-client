import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./components/Header";
import Post from "./Pages/Post";
import ContactUs from "./Pages/ContactUs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState("");

  console.log("Authentication: ", isAuthenticated);
  return (
    <div className="App">
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      ></Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/post"
            element={
              isAuthenticated ? (
                <CreatePost userId={user ? user._id : ""} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/fullpost" element={<Post />} />
          <Route path="/contact_us" element={<ContactUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
