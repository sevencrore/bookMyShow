// src/components/admin/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="d-flex justify-content-center">
        <Link to="/admin/movies" className="btn btn-primary mx-3">
          Movies
        </Link>
        <Link to="/admin/theaters" className="btn btn-secondary mx-3">
          Theater
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
