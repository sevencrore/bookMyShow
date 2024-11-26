// src/components/admin/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import withAdminCheck from "./withAdminCheck";

const Dashboard = () => {

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const userEmail = localStorage.getItem('username');

  const [input, setInput] = useState({
    email: userEmail,
  });

  useEffect(() => {
 });

  return (
    <div className="container mt-5 " style={{ height: "500px" }} >
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="d-flex justify-content-center">
        <Link to="/admin/movies" className="btn btn-primary mx-3">
          Movies
        </Link>
        <Link to="/admin/Events" className="btn btn-primary mx-3">
          Create Events
        </Link>
        <Link to="/admin/ListEvents" className="btn btn-primary mx-3">
          List Events
        </Link>
        <Link to="/admin/EventDetails" className="btn btn-primary mx-3">
          Event Details
        </Link>
        <Link to="/admin/Category" className="btn btn-primary mx-3">
          Category
        </Link>
        <Link to="/admin/Add_Image" className="btn btn-primary mx-3">
          Add Image
        </Link>
        <Link to="/admin/ListCategory" className="btn btn-primary mx-3">
          Category List
        </Link>
        <Link to="/admin/vendor" className="btn btn-primary mx-3">
          Vendor
        </Link>
        <Link to="/admin/ListVendor" className="btn btn-primary mx-3">
          Vendor List
        </Link>
        <Link to="/admin/Add_City" className="btn btn-primary mx-3">
        Add City
        </Link>
        <Link to="/admin/ListCity" className="btn btn-primary mx-3">
          City List
        </Link>
        <Link to="/admin/theaters" className="btn btn-secondary mx-3">
          Theater
        </Link>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/admin/userbookings" className="btn btn-primary mx-3">
          Users Bookings
        </Link>
        <Link to="/admin/add-coupon" className="btn btn-primary mx-3">
        Add Coupon
        </Link>

        <Link to="/admin/logout" className="btn btn-primary mx-3">
          Admin Logout
        </Link>
        
      </div>

    </div>
  );
};

export default withAdminCheck(Dashboard);
