import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import Post from "../Pages/Post";

function Home({ user }) {
  const [posts, setPosts] = useState("");
  const [post, setPost] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:4000/post/fetchPost");
      console.log(res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  const handleBack = () => {
    setPost("");
  };
  const handleClick = (post) => {
    console.log(post);
    setPost(post);
  };
  return (
    <>
      {post !== "" ? (
        <>
          <div>Home</div>
          <Link to="/post">Create Post</Link>
          <button onClick={handleBack}>Back</button>
          <Post post={post} user={user} />
        </>
      ) : (
        <div className="Home">
          <div>Home</div>
          <Link to="/post">Create Post</Link>
          {posts ? (
            <div>
              {posts
                .slice()
                .reverse()
                .map((post) => (
                  <div
                    onClick={() => handleClick(post)}
                    key={post._id}
                    className="Post"
                  >
                    <div>{post.title}</div>
                    <div className="PostHeader">
                      <img
                        src={`http://localhost:4000/${post.userProfilePic}`}
                        alt={`${post.username}'s profile`}
                      />
                      <div>
                        <h3>{post.username}</h3>
                      </div>
                    </div>
                    <img
                      src={`http://localhost:4000/${post.image}`}
                      alt={post.title}
                      className="PostImage"
                    />
                    <p className="PostDescription">{post.description}</p>
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
