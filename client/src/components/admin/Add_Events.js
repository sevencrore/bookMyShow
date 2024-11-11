import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

const Event = () => {
    const history = useHistory();
    const userEmail = localStorage.getItem('username'); // User email stored in local storage

    const [input, setInput] = useState({
        vendor_id: "",
        category_id: "",
        title: "",
        host_name: "",
        img: "",
        bg_img: "",
        location_description: "",
        location_lat: "",
        location_lang: "",
        email: userEmail, // Include user email in the input
    });

    const [categories, setCategories] = useState([]); // To store category data
    const [vendors, setVendors] = useState([]); // To store vendor data

    // Fetch categories and vendors on component mount
    useEffect(() => {
        // Fetch categories from 'eventCategory' endpoint
        axios.get('http://localhost:5000/eventCategory')
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));

        // Fetch vendors from 'vendor' endpoint
        axios.get('http://localhost:5000/vendor')
            .then(response => setVendors(response.data))
            .catch(error => console.error("Error fetching vendors:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/event/create", input); // Post the input to your API
            alert(res.data.message); // Show success message
            history.push("/admin/dashboard"); // Redirect to dashboard after event is created
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    return (
        <div className="container shadow">
            <h2 className="text-center my-3">Add New Event</h2>
            <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        {/* Vendor ID Dropdown */}
                        <Row className="g-3">
                            <Col lg="6">
                                <Form.Group className="form-group">
                                    <Form.Label>
                                        Vendor ID <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="form-control-wrap">
                                        <Form.Select
                                            name="vendor_id"
                                            value={input.vendor_id}
                                            onChange={handleInputChange}
                                            required
                                            isInvalid={input.vendor_id === ""}
                                        >
                                            <option value="">Select Vendor</option>
                                            {vendors.map((vendor) => (
                                                <option key={vendor.id} value={vendor.id}>
                                                    {vendor.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Form.Group>
                            </Col>

                            {/* Category ID Dropdown */}
                            <Col lg="6">
                                <Form.Group className="form-group">
                                    <Form.Label>
                                        Category ID <span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="form-control-wrap">
                                        <Form.Select
                                            name="category_id"
                                            value={input.category_id}
                                            onChange={handleInputChange}
                                            required
                                            isInvalid={input.category_id === ""}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.category_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Event Title */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={handleInputChange}
                                className="form-control"
                                id="title"
                                placeholder="Enter Event Title"
                            />
                        </div>

                        {/* Host Name */}
                        <div className="mb-3">
                            <label htmlFor="host_name" className="form-label">
                                Host Name
                            </label>
                            <input
                                type="text"
                                name="host_name"
                                value={input.host_name}
                                onChange={handleInputChange}
                                className="form-control"
                                id="host_name"
                                placeholder="Enter Host Name"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="mb-3">
                            <label htmlFor="img" className="form-label">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="img"
                                value={input.img}
                                onChange={handleInputChange}
                                className="form-control"
                                id="img"
                                placeholder="Enter Event Image URL"
                            />
                        </div>

                        {/* Background Image URL */}
                        <div className="mb-3">
                            <label htmlFor="bg_img" className="form-label">
                                Background Image URL
                            </label>
                            <input
                                type="text"
                                name="bg_img"
                                value={input.bg_img}
                                onChange={handleInputChange}
                                className="form-control"
                                id="bg_img"
                                placeholder="Enter Background Image URL"
                            />
                        </div>

                        {/* Location Description */}
                        <div className="mb-3">
                            <label htmlFor="location_description" className="form-label">
                                Location Description
                            </label>
                            <input
                                type="text"
                                name="location_description"
                                value={input.location_description}
                                onChange={handleInputChange}
                                className="form-control"
                                id="location_description"
                                placeholder="Enter Location Description"
                            />
                        </div>

                        {/* Latitude */}
                        <div className="mb-3">
                            <label htmlFor="location_lat" className="form-label">
                                Latitude
                            </label>
                            <input
                                type="text"
                                name="location_lat"
                                value={input.location_lat}
                                onChange={handleInputChange}
                                className="form-control"
                                id="location_lat"
                                placeholder="Enter Latitude"
                            />
                        </div>

                        {/* Longitude */}
                        <div className="mb-3">
                            <label htmlFor="location_lang" className="form-label">
                                Longitude
                            </label>
                            <input
                                type="text"
                                name="location_lang"
                                value={input.location_lang}
                                onChange={handleInputChange}
                                className="form-control"
                                id="location_lang"
                                placeholder="Enter Longitude"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mb-3">
                            <Button type="submit" variant="primary" className="btn-block">
                                Add Event
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Event;
