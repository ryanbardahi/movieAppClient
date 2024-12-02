import React, { useState } from "react";

const AddMovieModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    year: "",
    description: "",
    genre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Add Movie:", formData);
    try {
      const response = await fetch(
        "https://moviecatalogapi-bardahi.onrender.com/movies/addMovie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Movie added successfully!");
        onClose();
      } else {
        alert("Failed to add movie.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Movie</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="director" placeholder="Director" onChange={handleChange} required />
          <input name="year" placeholder="Year" onChange={handleChange} required />
          <input name="description" placeholder="Description" onChange={handleChange} required />
          <input name="genre" placeholder="Genre" onChange={handleChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;