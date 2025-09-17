import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // for now just go to dashboard
    navigate("/dashboard");
  };

  // Signup state (no roles now)
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", signupData);
    // for now just go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <img src="/logo192.png" alt="AyurCare Logo" className="auth-logo" />
        <h1 className="auth-title">🌱 AgriSmart</h1>
        <p className="auth-subtitle">
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create your account"}
        </p>

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
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn-secondary"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
