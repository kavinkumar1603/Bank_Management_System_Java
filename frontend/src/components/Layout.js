import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <h1>BankEase</h1>
          </Link>
        </div>
        {!isHomePage && (
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/account" className="nav-link">My Account</Link>
            <Link to="/create-account" className="nav-link">Open Account</Link>
            <Link to="/about" className="nav-link">About Us</Link>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BankEase</h3>
            <p>Your trusted banking partner since 2025.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/about">About Us</Link>
            <Link to="/create-account">Open an Account</Link>
            <Link to="/account">Online Banking</Link>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@bankease.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BankEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
