import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import withAdminCheck from "./withAdminCheck";

const Add_City = () => {
    const history = useHistory();
    const userEmail = localStorage.getItem('username'); // Getting the logged-in user's email from localStorage
    const [input, setInput] = useState({
        name: "",
        description: "",
        email: userEmail,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to your backend to create a new Add_city
            const res = await axios.post("http://localhost:5000/city/create", input);
            alert("Add_city created successfully!"); // Show success message
            history.push("/admin/dashboard"); // Redirect to the dashboard after successful Add_city creation
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred"); // Show error message if request fails
        }
    };

    return (
        <>
            <div className="container shadow">
                <h2 className="text-center my-3">Add_city</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            {/* Add_city Name Input */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Add_city Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="name"
                                    placeholder=" Add_city Name"
                                />
                            </div>

                            {/* Add_city Description Input */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="description"
                                    rows="4"
                                    placeholder="Add_city Description"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Add_city
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add_City;
