// src/components/RegistrationPage/RegistrationPage.jsx (Final Version)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/userService'; // 1. Import our new function
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  // 2. Add a validation function (similar to LoginPage)
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!mobileNo) newErrors.mobileNo = 'Mobile number is required.';
    if (mobileNo && !/^\d{10}$/.test(mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be exactly 10 digits.';
    }
    if (!password) newErrors.password = 'Password is required.';
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password && !passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters, with one uppercase, one number, and one special character.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. Update the handleRegister function
  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    const result = registerUser({ name, mobileNo, password });

    if (result.success) {
      // On successful registration, navigate to the login page with a success message
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } else {
      // If registration fails (e.g., user exists), show the error message
      setErrors({ form: result.message });
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        {/* The form inputs are the same, just ensure they show errors */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input type="tel" id="mobileNo" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
          {errors.mobileNo && <p className="error-message">{errors.mobileNo}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="register-button">Register</button>
        {errors.form && <p className="error-message form-error">{errors.form}</p>}
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
