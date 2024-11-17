import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Get user ID from local storage
        const user_id = localStorage.getItem('user_id');
       

        if (!user_id) {
          throw new Error("User ID not found in local storage");
        }

        // Construct API URL
        const apiUrl = `http://localhost:5000/book/user/${user_id}`;

        // Fetch bookings data
        const response = await axios.get(apiUrl);
        setBookings(response.data); // Assuming response contains the bookings array
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDownload = async (id) => {
    const downloadUrl = `http://localhost:5000/book/download-bill/${id}`;
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.remove();
  }, 100); 
    
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">My Bookings</h1>

      {loading && <p className="text-center">Loading bookings...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-center">No bookings found for this user.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Number of Members</th>
                <th>Event ID</th>
                <th>Total Price</th>
                <th>Display Name</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.email}</td>
                  <td>{booking.number_of_members}</td>
                  <td>{booking.event_id}</td>
                  <td>{booking.price}</td>
                  <td>{booking.displayName}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownload(booking._id)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
