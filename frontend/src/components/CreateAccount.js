import React, { useState, useEffect } from 'react';
import '../App.css';
import { auth } from '../firebase';
import { 
    RecaptchaVerifier, 
    signInWithPhoneNumber,
    PhoneAuthProvider 
} from 'firebase/auth';

// Renamed to start with uppercase letter to follow React component naming convention
export const CreateAccount = (props) => {
    // State for form fields
    const [formData, setFormData] = useState({
        accountHolderName: '',
        email: '',
        phoneNumber: '',
        initialDeposit: '',
        accountType: '',
        dateOfBirth: '',
        address: ''
    });

    // State for OTP verification
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [phoneVerified, setPhoneVerified] = useState(false);
    // State for terms and conditions checkbox
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    // States for Firebase authentication
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [verificationId, setVerificationId] = useState(null);
    const [error, setError] = useState('');
    
    // Initialize reCAPTCHA verifier
    useEffect(() => {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log('reCAPTCHA verified');
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                setError('reCAPTCHA expired. Please try again.');
            }
        });
        
        setRecaptchaVerifier(verifier);
        
        return () => {
            if (verifier) {
                verifier.clear();
            }
        };
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle send OTP using Firebase
    const handleSendOTP = (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.phoneNumber.length >= 10) {
            const phoneNumber = `+91${formData.phoneNumber}`; // Format with country code
            
            // Show loading or disable button here if needed
            
            signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message
                    setConfirmationResult(confirmationResult);
                    setVerificationId(confirmationResult.verificationId);
                    setOtpSent(true);
                    console.log("SMS verification code has been sent");
                })
                .catch((error) => {
                    // Error; SMS not sent
                    console.error("Error sending SMS verification code", error);
                    setError('Error sending verification code. Please try again.');
                    
                    // Reset reCAPTCHA
                    if (recaptchaVerifier) {
                        recaptchaVerifier.clear();
                        const newVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                            'size': 'invisible',
                            'callback': () => {
                                console.log('reCAPTCHA verified');
                            }
                        });
                        setRecaptchaVerifier(newVerifier);
                    }
                });
        } else {
            setError('Please enter a valid 10-digit phone number');
        }
    };

    // Handle verify OTP using Firebase
    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setError('');
        
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }
        
        // Verify the code entered by user
        if (confirmationResult) {
            confirmationResult.confirm(otp)
                .then((result) => {
                    // User signed in successfully
                    const user = result.user;
                    console.log("Phone number verified successfully", user);
                    setPhoneVerified(true);
                    alert('Phone number verified successfully!');
                })
                .catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    console.error("Error verifying SMS code", error);
                    setError('Invalid verification code. Please try again.');
                });
        } else if (verificationId) {
            // Alternative verification method using credential
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            signInWithPhoneNumber(auth, credential)
                .then((result) => {
                    // User signed in successfully
                    console.log("Phone number verified successfully", result.user);
                    setPhoneVerified(true);
                    alert('Phone number verified successfully!');
                })
                .catch((error) => {
                    console.error("Error verifying SMS code", error);
                    setError('Invalid verification code. Please try again.');
                });
        } else {
            setError('Verification process not initialized correctly. Please try again.');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phoneVerified) {
            alert('Please verify your phone number first');
            return;
        }
        
        if (!termsAccepted) {
            alert('Please accept the Terms & Conditions to continue');
            return;
        }
        
        // In a real application, you would submit the form data to your backend
        console.log('Form submitted:', formData);
        
        // Navigate to dashboard with user data
        props.onAccountCreated(formData);
    };

    return (
        <div className="enhanced-form-container">
            <div className="form-header">
                <div className="form-logo">JB</div>
                <h2 className="form-title">Create New Account</h2>
                <p className="form-subtitle">Join thousands of customers who trust JavaBank</p>
            </div>
            
            <div className="form-progress">
                <div className="progress-step active">
                    <div className="step-icon">1</div>
                    <span>Personal Info</span>
                </div>
                <div className="progress-bar"></div>
                <div className="progress-step">
                    <div className="step-icon">2</div>
                    <span>Verification</span>
                </div>
                <div className="progress-bar"></div>
                <div className="progress-step">
                    <div className="step-icon">3</div>
                    <span>Account Setup</span>
                </div>
            </div>
            
            <form className="account-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3 className="section-title">Personal Information</h3>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="accountHolderName">
                                <i className="icon">👤</i> Account Holder Name <span className="required">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="accountHolderName" 
                                name="accountHolderName" 
                                placeholder="Enter your full name"
                                value={formData.accountHolderName}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="icon">✉️</i> Email Address <span className="required">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group phone-group">
                            <label htmlFor="phoneNumber">
                                <i className="icon">📱</i> Phone Number <span className="required">*</span>
                            </label>
                            <div className="phone-verification">
                                <div className="phone-input-wrapper">
                                    <span className="country-code">+91</span>
                                    <input 
                                        type="tel" 
                                        id="phoneNumber" 
                                        name="phoneNumber" 
                                        placeholder="Enter your phone number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        disabled={phoneVerified}
                                        className={phoneVerified ? 'verified' : ''}
                                    />
                                    {phoneVerified && <div className="verified-badge">✓</div>}
                                </div>
                                <button 
                                    type="button" 
                                    className={`verify-btn ${otpSent ? 'resend' : ''} ${phoneVerified ? 'verified' : ''}`}
                                    onClick={handleSendOTP}
                                    disabled={otpSent || phoneVerified}
                                >
                                    {phoneVerified ? 'Verified' : otpSent ? 'Resend OTP' : 'Send OTP'}
                                </button>
                            </div>
                            {otpSent && !phoneVerified && (
                                <div className="otp-section">
                                    <div className="otp-message">OTP sent to your phone number</div>
                                    <div className="otp-inputs-container">
                                        <input 
                                            type="text" 
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength="6"
                                            className="otp-input"
                                        />
                                        <button 
                                            type="button" 
                                            className="verify-btn verify-otp-btn"
                                            onClick={handleVerifyOTP}
                                        >
                                            Verify OTP
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">
                                <i className="icon">🎂</i> Date of Birth <span className="required">*</span>
                            </label>
                            <input 
                                type="date" 
                                id="dateOfBirth" 
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="address">
                                <i className="icon">🏠</i> Address <span className="required">*</span>
                            </label>
                            <textarea 
                                id="address" 
                                name="address" 
                                placeholder="Enter your full address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>
                
                <div className="form-section">
                    <h3 className="section-title">Account Information</h3>
                    
                    <div className="form-row account-details">
                        <div className="form-group">
                            <label htmlFor="initialDeposit">
                                <i className="icon">💰</i> Initial Deposit <span className="required">*</span>
                            </label>
                            <div className="currency-input">
                                <span className="currency-symbol">₹</span>
                                <input 
                                    type="number" 
                                    id="initialDeposit" 
                                    name="initialDeposit" 
                                    placeholder="Minimum ₹500"
                                    min="500"
                                    value={formData.initialDeposit}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <small className="form-helper">Minimum deposit: ₹500</small>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="accountType">
                                <i className="icon">🏦</i> Account Type <span className="required">*</span>
                            </label>
                            <select 
                                id="accountType" 
                                name="accountType" 
                                value={formData.accountType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select account type</option>
                                <option value="savings">Savings Account</option>
                                <option value="checking">Checking Account</option>
                                <option value="business">Business Account</option>
                            </select>
                            <small className="form-helper">Choose the account that best fits your needs</small>
                        </div>
                    </div>
                </div>
                
                <div className="form-actions">
                    <div className="terms-checkbox">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            required 
                        />
                        <label htmlFor="terms">I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`primary-btn submit-btn ${termsAccepted ? 'active' : ''}`}
                        disabled={!phoneVerified || !termsAccepted}
                    >
                        {phoneVerified ? 'Create Account' : 'Verify Phone Number to Continue'}
                    </button>
                    
                    <button type="button" className="secondary-btn back-btn" onClick={props.onBack}>
                        Back to Home
                    </button>
                </div>
                
                {/* Invisible reCAPTCHA container for Firebase */}
                <div id="recaptcha-container"></div>
                
                {/* Display error message */}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}