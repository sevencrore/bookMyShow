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

    // Hardcoded city data (Popular Cities)
    const popularCities = [
        { name: 'Mumbai', image: 'mumbai.png' },
        { name: 'Delhi-NCR', image: 'ncr.png' },
        { name: 'Bengaluru', image: 'bang.png' },
        { name: 'Hyderabad', image: 'hyd.png' },
        { name: 'Chandigarh', image: 'chd.png' },
        { name: 'Ahmedabad', image: 'ahd.png' },
        { name: 'Chennai', image: 'chen.png' },
        { name: 'Pune', image: 'pune.png' },
        { name: 'Kolkata', image: 'kolk.png' },
        { name: 'Kochi', image: 'koch.png' },
    ];

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

                if (sortedLocations.length > 0) {
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

    // Filter backend locations based on search input
    const filteredBackendLocations = locations.filter((city) =>
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

            {/* Search Input with Icon */}
            <div className="search-container" style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <span style={{ marginRight: '10px' }}>
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <title>Search</title>
                        <path d="M11.8 10.864L8.859 7.918a4.912 4.912 0 0 0-.444-6.47A4.888 4.888 0 0 0 4.928 0a4.888 4.888 0 0 0-3.485 1.449 4.942 4.942 0 0 0 0 6.979 4.888 4.888 0 0 0 3.485 1.449c1.052 0 2.105-.33 2.976-1.005l2.96 2.93a.658.658 0 0 0 .476.198.686.686 0 0 0 .477-.198.672.672 0 0 0-.016-.938zm-6.855-2.32c-.97 0-1.858-.38-2.549-1.054C1 6.09 1 3.802 2.396 2.387a3.578 3.578 0 0 1 2.549-1.054c.97 0 1.858.379 2.548 1.054s1.052 1.58 1.052 2.551c0 .971-.378 1.86-1.052 2.552a3.539 3.539 0 0 1-2.548 1.053z" fill="#777"></path>
                    </svg>
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Update search state on input change
                    placeholder="Search for a city"
                    className="form-control"
                    style={{ border: 'none', outline: 'none', flexGrow: 1 }}
                />
            </div>

            {/* Filtered Cities Based on Search */}
            {search && (
                <ul style={{
                    width: '100%',
                    padding: 0,
                    marginTop: '10px',
                    marginBottom: '20px',
                    listStyleType: 'none',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                }}>
                    {filteredBackendLocations.length > 0 ? (
                        filteredBackendLocations.map((city) => (
                            <li
                                key={city._id}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderBottom: '1px solid #e5e5e5',
                                }}
                                onClick={() => handleSelectLocation(city.name, city._id)} // Handle click event
                            >
                                {city.name}
                            </li>
                        ))
                    ) : (
                        <li style={{ padding: '10px', color: 'gray' }}>No cities found</li>
                    )}
                </ul>
            )}

            {/* Popular Cities Section */}
            <div className="container mt-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h4>Popular Cities</h4>
            </div>

            <ul className="city-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 0 }}>
                {popularCities.map((city) => (
                    <li
                        key={city.name}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                            borderBottom: '1px solid rgb(229, 229, 229)',
                            background: 'rgb(255, 255, 255)',
                            cursor: 'pointer',
                            margin: '5px',
                            width: 'calc(10% - 10px)',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                        }}
                        onClick={() => handleSelectLocation(city.name)} // Handle click event
                    >
                        <div className="city-image" style={{ marginBottom: '5px' }}>
                            <img
                                src={`//in.bmscdn.com/m6/images/common-modules/regions/${city.image}`}
                                alt={city.name}
                                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                            />
                        </div>
                        <span className="city-name" style={{ fontSize: '14px', display: 'block' }}>{city.name}</span>
                    </li>
                ))}
            </ul>

            

            

            {loading && <div className="loading" style={{ marginTop: '10px' }}>Loading...</div>}
            {error && <div className="error" style={{ marginTop: '10px', color: 'red' }}>{error}</div>}
        </div>
    );
};

export default Locationpicker;
