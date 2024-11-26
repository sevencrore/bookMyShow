import { useContext, useEffect, useState } from "react";
import Menubar from "./menubar/Menubar";
import PrivacyNote from "./privacyNote/PrivacyNote";
import Footer from "./footer/Footer";
import Modal from "react-bootstrap/Modal";
import LocationPicker from "./LocationPickup/LocationPicker";
import { AppContext } from "../contexts/AppContext";
import Navbar from "./navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// HomePage Component
function HomePage() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const [cityName, setCityName] = useState(null); // State to store city name
    const [cities, setCities] = useState([]); // State to store all cities
    const [images, setImages] = useState([]);
    const [showCities, setShowCities] = useState(false); // State to toggle city display
    const { city, handleChange } = useContext(AppContext);

    const city_id = localStorage.getItem("selectedCityId");

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 2599,
    };

    function handleClose() {
        setShowModal(false);
    }

    // Fetch cities when "View All Cities" is clicked
    const fetchCities = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/city/`, { mode: "cors" });
            const data = await response.json();

            // Filter out cities with the 'order' field
            const filteredCities = data.filter((city) => !city.order);
            setCities(filteredCities);  // Only set cities that do not have an 'order' field
            setShowCities(true);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    // Fetch data on mount
    useEffect(() => {
        if (city_id) {
            fetch(`${process.env.REACT_APP_HOST}/city/`, { mode: "cors" })
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.name) {
                        setCityName(data.name);
                        localStorage.setItem("selectedCityName", data.name);
                    }
                })
                .catch((e) => {
                    console.error("Error fetching city details:", e);
                });
        }

        const fetchImages = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}/slideImage/`);
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();

        // Fetch categories
        fetch(`${process.env.REACT_APP_HOST}/eventCategory/`, { mode: "cors" })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [city_id]);

    // Handle category click
    const handleCategoryClick = (categoryId, categoryName) => {
        localStorage.setItem("selectedCategoryId", categoryId);
        localStorage.setItem("selectedCategoryName", categoryName);
    };

    const CategoryList = ({ categories }) => {
        return (
            <div className="container mt-4 mb-4">
                <div className="row g-4">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/events/${category._id}/${city_id}`}
                            className="col-6 col-md-4 col-lg-3 d-flex flex-column align-items-center text-decoration-none"
                            onClick={() => handleCategoryClick(category._id, category.category_name)}
                        >
                            <div
                                className="p-0 rounded shadow-sm text-center"
                                style={{ width: "100%", backgroundColor: "#f5f5f5" }}
                            >
                                <div
                                    className="d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        backgroundColor: "#f0f0f0",
                                        overflow: "hidden",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_HOST}${category.image}`}
                                        alt={category.category_name}
                                        className="img-fluid"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "fill",
                                        }}
                                    />
                                </div>
                                <h3 className="fs-6 fw-bold text-dark mb-2">{category.category_name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Modal
                size="xl"
                show={showModal}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <LocationPicker handleClose={handleClose} />
                </Modal.Body>
                <div className="d-flex flex-column align-items-center mt-3" style={{ marginBottom: '40px' }}>
                    <button
                        className="btn btn"
                        style={{ ...styles.viewAllButton, backgroundColor: "#EC5E71" }} // Apply custom background color
                        onClick={fetchCities}
                    >
                        View All Cities
                    </button>
                    {showCities && (
                        <div style={styles.citiesList}>
                            {cities.length > 0 ? (
                                cities.map((city, index) => (
                                    <div key={index} style={styles.cityCard}>
                                        <h5 style={styles.cityName}>{city.name}</h5>
                                    </div>
                                ))
                            ) : (
                                <p>No cities available</p>
                            )}
                        </div>
                    )}
                </div>

            </Modal>

            <Menubar />

            <Slider {...settings} style={styles.slider}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={`${process.env.REACT_APP_HOST}${image.image}`}
                            alt={`Slide ${index}`}
                            style={styles.sliderImage}
                        />
                    </div>
                ))}
            </Slider>

            <h3 className="heading-3" style={{ paddingLeft: "10px" }}>
                Categories
            </h3>

            <CategoryList categories={categories} />

            <PrivacyNote />
            {/* <Footer /> */}
        </>
    );
}

const styles = {
    viewAllButton: {
        backgroundColor: "#007bff",
        border: "none",
        padding: "10px 20px",
        color: "white",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    citiesList: {
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "15px",
    },
    cityCard: {
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    cityName: {
        margin: 0,
        fontSize: "14px",
        fontWeight: "bold",
    },
    slider: {
        maxWidth: "100%",
        maxHeight: "324px",
        marginRight: "20px",
        marginLeft: "20px",
        marginTop: "20px",
    },
    sliderImage: {
        objectFit: "cover",
        width: "100%",
        height: "350px",
    },
};

export default HomePage;
