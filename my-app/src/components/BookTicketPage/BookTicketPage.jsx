import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTicketPage.css';

const BookTicketPage = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const [allClasses, setAllClasses] = useState('All Classes');
  const [quota, setQuota] = useState('GENERAL');

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCriteria = { from, to, date, allClasses, quota };
    navigate('/search-results', { state: { searchCriteria } });
  };

  
  const handleGoHome = () => {
    navigate('/'); 
  };
  

  return (
    <div className="book-ticket-page">
      
      <button className="back-to-home-btn" onClick={handleGoHome}>
        &larr; Back to Home
      </button>
      

      <div className="booking-container">
        <div className="booking-header">
          <h2>BOOK TICKET</h2>
        </div>
        <form className="booking-form" onSubmit={handleSearch}>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="all-classes">Class</label>
              <select id="all-classes" value={allClasses} onChange={(e) => setAllClasses(e.target.value)}>
                <option>All Classes</option>
                <option>Sleeper (SL)</option>
                <option>AC 3 Tier (3A)</option>
                <option>AC 2 Tier (2A)</option>
                <option>AC First Class (1A)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quota">Quota</label>
              <select id="quota" value={quota} onChange={(e) => setQuota(e.target.value)}>
                <option>GENERAL</option>
                <option>LADIES</option>
                <option>TATKAL</option>
              </select>
            </div>
          </div>

          <div className="checkbox-group">
            <div className="checkbox-item">
              <input type="checkbox" id="disability" />
              <label htmlFor="disability">Person With Disability Concession</label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="flexible-date" />
              <label htmlFor="flexible-date">Flexible With Date</label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="available-berth" />
              <label htmlFor="available-berth">Train with Available Berth</label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="pass-concession" />
              <label htmlFor="pass-concession">Railway Pass Concession</label>
            </div>
          </div>

          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default BookTicketPage;
