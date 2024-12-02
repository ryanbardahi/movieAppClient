import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleStartReviewing = () => {
    navigate("/movies"); // Navigate to the Movies page
  };

  return (
    <div className="home-page">
      <div className="banner-text">
        <h1>watch. review. comment.</h1>
        <p>
          Discover movies, share your thoughts, and see what others think.
        </p>
      </div>
      <div className="cta-section">
        <button className="btn btn-primary" onClick={handleStartReviewing}>
          Start reviewing movies!
        </button>
      </div>
    </div>
  );
};

export default Home;