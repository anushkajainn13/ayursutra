import React, { useState } from "react";
import "./Stylesheet/YourProfile.css"; // Reuse the same premium CSS file!

// A clean, elegant placeholder for the patient avatar
const profilePic = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300";

function PatientProfile() {
  // Yeh data aapke Signup/Login backend ya localStorage se aayega
  const [user, setUser] = useState({
    name: "Jeeya",
    email: "jeeya@ayursutra.user",
    phone: "+91 98765 43210",
    age: "24",
    gender: "Female",
    location: "Vanasthali, Rajasthan",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Yahan backend API call aayegi update karne ke liye
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Account Settings</h2>
        <p className="profile-subtitle">Manage your personal details and health profile</p>
      </div>

      <div className="profile-card">
        
        {/* Avatar Section */}
        <div className="avatar-wrapper">
          <img src={profilePic} alt="Patient Avatar" className="profile-img" />
          <div className="avatar-glow"></div>
        </div>

        {isEditing ? (
          <div className="edit-form animate-fade-in">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    width: '100%',
                    appearance: 'none'
                  }}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Location / City</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
            </div>

            <button className="profile-btn" onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <div className="profile-info animate-fade-in">
            <div className="info-row">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '40px' }}>
              <div className="info-row" style={{ flex: 1 }}>
                <span className="info-label">Age</span>
                <span className="info-value">{user.age}</span>
              </div>
              <div className="info-row" style={{ flex: 1 }}>
                <span className="info-label">Gender</span>
                <span className="info-value">{user.gender}</span>
              </div>
            </div>

            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">{user.phone}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">{user.location}</span>
            </div>

            <button className="profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientProfile;