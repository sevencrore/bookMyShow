// import React from 'react';


// function AdminRegister() {
    
//   return (
//     <div>
//       <h2>Admin Registration</h2>
//       <form  action=`${process.env.REACT_APP_HOST}/users/createuser` method="POST">
//         <label>Admin Email:</label>
//         <input type="email" name="email" placeholder="admin@example.com" required />
        
//         <label>Password:</label>
//         <input type="password" name="password" placeholder="Enter a strong password" required />
        
//         <label>First Name:</label>
//         <input type="text" name="firstName" placeholder="first name" required />
        
//         <label>Last Name:</label>
//         <input type="text" name="lastName" placeholder="Enter a strong password" required />
        
        
        
//         <button type="submit">Register as Admin</button>
//       </form>
//     </div>
//   );
// }

// export default AdminRegister;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
    const history = useHistory(); // Updated to use `useHistory` from react-router-dom v5
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_HOST}/users/create`, input);
            alert(res.data.message);
            history.push("/admin/login"); // Updated `navigate` to `history.push`
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <div className="container shadow">
                <h2 className="text-center my-3">Sign Up here</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={input.firstname}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="firstname"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={input.lastname}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="lastname"
                                    placeholder="Enter Last Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={input.email}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRegister;
