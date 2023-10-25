import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post({ post, username }) {
  const [comment, setComment] = useState("");
  const [allcomments, setAllComments] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:4000/msg/fetchmsg/${post._id}`
      );
      console.log(res);
      setAllComments(res.data);
    };
    fetchMessages();
  }, []);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleClick = async () => {
    const data = {
      postID: post._id,
      text: comment,
      author: username,
    };
    console.log(data);
    try {
      const res = await axios.post("http://localhost:4000/msg/message", data);
      if (res.status === 201) {
        toast.success("Message Posted sucessfully!", {
          position: "top-right",
          autoClose: false,
          progress: false,
        });
        console.log(res);
      } else if (res.status === 400) {
        toast.error("Unable to post message!", {
          position: "top-right", // Set the toast position
          autoClose: false,
          progress: false,
        });
      }
    } catch (error) {
      toast.error("Internal Server Error!", {
        position: "top-right", // Set the toast position
        autoClose: false,
        progress: false,
      });
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <div>{post.title}</div>
      <img src={`http://localhost:4000/${post.image}`} alt={post.title} />
      <div>{post.description}</div>
      <div>Enter a comment:</div>
      {allcomments &&
        allcomments.map((comment) => (
          <>
            <div>{comment.author}</div>
            <div>{comment.text}</div>
          </>
        ))}
      <input
        type="text"
        placeholder="Enter comment here"
        value={comment}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Submit</button>
      <ToastContainer />
    </>
  );
}

export default Post;
