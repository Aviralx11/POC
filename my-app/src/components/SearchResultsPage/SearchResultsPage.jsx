import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMockTrains } from '../../data/mockTrainData';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchCriteria } = location.state || {};
  
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchCriteria) {
      fetchMockTrains(searchCriteria)
        .then(data => {
          setTrains(data.trains);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchCriteria]);

  if (loading) {
    return <div className="loading">Searching for trains...</div>;
  }

  if (!trains || trains.length === 0) {
    alert('No Trains available.');
    return <div className="no-trains">No trains found for the selected route.</div>;
  }

 return (
    <div className="search-results-page">
      {trains.map((train, index) => (
        <div key={index} className="train-card">
          <div className="train-header">
            <div className="train-name">{train.name} <span>({train.number})</span></div>
            <div className="runs-on">Runs On: {train.runsOn.join(' ')}</div>
          
            <a href="#" className="train-schedule-link">Train Schedule</a>
          </div>

          <div className="train-body">
          
            <div className="train-timing">
              <div className="time-details">
                {train.departure.time} | <span>{train.departure.station} | {train.departure.day}</span>
              </div>
              <div className="duration">--- {train.duration} ---</div>
              <div className="time-details">
                {train.arrival.time} | <span>{train.arrival.station} | {train.arrival.day}</span>
              </div>
            </div>

            {train.availability.length > 0 ? (
              <div>
                <div className="availability-dates">
                  {train.availability.map((avail, i) => (
                    <div key={i} className={`date-item ${i === 0 ? 'selected' : ''}`}>
                      <div className="date-day">{avail.date}</div>
                      <div className="date-status">{avail.status}</div>
                    </div>
                  ))}
                </div>
                <div className="book-now-section">
                  <button className="book-now-btn">Book Now</button>
                  <div className="price">₹ {train.classes[0].price}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="train-classes">
                  {train.classes.map((cls, i) => (
                    <div key={i} className="class-item">
                      <div className="class-name">{cls.name}</div>
                      <div className="class-status">{cls.status}</div>
                    </div>
                  ))}
                </div>
                <div className="book-now-section">
                  <button className="book-now-btn disabled">Book Now</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;

