import React, {useState} from 'react';
import logo from './logo.png';


function Register() {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState();
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState();
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState();

  const regExName = /^[A-Za-z]{3,30}$/;
  const regExPhoneNumber = /^\d{10}$/;
  const regExEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/;
  const regExPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/; 

  function validateFirstName(){
    if(!firstName){
      setFirstNameErrorMsg("First Name is a mandatory field");
    }
    else if(!regExName.test(firstName)){
      setFirstNameErrorMsg("Please enter a valid first name, should contain only alphabets and should be min 3 and max 30 characters");
    }
    else{
      setFirstNameErrorMsg("");
    }
  };

  function validateLastName(){
    if(!lastName){
      setLastNameErrorMsg("Last Name is a mandatory field");
    }
    else if(!regExName.test(lastName)){
      setLastNameErrorMsg("Please enter a valid last name, should contain only alphabets and should be min 3 and max 30 characters");
    }
    else{
      setLastNameErrorMsg("");
    }
  };

  function validatePhoneNumber(){
    if(!phoneNumber){
      setPhoneNumberErrorMsg("Phone Number is a mandatory field");
    }
    else if(!regExPhoneNumber.test(phoneNumber)){
      setPhoneNumberErrorMsg("Please enter a valid Phone Number, should contain only numbers of 10 characters");
    }
    else{
      setPhoneNumberErrorMsg("");
    }
  };

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
    else if(!regExPassword.test(password)){
      setPasswordErrorMsg("Please enter a valid password, should contain atleast one number and one special character and should be min 8 and max 15 characters");
    }
    else{
      setPasswordErrorMsg("");
    }
  };

  function validateConfirmPassword(){
    if(!password){
      setConfirmPasswordErrorMsg("Confirm Password is a mandatory field");
    }
    else if(confirmPassword !== password){
      setConfirmPasswordErrorMsg("Please enter a value same as password");
    }
    else{
      setConfirmPasswordErrorMsg("");
    }
  };

  const clickRegister = async (e) => {
    e.preventDefault();
    validateFirstName();
    validateLastName();
    validatePhoneNumber();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if(!firstNameErrorMsg && !lastNameErrorMsg && !phoneNumberErrorMsg && !emailErrorMsg && !passwordErrorMsg && !confirmPasswordErrorMsg){
      try{
        const response = await fetch("http://localhost:5000/app/Register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({firstName, lastName,phoneNumber, email, password}),
        });

        if (response.ok) {
          console.log('Register successful');
          alert('Register successful, Please login');

        } 
        else {
          const errorData = await response.json();
          console.error('Register failed:', errorData.error);
          alert('Register failed:', errorData.error);
        }
      }
      catch (error) {
        console.error('Error during register:', error);
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
                    <form noValidate onSubmit={clickRegister}>

                      <div class="form-outline mb-4">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" className={`form-control ${firstNameErrorMsg ? 'is-invalid' : ''}`} id="firstNameInput" name="firstName"
                          value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={validateFirstName} placeholder="First Name"/>
                        <div id="firstName-error" className="invalid-feedback">{firstNameErrorMsg}</div>
                      </div>

                      <div class="form-outline mb-4">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" className={`form-control ${lastNameErrorMsg ? 'is-invalid' : ''}`} id="lastNameInput" name="lastName"
                          value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={validateLastName} placeholder="Last Name"/>
                        <div id="lastName-error" className="invalid-feedback">{lastNameErrorMsg}</div>
                      </div>

                      <div class="form-outline mb-4">
                        <label for="phoneNumber" class="form-label">Phone Number</label>
                        <input type="text" className={`form-control ${phoneNumberErrorMsg ? 'is-invalid' : ''}`} id="phoneNumberInput" name="phoneNumber"
                          value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onBlur={validatePhoneNumber} placeholder="Phone Number"/>
                        <div id="phoneNumber-error" className="invalid-feedback">{phoneNumberErrorMsg}</div>
                      </div>

                      <div class="form-outline mb-4">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" className={`form-control ${emailErrorMsg ? 'is-invalid' : ''}`} id="emailInput" name="email"
                          value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} placeholder="Email"/>
                        <div id="email-error" className="invalid-feedback">{emailErrorMsg}</div>
                      </div>

                      <div class="form-outline mb-4">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" className={`form-control ${passwordErrorMsg ? 'is-invalid' : ''}`} name="password" 
                          value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} placeholder="Password"/>
                        <div id="password-error" className="invalid-feedback">{passwordErrorMsg}</div>
                      </div>

                      <div class="form-outline mb-4">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" className={`form-control ${confirmPasswordErrorMsg ? 'is-invalid' : ''}`} name="confimPassword" 
                          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={validateConfirmPassword} placeholder="Confirm Password"/>
                        <div id="confirmPassword-error" className="invalid-feedback">{confirmPasswordErrorMsg}</div>
                      </div>

                      <div class="text-center text-lg-start mt-4 pt-2">
                          <button type="submit" class="btn btn-primary btn-lg"
                          style={{'padding-left': '2.5rem', 'padding-right': '2.5rem'}}>Register</button>
                          <p class="small fw-bold mt-2 pt-1 mb-0">Already registered? <a href="./"
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

export default Register;