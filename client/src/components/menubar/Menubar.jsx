import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../contexts/AppContext';

export default function Menubar() {
    const { city, setCity } = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cityName, setCityName] = useState(null);
    const city_id = localStorage.getItem('selectedCityId');

    useEffect(() => {
        // Fetch city details if city_id exists
        if (!city_id) {
            fetch(`${process.env.REACT_APP_HOST}/city/`, { mode: 'cors' })
                .then(res => res.json())
                .then(data => {
                    if (data && data.name) {
                        setCityName(data.name);
                        localStorage.setItem('selectedCityName', data.name);
                    }
                })
                .catch(e => console.error("Error fetching city details:", e));
        }

        // Fetch categories from the backend
        fetch(`${process.env.REACT_APP_HOST}/eventCategory/`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((e) => console.error(e));
    }, [city_id]);

    const handleCategoryClick = (categoryId, categoryName) => {
        localStorage.setItem('selectedCategoryId', categoryId);
        localStorage.setItem('selectedCategoryName', categoryName);
    };

    const menuStyles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#343a40', // Dark background similar to navbar
            borderBottom: '1px solid #444', // Darker border to match navbar style
        },
        left: {
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
        },
        categoryLink: {
            textDecoration: 'none',
            color: '#aaa', // Gray text by default
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'color 0.3s', // Smooth transition for color change
        },
        categoryTitle: {
            margin: 0,
            fontSize: '14px',
            fontWeight: '500',
            color: '#aaa', // Gray text by default
            transition: 'color 0.3s', // Smooth transition for text color
        },
        categoryTitleHover: {
            color: 'white', // Change text color to white on hover
        },
    };

    const CategoryList = ({ categories }) => {
        // State to manage hovered category index
        const [hoveredIndex, setHoveredIndex] = useState(null);

        return (
            <div className="d-none d-md-block" style={menuStyles.container}>
                <div style={menuStyles.left}>
                    {categories.map((category, index) => (
                        <Link
                            key={category._id} // Using unique category ID as key
                            to={`/events/${category._id}/${city_id}`} // Category link to the events page
                            style={{
                                ...menuStyles.categoryLink,
                                color: hoveredIndex === index ? 'white' : '#aaa', // Change color on hover
                            }}
                            onClick={() => handleCategoryClick(category._id, category.category_name)}
                            onMouseEnter={() => setHoveredIndex(index)} // Set hovered category index
                            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered category index
                        >
                            <div>
                                <h3
                                    style={{
                                        ...menuStyles.categoryTitle,
                                        ...(hoveredIndex === index ? menuStyles.categoryTitleHover : {}),
                                    }}
                                >
                                    {category.category_name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return <CategoryList categories={categories} />;
}
