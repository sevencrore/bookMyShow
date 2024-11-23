import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EventDetailsHome = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/event/${eventId}`, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching event details:", e);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading event details...</p>
      </div>
    );
  }

  const locationLat = event.location_lat?.$numberDecimal || 0;
  const locationLng = event.location_lang?.$numberDecimal || 0;

  const imageUrl = `${process.env.REACT_APP_HOST}${event.img}`;
  const bgImageUrl = `${process.env.REACT_APP_HOST}${event.bg_img}`;

  return (
    <Container fluid className="p-0">
      {/* Background and Small Image */}
      <div
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
          width: "100%",
        }}
      >
        <img
          src={imageUrl}
          alt={event.title}
          style={{
            width: "100%",
            height: "40vh",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Main Content */}
      <Container className="my-4">
        <Row>
          {/* Event Details - Left Side */}
          <Col xs={12} className="mb-3">
            {/* Title and City */}
            <Row className="mb-3">
              <Col>
                <h1>{event.title}</h1>
                <p><strong>City:</strong> {event.city}</p>
              </Col>
            </Row>

            {/* Location Description */}
            <Row className="mb-3">
              <Col>
                <p><strong>Location Description:</strong> {event.location_description}</p>
              </Col>
            </Row>

            {/* View on Map */}
            <Row>
              <Col>
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    window.open(`https://maps.google.com/?q=${locationLat},${locationLng}`)
                  }
                >
                  View on Map
                </Button>
              </Col>
            </Row>
          </Col>

          {/* Book Button - Right Side */}
          <Col xs={12} className="text-center mb-3">
            <Button
              style={{
                backgroundColor: "#FF0000",
                color: "#FFFFFF",
                border: "none",
                width: "100%",
                padding: "15px",
                fontSize: "18px",
              }}
              onClick={() => history.push(`/bookevent/${event._id}`)}
            >
              Book
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Description Section */}
      <Container className="my-4">
        <Row>
          <Col xs={12}>
            <h2>Description</h2>
            <p>{event.description}</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EventDetailsHome;
