import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:8080/balance');
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8080/transactions');
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransaction = async (type) => {
    if (amount > 0) {
      try {
        const response = await fetch('http://localhost:8080/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: type.toLowerCase(),
            amount: Number(amount)
          })
        });
        
        const data = await response.json();
        if (data.success) {
          setBalance(data.balance);
          fetchTransactions();
          setAmount('');
        }
      } catch (error) {
        console.error('Error processing transaction:', error);
      }
    }
  };

  const handleDeposit = () => handleTransaction('deposit');
  const handleWithdraw = () => handleTransaction('withdraw');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Bank Management</h1>
        <div className="bank-container">
          <h2>Current Balance: ${balance}</h2>
          
          <div className="transaction-form">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>

          <div className="transaction-history">
            <h3>Transaction History</h3>
            <div className="transactions">
              {transactions.map((transaction, index) => (
                <div key={index} className="transaction-item">
                  <span>{transaction.type}</span>
                  <span>${transaction.amount}</span>
                  <span>{transaction.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
