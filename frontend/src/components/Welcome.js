import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Banking Made <span className="highlight">Simple</span></h1>
          <p className="hero-subtitle">Secure, fast, and convenient banking solutions at your fingertips.</p>
          <div className="hero-buttons">
            <Link to="/create-account" className="primary-button">Get Started</Link>
            <Link to="/about" className="secondary-button">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* This would be replaced by an actual image in a real application */}
          <div className="placeholder-image">
            <div className="banking-illustration"></div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon savings-icon"></div>
            <h3>Savings Accounts</h3>
            <p>Grow your wealth with competitive interest rates and zero maintenance fees.</p>
            <Link to="/create-account" className="feature-link">Open Account</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon checking-icon"></div>
            <h3>Checking Accounts</h3>
            <p>Manage your daily finances with easy access and online banking.</p>
            <Link to="/create-account" className="feature-link">Open Account</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon investment-icon"></div>
            <h3>Fixed Deposits</h3>
            <p>Maximize returns with our range of fixed deposit options.</p>
            <Link to="/create-account" className="feature-link">Invest Now</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon support-icon"></div>
            <h3>24/7 Support</h3>
            <p>Our customer service team is always ready to assist you.</p>
            <Link to="/about" className="feature-link">Contact Us</Link>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to take control of your finances?</h2>
          <p>Join thousands of satisfied customers who trust BankEase for their banking needs.</p>
          <div className="cta-buttons">
            <Link to="/create-account" className="primary-button">Open an Account</Link>
            <Link to="/account" className="secondary-button">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
