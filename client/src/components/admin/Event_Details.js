import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const Event_Details = () => {
  const userEmail = localStorage.getItem("username"); // User email stored in local storage
  const [events, setEvents] = useState([]); // To store events data
  const [selectedEvent, setSelectedEvent] = useState(null); // To store selected event for view/edit
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit modes

  // Fetch events when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/eventdetails/")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
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

  // Handle form submit for editing event details
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const { _id, event_id, title, date, price, slots } = selectedEvent;

    // Perform the edit submission logic (POST request to update event)
    axios
      .post(`http://localhost:5000/eventdetails/edit/${_id}`, {
        event_id,
        title,
        date,
        price,
        slots,
      })
      .then((response) => {
        console.log("Edited Event: ", response.data);
        // After submission, reset to view mode
        setIsEditing(false);
        setSelectedEvent(response.data.eventDetail);
        // Optionally, you might want to update the events state
        setEvents(events.map((event) =>
          event._id === _id ? response.data.eventDetail : event
        ));
      })
      .catch((error) => console.error("Error editing event:", error));
  };

  // Handle soft delete event
  const handleDelete = (eventId) => {
    axios
      .post(`http://localhost:5000/eventdetails/delete/${eventId}`)
      .then((response) => {
        setEvents(events.filter((event) => event._id !== eventId));
        console.log("Event deleted:", response.data);
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">List of Event Details</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          {/* Event List Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Price</th>
                <th>Slots</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.event_id}</td>
                  <td>{event.title}</td> {/* Display title */}
                  <td>{event.date}</td>
                  <td>{event.price}</td>
                  <td>{event.slots}</td>
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
                      className="me-2"
                      onClick={() => handleEdit(event._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
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
                        <Form.Group controlId="event_id">
                          <Form.Label>Event ID</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedEvent.event_id}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                event_id: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="title">
                          <Form.Label>Event Name</Form.Label>
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
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="date">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={selectedEvent.date}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                date: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="price">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            value={selectedEvent.price}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                price: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="slots">
                          <Form.Label>Slots</Form.Label>
                          <Form.Control
                            type="number"
                            value={selectedEvent.slots}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                slots: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="primary" className="my-3">
                      Save Changes
                    </Button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h3>Event Details</h3>
                  <p>
                    <strong>Event ID:</strong> {selectedEvent.event_id}
                  </p>
                  <p>
                    <strong>Event Name:</strong> {selectedEvent.title} {/* Display title */}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedEvent.date}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedEvent.price}
                  </p>
                  <p>
                    <strong>Slots:</strong> {selectedEvent.slots}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event_Details;
