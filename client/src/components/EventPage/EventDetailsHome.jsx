import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"; // Import useHistory for React Router v5
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const EventDetailsHome = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const history = useHistory(); // Use history hook for navigation
    const [event, setEvent] = useState(null); // Initialize state to null, since event is an object

    // Fetch event details using eventId from URL
    useEffect(() => {
        console.log(`Fetching data for event ID: ${eventId}`); // Debugging log
        fetch(`http://localhost:5000/event/${eventId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data && data._id) {
                    console.log("Fetched event data:", data); // Debugging log
                    setEvent(data); // Update state with the fetched event data
                } else {
                    console.error("Invalid data received:", data); // Debugging log
                }
            })
            .catch((e) => {
                console.error("Error fetching event details:", e);
            });
    }, [eventId]);

    // If event data is not available, show loading message
    if (!event) {
        return <div>Loading...</div>;
    }

    // Convert MongoDB Decimal128 values to regular numbers
    const locationLat = event.location_lat?.$numberDecimal || 0;
    const locationLng = event.location_lang?.$numberDecimal || 0;

    // Build full URLs for images
    const imageUrl = `http://localhost:5000${event.img}`;
    const bgImageUrl = `http://localhost:5000${event.bg_img}`;

    return (
        <div className="container my-5">
            <div className="row">
                {/* Background image */}
                <div
                    className="col-12"
                    style={{
                        backgroundImage: `url(${bgImageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "400px",
                        position: "relative",
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
            </div>

            {/* Event Details */}
            <div className="card mt-4 p-3 shadow-sm">
                <h2>{event.title}</h2>
                <p><strong>Host:</strong> {event.host_name}</p>
                <p>{event.description}</p>

                {/* Category */}
                <div>
                    <h5>Category ID:</h5>
                    <p>{event.category_id}</p>
                </div>

                {/* Vendor */}
                <div>
                    <h5>Vendor ID:</h5>
                    <p>{event.vendor_id}</p>
                </div>

                {/* Event Location */}
                {event.location_description && (
                    <div>
                        <h5>Location Description:</h5>
                        <p>{event.location_description}</p>
                    </div>
                )}

                {/* Coordinates */}
                <div>
                    <h5>Location Coordinates:</h5>
                    <p>Latitude: {locationLat}, Longitude: {locationLng}</p>
                </div>

                {/* City */}
                <div>
                    <h5>City ID:</h5>
                    <p>{event.city_id}</p>
                </div>

                {/* Event Status */}
                {event.is_active === '0' && (
                    <div className="alert alert-warning mt-3" role="alert">
                        This event is currently inactive.
                    </div>
                )}

                {/* Button to go back to events list */}
                <button
                    onClick={() => history.push("/events")} // Navigate back to event list
                    className="btn btn-primary mt-3"
                    style={{ padding: "10px 20px" }}
                >
                    Back to Events
                </button>
            </div>
        </div>
    );
};

export default EventDetailsHome;
