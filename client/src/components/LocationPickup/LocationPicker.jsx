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

    // Fetch locations from the API and set default city in localStorage if not already set
    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST}/city/`);
                const fetchedLocations = response.data;

                // Sort locations by the 'createdAt' field (earliest created city first)
                const sortedLocations = fetchedLocations.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                setLocations(sortedLocations); // Save the sorted locations

                // Check if there's a selected city in localStorage
                const storedCityId = localStorage.getItem('selectedCityId');

                if (storedCityId) {
                    // Set the selected city from localStorage if it exists
                    const selectedCity = sortedLocations.find(city => city._id === storedCityId);
                    if (selectedCity) {
                        handleChange(selectedCity.name); // Set it in the context
                    }
                } else if (sortedLocations.length > 0) {
                    // If no city is selected, set the first city (earliest created) as default
                    const defaultCity = sortedLocations[0];
                    handleChange(defaultCity.name); // Set it in the context
                    localStorage.setItem('selectedCityId', defaultCity._id); // Save the default city ID in localStorage
                    localStorage.setItem('selectedCityName', defaultCity.name); // Save the default city name in localStorage
                }
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

    const handleSelectLocation = (cityName, cityId) => {
        handleChange(cityName); // Set the selected city using handleChange function
        localStorage.setItem('selectedCityId', cityId); // Save the selected city ID in localStorage
        localStorage.setItem('selectedCityName', cityName); // Save the selected city name in localStorage
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
                            onClick={() => handleSelectLocation(city.name, city._id)} // Handle click event
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
