import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import withAdminCheck from "./withAdminCheck";

const Event = () => {
  const history = useHistory();
  const userEmail = localStorage.getItem("username"); // User email stored in local storage

  const [input, setInput] = useState({
    vendor_id: "",
    category_id: "",
    title: "",
    host_name: "",
    img: null,
    img1: null,
    img2: null,
    img3: null,
    bg_img: null,
    area:"",
    location_description: "",
    location_lat: "",
    location_lang: "",
    city_id: "", // city_id is part of the state
    email: userEmail, // Include user email in the input
  });

  const [categories, setCategories] = useState([]); // To store category data
  const [vendors, setVendors] = useState([]); // To store vendor data
  const [cities, setCities] = useState([]); // To store city data

  // Fetch categories, vendors, and cities on component mount
  useEffect(() => {
    // Fetch categories from 'eventCategory' endpoint
    axios
      .get(`${process.env.REACT_APP_HOST}/eventCategory`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch vendors from 'vendor' endpoint
    axios
      .get(`${process.env.REACT_APP_HOST}/vendor`)
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));

    // Fetch cities from 'city' endpoint
    axios
      .get(`${process.env.REACT_APP_HOST}/city`)
      .then((response) => setCities(response.data)) // Update state with cities data
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure city_id is selected before submitting
    if (!input.city_id) {
      alert("Please select a city.");
      return;
    }

    const formData = new FormData();
    formData.append("vendor_id", input.vendor_id);
    formData.append("category_id", input.category_id);
    formData.append("title", input.title);
    formData.append("host_name", input.host_name);
    formData.append("description", input.description);
    formData.append("location_description", input.location_description);
    formData.append("location_lat", input.location_lat);
    formData.append("location_lang", input.location_lang);
    formData.append("city_id", input.city_id); // Ensure city_id is included
    formData.append("email", input.email);
    formData.append("area", input.area);

    // Append the image files if they exist
    if (input.img) {
      formData.append("img", input.img);
    }
    if (input.img1) {
      formData.append("img1", input.img1);
    }
    if (input.img2) {
      formData.append("img2", input.img2);
    }
    if (input.img3) {
      formData.append("img3", input.img3);
    }
    if (input.bg_img) {
      formData.append("bg_img", input.bg_img);
    }

    // Log the form data to check if city_id is included
    console.log("Form Data being sent:", formData);

    try {
      const res = await axios.post(`${process.env.REACT_APP_HOST}/event/create`,
        
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message); // Show success message
      history.push("/admin/dashboard"); // Redirect to dashboard after event is created
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: files[0], // Store the file in the corresponding input field
    }));
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">Add New Event</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          <form onSubmit={handleSubmit}>
            {/* Vendor ID Dropdown */}
            <Row className="g-3">
              <Col lg="4">
                <Form.Group className="form-group">
                  <Form.Label>
                    Select Vendor <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Select
                      name="vendor_id"
                      value={input.vendor_id}
                      onChange={handleInputChange}
                      required
                      isInvalid={input.vendor_id === ""}
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor._id}>
                          {vendor.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>

              {/* Category ID Dropdown */}
              <Col lg="4">
                <Form.Group className="form-group">
                  <Form.Label>
                    Select Category <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Select
                      name="category_id"
                      value={input.category_id}
                      onChange={handleInputChange}
                      required
                      isInvalid={input.category_id === ""}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category._id}>
                          {category.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>

              {/* City ID Dropdown */}
              <Col lg="4">
                <Form.Group className="form-group">
                  <Form.Label>
                    Select City <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="form-control-wrap">
                    <Form.Select
                      name="city_id"
                      value={input.city_id}
                      onChange={handleInputChange}
                      required
                      isInvalid={input.city_id === ""}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.city_id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* Event Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                className="form-control"
                id="title"
                placeholder="Enter Event Title"
              />
            </div>

            {/* Event Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                className="form-control"
                id="description"
                placeholder="Enter Event Title"
              />
            </div>

            {/* Host Name */}
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">
                Host Name
              </label>
              <input
                type="text"
                name="host_name"
                value={input.host_name}
                onChange={handleInputChange}
                className="form-control"
                id="host_name"
                placeholder="Enter Host Name"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Upload Image 1
              </label>
              <input
                type="file"
                name="img"
                onChange={handleFileChange}
                className="form-control"
                id="img"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img1" className="form-label">
                Upload Image 2
              </label>
              <input
                type="file"
                name="img1"
                onChange={handleFileChange}
                className="form-control"
                id="img1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img2" className="form-label">
                Upload Image 3
              </label>
              <input
                type="file"
                name="img2"
                onChange={handleFileChange}
                className="form-control"
                id="img2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img3" className="form-label">
                Upload Image 4
              </label>
              <input
                type="file"
                name="img3"
                onChange={handleFileChange}
                className="form-control"
                id="img3"
              />
            </div>

            {/* Background Image Upload */}
            <div className="mb-3">
              <label htmlFor="bg_img" className="form-label">
                Upload Background Image
              </label>
              <input
                type="file"
                name="bg_img"
                onChange={handleFileChange}
                className="form-control"
                id="bg_img"
              />
            </div>

            {/* Location Description */}
            <div className="mb-3">
              <label htmlFor="area" className="form-label">
                Area
              </label>
              <input
                type="text"
                name="area"
                value={input.area}
                onChange={handleInputChange}
                className="form-control"
                id="area"
                placeholder="Enter Area"
              />
            </div>
            {/* Location Description */}
            <div className="mb-3">
              <label htmlFor="location_description" className="form-label">
                Location Description
              </label>
              <input
                type="text"
                name="location_description"
                value={input.location_description}
                onChange={handleInputChange}
                className="form-control"
                id="location_description"
                placeholder="Enter Location Description"
              />
            </div>

            {/* Latitude */}
            <div className="mb-3">
              <label htmlFor="location_lat" className="form-label">
                Latitude
              </label>
              <input
                type="text"
                name="location_lat"
                value={input.location_lat}
                onChange={handleInputChange}
                className="form-control"
                id="location_lat"
                placeholder="Enter Latitude"
              />
            </div>

            {/* Longitude */}
            <div className="mb-3">
              <label htmlFor="location_lang" className="form-label">
                Longitude
              </label>
              <input
                type="text"
                name="location_lang"
                value={input.location_lang}
                onChange={handleInputChange}
                className="form-control"
                id="location_lang"
                placeholder="Enter Longitude"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3">
              <Button type="submit" variant="primary" className="btn-block">
                Add Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAdminCheck(Event);
