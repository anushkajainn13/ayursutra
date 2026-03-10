import React, { useState } from "react";
import "./Stylesheet/YourProfile.css";

// Premium Avatar Image
const profilePic = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300";

function YourProfile() {
  const [user, setUser] = useState({
    name: "Dr. Priya Sharma",
    specialization: "Ayurveda Specialist (MD)",
    email: "priya.sharma@ayursutra.clinic",
    phone: "+91 9876543210",
    address: "123 AyurSutra Clinic, Wellness Road, Vanasthali, Rajasthan",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Your Profile</h2>
        <p className="profile-subtitle">Manage your personal and professional details</p>
      </div>

      <div className="profile-card">
        
        {/* Avatar Section */}
        <div className="avatar-wrapper">
          <img src={profilePic} alt="User Avatar" className="profile-img" />
          <div className="avatar-glow"></div>
        </div>

        {isEditing ? (
          <div className="edit-form animate-fade-in">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Specialization</label>
              <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} />
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
              <label>Clinic Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>

            <button className="profile-btn" onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <div className="profile-info animate-fade-in">
            <div className="info-row">
              <span className="info-label">Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Specialization</span>
              <span className="info-value">{user.specialization}</span>
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
              <span className="info-label">Address</span>
              <span className="info-value">{user.address}</span>
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

export default YourProfile;