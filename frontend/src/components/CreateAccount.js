import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    initialDeposit: '',
    accountType: 'savings',
    address: '',
    dateOfBirth: '',
    ssn: ''
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating account with data:', formData);
      setIsSubmitting(false);
      navigate('/account');
    }, 1500);
  };

  return (
    <div className="create-account-page">
      <h1>Open Your BankEase Account</h1>
      
      <div className="form-container">
        <div className="form-header">
          <div className="progress-steps">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Personal Info</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Account Details</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Confirmation</div>
            </div>
          </div>
        </div>
        
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="johndoe@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                required
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>
            
            <div className="form-buttons">
              <Link to="/" className="secondary-button">Cancel</Link>
              <button type="submit" className="primary-button">Next</button>
            </div>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="savings">Savings Account</option>
                <option value="checking">Checking Account</option>
                <option value="fixedDeposit">Fixed Deposit</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="initialDeposit">Initial Deposit Amount ($)</label>
              <input
                type="number"
                id="initialDeposit"
                name="initialDeposit"
                value={formData.initialDeposit}
                onChange={handleFormChange}
                min="0"
                required
                placeholder="Minimum $100"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="ssn">Social Security Number (Last 4 digits)</label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={formData.ssn}
                onChange={handleFormChange}
                maxLength="4"
                required
                placeholder="XXXX"
              />
              <small className="form-text">For verification purposes only</small>
            </div>
            
            <div className="form-buttons">
              <button type="button" className="secondary-button" onClick={goToPreviousStep}>Back</button>
              <button type="submit" className="primary-button">Next</button>
            </div>
          </form>
        )}
        
        {step === 3 && (
          <div className="confirmation-step">
            <div className="confirmation-header">
              <div className="confirmation-icon">✓</div>
              <h2>Review Your Information</h2>
            </div>
            
            <div className="confirmation-details">
              <div className="confirmation-section">
                <h3>Personal Information</h3>
                <div className="detail-row">
                  <span>Full Name:</span>
                  <span>{formData.fullName}</span>
                </div>
                <div className="detail-row">
                  <span>Email:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="detail-row">
                  <span>Phone:</span>
                  <span>{formData.phoneNumber}</span>
                </div>
                <div className="detail-row">
                  <span>Date of Birth:</span>
                  <span>{formData.dateOfBirth}</span>
                </div>
                <div className="detail-row">
                  <span>Address:</span>
                  <span>{formData.address}</span>
                </div>
              </div>
              
              <div className="confirmation-section">
                <h3>Account Details</h3>
                <div className="detail-row">
                  <span>Account Type:</span>
                  <span>{formData.accountType.charAt(0).toUpperCase() + formData.accountType.slice(1)}</span>
                </div>
                <div className="detail-row">
                  <span>Initial Deposit:</span>
                  <span>${formData.initialDeposit}</span>
                </div>
              </div>
            </div>
            
            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms and Conditions</a> and 
                <a href="#" onClick={(e) => e.preventDefault()}> Privacy Policy</a>
              </label>
            </div>
            
            <div className="form-buttons">
              <button type="button" className="secondary-button" onClick={goToPreviousStep}>Back</button>
              <button 
                type="button" 
                className="primary-button" 
                onClick={handleCreateAccount}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
