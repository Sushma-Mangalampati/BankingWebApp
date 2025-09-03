import React from 'react';
import logo from './logo.png';

function ContactUs({handleLogout}) {

  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <>
      {userData ?
      (<><nav class="navbar navbar-expand-lg" data-bs-theme="dark">
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

      <div class="container" id='contact-us'>
        <h1>Contact Us</h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card">
              <h5 class="card-header">Credit card support</h5>
              <div class="card-body">
                <label class="card-text"> Email: </label>
                <a href="mailto:creditcardsupport@sassbank.com"> creditcardsupport@sassbank.com </a>
                <label class="card-text"> Phone Number: </label>
                <a href="tel:+1 (123)-456-7890"> +1 (857)-456-7890 </a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <h5 class="card-header">Loan support</h5>
              <div class="card-body">
                <label class="card-text"> Email: </label>
                <a href="mailto:loansupport@sassbank.com"> loansupport@sassbank.com </a>
                <label class="card-text"> Phone Number: </label>
                <a href="tel:+1 (123)-456-7890"> +1 (857)-123-4567 </a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <h5 class="card-header">Others</h5>
              <div class="card-body">
                <label class="card-text"> Email: </label>
                <a href="mailto:creditcardsupport@sassbank.com"> generalsupport@sassbank.com </a>
                <label class="card-text"> Phone Number: </label>
                <a href="tel:+1 (123)-456-7890"> +1 (123)-456-7890 </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="text-white text-center text-lg-start">
          <div class="text-center p-3">
              &copy; 2023 Copyright: SASS Bank
          </div>
      </footer>
      </>) : <></>}
    </>
  )
}

export default ContactUs;