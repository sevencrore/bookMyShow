import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom"; // Use withRouter for navigation in React Router v5
import { useParams } from "react-router-dom"; // Add this import to use useParams
import { Card, Button, Row, Col, Alert, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookEvent = ({ history }) => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const [eventDetails, setEventDetails] = useState([]); // Initialize state for event details as an array
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching state
    const [selectedMembers, setSelectedMembers] = useState({}); // Track selected members for each event

    useEffect(() => {
        console.log(`Fetching data for event details with event ID: ${eventId}`); // Debugging log
        fetch(`${process.env.REACT_APP_HOST}/eventdetails/event/${eventId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    console.log("Fetched event details data:", data); // Debugging log
                    setEventDetails(data); // Update state with event details
                    const initialMembers = data.reduce((acc, _, index) => {
                        acc[index] = 2; // Default 2 members
                        return acc;
                    }, {});
                    setSelectedMembers(initialMembers);
                    setLoading(false); // Set loading to false once data is fetched
                } else {
                    alert("There is no Slots for this Event");
                    console.error("Invalid data received:", data); // Debugging log
                    const cityId = localStorage.getItem('selectedCityId');
                const categoryId = localStorage.getItem('selectedCategoryId');
                history.push(`/events/${categoryId}/${cityId}`);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.error("Error fetching event details:", e);
                setLoading(false);
            });
    }, [eventId]);

    const handleMembersChange = (event, eventIndex) => {
        const membersCount = event.target.value;
        setSelectedMembers((prevSelectedMembers) => ({
            ...prevSelectedMembers,
            [eventIndex]: membersCount, // Save the selected number of members for each event
        }));
    };

    const handleBooking = async (eventId, members = 2, eventDetailsID, eventDetails, price) => {
        try {
            const numberOfMembers = parseInt(members, 10);

            const user = JSON.parse(localStorage.getItem('user'));
            const user_id = localStorage.getItem('user_id');
            const email = user ? user.email : '';
            const uid = user ? user.uid : '';
            const displayName = user ? user.displayName : '';

            if (!user) {
                alert('Please login to Continue Booking Process');
                return;
            }

            const bookingData = {
                number_of_members: numberOfMembers,
                eventDetailsID,
                email,
                event_id: eventDetails.event_id,
                uid,
                user_id,
                price: price * numberOfMembers,
                displayName,
            };

            console.log("Booking Data:", bookingData); // Log the data to verify it's correct

            const res = await axios.post(`${process.env.REACT_APP_HOST}/book/create`, bookingData);

            alert("Booking successful!");

            // Pass the booking data to the Payment page
            history.push('/booking/payment', { state: { bookingData } });

        } catch (error) {
            alert(error.response?.data?.message || "An error occurred during the booking process.");
        }
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading event details...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <Row className="g-4">
                {eventDetails.map((event, index) => {
                    const { date, price, slots, is_active, is_deleted, _id, event_id } = event;
                    const eventDate = new Date(date).toLocaleString();
                    const isActive = is_active === '1' || is_active === 1;
                    const isDeleted = is_deleted === '1' || is_deleted === 1;
                    const selectedMembersCount = selectedMembers[index] || 2; // Default to 2 members if none selected
                    const totalPrice = price * selectedMembersCount;

                    return (
                        <Col xs={12} sm={6} md={4} lg={3} key={event._id} className="mb-4">
                            <Card className="p-3 shadow-sm">
                                <Card.Body>
                                    <Card.Title>Event Details</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <strong>Date & Time:</strong> {eventDate}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Price:</strong> &#x20B9;{price}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Available Slots:</strong> {slots}
                                    </Card.Text>
                                    {isActive === false && (
                                        <Alert variant="warning" className="mt-3">
                                            This event is currently inactive.
                                        </Alert>
                                    )}
                                    {isDeleted === true && (
                                        <Alert variant="danger" className="mt-3">
                                            This event has been deleted.
                                        </Alert>
                                    )}
                                    {isActive === true && (
                                        <div className="mb-3">
                                            <Form.Label>Select Number of Members</Form.Label>
                                            <Form.Select
                                                as="select"
                                                value={selectedMembers[index] || 1}
                                                onChange={(e) => handleMembersChange(e, index)}
                                            >
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i} value={i + 1}>
                                                        {i + 1} {'person'}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    )}
                                    {isActive === true && (
                                        <Card.Text className="mt-3">
                                            <strong>Total Price:</strong> &#x20B9;{totalPrice}
                                        </Card.Text>
                                    )}
                                    {isActive === true && (
                                        <Button
                                            onClick={() => handleBooking(event._id, selectedMembers[index], _id, event, price)}
                                            variant="primary"
                                            className="mt-3"
                                            size="lg"
                                        >
                                            Book Tickets
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default withRouter(BookEvent);
