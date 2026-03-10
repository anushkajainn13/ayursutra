import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Stylesheet/NavbarApp.css";

export default function NavbarApp() {
  const navigate = useNavigate(); 

  // Scroll handler
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar app-navbar">
      {/* Clicking Logo takes you to the top */}
      <div className="nav-logo" onClick={() => scrollToSection("home")}>
        AyurSutra
      </div>

      {/* Main nav links */}
      <div className="nav-links">
        <button onClick={() => scrollToSection("home")}>Home</button>
        <button onClick={() => scrollToSection("why-choose")}>Why Choose Us</button>
        <button onClick={() => scrollToSection("about")}>About</button>
        <button onClick={() => scrollToSection("how-it-works")}>How It Works</button>
      </div>

      {/* Right-side buttons */}
      <div className="nav-buttons">
        <button className="nav-login-btn" onClick={() => navigate("/auth")}>Login</button>
        <button className="nav-signup-btn" onClick={() => navigate("/auth")}>Sign Up</button>
      </div>
    </nav>
  );
}