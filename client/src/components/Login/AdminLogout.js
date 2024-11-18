import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove the token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Optionally, you can also redirect to the login page after logout
    alert("You have logged out successfully.");
    history.push("login"); // Redirect to login page (adjust the path as needed)
  };

  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Are you sure you want to logout?</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <button onClick={handleLogout} className="btn btn-danger btn-block">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogout;
