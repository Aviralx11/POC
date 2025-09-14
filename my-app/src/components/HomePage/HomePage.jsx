import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import railwayLogo from '../../assets/railway-logo.jpg';
import heroTrainImage from '../../assets/hero-train.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBookTicketClick = () => {
    navigate('/book-ticket');
  };

  return (
    <div className="home-page">
      
      <header className="header">
        <div className="top-bar">
          <div className="contact-info">
            <span>📞 040 2333 2555</span>
            <span>📧 customerservice@ltmetro.com</span>
          </div>
          <div className="top-right-nav">
            <a href="#">Media</a>
            <a href="#">Download Mobile App</a>
          </div>
        </div>
        <nav className="main-nav">
          <div className="logo">
          
            <img src={railwayLogo} alt="Railway Logo" />
            <div className="logo-text">
              MY CITY  
MY METRO  
MY PRIDE
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us ▾</a></li>
            <li><a href="#">Travel ▾</a></li>
            <li className="active"><a href="#">Fare & Ticketing ▾</a></li>
            <li><a href="#">Customer Service ▾</a></li>
            <li><a href="#">How To Use ▾</a></li>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
      </header>

     
      <section className="hero-section">
      
        <img 
          src={heroTrainImage} 
          alt="Indian train on a scenic route" 
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Ticketing</h1>
          <p>Home &gt; Ticketing</p>
        </div>
      </section>

    
      <main className="main-content">
        <h2>Ticketing</h2>
        <h3>Fare Information</h3>
        <p>
          Passengers can choose a smart card or a token for travelling by Metro trains. We recommend passengers to opt for smart cards for a hassle-free journey.
        </p>
        <div className="fare-section">
          <button className="fare-chart-btn">Fare Chart</button>
          <button className="book-ticket-btn" onClick={handleBookTicketClick}>
            Book Ticket
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
