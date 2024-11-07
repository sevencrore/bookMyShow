import React from 'react';

function AdminLogin() {
  return (
    <div>
      <h2>Admin Login</h2>
      <form>
        <label>Admin Email:</label>
        <input type="email" name="email" placeholder="admin@example.com" required />
        
        <label>Password:</label>
        <input type="password" name="password" placeholder="Enter your password" required />
        
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
}

export default AdminLogin;
