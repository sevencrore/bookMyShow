
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"; 
import { Card, Button, Row, Col, Alert, Spinner, Form } from 'react-bootstrap'; // Import necessary components from React-Bootstrap
import axios from 'axios'; // Ensure axios is imported
import 'bootstrap/dist/css/bootstrap.min.css';

const BookEvent = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const history = useHistory(); // Use history hook for navigation
    const [eventDetails, setEventDetails] = useState([]); // Initialize state for event details as an array
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching state
    const [selectedMembers, setSelectedMembers] = useState({}); // Track selected members for each event

    // Fetch event details using eventId from URL
    useEffect(() => {
        console.log(`Fetching data for event details with event ID: ${eventId}`); // Debugging log
        fetch(`http://localhost:5000/eventdetails/event/${eventId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    console.log("Fetched event details data:", data); // Debugging log
                    setEventDetails(data); // Update state with event details
                    // Initialize selected members with default value (2) for each event
                    const initialMembers = data.reduce((acc, _, index) => {
                        acc[index] = 2; // Default 2 members
                        return acc;
                    }, {});
                    setSelectedMembers(initialMembers);
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

    // Handle dropdown change for selecting number of members
    const handleMembersChange = (event, eventIndex) => {
        const membersCount = event.target.value;
        setSelectedMembers((prevSelectedMembers) => ({
            ...prevSelectedMembers,
            [eventIndex]: membersCount, // Save the selected number of members for each event
        }));
    };

    // Handle booking event for a specific eventId
    const handleBooking = async (eventId, members = 2, eventDetailsID, eventDetails,price) => {
        try {
            const numberOfMembers = parseInt(members, 10);
            if (!numberOfMembers || numberOfMembers < 2) {
                alert('Please select at least 2 members to book tickets.');
                return;
            }

            // Get the user's email from localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            const user_id = localStorage.getItem('user_id');
            const email = user ? user.email : '';
            const uid = user ? user.uid : '';
            const displayName = user ? user.displayName : '';

            const bookingData = {
                number_of_members: numberOfMembers,
                eventDetailsID,
                email,
                event_id: eventDetails.event_id,
                uid,
                user_id,
                price : price * numberOfMembers,
                displayName,
            };

            console.log("Booking Data:", bookingData); // Log the data to verify it's correct

            // Send a POST request to the backend to create the booking
            const res = await axios.post('http://localhost:5000/book/create', bookingData);

            // Show success message if booking is successful
            alert("Booking successful!");
            history.push("/confirmation"); // Redirect to a confirmation page after successful booking

        } catch (error) {
            // Handle errors if the request fails
            alert(error.response?.data?.message || "An error occurred during the booking process.");
        }
    };

    // If event details data is not available, show loading message
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

                    // Check if event is active or deleted
                    const isActive = is_active === '1' || is_active === 1;
                    const isDeleted = is_deleted === '1' || is_deleted === 1;

                    //Calculate total price based on selected members
                    const selectedMembersCount = selectedMembers[index] || 2; // Default to 2 members if none selected
                    const totalPrice = price * selectedMembersCount;

                    return (
                        <Col xs={12} sm={6} md={4} lg={3} key={event._id} className="mb-4">
                            <Card className="p-3 shadow-sm">
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
                                    {isActive === false && (
                                        <Alert variant="warning" className="mt-3">
                                            This event is currently inactive.
                                        </Alert>
                                    )}

                                    {/* Deletion Status */}
                                    {isDeleted === true && (
                                        <Alert variant="danger" className="mt-3">
                                            This event has been deleted.
                                        </Alert>
                                    )}

                                    {/* Dropdown for selecting number of members */}
                                    {isActive === true && (
                                        <div className="mb-3">
                                            <Form.Label>Select Number of Members</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={selectedMembers[index] || 2}
                                                onChange={(e) => handleMembersChange(e, index)}
                                            >
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i} value={i + 2}>
                                                        {i + 2} {i + 2 === 1 ? 'person' : 'people'}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </div>
                                    )}

                                    {/* Total Price */}
                                    {isActive === true && (
                                        <Card.Text className="mt-3">
                                            <strong>Total Price:</strong> ${totalPrice}
                                        </Card.Text>
                                    )}

                                    {/* Book Tickets Button */}
                                    {isActive === true && (
                                        <Button 
                                            onClick={() => handleBooking(event._id, selectedMembers[index], _id, event,price)} 
                                            variant="primary" 
                                            className="mt-3" 
                                            size="lg">
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

export default BookEvent;

