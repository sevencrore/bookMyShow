import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import withAdminCheck from "./withAdminCheck";

const Add_Image = () => {
  const history = useHistory();
  const userEmail = localStorage.getItem("username");
  const [input, setInput] = useState({
    image: null,
    name: "", // Image name
    description: "", // Image description
    email: userEmail,
  });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the image, name, description, and email to formData
    if (input.image) {
      formData.append("image", input.image);
    }
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("email", input.email);

    try {
      const host = process.env.REACT_APP_HOST;
      const url = `${process.env.REACT_APP_HOST}/slideImage/create`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Necessary for file upload
        },
      });
      alert("Image uploaded successfully!");
      history.push("/admin/dashboard"); // Redirect to dashboard
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setInput({
      ...input,
      image: e.target.files[0], // Handle file input
    });
  };

  // Handle other input changes (name and description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value, // Update the respective state property (name or description)
    });
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">Add New Image</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Image Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                className="form-control"
                id="name"
                placeholder="Enter image name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Image Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleInputChange}
                className="form-control"
                id="description"
                placeholder="Enter image description"
                rows="3"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="form-control"
                id="image"
              />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Add Image
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAdminCheck(Add_Image);
