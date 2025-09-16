import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMockTrains } from '../../data/mockTrainData';
import TrainCard from '../TrainCard/TrainCard';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchCriteria } = location.state || {};
  
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchCriteria) {
      fetchMockTrains(searchCriteria)
        .then(data => {
          if (data.trains && data.trains.length > 0) {
            setTrains(data.trains);
          } else {
            navigate('/no-trains');
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
      navigate('/book-ticket'); 
    }
  }, [searchCriteria, navigate]);

  if (loading) {
    return <div className="loading">Searching for trains...</div>;
  }


  return (
    <div className="search-results-page">
      {trains.map((train, index) => (
        // For each train, we render the card component
        // and pass the train object as prop to the card component
        <TrainCard key={index} train={train} />
      ))}
    </div>
  );
};

export default SearchResultsPage;
