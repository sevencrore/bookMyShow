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
        if (city_id) {
            fetch(`http://localhost:5000/city/${city_id}`, { mode: 'cors' })
                .then(res => res.json())
                .then(data => {
                    if (data && data.name) {
                        setCityName(data.name);
                        localStorage.setItem('selectedCityName', data.name);
                    }
                })
                .catch(e => console.error("Error fetching city details:", e));
        }

        fetch('http://localhost:5000/eventCategory/', { mode: 'cors' })
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
            backgroundColor: '#fff',
            borderBottom: '1px solid #ddd',
        },
        left: {
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
        },
        right: {
            display: 'flex',
            gap: '20px',
            fontWeight: 'bold',
            color: '#333',
        },
        categoryLink: {
            textDecoration: 'none',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
        },
        categoryLinkHover: {
            backgroundColor: '#f0f0f0',
        },
        categoryTitle: {
            margin: 0,
            fontSize: '14px',
            fontWeight: '500',
        },
        menubarItem: {
            cursor: 'pointer',
            fontSize: '14px',
            color: '#555',
            transition: 'color 0.3s',
        },
        menubarItemHover: {
            color: '#007BFF',
        },
    };

    const CategoryList = ({ categories }) => {
        return (
            <div style={{...menuStyles.container, backgroundColor: '#615863' }}>
               <div style={{ ...menuStyles.left, backgroundColor: '#fff' }}>
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/events/${category._id}/${city_id}`}
                            style={menuStyles.categoryLink}
                            onClick={() => handleCategoryClick(category._id, category.category_name)}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = menuStyles.categoryLinkHover.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                        >
                            <div>
                                <h3 style={menuStyles.categoryTitle}>{category.category_name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div style={menuStyles.right}>
                    <p style={menuStyles.menubarItem}>Liveshows</p>
                    <p style={menuStyles.menubarItem}>Corporate</p>
                    <p style={menuStyles.menubarItem}>Offers</p>
                    <p style={menuStyles.menubarItem}>GiftCards</p>
                </div>
            </div>
        );
    };

    return <CategoryList categories={categories} />;
}
