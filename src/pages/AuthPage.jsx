import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/AuthPage.css";

function AuthPage({ setRole }) {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // This is a temporary login logic, assuming practitioner logs in with a specific email
    // And for patients, we might need to fetch their location after login
    const role = loginData.email.includes("practitioner")
      ? "practitioner"
      : "patient";
    setRole(role);
    localStorage.setItem("role", role);
    // Note: For login, location is not set here. Dashboard will show default state.
    // A real app would fetch user data (including location) from a server after login.
    localStorage.removeItem('userLocation'); // Clear any previous location on new login
    if (role === 'patient') {
        // As a placeholder for login, we can set a default location
        localStorage.setItem('userLocation', 'Jaipur'); 
    }
    navigate(`/${role}/dashboard`);
  };

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "patient",
    location: "Jaipur", // Default location set to Jaipur
  });

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // --- यहाँ बदलाव किया गया है ---
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setRole(signupData.role);
    localStorage.setItem("role", signupData.role);

    // ✅ **यही ज़रूरी बदलाव है**
    // अगर यूज़र पेशेंट है, तो उसकी लोकेशन को localStorage में सेव करें
    // ताकि डैशबोर्ड इसे इस्तेमाल कर सके।
    if (signupData.role === "patient") {
      localStorage.setItem("userLocation", signupData.location);
    }

    navigate(`/${signupData.role}/dashboard`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h1 className="auth-title">Ayursutra</h1>

        <div className="auth-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={signupData.fullName}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <select
              name="role"
              value={signupData.role}
              onChange={handleSignupChange}
            >
              <option value="patient">Patient</option>
              <option value="practitioner">Practitioner</option>
            </select>

            {signupData.role === "patient" && (
              <select
                name="location"
                value={signupData.location}
                onChange={handleSignupChange}
                required
              >
                {/* Removed the disabled option to have a default */}
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            )}

            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </form>
        )}

        <button className="btn-secondary" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default AuthPage;