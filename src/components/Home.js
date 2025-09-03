import React, {useState, useEffect} from 'react';
import logo from './logo.png';


function Home({user, handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    const savedAccountData = localStorage.getItem('accountData');

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    if (savedAccountData) {
      setAccountData(JSON.parse(savedAccountData));
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if(user){
          const response = await fetch(`http://localhost:5000/app/getUserData?email=${user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            localStorage.setItem('userData', JSON.stringify(data)); // Save to localStorage
          } else {
            console.error('Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Error during fetchUserData:', error);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (userData && userData._id) {
          const response = await fetch(`http://localhost:5000/app/getAccountData?owner=${userData._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAccountData(data);
            localStorage.setItem('accountData', JSON.stringify(data)); // Save to localStorage
          } else {
            console.error('Failed to fetch account data');
          }
        }
      } catch (error) {
        console.error('Error during fetchAccountData:', error);
      }
    };
    fetchAccountData();
  }, [userData]);

  return (
    <>
      {userData ? 
      (<><nav class="navbar navbar-expand-lg" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="./Home">
              <img src={logo} alt='logo' class='logo' /> SASS Bank </a>
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
        </nav><section id="home" class="home">
            <div class="container">
              <h1>Welcome, {userData && userData.firstName}</h1>
              <div class="card">
                <div class="card-header">
                  Account Summary
                </div>
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p>Account Number: {accountData && accountData.accountNumber}</p>
                    <h1>$ {accountData && accountData.balance}</h1>
                    <footer class="blockquote-footer">Available Balance</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </section><section id='other-services' class='other-services'>
            <div class="container">
              <h2>Explore our other services</h2>
              <div class="row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Credit Cards</h5>
                      <p class="card-text">Reach out to our customer service to know about various credits cards.</p>
                      <a href="./ContactUs" class="btn btn-primary">Credit card support</a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Loans</h5>
                      <p class="card-text">Our customer service will help you in getting a loan tailored to your needs.</p>
                      <a href="./ContactUs" class="btn btn-primary">Loan support</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section><footer class="text-white text-center text-lg-start">
            <div class="text-center p-3">
              &copy; 2023 Copyright: SASS Bank
            </div>
          </footer>
        </> ) : <></>}
    </>
  );
}

export default Home;