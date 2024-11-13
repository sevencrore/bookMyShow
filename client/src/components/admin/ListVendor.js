import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const ListVendor = () => {
  const [vendors, setVendors] = useState([]); // To store vendor data
  const [selectedVendor, setSelectedVendor] = useState(null); // To store selected vendor for view/edit
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit modes

  // Fetch vendors when component mounts
  useEffect(() => {
    // Fetch vendors
    axios
      .get("http://localhost:5000/vendor/")
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  // Handle View action
  const handleView = (vendorId) => {
    const vendor = vendors.find((v) => v._id === vendorId);
    setSelectedVendor(vendor);
    setIsEditing(false); // Set view mode
  };

  // Handle Edit action
  const handleEdit = (vendorId) => {
    const vendor = vendors.find((v) => v._id === vendorId);
    setSelectedVendor(vendor);
    setIsEditing(true); // Set edit mode
  };

  // Handle form submit for editing
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Send PUT request to update vendor
    axios
    .post(`http://localhost:5000/vendor/edit/${selectedVendor._id}`, selectedVendor)  
    console.log("Edited vendor: ", selectedVendor);
    setIsEditing(false); 
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">List of Vendors</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          {/* Vendor List Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td>{vendor.name}</td>
                  <td>{vendor.description}</td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleView(vendor._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(vendor._id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Vendor Details or Edit Form Below the Table */}
          {selectedVendor && (
            <div className="my-3">
              {isEditing ? (
                <div>
                  <h3>Edit Vendor</h3>
                  <Form onSubmit={handleSubmitEdit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="name">
                          <Form.Label>Vendor Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedVendor.name}
                            onChange={(e) =>
                              setSelectedVendor({
                                ...selectedVendor,
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
                            value={selectedVendor.description}
                            onChange={(e) =>
                              setSelectedVendor({
                                ...selectedVendor,
                                description: e.target.value,
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Adding is_active field as a checkbox */}
                    <Row>
                      <Col md={12}>
                        <Form.Group controlId="is_active">
                          <Form.Check
                            type="checkbox"
                            label="Active"
                            checked={selectedVendor.is_active}
                            onChange={(e) =>
                              setSelectedVendor({
                                ...selectedVendor,
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
                  <h3>Vendor Details</h3>
                  <p><strong>Vendor Name:</strong> {selectedVendor.name}</p>
                  <p><strong>Description:</strong> {selectedVendor.description}</p>
                  <p><strong>Status:</strong> {selectedVendor.is_active ? "Active" : "Inactive"}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListVendor;
