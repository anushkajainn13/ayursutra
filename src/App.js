import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import IntroPage from "./pages/IntroPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/dashboard"; // Patient ka naya dashboard
import PppractitionerDashboard from "./pages/PppractitionerDashboard";
<<<<<<< HEAD
import TherapyScheduling from "./pages/therapyscheduling";
=======
import TherapyScheduling from "./pages/TherapyScheduling"; // Patient ke liye
>>>>>>> f75c12b658640cab72d8c4a7b1e4c7ab6bd48a55
import FeedbackPage from "./pages/FeedbackPage";
import SessionScheduling from "./pages/SessionScheduling";
import YourProfile from "./pages/YourProfile";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import FeedbackDashboard from "./pages/FeedbackDashboard"; // Ek import hata sakte hain, duplicate hai

// Navbars
import PatientNavbar from "./pages/PatientNavbar";
import PractitionerNavbar from "./pages/Navbar"; // PractitionerNavbar
import NavbarApp from "./pages/NavbarApp"; // Landing page navbar

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={<><NavbarApp /><IntroPage /></>}
        />

        {/* Auth Page */}
        <Route path="/auth" element={<AuthPage setRole={setRole} />} />

        {/* Patient Flow */}
        {role === "patient" && (
          <>
            <Route
              path="/patient/dashboard"
              element={<><PatientNavbar /><Dashboard /></>} 
            />
            <Route
              path="/patient/scheduling"
              element={<><PatientNavbar /><TherapyScheduling /></>}
            />
            <Route
              path="/patient/feedback"
              element={<><PatientNavbar /><FeedbackPage /></>}
            />
            <Route
              path="/patient/profile"
              element={<><PatientNavbar /><YourProfile /></>}
            />
          </>
        )}

        {/* Practitioner Flow (Jaisa tha waisa hi) */}
        {role === "practitioner" && (
          <>
            <Route
              path="/practitioner/dashboard"
              element={<><PractitionerNavbar /><PppractitionerDashboard /></>}
            />
            <Route
              path="/practitioner/scheduling"
              element={<><PractitionerNavbar /><SessionScheduling/></>}
            />
            <Route
              path="/practitioner/patients"
              element={<><PractitionerNavbar /><PractitionerDashboard /></>}
            />
            <Route
              path="/practitioner/feedback"
              element={<><PractitionerNavbar /><FeedbackDashboard /></>}
            />
            <Route
              path="/practitioner/profile"
              element={<><PractitionerNavbar /><YourProfile /></>}
            />
          </>
        )}

        {/* Protect unknown routes */}
        <Route path="*" element={role ? <Navigate to={`/${role}/dashboard`} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;