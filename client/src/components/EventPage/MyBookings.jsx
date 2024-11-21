import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './Mybookings.css';  // Link to external CSS file

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
        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <p className="text-muted small text-center">
            Swipe to view hidden columns
          </p>
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark sticky-top">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Number of Members</th>
                <th>Event ID</th>
                <th>Total Price</th>
                <th>Display Name</th>
                <th>Created At</th>
                <th  className="sticky-col">Action</th>
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
                  <td className="sticky-col">
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

      {/* Fixed Download Button using Bootstrap 5 utility classes */}
      {/* <button
        className="btn btn-primary btn-sm position-fixed bottom-0 end-0 m-3"
        onClick={() => handleDownload(bookings[0]?._id)}
      >
        Download All
      </button> */}
    </div>
  );
};

export default MyBookings;
