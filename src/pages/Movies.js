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

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieUpdate = (updatedMovies) => {
    setMovies(updatedMovies);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openUpdateModal = (movie) => {
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };

  const openDeleteModal = (movie) => {
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
      {isLoggedIn && isAdmin && (
        <div className="admin-buttons">
          <button className="btn btn-success" onClick={openAddModal}>
            Add Movie
          </button>
        </div>
      )}

      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <h2>{movie.title}</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre || "Unknown"}</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <p>
              <strong>Comments:</strong>
            </p>
            {Array.isArray(movie.comments) && movie.comments.length > 0 ? (
              <div className="comment-item">
                <strong>{movie.comments[0].userId?.email || "Anonymous"}:</strong>{" "}
                {movie.comments[0].comment.length > 50
                  ? `${movie.comments[0].comment.slice(0, 50)}...`
                  : movie.comments[0].comment}
              </div>
            ) : (
              <p>No comments</p>
            )}
            <div className="admin-movie-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/movies/${movie._id}`)}
              >
                View Details
              </button>
              {isLoggedIn && isAdmin && (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      openUpdateModal(movie);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(movie);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn && isAdmin && showAddModal && (
        <AddMovieModal
          onClose={() => setShowAddModal(false)}
          onMovieChange={handleMovieUpdate}
        />
      )}
      {showUpdateModal && (
        <UpdateMovieModal
          movie={selectedMovie}
          onClose={() => setShowUpdateModal(false)}
          onMovieChange={handleMovieUpdate}
        />
      )}
      {showDeleteModal && (
        <DeleteMovieModal
          movie={selectedMovie}
          onClose={() => setShowDeleteModal(false)}
          onMovieChange={handleMovieUpdate}
        />
      )}
    </div>
  );
};

export default Movies;
