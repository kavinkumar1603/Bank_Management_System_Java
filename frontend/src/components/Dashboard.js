import React from 'react';
import '../App.css';

export const Dashboard = ({ userData, onLogout }) => {
    // Generate a random account number
    const accountNumber = React.useMemo(() => {
        return Math.floor(10000000000 + Math.random() * 90000000000);
    }, []);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Get current date
    const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calculate next month for billing cycle
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const billingCycle = nextMonth.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create transaction history with initial deposit
    const transactions = [
        {
            id: 1,
            date: currentDate,
            description: 'Initial Deposit',
            amount: userData.initialDeposit,
            type: 'credit'
        }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-logo-container">
                    <div className="dashboard-logo">JB</div>
                    <h2>JavaBank</h2>
                </div>
                <div className="user-info">
                    <div className="user-greeting">
                        <h3>Welcome, {userData.accountHolderName.split(' ')[0]}!</h3>
                        <p>Account created on {currentDate}</p>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>
                        <span className="logout-icon">⇥</span> Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-section account-summary">
                    <h2 className="section-title">Account Summary</h2>
                    
                    <div className="account-cards">
                        <div className="account-card primary">
                            <div className="card-header">
                                <h3>{userData.accountType.charAt(0).toUpperCase() + userData.accountType.slice(1)} Account</h3>
                                <div className="card-icon">💳</div>
                            </div>
                            <div className="card-number">
                                <span>••••</span>
                                <span>••••</span>
                                <span>••••</span>
                                <span>{accountNumber.toString().slice(-4)}</span>
                            </div>
                            <div className="card-balance">
                                <span>Available Balance</span>
                                <h2>{formatCurrency(userData.initialDeposit)}</h2>
                            </div>
                            <div className="card-footer">
                                <span>Next Statement: {billingCycle}</span>
                            </div>
                        </div>
                        
                        <div className="quick-actions">
                            <button className="action-btn">
                                <span className="action-icon">💸</span>
                                <span>Transfer</span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">💰</span>
                                <span>Deposit</span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">💵</span>
                                <span>Withdraw</span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">📊</span>
                                <span>Statements</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-row">
                    <div className="dashboard-section profile-section">
                        <h2 className="section-title">Personal Information</h2>
                        <div className="profile-details">
                            <div className="profile-item">
                                <span className="item-label">Account Number</span>
                                <span className="item-value">{accountNumber}</span>
                            </div>
                            <div className="profile-item">
                                <span className="item-label">Account Holder</span>
                                <span className="item-value">{userData.accountHolderName}</span>
                            </div>
                            <div className="profile-item">
                                <span className="item-label">Email Address</span>
                                <span className="item-value">{userData.email}</span>
                            </div>
                            <div className="profile-item">
                                <span className="item-label">Phone Number</span>
                                <span className="item-value">+91 {userData.phoneNumber}</span>
                            </div>
                            <div className="profile-item">
                                <span className="item-label">Date of Birth</span>
                                <span className="item-value">{userData.dateOfBirth}</span>
                            </div>
                            <div className="profile-item address-item">
                                <span className="item-label">Address</span>
                                <span className="item-value address-value">{userData.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-section transactions-section">
                        <h2 className="section-title">Recent Transactions</h2>
                        <div className="transaction-list">
                            {transactions.map(transaction => (
                                <div className="transaction-item" key={transaction.id}>
                                    <div className="transaction-date">{transaction.date}</div>
                                    <div className="transaction-details">
                                        <div className="transaction-description">{transaction.description}</div>
                                        <div className={`transaction-amount ${transaction.type}`}>
                                            {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="no-more-transactions">
                                <p>No more transactions to show</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 JavaBank - Secure Banking Solutions</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Support</a>
                </div>
            </footer>
        </div>
    );
};
