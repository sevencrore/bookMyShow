import {  useEffect, useState } from "react";
import { Link ,useParams } from 'react-router-dom';

const EventList = ({ events }) => {
    // TODO
    
    return (
        <div className="container-fluid categories-list" style={styles.categoriesList}>
            {events.map((event, index) => (
                <Link key={index} to={`/eventdetails/${event._id}`} style={styles.link}>
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
    );
};


export const EventHome = ()=>{

    const [events, setEvents] = useState([]);
    const { cityId,categoryId } = useParams();
    console.log(cityId);

    useEffect(() => {

        // Fetch categories
        fetch(`http://localhost:5000/event/get/${categoryId}/${cityId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                console.log(data);
            })
            .catch((e) => {
                console.error(e);
            });

    }, []);

  
    return (
        <EventList events={events} />

    )
}

const styles = {
    categoriesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
        gap: '20px', // Space between cards
        marginTop: '20px',
        padding: '0 20px', // Padding for the container
    },
    link: {
        textDecoration: 'none', // No underline for the link
    },
    categoryCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Distribute content evenly
        width: '100%',
        height: 'auto', // Auto height for the card
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center', // Center the image horizontally
        alignItems: 'center', // Center the image vertically
        width: '204px', // Fixed width of 204px
        height: '336px', // Fixed height of 336px
        overflow: 'hidden',
    },
    image: {
        width: '204px',  // Fixed width for image
        height: '336px', // Fixed height for image
        objectFit: 'cover',  // Ensure image covers the container and doesn't stretch
        display: 'block',
    },
    contentContainer: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        flexGrow: 1, // Allow content to take available space
        marginTop: '10px', // Add margin-top for space between image and text
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
    slider: {
        maxWidth: '100%',
        maxHeight: '324px',
        marginRight: '20px',
        marginLeft: '20px',
        marginTop: '20px'
    },
    sliderImage: {
        objectFit: 'cover',
        width: '100%',
    },
};

export default EventHome;