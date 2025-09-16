import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import BookTicketPage from './components/BookTicketPage/BookTicketPage';
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';
import NoTrainsFoundPage from './components/NoTrainsFoundPage/NoTrainsFoundPage'; // Imported the new page
import './App.css';


// to check if user is authenticated
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

//if user aint logged in, they are sent back to login
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route 
          path="/" 
          element={<PrivateRoute><HomePage /></PrivateRoute>} 
        />
        <Route 
          path="/book-ticket" 
          element={<PrivateRoute><BookTicketPage /></PrivateRoute>} 
        />
        <Route 
          path="/search-results" 
          element={<PrivateRoute><SearchResultsPage /></PrivateRoute>} 
        />
        <Route 
          path="/no-trains" 
          element={<PrivateRoute><NoTrainsFoundPage /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
