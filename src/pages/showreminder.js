import React, { useState } from "react";

export default function PatientNavbar() {
  const [showReminder, setShowReminder] = useState(false);

  return (
    <>
      <nav style={navbarStyles}>
        {/* Left Logo + Nav Links yeh same rehne de */}

        {/* Right Section */}
        <div style={navbarRightStyles}>
          {/* 🔔 Notification Icon */}
          <div onClick={() => setShowReminder(true)}>
            <NotificationIcon count={2} />
          </div>

          <Link to="/patient/consultation" style={ctaButtonStyles}>
            <ConsultationIcon />
            Get Consultation
          </Link>

          <Link to="/patient/profile" style={{ textDecoration: "none" }}>
            <div style={userAvatarStyles}>PT</div>
          </Link>
        </div>
      </nav>

      {/* ✅ Side Popup Reminder */}
      {showReminder && (
        <div style={{
          position: "fixed", right: 0, top: 0, height: "100vh", width: "300px",
          background: "#fff", boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
          padding: "20px", zIndex: 2000
        }}>
          <h3 style={{ color: "#2C5D63" }}>Your Therapy Reminder 🌿</h3>
          <p><strong>Before Therapy:</strong></p>
          <ul>
            <li>Keep stomach light</li>
            <li>Drink lukewarm water</li>
            <li>Wear comfortable clothes</li>
          </ul>

          <p><strong>After Therapy:</strong></p>
          <ul>
            <li>Rest in a cool room</li>
            <li>Drink herbal tea</li>
            <li>Avoid cold food/drinks</li>
          </ul>

          <button 
            onClick={() => setShowReminder(false)}
            style={{ marginTop: "20px", background: "#2C5D63", color: "#fff", padding: "10px 15px", borderRadius: "6px", border: "none" }}>
            Close
          </button>
        </div>
      )}
    </>
  );
}
