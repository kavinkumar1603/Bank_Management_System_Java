import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BankAccount() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBalance(), fetchTransactions()]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:8080/balance');
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      // For demo purposes if API doesn't exist
      setBalance(5240.75);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8080/transactions');
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // For demo purposes if API doesn't exist
      setTransactions([
        { type: 'deposit', amount: 1000, date: '2025-08-28' },
        { type: 'withdraw', amount: 250, date: '2025-08-29' },
        { type: 'deposit', amount: 500, date: '2025-08-30' }
      ]);
    }
  };

  const handleTransaction = async (type) => {
    if (amount > 0) {
      try {
        // For API call
        // const response = await fetch('http://localhost:8080/transaction', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     type: type.toLowerCase(),
        //     amount: Number(amount)
        //   })
        // });
        
        // const data = await response.json();
        // if (data.success) {
        //   setBalance(data.balance);
        //   fetchTransactions();
        //   setAmount('');
        // }

        // For demo without API
        const newTransaction = {
          type: type.toLowerCase(),
          amount: Number(amount),
          date: new Date().toISOString().split('T')[0]
        };
        
        setTransactions([newTransaction, ...transactions]);
        
        if (type.toLowerCase() === 'deposit') {
          setBalance(balance + Number(amount));
        } else {
          setBalance(balance - Number(amount));
        }
        
        setAmount('');
      } catch (error) {
        console.error('Error processing transaction:', error);
      }
    }
  };

  const handleDeposit = () => handleTransaction('deposit');
  const handleWithdraw = () => handleTransaction('withdraw');

  const getTransactionTypeClass = (type) => {
    return type.toLowerCase() === 'deposit' ? 'transaction-deposit' : 'transaction-withdraw';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading account information...</p>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h1>My Account Dashboard</h1>
      
      <div className="bank-container">
        <div className="balance-card">
          <h3>Available Balance</h3>
          <div className="balance-amount">${balance.toFixed(2)}</div>
          <p>Account #: **** 4523</p>
        </div>
        
        <div className="transaction-section">
          <h3>Make a Transaction</h3>
          <div className="transaction-form">
            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
        </div>

        <div className="transaction-history">
          <h3>Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p className="no-transactions">No transactions found.</p>
          ) : (
            <div className="transactions">
              {transactions.map((transaction, index) => (
                <div key={index} className={`transaction-item ${getTransactionTypeClass(transaction.type)}`}>
                  <span className="transaction-type">
                    {transaction.type === 'deposit' ? '↑ Deposit' : '↓ Withdrawal'}
                  </span>
                  <span className="transaction-amount">
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <span className="transaction-date">
                    {transaction.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BankAccount;
