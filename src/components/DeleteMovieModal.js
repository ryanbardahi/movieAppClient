const DeleteMovieModal = ({ movie, onClose }) => {
  const handleDelete = async () => {
    try {
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
        <p>Are you sure you want to delete "{movie.title}"?</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteMovieModal;