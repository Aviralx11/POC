import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginSuccess } from '../../redux/slices/authSlice';
import './LoginPage.css';

const MOCK_USER = {
  name: 'Test User',
  mobileNo: '1234567890',
  password: 'password123',
};

const LoginPage = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();  //to send reducer action to redux store
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); // do not refresh

    // to validate mb no digits
    if (!/^\d{10}$/.test(mobileNo)) {
    setError('Mobile number must be exactly 10 digits.');
    return;
    }
    
    if (name === MOCK_USER.name && mobileNo === MOCK_USER.mobileNo && password === MOCK_USER.password) {
      setError('');
      dispatch(loginSuccess({ name: MOCK_USER.name }));
      navigate('/'); 
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="tel"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
