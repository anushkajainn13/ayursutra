import React from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/IntroPage.css";
import healingImage from "./images/image.png";
function App() {
  const navigate = useNavigate();

  // Handler for button clicks
  const handleButtonClick = (action) => {
    if (action === "Get Started") {
      navigate("/signup");
    } else if (action === "Learn More") {
      // You can navigate to a learn more page or scroll to a section
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div>
      
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-left">
          <h1>
            Bridging Ayurveda and <span>Technology</span> for Better Healing
          </h1>
          <p className="hero-intro">
            Step into a world where ancient Ayurveda meets modern technology. 
            Heal, detox, and rejuvenate your body and mind with ease. 
            From personalized Panchakarma therapies to progress tracking, 
            AyurSutra brings wellness to your fingertips.
          </p>

          <div className="hero-buttons">
            <button onClick={() => handleButtonClick("Get Started")}>Get Started</button>
            <button onClick={() => handleButtonClick("Learn More")}>Learn More</button>
          </div>
        </div>
        <div className="hero-right">
          <img src={healingImage} alt="Ayurveda Healing" />
        </div>
      </section>

      {/* Highlight Cards */}
      <section  id="why-choose" className="highlight-cards">
        <div className="section-header">
          <h2>Why Choose Ayursutra?</h2>
          <p>Our intelligent Ayurveda platform brings you smart features for better care and healing.</p>
        </div>

        <div className="cards-container">
          <div className="card">
            <div className="icon" aria-hidden>📅</div>
            <h3>Automated Therapy Scheduling</h3>
            <p>Intelligent scheduling system that optimizes therapy sessions based on patient needs and practitioner availability.</p>
          </div>

          <div className="card">
            <div className="icon" aria-hidden>🌸</div>
            <h3>Personalized Care Guidance</h3>
            <p>Customized treatment plans and wellness recommendations based on individual constitution and health goals.</p>
          </div>

          <div className="card">
            <div className="icon" aria-hidden>📈</div>
            <h3>Progress Tracking & Analytics</h3>
            <p>Comprehensive monitoring of treatment progress with detailed analytics and insights for better outcomes.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="container">
          <p className="about-text">
            <b>"Healing is not just the absence of illness, but the presence of balance."</b>
            <br /><br />
            AyurSutra is where ancient Ayurvedic wisdom meets modern technology. We are dedicated to creating a bridge between time-honored healing practices and innovative digital tools, making holistic wellness accessible to everyone. Our platform empowers practitioners to deliver personalized therapies, track patient progress intelligently, and optimize Panchakarma treatments for maximum benefit. For patients, it offers a seamless, guided experience—bringing clarity, balance, and well-being to their health journey.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How AyurSutra Works</h2>
        <p className="subheading">A simple 4-step process to manage your Panchakarma journey digitally</p>
        
        <div className="steps-container">
          {[
            {
              step: "1",
              title: "Sign Up / Login",
              desc: "Create your account as a patient or practitioner to access personalized dashboards and features.",
              icon: "👤"
            },
            {
              step: "2",
              title: "Choose Therapy",
              desc: "Select the Panchakarma therapy suited to your health goals and dosha assessment.",
              icon: "🌿"
            },
            {
              step: "3",
              title: "Schedule & Get Reminders",
              desc: "Book your therapy sessions, receive notifications, and never miss a step in your wellness journey.",
              icon: "📅"
            },
            {
              step: "4",
              title: "Track Progress",
              desc: "Monitor your recovery milestones, give feedback, and see your health improve over time.",
              icon: "📈"
            }
          ].map(item => (
            <div key={item.step} className="step-card">
              <div className="step-icon">{item.icon}</div>
              <h3>{item.step}. {item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 AyurSutra. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
