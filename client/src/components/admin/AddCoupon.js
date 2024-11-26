import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import withAdminCheck from "./withAdminCheck";

const CouponAdd = () => {
    const history = useHistory();
    const userEmail = localStorage.getItem('username'); // Getting the logged-in user's email from localStorage
    const [input, setInput] = useState({
        name: "",
        discount: "",  // Make sure to store the discount as a string to handle number inputs
        email: userEmail,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to your backend to create a new coupon
            const res = await axios.post(`${process.env.REACT_APP_HOST}/coupan/create`, input);
            alert("Coupon created successfully!"); // Show success message
            history.push("/admin/dashboard"); // Redirect to the dashboard after successful coupon creation
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred"); // Show error message if request fails
        }
    };

    return (
        <>
            <div className="container shadow" style={{ height: "500px" }} >
                <h2 className="text-center my-3">Add New Coupon</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            {/* Coupon Name Input */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Coupon Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Coupon Name"
                                />
                            </div>

                            {/* Discount Input */}
                            <div className="mb-3">
                                <label htmlFor="discount" className="form-label">
                                    Discount (%) 
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={input.discount}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="discount"
                                    placeholder="Enter Discount Percentage"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Add Coupon
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withAdminCheck(CouponAdd);
