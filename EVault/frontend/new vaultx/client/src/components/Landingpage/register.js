// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement registration logic here

    // For simplicity, just set isLoggedIn to true
    setIsLoggedIn(true);

    // Redirect to the dashboard after registration
    navigate('/dashboard');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
