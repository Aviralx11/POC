import React, { useState } from 'react';
import './TrainCard.css';

const TrainCard = ({ train }) => {
  // State to track the index of the selected item (date or class)
  // We initialize it to null, meaning nothing is selected.
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Handler for when a user clicks on a date or class item
  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  // Determine if the "Book Now" button should be enabled.
  // It's enabled if an item has been selected (i.e., selectedIndex is not null).
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

        {/* Conditional Rendering: Check if the train has multi-day availability */}
        {train.availability.length > 0 ? (
          // UI for trains WITH multi-day availability (e.g., GARIBRATH EXP)
          <div>
            <div className="availability-dates">
              {train.availability.map((avail, index) => (
                <div 
                  key={index} 
                  // Dynamically add 'selected' class if this item's index matches the state
                  className={`date-item ${selectedIndex === index ? 'selected' : ''}`}
                  // Call the handler function on click, passing this item's index
                  onClick={() => handleSelect(index)}
                >
                  <div className="date-day">{avail.date}</div>
                  <div className="date-status">{avail.status}</div>
                </div>
              ))}
            </div>
            <div className="book-now-section">
              {/* The button is enabled/disabled based on our state variable */}
              <button className="book-now-btn" disabled={!isBookNowEnabled}>
                Book Now
              </button>
              <div className="price">₹ {train.classes[0].price}</div>
            </div>
          </div>
        ) : (
          // UI for trains WITHOUT multi-day availability (e.g., SIMHAPURI EXP)
          <div>
            <div className="train-classes">
              {train.classes.map((cls, index) => (
                <div 
                  key={index} 
                  // Same logic: add 'selected' class if this item is selected
                  className={`class-item ${selectedIndex === index ? 'selected' : ''}`}
                  // Same handler function works here too
                  onClick={() => handleSelect(index)}
                >
                  <div className="class-name">{cls.name}</div>
                  <div className="class-status">{cls.status}</div>
                </div>
              ))}
            </div>
            <div className="book-now-section">
              {/* The button is enabled/disabled based on our state variable */}
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
