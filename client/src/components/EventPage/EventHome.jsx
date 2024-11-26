import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

// Breadcrumb Component
const Breadcrumb = () => {
    const selectedCityName = localStorage.getItem('selectedCityName');
    const selectedCategoryName = localStorage.getItem('selectedCategoryName');

    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb" style={{ backgroundColor: 'transparent', padding: 0 }}>
                {selectedCityName && (
                    <li
                        className="breadcrumb-item"
                        style={{
                            fontSize: '1.3rem',  // Equivalent to h4 size
                            fontWeight: 'bold',
                            paddingLeft: '07px', // Adds 20px padding on the left
                            marginLeft: '07px',  // Adds 20px margin on the left
                        }}
                    >
                        {selectedCategoryName} in {selectedCityName}
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
            <div className="container mt-4 mb-4">
                <div className="row g-4">
                    {events.map((event, index) => (
                        <Link
                            key={index}
                            to={`/event/${event._id}`}
                            className="col-4 col-md-4 col-lg-3 text-decoration-none" // Responsive columns
                        >
                            <div
                                className="p-0 rounded shadow-sm text-center h-100 d-flex flex-column"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                {/* Image Container */}
                                <div
                                    className="mb-2"
                                    style={{
                                        width: '100%',
                                        height: '140px',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_HOST}${event.img}`}
                                        alt={event.title}
                                        className="img-fluid"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover', // Stretch image to cover the div completely
                                        }}
                                    />
                                </div>
                                {/* Title */}
                                <h3
                                    className="fs-6 fw-bold text-dark m-0"
                                    style={{
                                        display: '-webkit-box', // Required for line clamping
                                        WebkitBoxOrient: 'vertical', // Set the text orientation to vertical
                                        WebkitLineClamp: 2, // Limit text to 2 lines
                                        overflow: 'hidden', // Hide overflowing text
                                        textOverflow: 'ellipsis', // Add ellipsis for overflow
                                        whiteSpace: 'normal', // Allow wrapping for multiline behavior
                                        maxWidth: '100%', // Ensure it fits within the container
                                    }}
                                    title={event.title} // Tooltip for full title
                                >
                                    {event.title}
                                </h3>

                                {/* Description */}
                                {/* <p
                        className="text-muted fs-6 mt-1 mb-0"
                        style={{
                            display: '-webkit-box', // Enable multi-line ellipsis
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2, // Display only 2 lines
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                        title={event.description} // Tooltip for the full description
                    >
                        {event.description}
                    </p> */}
                            </div>
                        </Link>
                    ))}
                </div>
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
        window.scrollTo(0, 0); // Scroll to top on component mount
        fetch(`${process.env.REACT_APP_HOST}/event/get/${categoryId}/${cityId}`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'No events found for the specified category and city.') {
                    alert('No events found for the specified category and city.');
                    history.push("/");
                } else {
                    setEvents(data);
                }
            })
            .catch((e) => console.error(e));
    }, [categoryId, cityId]);

    return (
        <div className="container mt-4">
            <div className="p-6 rounded" style={{
                backgroundColor: '#fff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default EventHome;
