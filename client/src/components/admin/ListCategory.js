import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const ListCategory = () => {
  const [categories, setCategories] = useState([]); // To store category data
  const [selectedCategory, setSelectedCategory] = useState(null); // To store selected category for view/edit
  const [isEditing, setIsEditing] = useState(false); // To toggle between view/edit modes

  // Fetch categories when component mounts
  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:5000/eventCategory/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle View action
  const handleView = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    setSelectedCategory(category);
    setIsEditing(false); // Set view mode
  };

  // Handle Edit action
  const handleEdit = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    setSelectedCategory(category);
    setIsEditing(true); // Set edit mode
  };

  // Handle form submit for editing
  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Send PUT request to update category
    axios
    .post(`http://localhost:5000/eventCategory/edit/${selectedCategory._id}`, selectedCategory)  
    console.log("Edited category: ", selectedCategory);
    setIsEditing(false); 
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">List of Categories</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          {/* Category List Table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.category_name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => handleView(category._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(category._id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Category Details or Edit Form Below the Table */}
          {selectedCategory && (
            <div className="my-3">
              {isEditing ? (
                <div>
                  <h3>Edit Category</h3>
                  <Form onSubmit={handleSubmitEdit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="category_name">
                          <Form.Label>Category Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedCategory.category_name}
                            onChange={(e) =>
                              setSelectedCategory({
                                ...selectedCategory,
                                category_name: e.target.value,
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
                            value={selectedCategory.description}
                            onChange={(e) =>
                              setSelectedCategory({
                                ...selectedCategory,
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
                            checked={selectedCategory.is_active}
                            onChange={(e) =>
                              setSelectedCategory({
                                ...selectedCategory,
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
                  <h3>Category Details</h3>
                  <p><strong>Category Name:</strong> {selectedCategory.category_name}</p>
                  <p><strong>Description:</strong> {selectedCategory.description}</p>
                  <p><strong>Status:</strong> {selectedCategory.is_active ? "Active" : "Inactive"}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
