//home page wali
import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function NavbarApp() {
  const navigate = useNavigate(); // ✅ move this to top

  // Scroll handler
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar app-navbar">
      <div className="logo">AyurSutra</div>

      {/* Main nav links */}
      <div className="nav-links">
        <button onClick={() => scrollToSection("home")}>Home</button>
        <button onClick={() => scrollToSection("why-choose")}>Why Choose AyurSutra</button>
        <button onClick={() => scrollToSection("about")}>About Us</button>
        <button onClick={() => scrollToSection("how-it-works")}>How It Works</button>
      </div>

      {/* Right-side buttons */}
      <div className="nav-buttons">
        <button onClick={() => navigate("/auth")}>Login</button>
        <button onClick={() => navigate("/auth")}>Sign Up</button>
      </div>
    </nav>
  );
}
