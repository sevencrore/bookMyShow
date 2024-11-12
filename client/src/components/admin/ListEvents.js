import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const ListEvent = () => {
  const userEmail = localStorage.getItem("username"); // User email stored in local storage
  const [events, setEvents] = useState([]); // To store events data
  const [vendors, setVendors] = useState([]); // To store vendor data
  const [categories, setCategories] = useState([]); // To store category data
  const [selectedEvent, setSelectedEvent] = useState(null); // To store selected event for view/edit
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit modes

  // Fetch events, vendors, and categories when component mounts
  useEffect(() => {
    // Fetch events
    axios
      .get("http://localhost:5000/event/")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch vendors
    axios
      .get("http://localhost:5000/vendor/")
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));

    // Fetch categories
    axios
      .get("http://localhost:5000/eventCategory/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle View action
  const handleView = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    setSelectedEvent(event);
    setIsEditing(false); // Set view mode
  };

  // Handle Edit action
  const handleEdit = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    setSelectedEvent(event);
    setIsEditing(true); // Set edit mode
  };

  // Handle form submit for editing
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    // Perform the edit submission logic, e.g., PUT request to update event
    // For now, just log the edited event
    console.log("Edited Event: ", selectedEvent);
    // After submission, you might want to reset or update the state
    setIsEditing(false); // Reset to view mode after editing
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

          {/* Event Details or Edit Form Below the Table */}
          {selectedEvent && (
            <div className="my-3">
              {isEditing ? (
                <div>
                  <h3>Edit Event</h3>
                  <Form onSubmit={handleSubmitEdit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="title">
                          <Form.Label>Event Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedEvent.title}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                title: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="host_name">
                          <Form.Label>Host Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedEvent.host_name}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                host_name: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="category">
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            as="select"
                            value={selectedEvent.category_id}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                category_id: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.category_name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="vendor">
                          <Form.Label>Vendor</Form.Label>
                          <Form.Control
                            as="select"
                            value={selectedEvent.vendor_id}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                vendor_id: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Vendor</option>
                            {vendors.map((vendor) => (
                              <option key={vendor._id} value={vendor._id}>
                                {vendor.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="location">
                      <Form.Label>Location Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={selectedEvent.location_description}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            location_description: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="my-3">
                      Save Changes
                    </Button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h3>Event Details</h3>
                  <p><strong>Event Title:</strong> {selectedEvent.title}</p>
                  <p><strong>Host Name:</strong> {selectedEvent.host_name}</p>
                  <p><strong>Category:</strong> {categories.find((category) => category._id === selectedEvent.category_id)?.category_name || "N/A"}</p>
                  <p><strong>Vendor:</strong> {vendors.find((vendor) => vendor._id === selectedEvent.vendor_id)?.name || "N/A"}</p>
                  <p><strong>Location:</strong> {selectedEvent.location_description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListEvent;
