import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [city, setCity] = useState(''); // Start with an empty city
    const [locations, setLocations] = useState([]); // Store the fetched locations

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/city/');
                const fetchedLocations = response.data;

                setLocations(fetchedLocations); // Save the fetched locations

                // Check if there's a selected city in localStorage
                const storedCityId = localStorage.getItem('selectedCityId');

                if (storedCityId) {
                    // Set the selected city from localStorage if it exists
                    const selectedCity = fetchedLocations.find(city => city._id === storedCityId);
                    if (selectedCity) {
                        setCity(selectedCity.name); // Set the city name in the state
                    }
                } else {
                    // Sort cities based on their createdAt timestamp in ascending order (oldest first)
                    const sortedCities = fetchedLocations.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                
                    // Take the first city in the sorted array (which will be the city with the earliest createdAt)
                    const defaultCity = sortedCities[0];
                
                    if (defaultCity) {
                        setCity(defaultCity.name); // Set the default city based on the earliest createdAt
                        localStorage.setItem('selectedCityId', defaultCity._id); // Save the city ID in localStorage
                    }
                }
                
            } catch (err) {
                console.error('Failed to fetch city data:', err);
            }
        };

        fetchLocations();
    }, []); // Fetch locations on component mount

    // Function to update the city
    const handleChange = (newCity) => {
        setCity(newCity);
        // Find the selected city's ID based on its name
        const selectedCity = locations.find(city => city.name === newCity);
        if (selectedCity) {
            localStorage.setItem('selectedCityId', selectedCity._id); // Save the selected city ID in localStorage
        }
    };

    return (
        <AppContext.Provider value={{ city, handleChange }}>
            {children}
        </AppContext.Provider>
    );
};
