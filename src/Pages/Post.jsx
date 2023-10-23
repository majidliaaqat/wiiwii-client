import React, { useState } from "react";
import "../styles/Post.css";

function CreatePost() {
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
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including the selected image (formData.image)
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
    </div>
  );
}

export default CreatePost;
