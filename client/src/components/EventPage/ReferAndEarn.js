import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ReferAndEarn() {
  const [showPopup, setShowPopup] = useState(false);

  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const uid = user?.uid || ""; // Fallback in case user or uid is undefined

  // Base referral link
  const referralLink = `${window.location.origin}/Login_referral?uid=${uid}`;

  // Function to copy the referral link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    });
  };

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>
      {/* Title Section */}
      <div className="text-center my-4">
        <h1 className="fw-bold">Refer and Earn</h1>
        <p className="text-muted">Share the link below with your friends to earn rewards!</p>
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
        <button
          className="btn btn-primary btn-lg"
          onClick={copyToClipboard}
          style={{ minWidth: "150px" }}
        >
          Copy Link
        </button>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div
            className="toast align-items-center text-white bg-success border-0 show"
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body">Link copied to clipboard!</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setShowPopup(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
