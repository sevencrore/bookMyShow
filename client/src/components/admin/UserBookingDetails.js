import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import withAdminCheck from "./withAdminCheck";

const AdminBookingDetails = () => {
  const [searchOption, setSearchOption] = useState("select"); // Default to "Select Down"
  const [searchValue, setSearchValue] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    // Validation for search option and value
    if (searchOption === "select") {
      setError("Please select a valid search option.");
      return;
    }

    if (!searchValue.trim()) {
      setError("Please enter a value to search.");
      return;
    }

    setLoading(true);
    setError("");
    setBookings([]);

    try {
      let apiUrl;
      if (searchOption === "user_id") {
        apiUrl = `http://localhost:5000/book/user/${searchValue}`;
      } else if (searchOption === "email") {
        apiUrl = `http://localhost:5000/book/user/email/${searchValue}`;
      }

      const response = await axios.get(apiUrl);
      setBookings(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="text-center">Admin: Search Bookings</h1>

      {/* Search Options */}
      <div className="form-group row mt-3">
        <label htmlFor="searchOption" className="col-sm-2 col-form-label">
          Search By:
        </label>
        <div className="col-sm-3">
          <select
            id="searchOption"
            className="form-control"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="select">Select Down</option>
            <option value="user_id">User ID</option>
            <option value="email">Email ID</option>
          </select>
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder={
              searchOption === "user_id"
                ? "Enter User ID"
                : searchOption === "email"
                ? "Enter Email ID"
                : "Select an option first"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={searchOption === "select"} // Disable input when no valid option selected
          />
        </div>
        <div className="col-sm-3">
          <button className="btn btn-primary" onClick={fetchBookings}>
            Fetch Bookings
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-center mt-3">Fetching bookings...</p>}

      {/* Bookings Table */}
      {!loading && !error && bookings.length > 0 && (
        <div className="table-responsive mt-4">
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

      {!loading && !error && bookings.length === 0 && (
        <p className="text-center mt-4">No bookings found for this query.</p>
      )}
    </div>
  );
};

export default withAdminCheck(AdminBookingDetails);
