import React, { useState } from 'react';
import './TrainCard.css';


// functional component that recieves train object as prop
const TrainCard = ({ train }) => {
  // State to track the index of the item which we have selected
  // We initialize it to null
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Handler for when a user clicks on an item
  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  
  const isBookNowEnabled = selectedIndex !== null;

  return (
    <div className="train-card">
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
          // only for garibrath exp
          <div>
            <div className="availability-dates">
              {train.availability.map((avail, index) => (
                <div 
                  key={index} 
              
                  className={`date-item ${selectedIndex === index ? 'selected' : ''}`}
                  // Calling the handler function on click
                  onClick={() => handleSelect(index)}
                >
                  <div className="date-day">{avail.date}</div>
                  <div className="date-status">{avail.status}</div>
                </div>
              ))}
            </div>
            <div className="book-now-section">
              <button className="book-now-btn" disabled={!isBookNowEnabled}>
                Book Now
              </button>
              <div className="price">₹ {train.classes[0].price}</div>
            </div>
          </div>
        ) : (
          // UI for other trains
          <div>
            <div className="train-classes">
              {train.classes.map((cls, index) => (
                <div 
                  key={index} 
                  className={`class-item ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  <div className="class-name">{cls.name}</div>
                  <div className="class-status">{cls.status}</div>
                </div>
              ))}
            </div>
            <div className="book-now-section">
              <button className="book-now-btn" disabled={!isBookNowEnabled}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainCard;
