import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Theaters = () => {
    const history = useHistory();
    const [movies, setMovies] = useState([]); // State to hold movies list
    const userEmail = localStorage.getItem('username');
    console.log(userEmail);
    const [input, setInput] = useState({
        name: "",
        screenType: "",
        currentPlayingMovies: [], // Array of selected movie IDs
        showTimings: [],
        location: "",
        prices: [],
        facilities: [],
        address: "",
        email: userEmail,
    });

    // Fetch movies from the database
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("http://localhost:5000/movies/"); // Assuming movies are available at this endpoint
                setMovies(res.data); // Set the movies data
            } catch (error) {
                console.error("Error fetching movies", error);
            }
        };

        fetchMovies();
    }, []); // This effect runs only once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/theater/", input); // Adjust the endpoint as per your setup
            alert(res.data.message);
            history.push("/admin/dashboard"); // Redirect after successful addition
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="container shadow">
            <h2 className="text-center my-3">Add Theater for Movie</h2>
            <div className="col-md-12 my-3 d-flex items-center justify-content-center">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        {/* Theater Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Theater Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                id="name"
                                placeholder="Enter Theater name"
                            />
                        </div>

                        {/* Current Playing Movies (dropdown, multiple selection) */}
                        <div className="mb-3">
                            <label htmlFor="currentPlayingMovies" className="form-label">
                                Current Playing Movies
                            </label>
                            <select
                                multiple
                                name="currentPlayingMovies"
                                value={input.currentPlayingMovies}
                                onChange={(e) => {
                                    const selectedMovies = Array.from(e.target.selectedOptions, option => option.value);
                                    setInput({ ...input, currentPlayingMovies: selectedMovies });
                                }}
                                className="form-control"
                                id="currentPlayingMovies"
                            >
                                {movies.map(movie => (
                                    <option key={movie._id} value={movie._id}>
                                        {movie.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Screen Type */}
                        <div className="mb-3">
                            <label htmlFor="screenType" className="form-label">
                                Screen Type
                            </label>
                            <input
                                type="text"
                                name="screenType"
                                value={input.screenType}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                id="screenType"
                                placeholder="Enter Screen Type"
                            />
                        </div>

                        {/* Show Timings (input for multiple timings) */}
                        <div className="mb-3">
                            <label htmlFor="showTimings" className="form-label">
                                Show Timings (comma separated)
                            </label>
                            <input
                                type="text"
                                name="showTimings"
                                value={input.showTimings}
                                onChange={(e) => setInput({ ...input, showTimings: e.target.value.split(',') })}
                                className="form-control"
                                id="showTimings"
                                placeholder="Enter Show Timings"
                            />
                        </div>

                        {/* Location */}
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                id="location"
                                placeholder="Enter Location"
                            />
                        </div>

                        {/* Prices */}
                        <div className="mb-3">
                            <label htmlFor="prices" className="form-label">
                                Prices (comma separated)
                            </label>
                            <input
                                type="text"
                                name="prices"
                                value={input.prices}
                                onChange={(e) => setInput({ ...input, prices: e.target.value.split(',') })}
                                className="form-control"
                                id="prices"
                                placeholder="Enter Prices"
                            />
                        </div>

                        {/* Facilities */}
                        <div className="mb-3">
                            <label htmlFor="facilities" className="form-label">
                                Facilities (comma separated)
                            </label>
                            <input
                                type="text"
                                name="facilities"
                                value={input.facilities}
                                onChange={(e) => setInput({ ...input, facilities: e.target.value.split(',') })}
                                className="form-control"
                                id="facilities"
                                placeholder="Enter Facilities"
                            />
                        </div>

                        {/* Address */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={input.address}
                                onChange={(e) => setInput({ ...input, address: e.target.value })}
                                className="form-control"
                                id="address"
                                placeholder="Enter Address"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-block">
                                Add Theater
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Theaters;
