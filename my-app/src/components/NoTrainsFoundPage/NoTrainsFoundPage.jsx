import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoTrainsFoundPage.css';

const NoTrainsFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
     navigate('/book-ticket', { replace: true });
  };

  return (
    <div className="no-trains-container">
      <div className="no-trains-box">
        <h2>No Trains Found</h2>
        <p>Sorry, we couldn't find any trains for the selected route or date.</p>
        <button className="back-button" onClick={handleGoBack}>
          Try a New Search
        </button>
      </div>
    </div>
  );
};

export default NoTrainsFoundPage;
