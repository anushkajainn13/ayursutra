import React from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Welcome to Patient Dashboard</h1>
        <p>Here you can access all your therapy schedules, give feedback and manage your profile.</p>
      </div>
    </div>
  );
}

export default Dashboard;
