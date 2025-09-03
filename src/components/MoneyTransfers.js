import React, { useState } from 'react';
import logo from './logo.png';

function MoneyTransfers({handleLogout}) {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumberErrorMsg, setAccountNumberErrorMsg] = useState();
  const [amountErrorMsg, setAmountErrorMsg] = useState();

  // Fetch the account data from localStorage
  const accountData = JSON.parse(localStorage.getItem('accountData'));
  const sourceAccountNumber = accountData ? accountData.accountNumber : '';

  const regExAccountNumber = /^\d{10}$/;
  const regExAmount = /^(?:0|[1-9]\d{0,6})(?:\.\d{1,2})?$/

  function validateAccountNumber(){
    if(!accountNumber){
      setAccountNumberErrorMsg("Account Number is a mandatory field");
    }
    else if(!regExAccountNumber.test(accountNumber)){
      setAccountNumberErrorMsg("Please enter a valid Account Number, should contain only numbers of 10 characters");
    }
    else{
      setAccountNumberErrorMsg("");
    }
  };

  function validateAmount(){
    if(!amount){
      setAmountErrorMsg("Amount is a mandatory field");
    }
    else if(!regExAmount.test(amount)){
      setAmountErrorMsg("Please enter a valid Amount");
    }
    else{
      setAmountErrorMsg("");
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    validateAccountNumber();
    validateAmount();
    
    const data = {
      sourceAccount: sourceAccountNumber, // Use the source account number from localStorage
      destinationAccount: accountNumber,
      amount: parseFloat(amount)
    }; 

    try{
      const response = await fetch("http://localhost:5000/app/transfer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Transfer successful');
        alert('Money Transfer successful');
      } 
      else {
        const errorData = await response.json();
        console.error('Transfer failed:', errorData.error);
        alert('Money Transfer failed. Please enter valid details.');
      }
    }
    catch (error) {
      console.error('Error during transfer:', error);
    }
    
  };

  return (
    <>
      {accountData ?
      <><nav class="navbar navbar-expand-lg" data-bs-theme="dark">
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

      <div class="container" id="money-transfers">
        <h1>Money Transfers</h1>
        <h4>Send money to</h4>
        <form noValidate onSubmit={handleTransferSubmit}>
          <div class="row">
            <div class="col">
            <input type="text" className={`form-control ${accountNumberErrorMsg ? 'is-invalid' : ''}`} name="accountNumber" 
            value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} onBlur={validateAccountNumber} placeholder="Account Number"/>
            <div id="accountNumber-error" className="invalid-feedback">{accountNumberErrorMsg}</div>
            </div>
            <div class="col">
            <input type="text" className={`form-control ${amountErrorMsg ? 'is-invalid' : ''}`} name="amount" 
            value={amount} onChange={(e) => setAmount(e.target.value)} onBlur={validateAmount} placeholder="Amount"/>
            <div id="amount-error" className="invalid-feedback">{amountErrorMsg}</div>
            </div>
            <div class="col">
              <button type="submit" class="btn btn-primary">Send</button>
            </div>
          </div>
        </form>

      </div>

      <footer class="text-white text-center text-lg-start">
          <div class="text-center p-3">
              &copy; 2023 Copyright: SASS Bank
          </div>
      </footer>
      </> : <></>}
    </>
  );
}

export default MoneyTransfers;
