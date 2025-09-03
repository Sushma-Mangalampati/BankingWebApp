import React, { useState, useEffect } from 'react';
import logo from './logo.png';

function Admin({handleLogout}) {
  const [users, setUsers] = useState([]);
  const [amountToAdd, setAmountToAdd] = useState({});

  const handleActiveStatusChange = async (userId, newActiveStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/app/updateUserActiveStatus/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Include any authorization headers
        },
        body: JSON.stringify({ active: newActiveStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setUsers(users.map(user => user._id === userId ? { ...user, active: newActiveStatus } : user));
        alert("user activated successfully")
      } else {
        console.error('Failed to update user active status');
        alert("user activated failed")
      }
    } catch (error) {
      console.error('Error during handleActiveStatusChange:', error);
      alert("user activate failed")
    }
  };

  const handleBalanceUpdate = async (userId) => {

    console.log("Updating balance for user ID:", userId); // Log the user ID
  console.log("Amount to add:", amountToAdd[userId]); 
    try {
      const response = await fetch(`http://localhost:5000/app/updateUserBalance/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers
        },
        body: JSON.stringify({ amountToAdd: amountToAdd[userId] }),
      });
  
      if (response.ok) {
        // Handle successful update
      } else {
        // Log detailed error information
        console.error('Failed to update balance. Status:', response.status);
        const errorResponse = await response.text(); // or response.json() if your server sends JSON
        console.error('Error response:', errorResponse);
      }
    } catch (error) {
      console.error('Error during balance update:', error);
    }
  };
  
  
  const updateAmountToAdd = (userId, amount) => {
    setAmountToAdd({ ...amountToAdd, [userId]: amount });
  };
  

  

  useEffect(() => {

   
    

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/app/getAllUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Ensure to add authorization headers or other security measures
          },
        });
  
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
          localStorage.setItem('usersData', JSON.stringify(usersData));
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error during fetchUsers:', error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <>
      {users ?
      (<><nav className="navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="./Admin">
          <img src={logo} alt='logo' className='logo'/> SASS Bank </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <span className="navbar-text">
          <a className="nav-link" href="./" onClick={handleLogout}>Logout</a>
          </span>
        </div>
      </div>
    </nav>

    <div className="container mt-4">
      <h1>Hello, Admin</h1>
      <br></br>
      <h2>All Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
            <th>deposit amount</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.active ? 'Active' : 'Inactive'}</td>
              <td>
                <button class="btn btn-primary" onClick={() => handleActiveStatusChange(user._id, !user.active)}>
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>

              <td>
                      <input 
                        type="number" 
                        placeholder="Amount" 
                        onChange={(e) => updateAmountToAdd(user._id, e.target.value)}
                      />
                      <button class="btn btn-primary" onClick={() => handleBalanceUpdate(user._id)}>
                        Add Balance
                      </button>
                    </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <footer className="text-white text-center text-lg-start">
        <div className="text-center p-3">
            &copy; 2023 Copyright: SASS Bank
        </div>
    </footer>
      </> ) : <></>}
    </>
  );

}

export default Admin;
