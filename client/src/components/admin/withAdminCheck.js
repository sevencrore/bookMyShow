import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const withAdminCheck = (WrappedComponent) => {
  return (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const username = localStorage.getItem("username");

          if (!username) {
            history.push("/"); // Redirect if username is not found
            return;
          }
          
          const response = await axios.post(
            "http://localhost:5000/users/checkrole",
            { email: username }
          );

          if (response.data.message !== "admin") {
            history.push("/"); // Redirect if not admin
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          history.push("/"); // Redirect if error occurs
        } finally {
          setLoading(false);
        }
      };

      fetchUserRole();
    }, [history]);

    // Render a loader while checking role
    if (loading) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };
};

export default withAdminCheck;
