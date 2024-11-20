import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './Mybookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
          throw new Error("User ID not found in local storage");
        }

        const apiUrl = `${process.env.REACT_APP_HOST}/book/user/${user_id}`;
        const response = await axios.get(apiUrl);
        setBookings(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDownload = async (id) => {
    const downloadUrl = `${process.env.REACT_APP_HOST}/book/download-bill/${id}`;
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
        <div
          className="table-responsive"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <p className="text-muted small text-center" style={{ fontSize: "0.8rem" }}>
            Swipe to view hidden columns
          </p>
          <table className="table table-bordered table-striped table-hover">
            <thead
              className="thead-dark"
              style={{
                backgroundColor: "#343a40",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Number of Members</th>
                <th>Event ID</th>
                <th>Total Price</th>
                <th>Display Name</th>
                <th>Created At</th>
                <th style={{
                position: '-webkit-sticky',
                position: 'sticky',
                right: 0,
                backgroundColor: '#f8f9fa',
                zIndex: 1,
              }}>Action </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td style={{ fontSize: "0.9rem" }}>{index + 1}</td>
                  <td style={{ fontSize: "0.9rem" }}>{booking.email}</td>
                  <td style={{ fontSize: "0.9rem" }}>{booking.number_of_members}</td>
                  <td style={{ fontSize: "0.9rem" }}>{booking.event_id}</td>
                  <td style={{ fontSize: "0.9rem" }}>{booking.price}</td>
                  <td style={{ fontSize: "0.9rem" }}>{booking.displayName}</td>
                  <td style={{ fontSize: "0.9rem" }}>
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleDownload(booking._id)}
                      style={{
                        fontSize: "0.8rem",
                        position: "relative",
                        zIndex: 10,
                      }}
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
