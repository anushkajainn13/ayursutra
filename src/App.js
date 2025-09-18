import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import PppractitionerDashboard from "./pages/PppractitionerDashboard";
import PractitionerDashboard from "./pages/PractitionerDashboard"; 
import SessionScheduling from "./pages/SessionScheduling";
import FeedbackDashboard from "./pages/FeedbackDashboard";
import YourProfile from "./pages/YourProfile";
import Dashboard from "./pages/dashboard"; // dusri branch ka code bhi rakha hai

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PppractitionerDashboard />} />
            <Route path="/scheduling" element={<SessionScheduling />} />
            <Route path="/patients" element={<PractitionerDashboard />} />
            <Route path="/feedback" element={<FeedbackDashboard />} />
            <Route path="/profile" element={<YourProfile />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* merge karke route bhi add kar diya */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
