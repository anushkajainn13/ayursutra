import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaThLarge, FaCalendarAlt, FaUsers, FaCommentDots } from 'react-icons/fa'; // FaLeaf removed
import './Stylesheet/PppractitionerDashboard.css'; // CSS file
const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  backgroundColor: '#1C3026', /* Deep Forest Green - Make sure no CSS file is overriding this! */
  color: '#F4F6F0', 
  boxShadow: '0 4px 12px rgba(28, 48, 38, 0.15)', 
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const logoContainerStyles = { display: 'flex', alignItems: 'center', textDecoration: 'none' };
const brandNameStyles = { fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF' };
const brandTaglineStyles = { fontSize: '12px', color: '#D5DEC4', opacity: 0.8 };

const navLinksContainerStyles = { display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '10px' };

const navLinkStyles = {
  background: 'none',
  border: 'none',
  color: '#D5DEC4', /* Soft sage instead of bright white */
  fontSize: '16px',
  fontWeight: 500,
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s ease',
};

/* THE FIX: No more neon lime green! */
const activeNavLinkStyles = { 
  backgroundColor: '#3A4D43', /* Muted dark green */
  color: '#FFFFFF', 
  fontWeight: 'bold' 
};

const navbarRightStyles = { display: 'flex', alignItems: 'center', gap: '20px' };

/* THE FIX: Avatar matches the earthy theme */
const userAvatarStyles = { 
  width: '40px', 
  height: '40px', 
  borderRadius: '50%', 
  backgroundColor: '#D5DEC4', /* Soft sage */
  color: '#1C3026', /* Deep forest text */
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  fontWeight: 'bold', 
  fontSize: '18px' 
};

/* Added this just in case you are using inline styles for the button too */
const consultationBtnStyles = {
  backgroundColor: '#D5DEC4', /* Soft sage background */
  color: '#1C3026', /* Dark text */
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'background-color 0.2s ease'
};
export default function PractitionerNavbar() {
  return (
    <nav style={navbarStyles}>
      {/* Logo linked to homepage */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={logoContainerStyles}>
          {/* --- The FaLeaf icon has been removed --- */}
          <div>
            <span style={brandNameStyles}>AyurSutra</span>
            <span style={brandTaglineStyles}>Panchakarma Therapy</span>
          </div>
        </div>
      </Link>

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
        </ul>
      </div>

      {/* Right side */}
      <div style={navbarRightStyles}>
        <Link to="/practitioner/profile" style={{ textDecoration: 'none' }}>
          <div style={userAvatarStyles}>PS</div>
        </Link>
      </div>
    </nav>
  );
}