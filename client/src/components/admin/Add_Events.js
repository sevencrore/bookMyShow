import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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

    return (
        <div className="container shadow">
            <h2 className="text-center my-3">Add New Event</h2>
            <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        {/* Vendor ID */}
                        <div className="mb-3">
                            <label htmlFor="vendor_id" className="form-label">
                                Vendor ID
                            </label>
                            <input
                                type="text"
                                name="vendor_id"
                                value={input.vendor_id}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                id="vendor_id"
                                placeholder="Enter Vendor ID"
                            />
                        </div>

                        {/* Category ID */}
                        <div className="mb-3">
                            <label htmlFor="category_id" className="form-label">
                                Category ID
                            </label>
                            <input
                                type="text"
                                name="category_id"
                                value={input.category_id}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                id="category_id"
                                placeholder="Enter Category ID"
                            />
                        </div>

                        {/* Title */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                id="location_lang"
                                placeholder="Enter Longitude"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-block">
                                Add Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Event;
