const DeleteMovieModal = ({ movie, onClose, onMovieChange }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://moviecatalogapi-bardahi.onrender.com/movies/deleteMovie/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.ok) {
        onMovieChange((prevMovies) =>
          prevMovies.filter((m) => m._id !== movie._id)
        ); // Update movie list dynamically
        onClose();
      } else {
        alert("Failed to delete movie.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Delete Movie</h2>
        <p>Are you sure you want to delete "{movie?.title}"?</p>
        <div className="modal-buttons">
          <button onClick={handleDelete} className="btn btn-danger mb-1">Delete</button>
          <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;