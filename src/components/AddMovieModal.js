import React, { useState } from "react";

const AddMovieModal = ({ onClose, onMovieChange }) => {
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

    try {
      const response = await fetch(
        "https://moviecatalogapi-bardahi.onrender.com/movies/addMovie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const newMovie = await response.json();
        onMovieChange((prevMovies) => [...prevMovies, newMovie]);
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
        <form onSubmit={handleSubmit} className="modal-form">
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="director" placeholder="Director" onChange={handleChange} required />
          <input name="year" placeholder="Year" onChange={handleChange} required />
          <input name="description" placeholder="Description" onChange={handleChange} required />
          <input name="genre" placeholder="Genre" onChange={handleChange} required />
          <div className="modal-buttons">
            <button type="submit" className="btn mb-1 btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;