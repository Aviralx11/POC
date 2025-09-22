import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loginSuccess } from '../../redux/slices/authSlice';
import './LoginPage.css';

const MOCK_USER = {
  name: 'Test User',
  mobileNo: '1234567890',
  password: 'Password123@',
};

const LoginPage = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  
  // Use an object to hold errors for each field
  const [errors, setErrors] = useState({}); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields first
    if (!name) newErrors.name = 'Name is required.';
    if (!mobileNo) newErrors.mobileNo = 'Mobile number is required.';
    if (!password) newErrors.password = 'Password is required.';

    // If fields are not empty, then check for format validity
    if (mobileNo && !/^\d{10}$/.test(mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be exactly 10 digits.';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password && !passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters, with one uppercase, one number, and one special character.';
    }

    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Run validation. If it fails, stop the function.
    if (!validateForm()) {
      return;
    }
    
    // If validation passes
    if (name === MOCK_USER.name && mobileNo === MOCK_USER.mobileNo && password === MOCK_USER.password) {
      setErrors({}); 
      dispatch(loginSuccess({ name: MOCK_USER.name }));
      navigate('/'); 
    } else {
      // general
      setErrors({ form: 'Invalid credentials. Please try again.' });
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
            
          />
          
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="tel"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
           
          />
          {errors.mobileNo && <p className="error-message">{errors.mobileNo}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit" className="login-button">Login</button>
        
        {errors.form && <p className="error-message form-error">{errors.form}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
