//profile button 
import React, { useState } from "react";
import "./Stylesheet/YourProfile.css";
import profilePic from "./images/profile.jpeg";

function YourProfile() {
  const [activeTab, setActiveTab] = useState("profile"); // sidebar tab state

  // Profile form data
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    gender: "Male",
    id: "1234-5678-9101",
    taxNumber: "TAX-IND-5678",
    country: "India",
    address: "123 Wellness Street, Health City, India",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-container">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </li>
          <li
            className={activeTab === "password" ? "active" : ""}
            onClick={() => setActiveTab("password")}
          >
            Password
          </li>
          <li
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </li>
          <li
            className={activeTab === "verification" ? "active" : ""}
            onClick={() => setActiveTab("verification")}
          >
            Verification
          </li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="profile-content">
        <h2>Account Settings</h2>
        <div className="profile-card">
          {activeTab === "profile" && (
            <>
              {/* Profile Picture */}
              <div className="profile-header">
                <img src={profilePic} alt="User" className="profile-avatar" />
                <div className="avatar-actions">
                  <button className="upload-btn">Upload New</button>
                  <button className="delete-btn">Delete Avatar</button>
                </div>
              </div>

              {/* Profile Form */}
              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Gender</label>
                    <div className="gender-options">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange}
                        />
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tax Identification Number</label>
                    <input
                      type="text"
                      name="taxNumber"
                      value={formData.taxNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Residential Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
            </>
          )}

          {activeTab === "password" && (
            <form className="profile-form">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" />
              </div>
              <button className="save-btn">Update Password</button>
            </form>
          )}

          {activeTab === "notifications" && (
            <form className="profile-form">
              <div className="form-group">
                <label>
                  <input type="checkbox" defaultChecked /> Email Notifications
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> SMS Notifications
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Push Notifications
                </label>
              </div>
              <button className="save-btn">Save Preferences</button>
            </form>
          )}

          {activeTab === "verification" && (
            <form className="profile-form">
              <div className="form-group">
                <label>Upload ID Document</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>Upload Address Proof</label>
                <input type="file" />
              </div>
              <button className="save-btn">Submit Verification</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourProfile;
