import React, { useState } from "react";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          <Route
            path="/"
            element={<Home username={user.firstname + " " + user.lastname} />}
          />
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
                <CreatePost userID={user._id} />
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
