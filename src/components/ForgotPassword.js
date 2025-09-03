import React from 'react';
import logo from './logo.png';

function ForgotPassword() {
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

      <div class="col-lg-6 mb-5 mb-lg-0 align-center">
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                    <form>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="username">Username</label>
                        <input type="text" id="username" class="form-control" placeholder='Email'/>  
                        <span id="username-err" style={{'display': 'none'}}>Please enter valid username</span>
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="newPassword">New Password</label>
                        <input type="newPassword" id="newPassword" class="form-control" placeholder='New Password'/>
                        <span id="password-err" style={{'display': 'none'}}>
                        Password should be min 8 and max 15 characters<br/>should have atleast one number and one special character
                        </span>
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="confirmNewPassword">Confirm New Password</label>
                        <input type="confirmNewPassword" id="confirmNewPassword" class="form-control" placeholder='Confirm New Password'/>
                        <span id="password-err" style={{'display': 'none'}}>
                          Password should be min 8 and max 15 characters<br/>should have atleast one number and one special character</span>
                      </div>

                      <div class="text-center text-lg-start mt-4 pt-2">
                          <button type="submit" class="btn btn-primary btn-lg"
                          style={{'padding-left': '2.5rem', 'padding-right': '2.5rem'}}>Update Password</button>
                        <p class="small fw-bold mt-2 pt-1 mb-0">Password Updated? <a href="./"
                            class="link">Login</a></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForgotPassword;