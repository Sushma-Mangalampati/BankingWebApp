import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import moment from 'moment/moment';

function Transactions({handleLogout}) {

  const [transactions, setTransactions] = useState([]);
  const accountData = JSON.parse(localStorage.getItem('accountData'));
  const sourceAccountNumber = accountData ? accountData.accountNumber : '';
  const sourceAccountId = accountData ? accountData._id : '';

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format('MMM DD, YYYY HH:mm:ss');
  };

  useEffect(() => {

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/app/getTransactions?account=${sourceAccountId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error during fetchTransactions:', error);
      }
    };

    fetchTransactions();
  }, [sourceAccountId]);


  return (
    <>
      {accountData ?
      <>
      <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="./Home">
            <img src={logo} alt='logo' class="logo"/> SASS Bank </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href='./Transactions'>Transactions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./MoneyTransfers">Money Transfers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./EditProfile">Edit Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./ContactUs">Contact Us</a>
              </li>
            </ul>
            <span class="navbar-text">
            <a class="nav-link" href="./" onClick={handleLogout}>Logout</a>
            </span>
          </div>
        </div>
      </nav>

      <div class="container" id='transaction-history'>
      <h1>Transaction History</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Source Account</th>
            <th scope="col">Destination Account</th>
            <th scope="col">Transaction Type</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{formatTimestamp(transaction.timestamp)}</td>
            <td>{transaction.sourceAccountNumber}</td>
            <td>{transaction.destinationAccountNumber}</td>
            <td>{sourceAccountNumber === transaction.sourceAccountNumber ? 'Debit' : 'Credit'}</td>
            <td>${transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <footer class="text-white text-center text-lg-start">
          <div class="text-center p-3">
              &copy; 2023 Copyright: SASS Bank
          </div>
      </footer>
      </> : <></>}
    </>
  )
}

export default Transactions;