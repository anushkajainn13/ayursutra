import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Stylesheet/PatientCard.css";

const PatientCard = ({
  initials,
  name,
  age,
  gender,
  status,
  contact,
  email,
  therapy,
  onRemove,
  onAddPatient, // Agar yeh button PatientCard ke andar nahi hai, to ise remove kar sakte hain
}) => {
  const [nextDate, setNextDate] = useState(
    therapy?.nextSessionDate || new Date().toISOString().split("T")[0]
  );
  const [nextTime, setNextTime] = useState(therapy?.nextSessionTime || "09:00");

  const done = Number(therapy?.completedSessions) || 0;
  const total = Number(therapy?.totalSessions) || 0;
  const left = total - done;
  const progressPercent = total > 0 ? Math.round((done / total) * 100) : 0;

  const therapyDescriptions = {
    "Abhyanga Massage":
      "Traditional Ayurvedic oil massage that improves circulation & removes toxins.",
    Shirodhara:
      "Warm oil therapy poured on forehead to relieve stress & promote relaxation.",
    Panchakarma:
      "Cleansing therapy to detoxify the body and restore balance.",
  };

  // 'Rajiv' aur 'Meera' wale logic ko hata diya hai, ab sabhi patients ke liye location icon dikhega
  const showLocationIcon = therapy && therapy.location; 

  return (
    <div className="patient-card">
      {/* Agar add-patient-btn yahan nahi chahiye to hata sakte hain */}
      {onAddPatient && (
        <button className="add-patient-btn" onClick={onAddPatient}>
          + Add Patient
        </button>
      )}

      {/* Remove button top-right fixed */}
      <button className="remove-icon" onClick={onRemove}>
        <FaTimes />
      </button>

      {/* Full patient content */}
      <div className="patient-content">
        <div className="patient-header">
          <div className="avatar">{initials}</div>
          <div className="patient-info">
            <h3>
              {name}
              <span className={`status-badge ${status}`}>
                {status === "new" ? "🆕 New" : "✔ Active"}
              </span>
            </h3>
            <p className="sub-info">
              {age} yrs • {gender}
            </p>
            <p className="sub-info">
              <FaPhoneAlt className="icon" /> {contact}
            </p>
            <p className="sub-info">
              <FaEnvelope className="icon" /> {email}
            </p>
          </div>
        </div>

        {therapy && (
          <div className="therapy-section">
            <p className="location">
              {showLocationIcon && (
                <FaMapMarkerAlt className="icon-location" />
              )}
              {therapy.location}
            </p>

            <div className="therapy-box">
              <p>
                <strong>Current Therapy:</strong> {therapy.therapy}
              </p>
              <p className="therapy-desc">
                {therapyDescriptions[therapy.therapy] ||
                  "Holistic wellness therapy for healing and balance."}
              </p>
            </div>

            <div className="progress-section">
              <p>
                <strong>Progress:</strong> {done} done • {left >= 0 ? left : 0} left
              </p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Next session date and time alag se niche dikhenge */}
            <div className="next-session-container">
                <FaCalendarAlt className="calendar-icon" />
                <input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="date-picker"
                />
                <input
                    type="time"
                    value={nextTime}
                    onChange={(e) => setNextTime(e.target.value)}
                    className="time-picker"
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;