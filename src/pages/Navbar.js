import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Stylesheet/navbaki.css"; // we’ll add CSS next

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">AyurCare</div>
      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>
        <NavLink to="/therapyscheduling" className={({ isActive }) => isActive ? "active" : ""}>
          Therapy Scheduling
        </NavLink>
        <NavLink to="/feedback" className={({ isActive }) => isActive ? "active" : ""}>
          Feedback
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}
