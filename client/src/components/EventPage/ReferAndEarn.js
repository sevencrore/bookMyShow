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
