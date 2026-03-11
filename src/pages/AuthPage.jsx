import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/AuthPage.css";

function AuthPage({ setRole }) {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const response= await fetch("http://127.0.0.1:8000/api/login/",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(loginData),  
      });
      console.log("Login response:", response);
      const data=await response.json();
      if(response.ok){
        alert("Login successful!");
      setRole(data.user.role);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userLocation", data.user.location);
       navigate(`/${data.user.role}/dashboard`);

    } else {
      alert(data.error);
    }
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


  const handleSignupSubmit =async (e) => {
      console.log("Signup button clicked");

    e.preventDefault() 
      try {
        const response= await fetch("http://127.0.0.1:8000/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
        const data= await response.json();
        if (response.ok) {        
          alert("Signup successful!");
          setRole(signupData.role);
          localStorage.setItem("role", data.role);
      localStorage.setItem("userLocation", data.location);

      navigate(`/${data.role}/dashboard`);

    } else {
      alert(data.error);
    }

  } catch (error) {
    console.error("Login error:", error);
  }
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