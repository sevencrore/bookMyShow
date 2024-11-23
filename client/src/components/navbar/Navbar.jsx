import '../../style/navbar.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import Login from '../Login/Login';

export default function Navbar({ toggle }) {
    const { city } = useContext(AppContext);
    const [showLogin, setShowLogin] = useState(false);

    const city_id = localStorage.getItem('selectedCityId');

    function handleClose() {
        setShowLogin(false);
    }

    return (
        <>
            {/* Login Modal */}
            <Modal
                size="sm"
                show={showLogin}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Login hide={setShowLogin} />
                </Modal.Body>
            </Modal>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* Logo */}
                    <Link to="/" className="navbar-brand">
                        <img
                            src={`${process.env.PUBLIC_URL}/logo.png`}
                            alt="Logo"
                            className="img-fluid"
                            style={{ height: '40px' }}
                        />
                    </Link>

                    {/* Toggler for smaller screens */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Navbar */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* Left-aligned menu items */}
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/mybookings" className="nav-link">
                                    MyBookings
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/ReferAndEarn" className="nav-link">
                                    Refer and Earn
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/admin/login" className="nav-link">
                                    Admin Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/register" className="nav-link">
                                    Admin Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/dashboard" className="nav-link">
                                    Admin Dashboard
                                </Link>
                            </li> */}
                        </ul>

                        {/* Right-aligned items */}
                        <div className="d-flex align-items-center">
                            {/* City Dropdown */}
                            <div className="me-3">
                                <p className="mb-0 text-light" style={{ cursor: 'pointer' }} onClick={toggle}>
                                    {city}{' '}
                                    <img
                                        className="img-fluid"
                                        src={`${process.env.PUBLIC_URL}/down.png`}
                                        alt="Dropdown"
                                        style={{ height: '20px' }}
                                    />
                                </p>
                            </div>

                            {/* User Info */}
                            {localStorage.getItem('user') ? (
                                <div className="d-flex align-items-center">
                                    <p className="mb-0 text-light me-3">
                                        <FaUser /> Hi,&nbsp;
                                        {JSON.parse(localStorage.getItem('user')).displayName}{' '}
                                    </p>
                                    <FaSignOutAlt
                                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                                        className="text-light"
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            setShowLogin(false);
                                            window.location.reload();
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="d-flex align-items-center">
                                    <Button
                                        onClick={() => setShowLogin(!showLogin)}
                                        className="btn btn-primary btn-sm me-3"
                                    >
                                        Signin
                                    </Button>
                                    <img
                                        // src={`${process.env.PUBLIC_URL}/menu.png`}
                                        // className="img-fluid"
                                        // alt="Menu"
                                        // style={{ height: '30px' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
