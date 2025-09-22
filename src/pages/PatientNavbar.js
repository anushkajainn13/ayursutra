import React from 'react';
import { NavLink, Link } from 'react-router-dom';



const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FeedbackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);


// --- STYLES ---
const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#2C5D63',
    color: '#E0F2E9',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
};

const logoStyles = { fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' };
const navLinksContainerStyles = { display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '10px' };
const navLinkStyles = { 
    background: 'none', border: 'none', color: '#E0F2E9', fontSize: '16px', 
    fontWeight: 500, cursor: 'pointer', padding: '8px 16px', borderRadius: '8px',
    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px'
};
const activeNavLinkStyles = { backgroundColor: '#C2F970', color: '#2C5D63', fontWeight: 'bold' };
const navbarRightStyles = { display: 'flex', alignItems: 'center' };
// --- UPDATED ---
const userAvatarStyles = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#C2F970', color: '#2C5D63', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '18px' };

export default function PatientNavbar() {
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

            {/* Right-side Avatar */}
            <div style={navbarRightStyles}>
                <Link to="/patient/profile" style={{ textDecoration: 'none' }}>
                    <div style={userAvatarStyles}>PT</div>
                </Link>
            </div>
        </nav>
    );
}