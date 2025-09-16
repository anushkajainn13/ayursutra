import React, { useState } from "react";
import "./AuthPage.css";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/logo192.png" alt="AyurCare Logo" className="auth-logo" />
        <h1 className="auth-title">AyurCare</h1>
        <p className="auth-subtitle">Your path to holistic healing</p>

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
          <form className="auth-form">
            <h2>Welcome Back</h2>
            <input type="text" placeholder="Email or Phone" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
          </form>
        ) : (
          <form className="auth-form">
            <h2>Create Account</h2>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Phone or Email" />
            <input type="password" placeholder="Password" />
            <select>
              <option value="">Select your role</option>
              <option value="patient">Patient</option>
              <option value="therapist">Therapist</option>
            </select>
            <button type="submit">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
