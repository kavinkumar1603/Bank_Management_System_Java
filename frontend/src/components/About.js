import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-page">
      <h1>About BankEase</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At BankEase, our mission is to provide secure, accessible, and user-friendly banking 
            solutions to our customers. We strive to simplify banking processes while maintaining 
            the highest standards of security and customer service.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Savings Accounts</h3>
              <p>Earn competitive interest rates while keeping your money secure and accessible.</p>
            </div>
            
            <div className="service-item">
              <h3>Checking Accounts</h3>
              <p>Manage your daily finances with ease using our flexible checking account options.</p>
            </div>
            
            <div className="service-item">
              <h3>Fixed Deposits</h3>
              <p>Grow your wealth with our range of fixed deposit options with attractive interest rates.</p>
            </div>
            
            <div className="service-item">
              <h3>Online Banking</h3>
              <p>Access your accounts anytime, anywhere through our secure online banking platform.</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Security</h2>
          <p>
            Your security is our top priority. We employ industry-leading encryption and security 
            protocols to ensure that your financial information and transactions remain safe and private.
          </p>
          <p>
            Our multi-factor authentication system adds an extra layer of security to protect your 
            accounts from unauthorized access.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Customer Support</h2>
          <p>
            Our dedicated customer support team is available 24/7 to assist you with any questions 
            or concerns. You can reach us through phone, email, or live chat.
          </p>
          <div className="contact-info">
            <p>Email: support@bankease.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Financial Street, Banking District, BK 12345</p>
          </div>
        </section>
        
        <div className="about-cta">
          <h3>Ready to experience modern banking?</h3>
          <div className="about-buttons">
            <Link to="/create-account" className="primary-button">Open an Account</Link>
            <Link to="/" className="secondary-button">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
