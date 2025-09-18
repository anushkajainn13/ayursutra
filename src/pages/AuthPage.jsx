import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/AuthPage.css";

function AuthPage({ setRole }) {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Determine role (for demo)
    const role = loginData.email.includes("practitioner") ? "practitioner" : "patient";
    setRole(role);
    localStorage.setItem("role", role);

    // Navigate to dashboard
    navigate(`/${role}/dashboard`);
  };

  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "", role: "patient" });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setRole(signupData.role);
    localStorage.setItem("role", signupData.role);
    navigate(`/${signupData.role}/dashboard`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h1>Ayursutra</h1>
        <div className="auth-tabs">
          <button onClick={() => setActiveTab("login")} className={activeTab === "login" ? "active" : ""}>Login</button>
          <button onClick={() => setActiveTab("signup")} className={activeTab === "signup" ? "active" : ""}>Sign Up</button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" value={signupData.fullName} onChange={handleSignupChange} required />
            <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
            <select name="role" value={signupData.role} onChange={handleSignupChange}>
              <option value="patient">Patient</option>
              <option value="practitioner">Practitioner</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>
        )}

        <button onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    </div>
  );
}

export default AuthPage;
