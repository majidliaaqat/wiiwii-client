import React, { useState } from "react";
// import "../styles/Post.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreatePost({ userId }) {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    year: "",
    model: "",
    kilometers: "",
    transmitionType: "",
    price: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including the selected image (formData.image)
    console.log(formData);
    console.log("File", file);

    const dataToSend = new FormData();
    dataToSend.append("photo", file);
    dataToSend.append("title", formData.title);
    dataToSend.append("brand", formData.brand);
    dataToSend.append("description", formData.description);
    dataToSend.append("userId", userId);
    dataToSend.append("year", formData.year);
    dataToSend.append("model", formData.model);
    dataToSend.append("kilometers", formData.kilometers);
    dataToSend.append("transmitionType", formData.transmitionType);
    dataToSend.append("price", formData.price);
    dataToSend.append("location", formData.location);

    //Print Form Data Object
    const formDataObject = {};
    for (const [key, value] of dataToSend.entries()) {
      formDataObject[key] = value;
    }

    console.log("Sent Data Object:", formDataObject);

    // setIsLoading(true);
    fetch("http://localhost:4000/post/createpost", {
      method: "POST",
      body: dataToSend,
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          toast.success("Post Created Successfully!", {
            position: "top-right",
            autoClose: false,
            progress: false,
          });
          // navigate("/");
          // Clear the form data
          setFormData({
            title: "",
            description: "",
            brand: "",
            year: "",
            model: "",
            kilometers: "",
            transmitionType: "",
            price: "",
            location: "",
          });
          setFile(null);
        } else if (res.status === 500) {
          console.log(res);
          toast.error("Failed to Create Post!", {
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
      })
      .catch((error) => {
        console.error("Error: ", error);
        toast.error("Internal Server Error!", {
          position: "top-right",
          autoClose: false,
          progress: false,
        });
      });
  };

  return (
    <div className="create-post-container">
      <div className="create-post">
        <h2>Post New Add</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="kilometers"
            placeholder="Kilometers"
            value={formData.kilometers}
            onChange={handleChange}
          />
          <input
            type="text"
            name="transmitionType"
            placeholder="Transmission Type"
            value={formData.transmitionType}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit">Post Add</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatePost;
