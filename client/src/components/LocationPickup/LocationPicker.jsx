import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext'; // Assuming the context is defined here
import axios from 'axios';
import '../../style/locationpicker.css';

const Locationpicker = ({ handleClose }) => {
    const { city, handleChange } = useContext(AppContext); // Get the context value
    const [search, setSearch] = useState(''); // Local state for the search input
    const [locations, setLocations] = useState([]); // Local state for fetched locations
    const [loading, setLoading] = useState(false); // To handle loading state
    const [error, setError] = useState(''); // To handle any error during fetch

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get('http://localhost:5000/city/');
                console.log(response.data);
                setLocations(response.data); // Save the fetched locations
            } catch (err) {
                setError('Failed to fetch city data');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []); // Fetch locations on component mount

    // Filter locations based on search input
    const filteredLocations = locations.filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectLocation = (cityName) => {
        handleChange(cityName); // Set the selected city using handleChange function
        handleClose(); // Close the picker after selection
    };

    return (
        <div className="location-picker">
            <h3>Select a Location</h3>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state on input change
                placeholder="Search for a city"
                className="form-control"
            />
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {/* Displaying filtered cities as clickable items */}
            <div className="location-list">
                {filteredLocations.length > 0 ? (
                    filteredLocations.map((city) => (
                        <div
                            key={city._id}
                            className="location-item"
                            onClick={() => handleSelectLocation(city.name)} // Handle click event
                        >
                            <div className="city-name">{city.name}</div>
                            {/* <div className="city-description">{city.description}</div> */}
                        </div>
                    ))
                ) : (
                    <p>No cities found</p>
                )}
            </div>
        </div>
    );
};

export default Locationpicker;
