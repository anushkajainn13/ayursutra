import React, { use, useState } from "react";
import "./Stylesheet/YourProfile.css"; // Reuse the same premium CSS file!
import { useEffect} from "react";

// A clean, elegant placeholder for the patient avatar
const profilePic = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300";

function PatientProfile() {
  // 1. Initial dummy state so the page doesn't crash before data arrives
  const [profile, setProfile] = useState({
    name: "Loading...",
    email: "Loading...",
    location: "Loading...",
    password: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    const email=localStorage.getItem("userEmail");
    // Fetch profile data based on the email
    fetch(`http://localhost:8000/api/profile/?email=${email}`)
      .then(res=> res.json())
      .then(data => {
        if (!data.error) {
          // Map Django's data to our React state
          const fetchedProfile = {
            name: data.full_name, 
            email: data.email,
            location: data.location,
              password: "" 
            };
            
            setProfile(fetchedProfile);
            setFormData(fetchedProfile); 
          }
        }
      )}, []); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const email= localStorage.getItem("userEmail");
    try{
      const response = await fetch(`http://localhost:8000/api/profile/update/?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: email,
          location: formData.location,
          password: formData.password
        }),
      })  
      const data= await response.json();
    if (response.ok) {
        // 4. Agar Django ne bola "Success!", tabhi frontend change karo
        setProfile(formData);
        setIsEditing(false);
        alert("Profile updated successfully! 🎉");
      } else {
        alert("Failed to update profile: " + data.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong with the server!");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Account Settings</h2>
        <p className="profile-subtitle">Manage your personal details and health profile</p>
      </div>

      <div className="profile-card">
        {isEditing ? (
          <div className="edit-form animate-fade-in">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
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
              <span className="info-value">{profile.name}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{profile.email}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Password</span>
              <span className="info-value">••••••••</span>
            </div>

            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">{profile.location}</span>
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