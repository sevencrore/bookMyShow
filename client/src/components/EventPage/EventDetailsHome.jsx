import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"; 
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'; // Import necessary components from React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetailsHome = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const history = useHistory(); // Use history hook for navigation
    const [event, setEvent] = useState(null); // Initialize state to null, since event is an object
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching state

    // Fetch event details using eventId from URL
    useEffect(() => {
        console.log(`Fetching data for event ID: ${eventId}`); // Debugging log
        fetch(`http://localhost:5000/event/${eventId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data && data._id) {
                    console.log("Fetched event data:", data); // Debugging log
                    setEvent(data); // Update state with the fetched event data
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

    // If event data is not available, show loading message
    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading event details...</p>
            </div>
        );
    }

    // Convert MongoDB Decimal128 values to regular numbers
    const locationLat = event.location_lat?.$numberDecimal || 0;
    const locationLng = event.location_lang?.$numberDecimal || 0;

    // Build full URLs for images
    const imageUrl = `http://localhost:5000${event.img}`;
    const bgImageUrl = `http://localhost:5000${event.bg_img}`;

    return (
        <div className="container my-5">
            <Row>
                {/* Background image */}
                <Col xs={12} className="p-0">
                    <div
                        className="position-relative"
                        style={{
                            backgroundImage: `url(${bgImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "400px",
                        }}
                    >
                        {/* Small image on top of background */}
                        <img
                            src={imageUrl}
                            alt={event.title}
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
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <strong>Host:</strong> {event.host_name}
                    </Card.Subtitle>
                    <Card.Text>{event.description}</Card.Text>

                    {/* Category */}
                    <div className="mb-3">
                        <strong>Category ID:</strong>
                        <p>{event.category_id}</p>
                    </div>

                    {/* Vendor */}
                    <div className="mb-3">
                        <strong>Vendor ID:</strong>
                        <p>{event.vendor_id}</p>
                    </div>

                    {/* Event Location */}
                    {event.location_description && (
                        <div className="mb-3">
                            <strong>Location Description:</strong>
                            <p>{event.location_description}</p>
                        </div>
                    )}

                    {/* Coordinates */}
                    <div className="mb-3">
                        <strong>Location Coordinates:</strong>
                        <p>Latitude: {locationLat}, Longitude: {locationLng}</p>
                    </div>

                    {/* City */}
                    <div className="mb-3">
                        <strong>City ID:</strong>
                        <p>{event.city_id}</p>
                    </div>

                    {/* Event Status */}
                    {event.is_active === '0' && (
                        <Alert variant="warning" className="mt-3">
                            This event is currently inactive.
                        </Alert>
                    )}

                    {/* Button to go back to events list */}
                    <Button
                        onClick={() => history.push(`/bookevent/${event._id}`)} // Navigate back to event list
                        variant="primary"
                        className="mt-3"
                        size="lg"
                    >
                        Book Tickets
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EventDetailsHome;
