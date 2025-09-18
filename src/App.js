import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './pages/MainLayout';
import PppractitionerDashboard from './pages/PppractitionerDashboard';
import PractitionerDashboard from './pages/PractitionerDashboard'; // 1. Patient Management wala page yahan import karein
import SessionScheduling from './pages/SessionScheduling';
import FeedbackDashboard from './pages/FeedbackDashboard';
import YourProfile from './pages/YourProfile';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PppractitionerDashboard />} />
            <Route path="/scheduling" element={<SessionScheduling />} />
            <Route path="/patients" element={<PractitionerDashboard />} /> {/* 2. 'Patients' ke liye naya route yahan jodein */}
            <Route path="/feedback" element={<FeedbackDashboard />} />
            <Route path="/profile" element={<YourProfile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;