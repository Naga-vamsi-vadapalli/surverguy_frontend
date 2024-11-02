import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('username', username);
    navigate('/dashboard');
  };

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <div className='input-container'>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className='login-input'
        />
        <input
          type="password" // Change to "password" for security
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
        />
      </div>
      <button onClick={handleLogin} className='login-button'>Login</button>
    </div>
  );
};

export default Login;
