// StatsCard.js
import React from "react";
import "./Stylesheet/StatsCard.css";

const StatsCard = ({ title, value, status }) => {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <h4>{title}</h4>
      </div>
      <p className="stats-value">{value}</p>
    </div>
  );
};

export default StatsCard;