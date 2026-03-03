import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

// --- Icons ---
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FeedbackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ConsultationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

// 🔔 Notification Icon
const NotificationIcon = ({ count }) => (
  <div style={{ position: "relative", cursor: "pointer", marginRight: "20px" }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
    {count > 0 && (
      <span style={{
        position: "absolute", top: "-5px", right: "-5px",
        background: "#E63946", color: "white", borderRadius: "50%",
        fontSize: "12px", padding: "2px 6px"
      }}>
        {count}
      </span>
    )}
  </div>
);

// --- FIXED THEME STYLES (Earthy & Premium) ---
const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  backgroundColor: '#1C3026', /* Deep Forest Green */
  color: '#F4F6F0', /* Warm Off-White */
  boxShadow: '0 4px 12px rgba(28, 48, 38, 0.15)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const logoStyles = { fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' };
const navLinksContainerStyles = { display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '10px' };

const navLinkStyles = {
  background: 'none', border: 'none', 
  color: '#D5DEC4', /* Soft Sage */
  fontSize: '16px', fontWeight: 500, cursor: 'pointer', padding: '8px 16px', borderRadius: '8px',
  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
  transition: 'all 0.2s ease'
};

const activeNavLinkStyles = { 
  backgroundColor: '#3A4D43', /* Muted Dark Green */
  color: '#FFFFFF', 
  fontWeight: 'bold' 
};

const navbarRightStyles = { display: 'flex', alignItems: 'center', position: "relative" };

const userAvatarStyles = {
  width: '40px', height: '40px', borderRadius: '50%', 
  backgroundColor: '#D5DEC4', /* Soft Sage */
  color: '#1C3026', /* Deep Forest Green Text */
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  fontWeight: 'bold', fontSize: '18px'
};

const ctaButtonStyles = {
  backgroundColor: '#D5DEC4', /* Soft Sage */
  color: '#1C3026', /* Deep Forest Green Text */
  padding: '10px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginRight: '20px',
  transition: 'background-color 0.2s ease'
};

export default function PatientNavbar() {
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, title: "Therapy Reminder", text: "Abhyanga session tomorrow 10AM", time: "2h ago" },
    { id: 2, title: "Aftercare Tip", text: "Drink warm water after therapy", time: "1d ago" },
  ];

  return (
    <nav style={navbarStyles}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={logoStyles}>AyurSutra</div>
      </Link>

      {/* Nav Links */}
      <ul style={navLinksContainerStyles}>
        <li>
          <NavLink to="/patient/dashboard" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
            <DashboardIcon /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/patient/scheduling" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
            <CalendarIcon /> Therapy Scheduling
          </NavLink>
        </li>
        <li>
          <NavLink to="/patient/feedback" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
            <FeedbackIcon /> Feedback
          </NavLink>
        </li>
      </ul>

      {/* Right-side Actions */}
      <div style={navbarRightStyles}>
        {/* 🔔 Notification */}
        <div onClick={() => setShowNotif(!showNotif)}>
          <NotificationIcon count={notifications.length} />
        </div>

        {/* ✅ FIXED Dropdown Notification Panel Colors */}
        {showNotif && (
          <div style={{
            position: "absolute", top: "60px", right: "90px",
            width: "320px", background: "#FFFFFF", borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(28, 48, 38, 0.2)", padding: "12px",
            animation: "fadeIn 0.3s ease-in-out"
          }}>
            <h4 style={{ margin: "0 0 10px", color: "#1C3026" }}>Notifications</h4>
            {notifications.map(n => (
              <div key={n.id} style={{
                padding: "10px", borderBottom: "1px solid #EAEFDA",
                display: "flex", flexDirection: "column"
              }}>
                <strong style={{ fontSize: "14px", color: "#1C3026" }}>{n.title}</strong>
                <span style={{ fontSize: "13px", color: "#5A6D62" }}>{n.text}</span>
                <small style={{ fontSize: "12px", color: "#8E9E93" }}>{n.time}</small>
              </div>
            ))}
            <button style={{
              marginTop: "10px", width: "100%", padding: "8px",
              borderRadius: "8px", background: "#1C3026", color: "#F4F6F0", border: "none", cursor: "pointer"
            }}>
              View All
            </button>
          </div>
        )}

        {/* ✅ Consultation Button */}
        <Link to="/patient/recommendations" style={ctaButtonStyles}>
          <ConsultationIcon />
          Get Consultation
        </Link>

        {/* Avatar */}
        <Link to="/patient/profile" style={{ textDecoration: 'none' }}>
          <div style={userAvatarStyles}>PT</div>
        </Link>
      </div>
    </nav>
  );
}