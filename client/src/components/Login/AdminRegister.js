import React from 'react';


function AdminRegister() {
    
  return (
    <div>
      <h2>Admin Registration</h2>
      <form  action="http://localhost:5000/users/createuser" method="POST">
        <label>Admin Email:</label>
        <input type="email" name="email" placeholder="admin@example.com" required />
        
        <label>Password:</label>
        <input type="password" name="password" placeholder="Enter a strong password" required />
        
        <label>First Name:</label>
        <input type="text" name="firstName" placeholder="first name" required />
        
        <label>Last Name:</label>
        <input type="text" name="lastName" placeholder="Enter a strong password" required />
        
        
        
        <button type="submit">Register as Admin</button>
      </form>
    </div>
  );
}

export default AdminRegister;
