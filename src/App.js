import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/temp";
import FeedbackPage from "./pages/FeedbackPage";
import YourProfile from "./pages/YourProfile";
import TherapyScheduling from "./pages/therapyscheduling";
import NavbarApp from "./pages/NavbarApp"; // Intro page navbar
import Navbar from "./pages/Navbar"; // App pages navbar

function App() {
  return (
    <Router>
      <Routes>
        {/* Intro page with navbar */}
        <Route
          path="/"
          element={
            <>
              <NavbarApp />
              <IntroPage />
            </>
          }
        />

        {/* Auth page: NO navbar */}
        <Route path="/auth" element={<AuthPage />} />

        {/* App pages with standard navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/therapyscheduling"
          element={
            <>
              <Navbar />
              <TherapyScheduling />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <Navbar />
              <FeedbackPage />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <YourProfile />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
