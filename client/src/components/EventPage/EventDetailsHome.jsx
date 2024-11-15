import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const EventDetailsHome = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const history = useHistory(); // Get the useHistory hook for navigation

    const [event, setEvent] = useState(null);
    const [members, setMembers] = useState(1); // Default members to 1
    const [selectedSlot, setSelectedSlot] = useState(null); // Store the selected slot
    const [bookingStatus, setBookingStatus] = useState(null);

    // Fetch event details using eventId from URL
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/eventDetails/${eventId}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventData();
    }, [eventId]);

    // Handle booking
    const handleBooking = async () => {
        if (!selectedSlot || !members) {
            setBookingStatus("Please select a slot and number of members.");
            return;
        }

        // Prepare booking data
        const bookingData = {
            eventId,
            slot: selectedSlot,
            members,
        };

        try {
            const response = await fetch("http://localhost:5000/book/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });
            const data = await response.json();
            setBookingStatus("Booking successful!");
            // Navigate to the confirmation page using history
            history.push(`/confirmation/${data.bookingId}`);
        } catch (error) {
            setBookingStatus("Booking failed. Try again.");
            console.error("Error booking event:", error);
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                {/* Background image */}
                <div
                    className="col-12"
                    style={{
                        backgroundImage: `url(http://localhost:5000${event.bg_img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "400px",
                        position: "relative",
                    }}
                >
                    {/* Small image on top of background */}
                    <img
                        src={`http://localhost:5000${event.img}`}
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
                <p>{event.description}</p>

                {/* Number of members dropdown */}
                <div className="mb-3">
                    <label htmlFor="members" className="form-label">
                        Number of Members
                    </label>
                    <select
                        id="members"
                        className="form-select"
                        value={members}
                        onChange={(e) => setMembers(Number(e.target.value))}
                    >
                        {[...Array(10).keys()].map((n) => (
                            <option key={n} value={n + 1}>
                                {n + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Slots Dropdown */}
                <div className="mb-3">
                    <label htmlFor="slots" className="form-label">
                        Select a Slot
                    </label>
                    <select
                        id="slots"
                        className="form-select"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                        <option value="" disabled>
                            Select a slot
                        </option>
                        {event.slots?.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Booking status message */}
                {bookingStatus && (
                    <div className="mb-3" style={{ color: "#ff4d4f" }}>
                        {bookingStatus}
                    </div>
                )}

                {/* Book Button */}
                <button
                    onClick={handleBooking}
                    className="btn btn-success mt-3"
                    style={{ padding: "10px 20px" }}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default EventDetailsHome;
