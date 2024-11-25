import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EventDetailsHome = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const percentage = 85; // Progress value
  const radius = 20; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circumference - (circumference * percentage) / 100; // Adjusting based on percentage

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
  const img1Url = `${process.env.REACT_APP_HOST}${event.img1}`;
  const img2Url = `${process.env.REACT_APP_HOST}${event.img2}`;
  const img3Url = `${process.env.REACT_APP_HOST}${event.img3}`;

  return (
    <Container fluid className="p-0">
      {/* Image Carousel */}
      <Container className="my-4">
        <Carousel interval={3000}> {/* Carousel auto-rotates every 3 seconds */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={imageUrl}
              alt="Event Image"
              style={{
                height: "300px", // Fixed height for all images
                objectFit: "cover", // Stretch the image to fill the space
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1Url}
              alt="First slide"
              style={{
                height: "300px", // Fixed height for all images
                objectFit: "cover", // Stretch the image to fill the space
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2Url}
              alt="Second slide"
              style={{
                height: "300px", // Fixed height for all images
                objectFit: "cover", // Stretch the image to fill the space
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img3Url}
              alt="Third slide"
              style={{
                height: "300px", // Fixed height for all images
                objectFit: "cover", // Stretch the image to fill the space
              }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Circular Progress and Text */}
      <div className="d-flex align-items-center justify-content-start p-3">
        <div
          className="position-relative me-3"
          style={{ width: "60px", height: "60px" }}
        >
          <svg
            viewBox="0 0 50 50"
            className="w-100 h-100"
            style={{ transform: "rotate(-90deg)" }}
          >
            {/* Background circle */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="5"
            />
            {/* Progress circle */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#ff0000"
              strokeWidth="5"
              strokeDasharray="126"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Percentage in center */}
          <div
            className="position-absolute top-50 start-50 translate-middle text-dark fw-bold"
            style={{ fontSize: "0.8rem" }}
          >
            {percentage}%
          </div>
        </div>

        {/* Text beside the graph */}
        <div className="d-flex align-items-center">
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: "1rem" }}>
            {percentage}% full Keep going!
          </p>
        </div>
      </div>

      {/* Event Details */}
      <Container className="my-4">
        <Row>
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

          {/* Book Button */}
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
