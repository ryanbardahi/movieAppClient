import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        console.log("API Response:", data); // Debug log

        // Extract the movies array from the response
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

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <div
          key={movie._id} // Using _id as the unique identifier
          className="movie-card"
          onClick={() => handleCardClick(movie._id)}
        >
          <h2>{movie.title}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genre:</strong> {movie.genre || "Unknown"}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Comments:</strong> {movie.comments?.join(", ") || "No comments"}</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
