import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
    const history = useHistory(); // Updated to use `useHistory` from react-router-dom v5
    const [input, setInput] = useState({
        title: "",
        img_url: "",
        likes: "",
        view: "",
        language: [],
        genre: [],
        bg_img: "",
        cast: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/movies/create", input); // Updated the endpoint
            alert(res.data.message);
            history.push("/admin/dashboard"); // Redirect to dashboard after successful movie addition
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <div className="container shadow">
                <h2 className="text-center my-3">Add New Movie</h2>
                <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
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
                                    placeholder="Enter Movie Title"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img_url" className="form-label">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="img_url"
                                    value={input.img_url}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="img_url"
                                    placeholder="Enter Movie Image URL"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="likes" className="form-label">
                                    Likes
                                </label>
                                <input
                                    type="text"
                                    name="likes"
                                    value={input.likes}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="likes"
                                    placeholder="Enter number of Likes"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="view" className="form-label">
                                    Views
                                </label>
                                <input
                                    type="text"
                                    name="view"
                                    value={input.view}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="view"
                                    placeholder="Enter number of Views"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="language" className="form-label">
                                    Language
                                </label>
                                <input
                                    type="text"
                                    name="language"
                                    value={input.language}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="language"
                                    placeholder="Enter Language"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    name="genre"
                                    value={input.genre}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="genre"
                                    placeholder="Enter Genre"
                                />
                            </div>
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
                            <div className="mb-3">
                                <label htmlFor="cast" className="form-label">
                                    Cast
                                </label>
                                <input
                                    type="text"
                                    name="cast"
                                    value={input.cast}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control"
                                    id="cast"
                                    placeholder="Enter Cast"
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Add Movie
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movies;
