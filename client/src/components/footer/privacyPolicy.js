import React from "react";
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivacyPolicy = () => {
    window.scrollTo(0, 0); // Scroll to top on component mount

    return (
        <Container className="my-5">
            <Card className="shadow-sm p-4">
                <h1 className="text-center mb-4">Privacy Policy</h1>
                <p>
                    Welcome to our application. This Privacy Policy explains how we collect, use, and protect your
                    information when you use our services.
                </p>

                <h3>1. Information We Collect</h3>
                <p>
                    We collect the following types of information:
                    <ul>
                        <li>Personal Information: Name, email address, contact details, etc.</li>
                        <li>Usage Data: Information about how you interact with our services.</li>
                        <li>Cookies: Small data files stored on your device to enhance your experience.</li>
                    </ul>
                </p>

                <h3>2. How We Use Your Information</h3>
                <p>
                    Your information is used to:
                    <ul>
                        <li>Provide and improve our services.</li>
                        <li>Personalize your experience.</li>
                        <li>Send you updates and promotional materials.</li>
                    </ul>
                </p>

                <h3>3. Sharing Your Information</h3>
                <p>
                    We do not sell your information. We may share it with trusted partners to:
                    <ul>
                        <li>Facilitate services on our behalf.</li>
                        <li>Comply with legal requirements.</li>
                    </ul>
                </p>

                <h3>4. Data Security</h3>
                <p>
                    We implement reasonable measures to protect your information. However, no method of transmission
                    over the Internet or method of electronic storage is 100% secure.
                </p>

                <h3>5. Your Rights</h3>
                <p>
                    You have the right to:
                    <ul>
                        <li>Access and update your information.</li>
                        <li>Request deletion of your data.</li>
                        <li>Opt-out of receiving promotional materials.</li>
                    </ul>
                </p>

                <h3>6. Changes to This Privacy Policy</h3>
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with
                    an updated revision date.
                </p>

                <h3>7. Contact Us</h3>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                    <br />
                    <strong>Email:</strong> support@example.com
                </p>
            </Card>
        </Container>
    );
};

export default PrivacyPolicy;
