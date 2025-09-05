import './App.css';
import React, { useState } from 'react';
// Import components
import { CreateAccount } from './components/createaccount.js';
import { Dashboard } from './components/Dashboard.js';
import EnvDebugger from './components/EnvDebugger';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userData, setUserData] = useState(null);

  // Handle account creation
  const handleAccountCreated = (formData) => {
    setUserData(formData);
    setCurrentView('dashboard');
  };

  // Function to render the correct view
  const renderView = () => {
    switch(currentView) {
      case 'create-account':
        return <CreateAccount 
                 onBack={() => setCurrentView('home')} 
                 onAccountCreated={handleAccountCreated}
               />;
      case 'dashboard':
        return <Dashboard 
                 userData={userData} 
                 onLogout={() => setCurrentView('home')} 
               />;
      case 'home':
      default:
        return (
          <>
            <header className="app-header">
              <div className="logo-container">
                <div className="logo">JB</div>
                <h2>JavaBank</h2>
              </div>
              <h1 className="welcome-text">Welcome to <span className="highlight">JavaBank</span></h1>
              <p className="tagline">Secure, Simple, Smart Banking</p>
            </header>

            <div className="hero-section">
              <div className="hero-content">
                <h2>Banking Made Simple</h2>
                <p>Manage your finances with our easy-to-use banking platform</p>
              </div>
            </div>

            <div className='feature-section'>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Create Account</h3>
                <p>Open a new bank account in minutes</p>
                <button className="primary-btn" onClick={() => setCurrentView('create-account')}>Get Started</button>
              </div>
        
              <div className="feature-card">
                <div className="feature-icon">💸</div>
                <h3>Quick Transactions</h3>
                <p>Deposit, withdraw, and transfer funds easily</p>
                <div className="button-group">
                  <button className="secondary-btn" onClick={() => alert('Deposit feature coming soon!')}>Deposit</button>
                  <button className="secondary-btn" onClick={() => alert('Withdraw feature coming soon!')}>Withdraw</button>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Account Management</h3>
                <p>Check balance and view transaction history</p>
                <div className="button-group">
                  <button className="secondary-btn" onClick={() => alert('Balance check feature coming soon!')}>Check Balance</button>
                  <button className="secondary-btn" onClick={() => alert('History feature coming soon!')}>Transaction History</button>
                </div>
              </div>
            </div>

            <footer className="app-footer">
              <p>© 2025 JavaBank - Secure Banking Solutions</p>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="app-container">
      {renderView()}
      <EnvDebugger />
    </div>
  );
}

export default App;
