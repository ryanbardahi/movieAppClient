import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { isLoggedIn } = useContext(UserContext); // Access isLoggedIn from UserContext
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

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
        setComments(data.comments || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("You need to log in to add a comment.");
        return;
      }

      const response = await fetch(
        `https://moviecatalogapi-bardahi.onrender.com/movies/addComment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (response.ok) {
        const { updatedMovie } = await response.json();
        setComments(updatedMovie.comments || []);
        setNewComment("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add comment.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-card">
        <h1 className="movie-title">{movie.title}</h1>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Description:</strong> {movie.description}</p>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <strong>{comment.userId?.email || "Anonymous"}:</strong> {comment.comment}
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>

        {isLoggedIn ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              placeholder="Add your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </form>
        ) : (
          <p>
            Please <Link to="/login">log in</Link> to comment.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;