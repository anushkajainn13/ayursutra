//pract
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaLeaf, FaThLarge, FaCalendarAlt, FaUsers, FaCommentDots } from 'react-icons/fa';
import './Stylesheet/PppractitionerDashboard.css'; // CSS file

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

const logoContainerStyles = { display: 'flex', alignItems: 'center' };
const logoIconStyles = { fontSize: '28px', color: '#C2F970', marginRight: '10px' };
const brandNameStyles = { fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' };
const brandTaglineStyles = { fontSize: '12px', color: '#E0F2E9', opacity: 0.8 };

const navLinksContainerStyles = { display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '10px' };
const navLinkStyles = {
  background: 'none',
  border: 'none',
  color: '#E0F2E9',
  fontSize: '16px',
  fontWeight: 500,
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};
const activeNavLinkStyles = { backgroundColor: '#C2F970', color: '#2C5D63', fontWeight: 'bold' };

const navbarRightStyles = { display: 'flex', alignItems: 'center' };
const userInfoStyles = { textAlign: 'right', marginRight: '15px' };
const userNameStyles = { fontWeight: 'bold', color: '#FFFFFF' };
const userRoleStyles = { fontSize: '12px', color: '#E0F2E9', opacity: 0.9 };
const userAvatarStyles = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#C2F970', color: '#2C5D63', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '18px' };

export default function PractitionerNavbar() {
  return (
    <nav style={navbarStyles}>
      {/* Logo */}
      <div style={logoContainerStyles}>
        <FaLeaf style={logoIconStyles} />
        <div>
          <span style={brandNameStyles}>AyurSutra</span>
          <span style={brandTaglineStyles}>Panchakarma Therapy</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="navbar-center">
        <ul style={navLinksContainerStyles}>
          <li>
            <NavLink to="./PppractitionerDashboard" style={({ isActive }) => (isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles)}>
              <FaThLarge /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/practitioner/scheduling" style={({ isActive }) => (isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles)}>
              <FaCalendarAlt /> Scheduling
            </NavLink>
          </li>
          <li>
            <NavLink to="/practitioner/patients" style={({ isActive }) => (isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles)}>
              <FaUsers /> Patients
            </NavLink>
          </li>
          <li>
            <NavLink to="/practitioner/feedback" style={({ isActive }) => (isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles)}>
              <FaCommentDots /> Feedback
            </NavLink>
          </li>
          <li>
            <NavLink to="/practitioner/profile" style={({ isActive }) => (isActive ? { ...navLinkStyles, ...activeNavLinkStyles } : navLinkStyles)}>
              Profile
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right side */}
      <div style={navbarRightStyles}>
        <div style={userInfoStyles}>
          <span style={userNameStyles}>Dr. Priya Sharma</span>
          <span style={userRoleStyles}>Ayurveda Specialist</span>
        </div>
        <Link to="/practitioner/profile" style={{ textDecoration: 'none' }}>
          <div style={userAvatarStyles}>PS</div>
        </Link>
      </div>
    </nav>
  );
}
