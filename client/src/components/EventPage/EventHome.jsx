import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Breadcrumb Component
const Breadcrumb = () => {
    const selectedCityName = localStorage.getItem('selectedCityName');
    const selectedCategoryName = localStorage.getItem('selectedCategoryName');

    return (
        <nav aria-label="breadcrumb">
            <ol style={styles.breadcrumbList}>
                <li style={styles.breadcrumbItem}>
                    <Link to="/" style={styles.breadcrumbLink}>
                        Home
                    </Link>
                </li>
                {selectedCityName && (
                    <li style={styles.breadcrumbItem}>
                        <Link to={`/city/${selectedCityName}`} style={styles.breadcrumbLink}>
                            {selectedCityName}
                        </Link>
                    </li>
                )}
                {selectedCategoryName && (
                    <li style={styles.breadcrumbItem}>
                        <Link to={`/category/${selectedCategoryName}`} style={styles.breadcrumbLink}>
                            {selectedCategoryName}
                        </Link>
                    </li>
                )}
            </ol>
        </nav>
    );
};

// Event List Component
const EventList = ({ events }) => {
    return (
        <div>
            <Breadcrumb />
            <div className="container-fluid categories-list" style={styles.categoriesList}>
                {events.map((event, index) => (
                    <Link key={index} to={`/event/${event._id}`} style={styles.link}>
                        <div style={styles.categoryCard}>
                            {/* Image Container with fixed size 204x336 */}
                            <div className="image-container" style={styles.imageContainer}>
                                <img
                                    src={`http://localhost:5000${event.img}`}
                                    alt={event.category_name}
                                    style={styles.image}
                                />
                            </div>

                            {/* Name and Description below the image */}
                            <div className="content-container" style={styles.contentContainer}>
                                <h3 className="category-title" style={styles.title}>{event.title}</h3>
                                <p className="category-description" style={styles.description}>{event.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// Main Component: EventHome
export const EventHome = () => {
    const [events, setEvents] = useState([]);
    const { cityId, categoryId } = useParams();
    const history = useHistory();

    useEffect(() => {
        // Fetch events based on categoryId and cityId
        fetch(`http://localhost:5000/event/get/${categoryId}/${cityId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'No events found for the specified category and city.') {
                    alert('No events found for the specified category and city.');
                    history.push("/");
                } else {
                    setEvents(data);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [categoryId, cityId]); // Ensure useEffect runs when categoryId or cityId changes

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <EventList events={events} />
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px', // Max width of the container for large screens
        margin: '0 auto',  // Center the container
        borderRadius: '16px', // Rounded corners for the main container
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow for the container
        overflow: 'hidden', // Ensure child elements don't overflow the rounded corners
    },
    innerContainer: {
        padding: '20px',
    },
    breadcrumbList: {
        display: 'flex',
        listStyle: 'none',
        padding: '0',
        margin: '20px 0',
    },
    breadcrumbItem: {
        marginRight: '10px',
    },
    breadcrumbLink: {
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '16px',
    },
    categoriesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Default 4 cards per row
        gap: '20px',
        marginTop: '20px',
        padding: '0 20px',
    },
    link: {
        textDecoration: 'none', // No underline for the link
    },
    categoryCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        width: '100%',
        height: 'auto',
        borderRadius: '16px',  // Rounded corners for the entire card (top & bottom)
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Light shadow for the cards
        backgroundColor: '#fff',
        overflow: 'hidden', // Ensure no overflow from rounded corners
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '204px',  // Fixed width for the image container
        height: '336px', // Fixed height for the image container
        overflow: 'hidden',  // Hide overflow for images that don't fit perfectly
        borderTopLeftRadius: '16px', // Rounded top-left corner for the image container
        borderTopRightRadius: '16px', // Rounded top-right corner for the image container
    },
    image: {
        width: '100%',    // Image width 100% of container size
        height: '100%',   // Image height 100% of container size
        objectFit: 'cover',  // Ensure the image fills the container and maintains aspect ratio
    },
    contentContainer: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        flexGrow: 1,
        marginTop: '10px',
        borderBottomLeftRadius: '16px', // Rounded bottom-left corner for the content container
        borderBottomRightRadius: '16px', // Rounded bottom-right corner for the content container
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '8px 0',
        color: '#333',
    },
    description: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '8px',
    },
    // Responsive Styles
    '@media (max-width: 1200px)': {
        categoriesList: {
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 cards per row for medium screens
        },
        imageContainer: {
            width: '180px',  // Adjust image size for medium screens
            height: '300px',  // Adjust image height for medium screens
        },
    },
    '@media (max-width: 768px)': {
        categoriesList: {
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 cards per row for smaller screens
        },
        imageContainer: {
            width: '150px',  // Adjust image size for smaller screens
            height: '250px',  // Adjust image height for smaller screens
        },
        title: {
            fontSize: '14px', // Reduce font size for small screens
        },
        description: {
            fontSize: '12px', // Reduce font size for small screens
        },
    },
    '@media (max-width: 480px)': {
        categoriesList: {
            gridTemplateColumns: '1fr', // 1 card per row for mobile screens
        },
        imageContainer: {
            width: '100%', // Adjust image size to full width for mobile screens
            height: 'auto', // Adjust height for mobile screens
        },
        title: {
            fontSize: '12px', // Further reduce font size for very small screens
        },
        description: {
            fontSize: '10px', // Further reduce font size for very small screens
        },
    },
};

export default EventHome;
