import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const ListEvent = () => {
  const userEmail = localStorage.getItem("username"); // User email stored in local storage
  const [events, setEvents] = useState([]); // To store events data
  const [vendors, setVendors] = useState([]); // To store vendor data
  const [categories, setCategories] = useState([]); // To store category data
  const [cities, setCities] = useState([]); // To store city data
  const [selectedEvent, setSelectedEvent] = useState(null); // To store selected event for view/edit
  const [eventDetails, setEventDetails] = useState({
    email: userEmail,
    date: "",
    price: "",
    slots: "",
    event_id: "", // The event ID will be set when an event is selected
  });

  // Fetch events, vendors, categories, and cities when component mounts
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

    // Fetch cities
    axios
      .get("http://localhost:5000/city/")
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Handle View action
  const handleView = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    setSelectedEvent(event);
  };

  // Handle Add Event Details action
  const handleCreateEventDetails = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    setSelectedEvent(event); // Set selected event for reference in the form

    // Pre-fill the form with event details
    setEventDetails({
      email: userEmail,
      date: "",
      price: "",
      slots: "",
      event_id: eventId, // Attach event ID to the event details
    });
  };

  // Handle form submit for creating event details
  const handleSubmitEventDetails = (e) => {
    e.preventDefault();

    // Create the event details using the API
    axios
      .post("http://localhost:5000/eventDetails/create", eventDetails)
      .then((response) => {
        console.log("Event details created:", response.data);
        // Reset the form after successful creation
        setEventDetails({
          email: userEmail,
          date: "",
          price: "",
          slots: "",
          event_id: eventDetails.event_id,
        });
        alert("Event Details Created Successfully!");
      })
      .catch((error) => {
        console.error("Error creating event details:", error);
      });
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
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>
                    {/* Display category name */}
                    {categories.find(
                      (category) => category._id === event.category_id
                    )?.category_name || "N/A"}
                  </td>
                  <td>
                    {/* Display vendor name */}
                    {vendors.find((vendor) => vendor._id === event.vendor_id)
                      ?.name || "N/A"}
                  </td>
                  <td>{event.host_name}</td>
                  <td>{event.location_description}</td>
                  <td>
                    {/* Display city name */}
                    {cities.find((city) => city._id === event.city_id)?.name ||
                      "N/A"}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleView(event._id)}
                    >
                      View
                    </Button>
                    <Button
                      className="me-2"
                      variant="success"
                      onClick={() => handleCreateEventDetails(event._id)}
                    >
                      Add Event Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Event Details or Add Event Details Form Below the Table */}
          {selectedEvent && (
            <div className="my-3">
              <h3>Create Event Details for "{selectedEvent.title}"</h3>
              <Form onSubmit={handleSubmitEventDetails}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={eventDetails.date}
                        onChange={(e) =>
                          setEventDetails({
                            ...eventDetails,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={eventDetails.price}
                        onChange={(e) =>
                          setEventDetails({
                            ...eventDetails,
                            price: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="slots">
                      <Form.Label>Available Slots</Form.Label>
                      <Form.Control
                        type="text"
                        value={eventDetails.slots}
                        onChange={(e) =>
                          setEventDetails({
                            ...eventDetails,
                            slots: e.target.value,
                          })
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="primary" className="my-3">
                  Create Event Details
                </Button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListEvent;
