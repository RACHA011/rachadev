import React from 'react';
import { Link } from 'react-router-dom'; // For routing
import '../assets/css/NotFound.css'; // Import the CSS file

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <p className="not-found-subtext">
          You might have entered the wrong URL, or the page has been moved.
        </p>
        <Link to="/" className="home-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;