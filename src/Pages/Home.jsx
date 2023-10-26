import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import Post from "../Pages/Post";

function Home() {
  const JSONuser = localStorage.getItem("user");
  const user = JSON.parse(JSONuser);
  console.log("User in Home: ", user);
  const [posts, setPosts] = useState("");
  const [fullpost, setFullPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/post/fetchPost");
      console.log(res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleBack = () => {
    setFullPost("");
  };

  const handleClick = (post) => {
    setFullPost(post);
  };

  return (
    <>
      {fullpost !== "" ? (
        <>
          <Link to="/post" className="advertisement-link">
            Add Advertisement
          </Link>
          <button onClick={handleBack} className="return-button">
            Back
          </button>

          <Post post={fullpost} user={user} />
        </>
      ) : (
        <div className="Homepage">
          <Link to="/post" className="advertisement-link">
            Add Advertisement
          </Link>
          {posts ? (
            <div className="Advertisements">
              {posts
                .slice()
                .reverse()
                .map((post) => (
                  <div
                    onClick={() => handleClick(post)}
                    key={post._id}
                    className="Advertisement"
                  >
                    <div>{post.title}</div>
                    <div className="AdvertisementAuthor">
                      <img
                        src={`http://localhost:4000/${post.user.profilepic}`}
                        alt={`${post.username}'s profile`}
                      />
                      <div>
                        <h3>{post.user.username}</h3>
                      </div>
                    </div>
                    <img
                      src={`http://localhost:4000/${post.image}`}
                      alt={post.title}
                      className="AdvertisementImage"
                    />
                    <p className="AdvertisementText">{post.description}</p>
                    <h4>Click Here To View Full Add</h4>
                  </div>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
