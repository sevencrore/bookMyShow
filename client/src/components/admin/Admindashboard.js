// src/components/admin/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const userEmail = localStorage.getItem('username');

  const [input, setInput] = useState({
    email: userEmail,
});

  useEffect(() => {
    const fetchUserRole = async () => {
      const username = localStorage.getItem('username'); // Get the username from local storage
      console.log(username);

      if (!username) {
        history.push("/");; // Redirect if username is not found in local storage
        return;
      }

      try {
        // Make the API call with the username in the request body
        const response = await axios.post('http://localhost:5000/users/checkrole', input);


        if (response.data.message == 'admin') {
          setRole('admin');
        } else {
          history.push("/"); // Redirect if not admin
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        alert('catched error');
        history.push("/"); // Redirect if error occurs
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchUserRole();
  }, [history]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching the role
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="d-flex justify-content-center">
        <Link to="/admin/movies" className="btn btn-primary mx-3">
          Movies
        </Link>
        <Link to="/admin/Events" className="btn btn-primary mx-3">
          Events
        </Link>
        <Link to="/admin/Category" className="btn btn-primary mx-3">
          Category
        </Link>
        <Link to="/admin/vendor" className="btn btn-primary mx-3">
          Vendor
        </Link>
        <Link to="/admin/theaters" className="btn btn-secondary mx-3">
          Theater
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
