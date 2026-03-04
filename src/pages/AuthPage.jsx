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

    const role = loginData.email.includes("practitioner")
      ? "practitioner"
      : "patient";

    setRole(role);
    localStorage.setItem("role", role);

    localStorage.removeItem("userLocation");

    if (role === "patient") {
      localStorage.setItem("userLocation", "Jaipur");
    }

    navigate(`/${role}/dashboard`);
  };

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "patient",
    location: "Jaipur",
  });

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    setRole(signupData.role);
    localStorage.setItem("role", signupData.role);

    if (signupData.role === "patient") {
      localStorage.setItem("userLocation", signupData.location);
    }

    navigate(`/${signupData.role}/dashboard`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">

        {/* LEFT PANEL */}
        <div className="auth-left">
          <h2>AyurSutra</h2>
          <p>
            Discover personalized Ayurvedic healing through AI consultation,
            therapy guidance, and expert practitioners.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-box">
          <h1 className="auth-title">Create an account</h1>

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
    </div>
  );
}

export default AuthPage;