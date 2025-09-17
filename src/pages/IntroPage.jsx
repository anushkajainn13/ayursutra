import React from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Intro Section */}
      <div className="intro-container">
        <img src="/logo192.png" alt="AyurCare Logo" className="intro-logo" />
        <h1 className="intro-title">AyurCare</h1>
        <h2 className="intro-subtitle">Panchakarma Management</h2>
        <p className="intro-tagline">
          Bridging Ayurveda and Technology for Better Healing
        </p>
        <button
          className="intro-button"
          onClick={() => navigate("/auth")}
        >
          Get Started →
        </button>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <h2 className="features-title">Holistic Healing Through Technology</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💚</div>
            <h3 className="feature-title">Personalized Care</h3>
            <p className="feature-text">
              Tailored Panchakarma treatments based on individual constitution
              and health needs.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3 className="feature-title">Expert Practitioners</h3>
            <p className="feature-text">
              Connect with certified Ayurvedic practitioners for authentic
              healing experiences.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3 className="feature-title">Proven Results</h3>
            <p className="feature-text">
              Traditional wisdom meets modern tracking for measurable wellness
              outcomes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroPage;
