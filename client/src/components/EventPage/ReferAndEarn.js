import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ReferAndEarn() {
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [walletLoading, setWalletLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user_id from localStorage
  const userId = localStorage.getItem("user_id");

  // Fetch user details and wallet information in useEffect
  useEffect(() => {
    if (userId) {
      // Fetching user details
      fetch(`${process.env.REACT_APP_HOST}/user/${userId}`, { mode: "cors" })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserDetails(data);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error("Error fetching user details:", e);
          setLoading(false);
        });

      // Fetching user wallet information
      fetch(`http://localhost:5000/userwallet/getUserWallet/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setUserWallet(data);
            setWalletLoading(false);
          }
        })
        .catch((e) => {
          console.error("Error fetching user wallet:", e);
          setError("Failed to load wallet data.");
          setWalletLoading(false);
        });
    } else {
      setLoading(false); // If userId is not found in localStorage, stop loading
      setError("User ID not found.");
    }
  }, [userId]);

  // Base referral link
  const referralLink = `${window.location.origin}/Login_referral?uid=${userId}`;

  // Function to copy the referral link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    });
  };

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      {/* Title Section */}
      <div className="text-center my-4">
        <h1 className="fw-bold">Refer and Earn</h1>
        <p className="text-muted">
          Share the link below with your friends to earn rewards!
        </p>
       

        {/* Displaying wallet information */}
        {walletLoading ? (
          <div>Loading wallet details...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : userWallet ? (
          <div>
            <h5>Wallet Balance: &#x20B9;{userWallet.balance}</h5>
            {/* Other wallet details can be displayed here */}
          </div>
        ) : (
          <p className="text-danger">No wallet information available.</p>
        )}
      </div>

      {/* Referral Link Section */}
      <div className="d-flex flex-column align-items-center">
        <div className="form-group w-100 w-md-50 mb-3">
          <label className="form-label fw-bold">Your Referral Link:</label>
          <input
            type="text"
            className="form-control"
            value={referralLink}
            readOnly
          />
        </div>
        <div className="d-flex align-items-center position-relative">
          <button
            className="btn btn-primary btn-lg"
            onClick={copyToClipboard}
            style={{ minWidth: "150px" }}
          >
            Copy Link
          </button>

          {/* Success Popup */}
          {showPopup && (
            <div
              className="position-absolute start-100 translate-middle mt-2 p-2"
              style={{
                zIndex: 1050,
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              Link copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
