import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Therapy from "./pages/Therapy";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();

  // Hide navbar on these paths
  const hideNavbarPaths = ["/", "/auth"];

  return (
    <>
      { !hideNavbarPaths.includes(location.pathname) && <Navbar /> }

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/therapy" element={<Therapy />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
