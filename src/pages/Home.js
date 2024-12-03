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
          See movie reviews!
        </button>
      </div>
      {/* Footer Section */}
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Photo by{" "}
          <a
            href="https://unsplash.com/@dmjdenise?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Denise Jans
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/photos/a-close-up-of-a-reel-of-film-tV80374iytg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;