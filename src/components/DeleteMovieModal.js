const DeleteMovieModal = ({ movie, onClose }) => {
  const handleDelete = async () => {
    try {
      console.log("Deleting Movie:", movie);
      const response = await fetch(
        `https://moviecatalogapi-bardahi.onrender.com/movies/deleteMovie/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        alert("Movie deleted successfully!");
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