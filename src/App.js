import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login.js';
import Home from './components/Home.js';
import Register from './components/Register';
import Transactions from './components/Transactions';
import MoneyTransfers from './components/MoneyTransfers';
import EditProfile from './components/EditProfile';
import ContactUs from './components/ContactUs';
import ForgotPassword from './components/ForgotPassword';
import EmployeeLogin from './components/EmployeeLogin';
import Admin from './components/Admin';
import { useState } from "react";

function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('accountData');
    localStorage.removeItem('usersData');
    window.history.replaceState({}, document.title, '/');
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/EmployeeLogin" element={<EmployeeLogin handleLogin={handleLogin}/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Home" element={<Home user={user} handleLogout={handleLogout}/>}/>
        <Route path="/Transactions" element={<Transactions user={user} handleLogout={handleLogout}/>}/>
        <Route path="/MoneyTransfers" element={<MoneyTransfers user={user} handleLogout={handleLogout}/>}/>
        <Route path="/EditProfile" element={<EditProfile user={user} handleLogout={handleLogout}/>}/>
        <Route path="/ContactUs" element={<ContactUs user={user} handleLogout={handleLogout}/>}/>
        <Route path="/Admin" element={<Admin user={user} handleLogout={handleLogout}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
