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
                    <li className="breadcrumb-item" style={{ fontSize: '18px', fontWeight: 'bold' }}>
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
                            className="col-12 col-sm-6 col-md-4 col-lg-3 text-decoration-none"
                        >
                            <div
                                className="p-3 rounded shadow-sm text-center"
                                style={{
                                    backgroundColor: '#e2e0ea',
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
                                <div
                                    className="d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        backgroundColor: '#f0f0f0',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_HOST}${event.img}`}
                                        alt={event.title}
                                        className="img-fluid"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <h3 className="fs-6 fw-bold text-dark mb-2">{event.title}</h3>
                                <p
                                    className="text-muted fs-6 text-truncate"
                                    style={{
                                        maxWidth: '100%',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    title={event.description}
                                >
                                    {event.description}
                                </p>
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
            <div className="p-4 rounded" style={{
                backgroundColor: '#fff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <EventList events={events} />
            </div>
        </div>
    );
};

export default EventHome;
