import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({
      ...adminCredentials,
      [name]: value
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to authenticate
    console.log('Logging in with:', adminCredentials);
    // For demonstration purposes, navigate back to home
    navigate('/');
  };

  return (
    <>
      <h1>Admin Login</h1>
      <Link to="/" className="back-button">Back to Home</Link>
      <div className="admin-login-form">
        <p>Please login with your admin credentials.</p>
        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={adminCredentials.username}
              onChange={handleAdminFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={adminCredentials.password}
              onChange={handleAdminFormChange}
              required
            />
          </div>
          
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
