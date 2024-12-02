import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://moviecatalogapi-bardahi.onrender.com/movies/getMovie/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }

        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <div>
        <strong>Comments:</strong>
        {Array.isArray(movie.comments) && movie.comments.length > 0 ? (
          movie.comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <strong>{comment.userId?.email || "Anonymous"}:</strong> {comment.comment}
            </div>
          ))
        ) : (
          <p>No comments</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;