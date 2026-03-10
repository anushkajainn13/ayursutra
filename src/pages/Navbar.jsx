import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { IoCalendarOutline } from "react-icons/io5";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import './Stylesheet/PppractitionerDashboard.css';

export default function PractitionerNavbar() {
  return (
    <nav className="premium-navbar">
      
      {/* Left: Logo */}
      <Link to="/" className="nav-logo-link">
        <div className="nav-logo">AyurSutra</div>
      </Link>

      {/* Center: Navigation Links */}
      <div className="nav-center">
        <NavLink 
          to="/PppractitionerDashboard" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <RxDashboard className="nav-icon" /> Dashboard
        </NavLink>
        
        <NavLink 
          to="/practitioner/scheduling" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <IoCalendarOutline className="nav-icon" /> Therapy Scheduling
        </NavLink>
        
        <NavLink 
          to="/practitioner/feedback" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <BiMessageSquareDetail className="nav-icon" /> Feedback
        </NavLink>
      </div>

      {/* Right: Actions */}
      <div className="nav-right">
        
        {/* Notification Bell */}
        <div className="notification-wrapper">
          <FaRegBell className="bell-icon" />
          <span className="notification-badge">2</span>
        </div>

        {/* Consultation Button */}
        <button className="nav-consult-btn">
          <FiPhoneCall className="btn-icon" /> Get Consultation
        </button>

        {/* User Avatar */}
        <Link to="/practitioner/profile" className="avatar-link">
          <div className="nav-avatar">PT</div>
        </Link>
        
      </div>
    </nav>
  );
}