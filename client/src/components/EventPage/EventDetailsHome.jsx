import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventDetailsHome = () => {
    const { eventId } = useParams();
    const history = useHistory();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch event details using eventId from URL
    useEffect(() => {
        console.log(`Fetching data for event ID: ${eventId}`);
        fetch(`${process.env.REACT_APP_HOST}/event/${eventId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data && data._id) {
                    setEvent(data);
                    setLoading(false);
                } else {
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
    const imageUrl = `${process.env.REACT_APP_HOST}${event.img}`;
    const bgImageUrl = `${process.env.REACT_APP_HOST}${event.bg_img}`;

    return (
        <div className="container my-5">
            <Row>
                {/* Background image */}
                <Col xs={12} className="p-0">
                    <div
                        className="position-relative event-bg"
                        style={{
                            backgroundImage: `url(${bgImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "400px",
                            borderRadius: "10px",
                        }}
                    >
                        {/* Small image on top of background */}
                        <img
                            src={imageUrl}
                            alt={event.title}
                            className="position-absolute top-0 start-0 m-3 event-img"
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
            <Card className="mt-4 p-4 shadow-sm rounded event-card">
                <Card.Body>
                    <h3>{event.title}</h3>
                    <Card.Subtitle className="mb-2 text-muted">
                        <strong>Host:</strong> {event.host_name}
                    </Card.Subtitle>
                    <p><strong>Location:</strong> {event.description}</p>

                    {/* Category */}
                    <div className="mb-3">
                        <strong>Category:</strong> {event.category}
                    </div>

                    {/* Vendor */}
                    <div className="mb-3">
                        <strong>Vendor:</strong> {event.vendor}
                    </div>

                    {/* Event Location */}
                    {event.location_description && (
                        <div className="mb-3">
                            <strong>Location Description:</strong> {event.location_description}
                        </div>
                    )}

                    {/* Coordinates */}
                    <div className="mb-3">
                        <strong>Coordinates:</strong>
                        <p>Latitude: {locationLat}, Longitude: {locationLng}</p>
                    </div>

                    {/* City */}
                    <div className="mb-3">
                        <strong>City:</strong> {event.city}
                    </div>

                    {/* Event Status */}
                    {event.is_active === '0' && (
                        <Alert variant="warning" className="mt-3">
                            This event is currently inactive.
                        </Alert>
                    )}

                    {/* Button to go back to events list */}
                    <Button
                        onClick={() => history.push(`/bookevent/${event._id}`)}
                        variant="primary"
                        className="mt-3 event-btn"
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
