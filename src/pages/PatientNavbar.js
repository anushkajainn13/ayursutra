import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaThLarge, FaCalendarAlt, FaCommentDots, FaUser } from 'react-icons/fa';

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
    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px'
};
const activeNavLinkStyles = { backgroundColor: '#C2F970', color: '#2C5D63', fontWeight: 'bold' };
const navbarRightStyles = { display: 'flex', alignItems: 'center' };
const userAvatarStyles = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#C2F970', color: '#2C5D63', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '18px' };

export default function PatientNavbar() {
    return (
        <nav style={navbarStyles}>
            {/* Logo */}
            <div style={logoStyles}>AyurSutra</div>

            {/* Nav Links */}
            <ul style={navLinksContainerStyles}>
                <li>
                    <NavLink to="/patient/dashboard" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
                        <FaThLarge /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/scheduling" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
                        <FaCalendarAlt /> Therapy Scheduling
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/feedback" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
                        <FaCommentDots /> Feedback
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patient/profile" style={({ isActive }) => isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles}>
                        <FaUser /> Profile
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
