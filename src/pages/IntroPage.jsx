import React from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <div className="intro-content">
        <img src="/logo192.png" alt="AyurCare Logo" className="intro-logo" />
        <h1 className="intro-title">AyurCare</h1>
        <p className="intro-tagline">Your path to holistic healing</p>
        <button
          className="intro-button"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default IntroPage;
