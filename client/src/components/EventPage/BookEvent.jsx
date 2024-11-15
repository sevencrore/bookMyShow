import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"; 
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'; // Import necessary components from React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const BookEvent = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const history = useHistory(); // Use history hook for navigation
    const [eventDetails, setEventDetails] = useState([]); // Initialize state for event details
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching state

    // Fetch event details using eventId from URL
    useEffect(() => {
        console.log(`Fetching data for event details with event ID: ${eventId}`); // Debugging log
        fetch(`http://localhost:5000/eventdetails/event/${eventId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                debugger;
                if (data.length > 0) {
                    console.log("Fetched event details data:", data); // Debugging log
                    setEventDetails(data); // Update state with the fetched event data
                    setLoading(false); // Set loading to false once data is fetched
                } else {
                    console.error("Invalid data received:", data); // Debugging log
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.error("Error fetching event details:", e);
                setLoading(false);
            });
    }, [eventId]);

    // If event details data is not available, show loading message
    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading event details...</p>
            </div>
        );
    }

    // Convert MongoDB Decimal128 values to regular numbers for location (if needed)
    const { date, price, slots, is_active, is_deleted } = eventDetails; 

    // Build a date format for display
    const eventDate = new Date(date).toLocaleString();

    return (
        <div className="container my-5">
            <Row>
                {/* Background image placeholder */}
                <Col xs={12} className="p-0">
                    <div
                        className="position-relative"
                        style={{
                            backgroundColor: "#f0f0f0",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "400px",
                        }}
                    >
                        {/* Small placeholder image on top of background */}
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Event Image"
                            className="position-absolute top-0 start-0 m-3"
                            style={{
                                width: "150px",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            }}
                        />
                    </div>
                </Col>
            </Row>

            {/* Event Details */}
            <Card className="mt-4 p-3 shadow-sm">
                <Card.Body>
                    <Card.Title>Event Details</Card.Title>

                    {/* Event Date */}
                    <Card.Subtitle className="mb-2 text-muted">
                        <strong>Date & Time:</strong> {eventDate}
                    </Card.Subtitle>

                    {/* Price */}
                    <Card.Text>
                        <strong>Price:</strong> ${price}
                    </Card.Text>

                    {/* Slots */}
                    <Card.Text>
                        <strong>Available Slots:</strong> {slots}
                    </Card.Text>

                    {/* Event Status */}
                    {is_active === '0' && (
                        <Alert variant="warning" className="mt-3">
                            This event is currently inactive.
                        </Alert>
                    )}

                    {/* Deletion Status */}
                    {is_deleted === '1' && (
                        <Alert variant="danger" className="mt-3">
                            This event has been deleted.
                        </Alert>
                    )}

                    {/* Button to book tickets */}
                    {is_active === '1' && (
                        <Button
                            onClick={() => history.push(`/event/book/${eventId}`)} // Navigate to the booking page
                            variant="primary"
                            className="mt-3"
                            size="lg"
                        >
                            Book Tickets
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookEvent;
