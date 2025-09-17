// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#f5f5f5" }}>
      <div>
        <Link to="/" style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}>AyurSutra</Link>
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard">Patient Dashboard</Link>
        <Link to="/therapy">Therapy Scheduling</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/auth">Sign In / Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
