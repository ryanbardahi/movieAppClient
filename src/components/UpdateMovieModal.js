import React, { useState, useEffect } from "react"; // Include useEffect for debugging

const UpdateMovieModal = ({ movie, onClose }) => {
  const [formData, setFormData] = useState(movie || {});

  useEffect(() => {
    console.log("Movie in Update Modal:", movie);
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://moviecatalogapi-bardahi.onrender.com/movies/updateMovie/${movie._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Movie updated successfully!");
        onClose();
      } else {
        alert("Failed to update movie.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <input
            name="director"
            placeholder="Director"
            value={formData.director || ""}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            placeholder="Year"
            value={formData.year || ""}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />
          <input
            name="genre"
            placeholder="Genre"
            value={formData.genre || ""}
            onChange={handleChange}
            required
          />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovieModal;
