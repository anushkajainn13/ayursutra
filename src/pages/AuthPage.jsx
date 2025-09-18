import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/AuthPage.css";

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

  // Signup state (with roles now)
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "patient", // default value
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", signupData);
    // role ke hisaab se navigate kar sakte ho
    if (signupData.role === "practitioner") {
      navigate("/dashboard?role=practitioner");
    } else {
      navigate("/dashboard?role=patient");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h1 className="auth-title">Ayursutra</h1>
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

            {/* Role selection */}
            <select
              name="role"
              value={signupData.role}
              onChange={handleSignupChange}
              required
            >
              <option value="patient">Patient</option>
              <option value="practitioner">Practitioner</option>
            </select>

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
