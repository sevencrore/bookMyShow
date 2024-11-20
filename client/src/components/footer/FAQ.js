import React from "react";
import { Container, Card, Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const FAQ = () => {
    window.scrollTo(0, 0); // Scroll to top on component mount

    return (
        <Container className="my-5">
            <Card className="shadow-sm p-4">
                <h1 className="text-center mb-4">Frequently Asked Questions (FAQ)</h1>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is this application about?</Accordion.Header>
                        <Accordion.Body>
                            This application is designed to help users easily browse and book events. It provides a
                            user-friendly interface and seamless functionality to enhance your experience.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>How do I create an account?</Accordion.Header>
                        <Accordion.Body>
                            Creating an account is simple! Click on the "Sign Up" button at the top-right corner of the
                            homepage, fill out the required details, and submit. You’ll receive a confirmation email to
                            activate your account.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Can I cancel or modify my booking?</Accordion.Header>
                        <Accordion.Body>
                            Yes, you can cancel or modify your booking by visiting the "My Bookings" section in your
                            account. However, please note that cancellation policies vary depending on the event
                            organizer.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>What payment methods are supported?</Accordion.Header>
                        <Accordion.Body>
                            We support a variety of payment methods, including credit/debit cards, UPI, and popular
                            payment gateways. You can choose your preferred option during checkout.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>How can I contact support?</Accordion.Header>
                        <Accordion.Body>
                            If you need assistance, you can reach out to our support team by emailing
                            <strong> support@example.com</strong>. We’re here to help you with any issues or
                            questions.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="5">
                        <Accordion.Header>Is my data secure?</Accordion.Header>
                        <Accordion.Body>
                            Yes, we prioritize your data security and employ advanced measures to protect your
                            information. For more details, please refer to our <a href="/privacy-policy">Privacy Policy</a>.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </Container>
    );
};

export default FAQ;
