import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import AddMovieModal from "../components/AddMovieModal";
import UpdateMovieModal from "../components/UpdateMovieModal";
import DeleteMovieModal from "../components/DeleteMovieModal";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://moviecatalogapi-bardahi.onrender.com/movies/getMovies"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }

        const data = await response.json();

        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          throw new Error("Movies data is not in the expected format.");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const openAddModal = () => {
    console.log("Opening Add Modal");
    setShowAddModal(true);
  }
  const openUpdateModal = (movie) => {
    console.log("Opening Update Modal for", movie);
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };
  const openDeleteModal = (movie) => {
    console.log("Opening Delete Modal for", movie);
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movies-page">
      {isAdmin && (
        <div className="admin-buttons">
          <button className="btn btn-success" onClick={openAddModal}>
            Add Movie
          </button>
        </div>
      )}

      {/* Movies List */}
      <div className="movies-list">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="movie-card"
            onClick={() => handleCardClick(movie._id)}
          >
            <h2>{movie.title}</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre || "Unknown"}</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <p>
              <strong>Comments:</strong>
            </p>
            {Array.isArray(movie.comments) && movie.comments.length > 0 ? (
              movie.comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <strong>{comment.userId?.email || "Anonymous"}:</strong> {comment.comment}
                </div>
              ))
            ) : (
              <p>No comments</p>
            )}
            {isAdmin && (
              <div className="admin-movie-buttons">
                <button
                  className="btn btn-warning"
                  onClick={() => openUpdateModal(movie)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => openDeleteModal(movie)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && console.log("Add Modal Rendered") && <AddMovieModal onClose={() => setShowAddModal(false)} />}
      {showUpdateModal && (
        <UpdateMovieModal
          movie={selectedMovie}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteMovieModal
          movie={selectedMovie}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Movies;