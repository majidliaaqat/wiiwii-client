import React, { useState, useEffect } from "react";
import "../styles/Post.css";
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
    console.log("user:", user._id);
    if (comment === "") {
      toast.error("comment field cannot be empty", {
        position: "top-right",
        autoClose: false,
        progress: false,
      });
      return;
    }

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
      if (editText === "") {
        toast.error("comment field cannot be empty", {
          position: "top-right",
          autoClose: false,
          progress: false,
        });
        return;
      }
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
  const handleDeletePost = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/post/delete_post/${id}`
      );
      if (res.status === 200) {
        console.log("Post Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <div className="article-wrapper">
        <div className="article-header">{post.title}</div>

        <div className="author-details">
          <img
            className="author-avatar"
            src={`http://localhost:4000/${post.user.profilepic}`}
            alt="Author Avatar"
          />
          <div className="author-nickname">{post.user.username}</div>
        </div>

        <img
          className="article-graphic"
          src={`http://localhost:4000/${post.image}`}
          alt={post.title}
        />
        <div className="article-body">Description: {post.description}</div>
        <div className="article-body">Brand: {post.brand}</div>
        <div className="article-body">Year: {post.year}</div>
        <div className="article-body">Model: {post.model}</div>
        <div className="article-body">Kilometers: {post.kilometers}</div>
        <div className="article-body">
          Transmition Type: {post.transmitionType}
        </div>
        <div className="article-body">Price: {post.price}</div>
        <div className="article-body">Location: {post.location}</div>

        {post.user._id === user._id && (
          <button
            className="article-remove-btn"
            onClick={(e) => handleDeletePost(post._id)}
          >
            Delete Post
          </button>
        )}

        <div className="discussions">
          {allcomments.map((comment) => (
            <div key={comment._id} className="discussion-entry">
              <div className="discussant">{comment.user.username}</div>
              <input
                className="discussion-input"
                type="text"
                name="commentText"
                onChange={handleEditChange}
                value={edit === comment._id ? editText : comment.text}
                disabled={edit !== comment._id}
              />
              {user._id === comment.user._id && (
                <div className="discussion-actions">
                  <button
                    className="action-edit"
                    onClick={(e) => handleEdit(comment._id)}
                  >
                    {edit === comment._id ? "Update" : "Edit"}
                  </button>
                  <button
                    className="action-trash"
                    onClick={(e) => handleDelete(comment._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {user && (
          <div className="comment-form">
            <input
              id="newComment"
              className="comment-field"
              type="text"
              placeholder="Add your comment..."
              value={comment}
              onChange={handleChange}
            />
            <button className="comment-submit" onClick={handleClick}>
              Submit
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
}

export default Post;
