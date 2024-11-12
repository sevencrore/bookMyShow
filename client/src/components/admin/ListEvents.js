import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const ListEvent = () => {
  const history = useHistory();
  const userEmail = localStorage.getItem("username"); // User email stored in local storage

  const [events, setEvents] = useState([]); // To store events data
  const [vendors, setVendors] = useState([]); // To store vendor data
  const [categories, setCategories] = useState([]); // To store category data

  // Fetch events, vendors, and categories when component mounts
  useEffect(() => {
    // Fetch events
    axios
      .get("http://localhost:5000/event/")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch vendors
    axios
      .get("http://localhost:5000/vendor/") // Make sure this endpoint exists
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));

    // Fetch categories
    axios
      .get("http://localhost:5000/category/") // Make sure this endpoint exists
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Redirect to Edit Event page
  const handleEdit = (eventId) => {
    history.push(`/edit-event/${eventId}`);
  };

  // Redirect to View Event page
  const handleView = (eventId) => {
    history.push(`/view-event/${eventId}`);
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">List of Events</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          {/* Event List Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Category</th>
                <th>Vendor</th>
                <th>Host Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>
                    {/* Display category name */}
                    {categories.find((category) => category._id === event.category_id)?.category_name || "N/A"}
                  </td>
                  <td>
                    {/* Display vendor name */}
                    {vendors.find((vendor) => vendor._id === event.vendor_id)?.name || "N/A"}
                  </td>
                  <td>{event.host_name}</td>
                  <td>{event.location_description}</td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleView(event._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListEvent;
