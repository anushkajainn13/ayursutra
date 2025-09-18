import React, { useState } from "react";
import "./Stylesheet/YourProfile.css";

// Using a placeholder image to ensure the code runs without errors
const profilePic = "https://placehold.co/120x120/C2F970/2C5D63?text=PS";

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
      <h1>YOUR PROFILE</h1>

      <div className="profile-card">
        <img src={profilePic} alt="User" className="profile-img" />

        {isEditing ? (
          <div className="edit-form">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

            <label>Specialization:</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />

            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

            <button className="profile-btn" onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Specialization:</strong> {user.specialization}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>

            <button className="profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}

        {/* Medical History section has been completely removed */}
      </div>
    </div>
  );
}

export default YourProfile;