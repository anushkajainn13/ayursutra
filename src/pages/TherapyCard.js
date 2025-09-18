import React from "react";
import "./Stylesheet/TherapyCard.css";

const TherapyCard = ({ location, therapy, sessions, nextSession }) => {
  const [completed, total] = sessions.split("/");
  const progressPercent = (parseInt(completed) / parseInt(total)) * 100;

  return (
    <div className="therapy-card">
      <p className="therapy-location">📍 {location}</p>
      <div className="therapy-details">
        <h4>Current Therapy</h4>
        <p>{therapy}</p>
      </div>

      <div className="progress-bar-container">
        <p className="progress-text">Progress</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: progressPercent > 50 ? "#4CAF50" : "#F44336",
            }}
          ></div>
        </div>
        <p className="sessions-count">{sessions} sessions</p>
      </div>

      <div className="next-session-info">
        <p>
          <strong>Next Session</strong>
        </p>
        <p>{nextSession}</p>
      </div>
    </div>
  );
};

export default TherapyCard;