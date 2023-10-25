import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Post({ post, user }) {
  // Added userId prop
  const [comment, setComment] = useState("");
  const [allcomments, setAllComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const [edit, setEdit] = useState("");
  const [editText, setEditText] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/msg/message/${post._id}`
        );
        console.log("Fetched Comments: ", res.data);
        setAllComments(res.data);
        setRefreshComments(false);
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    };

    fetchMessages();
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/msg/message/${post._id}`
        );
        console.log("Fetched Comments: ", res.data);
        setAllComments(res.data);
        setRefreshComments(false);
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    };
    if (refreshComments) {
      fetchMessages();
    }
  }, [refreshComments]);
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
        console.log("comment = ", res);
        setComment("");
        setRefreshComments(true);
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
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/msg/message/${id}`);
      if (res.status === 200) {
        console.log("Message Deleted");
        setRefreshComments(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleEdit = async (id) => {
    if (!edit) {
      setEdit(id);
    } else {
      try {
        const res = await axios.put(`http://localhost:4000/msg/message/${id}`, {
          text: editText,
        });
        if (res.status === 200) {
          console.log("Comment Updated!");
          setRefreshComments(true);
          setEdit("");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };
  return (
    <>
      <div>{post.title}</div>
      <img
        style={{ height: "30px", width: "30px" }}
        src={`http://localhost:4000/${post.user.profilepic}`}
      />
      <div>{post.user.username}</div>
      <img
        style={{ height: "30px", width: "30px" }}
        src={`http://localhost:4000/${post.image}`}
        alt={post.title}
      />
      <div>{post.description}</div>
      {allcomments.map((comment) => (
        <div key={comment._id}>
          <div>{comment.user.username}</div>
          <input
            type="text"
            name="commentText"
            onChange={handleEditChange}
            value={edit === comment._id ? editText : comment.text}
            disabled={edit !== comment._id ? true : false}
          />
          {user._id === comment.user._id && (
            <>
              <button onClick={(e) => handleEdit(comment._id)}>
                {edit === comment._id ? "Update" : "Edit"}
              </button>
              <button onClick={(e) => handleDelete(comment._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {/* <label htmlFor="commentInput" className="visually-hidden">
        Enter a comment
      </label> */}
      {user && (
        <>
          <input
            id="commentInput"
            type="text"
            placeholder="Enter your comment here..."
            value={comment}
            onChange={handleChange}
          />

          <button onClick={handleClick}>Submit</button>
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default Post;
