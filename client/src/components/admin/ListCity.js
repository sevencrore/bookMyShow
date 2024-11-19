import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom'; // React Router v5
import withAdminCheck from "./withAdminCheck";

const ListCity = () => {
  const [cities, setCities] = useState([]); // To store city data
  const [selectedCity, setSelectedCity] = useState(null); // To store selected city for view/edit
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit modes
  const history = useHistory(); // React Router v5
  const userEmail = localStorage.getItem('username');
  const [input, setInput] = useState({
    email: userEmail,
  });

  const formRef = useRef(null);

  // Fetch cities when component mounts
  useEffect(() => {
    const fetchUserRole = async () => {
      const username = localStorage.getItem('username'); // Get the username from local storage
      if (!username) {
        history.push("/"); // Redirect if username is not found in local storage
        return;
      }

      try {
        // Make the API call with the username in the request body
        const response = await axios.post(`${process.env.REACT_APP_HOST}/users/checkrole`, input);
        if (response.data.message !== 'admin') {
          history.push("/"); // Redirect if not admin
        } 
      } catch (error) {
        console.error('Error fetching user role:', error);
        history.push("/"); // Redirect if error occurs
      } 
    };

    fetchUserRole();

    // Fetch city list
    axios
      .get(`${process.env.REACT_APP_HOST}/city/`) // Changed to city endpoint
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, [input, history]); // Empty dependency array to run on mount only

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Handle View action
  const handleView = (cityId) => {
    const city = cities.find((c) => c._id === cityId);
    setSelectedCity(city);
    setIsEditing(false); // Set to view mode
    scrollToForm();
  };

  // Handle Edit action
  const handleEdit = (cityId) => {
    const city = cities.find((c) => c._id === cityId);
    setSelectedCity(city);
    setIsEditing(true); // Set to edit mode
    scrollToForm();
  };

  // Handle form submit for editing
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Send POST request to update city
    axios
      .post(`${process.env.REACT_APP_HOST}/city/edit/${selectedCity._id}`, selectedCity) // Changed to city endpoint
      .then((response) => {
        alert(response.data.message);
        console.log("City updated successfully:", response.data);

        // After successful update, re-fetch the city list
        axios
          .get(`${process.env.REACT_APP_HOST}/city/`) // Changed to city endpoint
          .then((response) => {
            setCities(response.data); // Update the city list with the latest data
            setIsEditing(false); // Set to view mode after editing
            setSelectedCity(null); // Clear selected city after saving
          })
          .catch((error) => console.error("Error fetching updated cities:", error));
      })
      .catch((error) => {
        console.error("Error updating city:", error);
        alert('There was an error updating the city.');
      });
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">List of Cities</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          {/* City List Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>City Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city._id}>
                  <td>{city.name}</td>
                  <td>{city.description}</td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleView(city._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(city._id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* City Details or Edit Form Below the Table */}
          <div ref={formRef}>
          {selectedCity && (
            <div className="my-3">
              {isEditing ? (
                <div>
                  <h3>Edit City</h3>
                  <Form onSubmit={handleSubmitEdit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="name">
                          <Form.Label>City Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedCity.name}
                            onChange={(e) =>
                              setSelectedCity({
                                ...selectedCity,
                                name: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group controlId="description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={selectedCity.description}
                            onChange={(e) =>
                              setSelectedCity({
                                ...selectedCity,
                                description: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group controlId="is_active">
                          <Form.Check
                            type="checkbox"
                            label="Active"
                            checked={selectedCity.is_active}
                            onChange={(e) =>
                              setSelectedCity({
                                ...selectedCity,
                                is_active: e.target.checked,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="primary" className="my-3">
                      Save Changes
                    </Button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h3>City Details</h3>
                  <p><strong>City Name:</strong> {selectedCity.name}</p>
                  <p><strong>Description:</strong> {selectedCity.description}</p>
                  <p><strong>Status:</strong> {selectedCity.is_active ? "Active" : "Inactive"}</p>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdminCheck(ListCity);
