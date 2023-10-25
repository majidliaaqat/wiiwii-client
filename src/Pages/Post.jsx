import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post({ post, user }) {
  console.log(user._id);
  // Added userId prop
  const [comment, setComment] = useState("");
  const [allcomments, setAllComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/msg/fetchmsg/${post._id}`
        );
        console.log("Fetched Comments: ", res.data);
        setAllComments(res.data);
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    };

    fetchMessages();
  }, [post._Id, refreshComments]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = async () => {
    // console.log("post._id:", post._id);
    console.log("user:", user._id);

    const data = {
      postId: post._id,
      text: comment,
      userId: user._id,
    };

    console.log(data);

    try {
      const res = await axios.post("http://localhost:4000/msg/message", data);
      if (res.status === 201) {
        toast.success("Message Posted successfully!", {
          position: "top-right",
          autoClose: false,
          progress: false,
        });
        console.log(res);
        setComment("");
        setRefreshComments(!refreshComments);
      } else if (res.status === 400) {
        toast.error("Unable to post message!", {
          position: "top-right",
          autoClose: false,
          progress: false,
        });
      }
    } catch (error) {
      toast.error("Internal Server Error!", {
        position: "top-right",
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
      {allcomments.length > 0 &&
        allcomments.map((comment) => (
          <div key={comment._id}>
            {" "}
            {/* Each child in a list should have a unique key */}
            <div>{comment.user}</div>
            <div>{comment.text}</div>
          </div>
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
