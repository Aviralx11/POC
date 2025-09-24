import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/authSlice';
import { loginUser } from '../../utils/userService';
import './LoginPage.css';

const LoginPage = () => {
  // 1. Add the 'name' state variable back
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // 2. Update the validation function to include the 'name' field
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.'; // Add check for name
    if (!mobileNo) newErrors.mobileNo = 'Mobile number is required.';
    if (!password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // The handleLogin function remains the same, as 'name' is not used for authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const user = loginUser({ mobileNo, password });

    if (user) {
      setErrors({});
      dispatch(loginSuccess({ name: user.name }));
      navigate('/');
    } else {
      setErrors({ form: 'Invalid mobile number or password.' });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* 3. Add the JSX for the Name input field back into the form */}
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

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
