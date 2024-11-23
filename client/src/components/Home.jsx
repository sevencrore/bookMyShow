import { useContext, useEffect, useState } from "react";
import Menubar from "./menubar/Menubar";
import PrivacyNote from "./privacyNote/PrivacyNote";
import Footer from "./footer/Footer";
import Modal from 'react-bootstrap/Modal';
import LocationPicker from "./LocationPickup/LocationPicker";
import { AppContext } from "../contexts/AppContext";
import Navbar from "./navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

// HomePage Component
function HomePage() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const [cityName, setCityName] = useState(null);  // State to store city name
    let { city, handleChange } = useContext(AppContext);
    const [images, setImages] = useState([]);

    const city_id = localStorage.getItem('selectedCityId');

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveheight: false,
        autoplay: true,
        autoplaySpeed: 2599
    };

    function handleClose(e) {
        setShowModal(false);
    }

    function toggleLocationPickup(e) {
        let set = !showModal;
        setShowModal(set);
    }

    // Fetch City Name based on city_id
    useEffect(() => {
        if (city_id) {
            fetch(`${process.env.REACT_APP_HOST}/city/`, { mode: 'cors' })  // Assuming the API endpoint to get city details
                .then(res => res.json())
                .then(data => {
                    if (data && data.name) {
                        setCityName(data.name);  // Set the city name
                        localStorage.setItem('selectedCityName', data.name);  // Save city name in local storage
                    }
                })
                .catch(e => {
                    console.error("Error fetching city details:", e);
                });
        }

        const fetchImages = async () =>
             { try 
                { const response = await fetch(`${process.env.REACT_APP_HOST}/slideImage/`); 
                const data = await response.json(); setImages(data); 
                } catch (error) {
                     console.error('Error fetching images:', error); 
                    } 
                }; 
         fetchImages ();

        // Fetch categories
        fetch(`${process.env.REACT_APP_HOST}/eventCategory/`, { mode: 'cors' })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [city_id]);

    // Function to handle category click and store the selected category in localStorage
    const handleCategoryClick = (categoryId, categoryName) => {
        // Save category id and name to localStorage
        localStorage.setItem('selectedCategoryId', categoryId);
        localStorage.setItem('selectedCategoryName', categoryName);
    };

    // Category List Component (Updated to show name/description below the image)
    const CategoryList = ({ categories }) => {
        return (
            <div className="container mt-4 mb-4"> {/* Container for the grid */}
                <div className="row g-4"> {/* Responsive row with gaps */}
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/events/${category._id}/${city_id}`}
                            className="col-sm-12 col-md-4 col-lg-3 d-flex flex-column align-items-center text-decoration-none" // Responsive columns
                            onClick={() => handleCategoryClick(category._id, category.category_name)}
                        >
                            {/* Card Container */}
                            <div className=" p-3 rounded shadow-sm text-center" style={{ width: '100%', backgroundColor: "#e2e0ea" }}>
                                {/* Image Container */}
                                <div
                                    className="d-flex justify-content-center align-items-center mb-3"
                                    style={{
                                        width: '100%',
                                        height: '336px',
                                        backgroundColor: '#f0f0f0',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_HOST}${category.image}`}
                                        alt={category.category_name}
                                        className="img-fluid"
                                        style={{
                                            width: '100%',   // Stretch to fill the width of the container
                                            height: '100%',  // Stretch to fill the height of the container
                                            objectFit: 'cover', // Maintain aspect ratio while covering the container
                                        }}
                                    />
                                </div>
                                {/* Title */}
                                <h3 className="fs-6 fw-bold text-dark mb-2">{category.category_name}</h3>
                                {/* Description */}
                                <p
                                    className="text-muted fs-6 text-truncate"
                                    style={{
                                        maxWidth: '100%',    // Ensure truncation works within the card
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    title={category.description} // Tooltip for full description
                                >
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };




    return (
        <>
            <Modal size="xl" show={showModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <LocationPicker handleClose={handleClose} />
                </Modal.Body>
                <p className="red">View All Cities</p>
            </Modal>

            {/* <Navbar toggle={toggleLocationPickup} /> */}

            <Menubar />

            {/* <Slider {...settings} style={styles.slider}>
                <div><img src="https://in.bmscdn.com/promotions/cms/creatives/1639378314392_revisedbanner2.jpg" style={styles.sliderImage} /></div>
                <div><img src="https://in.bmscdn.com/promotions/cms/creatives/1639051788302_sunburn.jpg" style={styles.sliderImage} /></div>
                <div><img src="https://in.bmscdn.com/promotions/cms/creatives/1637323134871_divinepunyapaaptour_webshowcase_1240x300.jpg" style={styles.sliderImage} /></div>
            </Slider> */}

            <Slider {...settings} style={styles.slider}> 
                {images.map((image, index) => (<div key={index}>
                     <img src={`${process.env.REACT_APP_HOST}${image.image}`} alt={`Slide ${index}`} style={styles.sliderImage} /> 
                     </div>))}
                     </Slider>

            <div className="container-fluid padd">
                <div className="left">
                    {/* <p className="heading-3">Categories</p> */}
                </div>
                {/* <div className="right">
                    <p className="heading-3">see all &#8594;</p>
                </div> */}
                <div className="clear"></div>
            </div>

            <h3 className="heading-3">Categories</h3>

            <CategoryList categories={categories} />

            <br />

            {/* <div className="container">
                <img className="img-fluid padded-img" src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/lead-in-v3-collection-202102040828.png" alt="Promo Banner" />
                <img className="img-fluid padded-img" src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png" alt="Promo Banner" />
            </div> */}

            <br />
            <br />
            {/* <div className="container">
                <CategoryList categories={categories} />
            </div> */}

            <PrivacyNote />
            {/* <Footer /> */}
        </>
    );
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
        // marginRight: '20px',
        // marginLeft: '20px',
        // marginTop: '20px'
    },
    sliderImage: {
        objectFit: 'cover',
        width: '100%',
        height: '350px',
        // borderRadius: '15px'
    },
};

export default HomePage;
