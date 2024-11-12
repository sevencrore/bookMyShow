import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext'; // Assuming the context is defined here
import axios from 'axios';
import '../../style/locationpicker.css';

const Locationpicker = () => {
    const { location, setLocation } = useContext(AppContext); // Getting the context value
    const [search, setSearch] = useState(''); // Local state for the search input
    const [locations, setLocations] = useState([]); // Local state for the fetched locations
    const [loading, setLoading] = useState(false); // To handle loading state
    const [error, setError] = useState(''); // To handle any error during fetch

    useEffect(() => {
        // Fetch location suggestions only when the search term is at least 3 characters
        if (search.length === 0) {
            setLocations([]);
            return;
        }

        const fetchSuggestions = async () => {
            setLoading(true);
            setError('');

            try {
                // Assuming you're fetching from an API that gives a list of locations
                const response = await axios.get(`http://localhost:5000/city/`);
                setLocations(response.data); // Save the fetched locations
            } catch (err) {
                setError('Failed to fetch city suggestions');
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [search]); // Fetch suggestions whenever the search term changes

    const handleSelectLocation = (event) => {
        const selectedCityId = event.target.value;
        const selectedCity = locations.find(city => city._id === selectedCityId);

        if (selectedCity) {
            setLocation(selectedCity); // Set the selected city to the global context
            setSearch(selectedCity.name); // Update the search term with the selected city's name
        }
    };

    return (
        <div className="location-picker">
            <h3>Select a Location</h3>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state on input change
                placeholder="Search for a city"
            />
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {locations.length > 0 && (
                <select onChange={handleSelectLocation} value={location?._id || ''}>
                    <option value="" disabled>Select a city</option>
                    {locations.map((city) => (
                        <option key={city._id} value={city._id}>
                            {city.name} - {city.description}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Locationpicker;
