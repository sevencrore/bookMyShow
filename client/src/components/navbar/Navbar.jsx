
import '../../style/navbar.css'
import { useContext } from 'react'
import { useEffect } from "react";

import { AppContext } from '../../contexts/AppContext'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
export default function ({ toggle }) {

    const { city, handleChange } = useContext(AppContext);
    const [showLogin, setShowLogin] = useState(false);
    const [cityName, setCityName] = useState(null); 
    

    const city_id = localStorage.getItem('selectedCityId');


    // useEffect(() => {
    //     if (city_id) {
    //         fetch(`${process.env.REACT_APP_HOST}/city/`, { mode: 'cors' })  // Assuming the API endpoint to get city details
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data && data.name) {
    //                     setCityName(data.name);  // Set the city name
    //                     localStorage.setItem('selectedCityName', data.name);  // Save city name in local storage
    //                 }
    //             })
    //             .catch(e => {
    //                 console.error("Error fetching city details:", e);
    //             });
    //     }

    // });


    function checkUser() {

        return localStorage.getItem('user');

    }


    function handleClose(e) {
        setShowLogin(false);
    }

    console.log("Toggled location function", toggle)
    return (<>

        <Modal size="sm" show={showLogin} onHide={handleClose} style={{}} aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Body>
                <Login hide={setShowLogin} />
            </Modal.Body>



        </Modal>

        <Link to={`/admin/login`}><p className="menubar-item" >Admin Login</p></Link>
        <Link to={`/admin/register`}><p className="menubar-item" >Admin Register</p></Link>
        <Link to={`/admin/dashboard`}><p className="menubar-item" >Admin Dashboard</p></Link>


        <div className="container-fluid navbar">
            <div>
                <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} />
                </Link>
            </div>

            {/* <div>

                <input className="inp" placeholder='Search for movies sports and events' />

            </div> */}

            
            

            <div className="grow">

            </div>

            <div className="menu-links">
                {/* Link to MyBookings */}
                <Link to="/mybookings" className="btn btn-outline-secondary text-light">
                    MyBookings
                </Link>
            </div>

            <div onClick={toggle}>
                <p className='sub'>{city} <img className='img-fluid' src={`${process.env.PUBLIC_URL}/down.png`} /></p>
            </div>


            {localStorage.getItem('user') ? <div>


                <p className='sub'><FaUser /> Hi,&nbsp;{JSON.parse(localStorage.getItem('user')).displayName} &nbsp; <FaSignOutAlt style={{ fontSize: "2rem", cursor: "pointer" }}  onClick={() => {

                    localStorage.removeItem('user');
                    setShowLogin(false);
                    window.location.reload();
                }} /> </p>
            </div> : <div>
                <Button onClick={() => {
                    setShowLogin(!showLogin);

                }} className='btn-signin'>Signin</Button>

                &nbsp;
                &nbsp;
                &nbsp;
                <img src={`${process.env.PUBLIC_URL}/menu.png`} className="img-fluid" />
            </div>}

        </div>


    </>)
}