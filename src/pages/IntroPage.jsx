import React from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/IntroPage.css";
import healingImage from "../assets/logo.png"; // Using the dark aesthetic image you had earlier

function IntroPage() {
  const navigate = useNavigate();
  
  const handleButtonClick = (action) => {
    if (action === "Get Started") {
      navigate("/auth");
    } else if (action === "Learn More") {
      document.getElementById('about').scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="intro-page-wrapper">
      
      {/* Hero Section */}
      <section id="home" className="intro-hero">
        <div className="hero-left">
          <div className="hero-pill">✦ WELCOME TO AYURSUTRA ✦</div>
          <h1>
            Bridging Ayurveda and <br/><span>Technology</span> for Healing
          </h1>
          <p className="hero-intro">
            Step into a world where ancient Ayurveda meets modern technology. 
            Heal, detox, and rejuvenate your body and mind with ease. 
            From personalized Panchakarma therapies to progress tracking, 
            AyurSutra brings wellness to your fingertips.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => handleButtonClick("Get Started")}>
              Get Started
            </button>
            <button className="btn-outline" onClick={() => handleButtonClick("Learn More")}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-right">
          {/* A glowing wrapper for the image to make it pop on dark background */}
          <div className="image-glow-wrapper">
            <img src={healingImage} alt="Ayurveda Healing" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Highlight Cards Section */}
      <section id="why-choose" className="highlight-cards-section">
        <div className="section-header">
          <h2>Why Choose AyurSutra?</h2>
          <p>Our intelligent platform brings you smart features for better care and healing.</p>
        </div>

        <div className="cards-container">
          <div className="feature-card">
            <div className="icon-wrapper" aria-hidden>📅</div>
            <h3>Automated Scheduling</h3>
            <p>Intelligent scheduling system that optimizes therapy sessions based on patient needs and practitioner availability.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper" aria-hidden>🌿</div>
            <h3>Personalized Care</h3>
            <p>Customized treatment plans and wellness recommendations based on individual constitution and health goals.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper" aria-hidden>📈</div>
            <h3>Progress Tracking</h3>
            <p>Comprehensive monitoring of treatment progress with detailed analytics and insights for better outcomes.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-glass-container">
          <p className="quote-text">
            "Healing is not just the absence of illness, but the presence of balance."
          </p>
          <div className="gold-divider"></div>
          <p className="about-desc">
            AyurSutra is where ancient Ayurvedic wisdom meets modern technology. We are dedicated to creating a bridge between time-honored healing practices and innovative digital tools, making holistic wellness accessible to everyone. Our platform empowers practitioners to deliver personalized therapies, track patient progress intelligently, and optimize Panchakarma treatments for maximum benefit. For patients, it offers a seamless, guided experience—bringing clarity, balance, and well-being to their health journey.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <h2>How AyurSutra Works</h2>
          <p>A simple 4-step process to manage your Panchakarma journey digitally</p>
        </div>
        
        <div className="steps-container">
          {[
            { step: "1", title: "Sign Up / Login", desc: "Create your account as a patient or practitioner to access personalized dashboards.", icon: "👤" },
            { step: "2", title: "Choose Therapy", desc: "Select the Panchakarma therapy suited to your health goals and dosha assessment.", icon: "🌿" },
            { step: "3", title: "Book Sessions", desc: "Book your therapy sessions, receive notifications, and never miss a step.", icon: "📅" },
            { step: "4", title: "Track Progress", desc: "Monitor your recovery milestones, give feedback, and see your health improve.", icon: "📈" }
          ].map(item => (
            <div key={item.step} className="step-card-premium">
              <div className="step-number-circle">{item.step}</div>
              <div className="step-icon-large">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="premium-footer">
        <div className="footer-content">
          <h2 className="footer-logo">AyurSutra</h2>
          <p>&copy; 2026 AyurSutra. Powered by Team VERTEX.</p>
        </div>
      </footer>
      
    </div>
  );
}

export default IntroPage;