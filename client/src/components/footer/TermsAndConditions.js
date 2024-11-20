import React from "react";
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const TermsAndConditions = () => {
    window.scrollTo(0, 0); // Scroll to top on component mount

    return (
        <Container className="my-5">
            <Card className="shadow-sm p-4">
                <h1 className="text-center mb-4">Terms and Conditions</h1>
                <p>
                    Welcome to our application. These Terms and Conditions govern your use of our services. By using
                    our application, you agree to comply with these terms.
                </p>

                <h3>1. Acceptance of Terms</h3>
                <p>
                    By accessing or using our services, you agree to be bound by these Terms and Conditions. If you
                    do not agree, you must not use our services.
                </p>

                <h3>2. User Responsibilities</h3>
                <p>
                    As a user of our services, you agree to:
                    <ul>
                        <li>Provide accurate and up-to-date information during registration.</li>
                        <li>Use the services only for lawful purposes.</li>
                        <li>Respect the rights of other users and refrain from abusive behavior.</li>
                    </ul>
                </p>

                <h3>3. Intellectual Property</h3>
                <p>
                    All content, trademarks, and logos on this application are owned by us or licensed to us. You
                    may not copy, modify, or distribute any content without our prior written consent.
                </p>

                <h3>4. Limitation of Liability</h3>
                <p>
                    We are not responsible for any direct, indirect, or consequential damages arising from your use
                    of our services. This includes, but is not limited to, loss of data or service interruptions.
                </p>

                <h3>5. Modifications to Services</h3>
                <p>
                    We reserve the right to modify or discontinue any part of our services at any time without prior
                    notice.
                </p>

                <h3>6. Termination</h3>
                <p>
                    We may suspend or terminate your access to our services if you violate these terms or engage in
                    unlawful activities.
                </p>

                <h3>7. Changes to Terms</h3>
                <p>
                    We may update these Terms and Conditions from time to time. Changes will be posted on this page
                    with an updated revision date. Your continued use of our services constitutes acceptance of the
                    updated terms.
                </p>

                <h3>8. Governing Law</h3>
                <p>
                    These Terms and Conditions are governed by the laws of [Your Country/Region]. Any disputes will
                    be resolved in the courts of [Your Jurisdiction].
                </p>

                <h3>9. Contact Us</h3>
                <p>
                    If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
                    <br />
                    <strong>Email:</strong> support@example.com
                </p>
            </Card>
        </Container>
    );
};

export default TermsAndConditions;
