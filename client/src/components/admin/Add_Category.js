import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
    const history = useHistory();
    const userEmail = localStorage.getItem('username'); // Updated to use `useHistory` from react-router-dom v5
    const [input, setInput] = useState({
        category_name: "",
        description: "",
        image: null,
        email: userEmail,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category_name", input.category_name);
        formData.append("description", input.description);
        if (input.image) {
            formData.append("image", input.image); // Appending image file
        }
        formData.append("email", input.email);

        try {
            const res = await axios.post("http://localhost:5000/category/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Needed for file upload
                },
            });
            alert("Category created successfully!"); // Alert showing success message
            history.push("/admin/dashboard"); // Redirect to dashboard after successful category creation
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    const handleFileChange = (e) => {
        setInput({
            ...input,
            image: e.target.files[0], // Handle file input
        });
    };

    return (
        <>
            <div className="container shadow">
                <h2 className="text-center my-3">Add New Category</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="category_name" className="form-label">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    name="category_name"
                                    value={input.category_name}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="category_name"
                                    placeholder="Enter Category Name"
                                />
                            </div>

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
                                    placeholder="Enter Description"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="form-control"
                                    id="image"
                                />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
