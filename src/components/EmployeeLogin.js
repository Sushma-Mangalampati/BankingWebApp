import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

function EmployeeLogin({handleLogin}) {

  const [email, setEmail] = useState();
  localStorage.setItem('Email', email);
  const [password, setPassword] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();
  const navigate = useNavigate();

  const regExEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;

  function validateEmail(){
    if(!email){
      setEmailErrorMsg("Email is a mandatory field");
    }
    else if(!regExEmail.test(email)){
      setEmailErrorMsg("Please enter a valid email");
    }
    else{
      setEmailErrorMsg("");
    }
  };

  function validatePassword(){
    if(!password){
      setPasswordErrorMsg("Password is a mandatory field");
    }
    else{
      setPasswordErrorMsg("");
    }
  };

  const clickLogin = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if(!emailErrorMsg && !passwordErrorMsg){
      try{
        const response = await fetch("http://localhost:5000/app/Login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          console.log('Login successful');
          handleLogin(email);
          navigate('/Admin', { replace: true });
        } 
        else {
          const errorData = await response.json();
          console.error('Login failed:', errorData.error);
          alert('Invalid credentials. Please try again.');
        }
      }
      catch (error) {
        console.error('Error during login:', error);
      }
    }
  }

  return (
    <>
      <section class="login">
        <div class="px-4 py-5 px-md-5 text-center text-lg-start">
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <img src={logo} alt='logo' class="logo-big"/>
                <h1 class="display-3 fw-bold ls-tight">
                  <span class="text">SASS Bank</span>
                </h1>
                <h6 style={{'color': 'hsl(217, 10%, 50.8%)','align-self': 'center'}}>Where Trust Meets Investment</h6><br/>
              </div>

              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                    <form noValidate onSubmit={clickLogin}>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="username">Username</label>
                        <input type="email" className={`form-control ${emailErrorMsg ? 'is-invalid' : ''}`} id="emailInput" name="email"
                          value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} placeholder="Email"/>
                        <div id="email-error" className="invalid-feedback">{emailErrorMsg}</div>
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="password">Password</label>
                        <input type="password" className={`form-control ${passwordErrorMsg ? 'is-invalid' : ''}`} name="password" 
                          value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} placeholder="Password"/>
                        <div id="password-error" className="invalid-feedback">{passwordErrorMsg}</div>
                      </div>

                      
                      {/*<div class="d-flex justify-content-between align-items-center mb-4">
                        <a href="mailto:admin@sassbank.us?subject=Login%20Trouble&body=Hi%20Admin,%0D%0A%0D%0AI%20am%20having%20trouble%20logging%20into
                            %20my%20employee%20account.%20Could%20you%20please%20assist%20me?%0D%0A%0D%0AThanks!%0D%0A">
                            Trouble Logging in? Contact the admin here</a>
                      </div>*/}

                      <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" class="btn btn-primary btn-lg"
                          style={{'padding-left': '2.5rem', 'padding-right': '2.5rem'}}>Login</button>
                      </div>

                      <p class="small fw-bold mt-2 pt-1 mb-0">Not an employee? <a href="./"
                            class="link">Login Here</a></p>

                    </form>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmployeeLogin;