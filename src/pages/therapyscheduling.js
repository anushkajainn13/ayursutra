import React, { useState } from "react";
import "./Stylesheet/therapyscheduling.css";
// Placeholder images - Replace with your own!
import massageImg from "../assets/therapies_1.png";
import shirodharaImg from "../assets/therapies_2.png";
import detoxImg from "../assets/therapies_3.png";
import steamImg from "../assets/therapies_4.png";
import nasalImg from "../assets/therapies_5.png";


const THERAPIES = [
  { id: 1, title: "Abhyanga Massage", description: "Traditional full-body massage using warm herbal oils. Improves circulation and relaxes muscles completely.", duration: "60 mins", image: massageImg },
  { id: 2, title: "Shirodhara", description: "Continuous stream of warm herbal oil on forehead. Best for anxiety, stress relief, and treating insomnia.", duration: "45 mins", image: shirodharaImg },
  { id: 3, title: "Panchakarma Detox", description: "A complete detoxification program to deeply cleanse the body of accumulated toxins and restore balance.", duration: "90 mins", image: detoxImg },
  { id: 4, title: "Swedana", description: "Herbal steam therapy that flushes out deep-rooted toxins and relieves stiff muscles and joint pain.", duration: "30 mins", image: steamImg },
  { id: 5, title: "Nasya", description: "Medicated oil administered through the nasal passage. Cleanses sinuses and improves mental clarity.", duration: "30 mins", image: nasalImg }
];


const JAIPUR_CLINICS = [
  { id: 101, name: "AyurWellness Center", address: "C-Scheme, Jaipur" }
];

export default function TherapyScheduling() {
  const [appointments, setAppointments] = useState([
    { id: 1, title: "Abhyanga (Full Body Oil Massage)", doctor: "Dr. Priya Sharma", date: "Tomorrow, Oct 25", time: "10:00 AM – 11:30 AM", room: "Room 201, AyurCare Center", status: "Confirmed" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const nearestClinic = JAIPUR_CLINICS[0];

  const bookTherapy = (therapy) => {
    const newAppointment = {
      id: Date.now(),
      title: therapy.title,
      doctor: "Assigned Doctor",
      date: "Pending Schedule",
      time: "--:--",
      room: nearestClinic.name,
      status: "Pending",
    };
    setAppointments([newAppointment, ...appointments]);
    alert(`${therapy.title} booking requested!`);
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(appt => appt.id !== id));
  };

  // Filter therapies based on search
  const filteredTherapies = THERAPIES.filter(therapy => 
    therapy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapy.description.toLowerCase().includes(searchTerm.toLowerCase())          
  );

  return (
    <div className="therapy-container">
      
      {/* 1. HERO BANNER - THE BIG ATTRACTIVE PHOTO HEADER */}
      <div className="hero-banner">
        <div className="hero-content">
          <h2 className="hero-title">Your Healing Journey</h2>
          <p className="hero-subtitle">Discover ancient Ayurvedic treatments tailored to harmonize your doshas and restore mind-body balance.</p>
        </div>
      </div>

      {/* 2. UPCOMING APPOINTMENTS SECTION */}
      <div className="section-container upcoming-section">
        <h3 className="section-heading">Scheduled Healing Sessions</h3>
        {appointments.length === 0 ? (
          <p className="empty-state">You have no upcoming sessions scheduled.</p>
        ) : (
          <div className="appointment-grid">
            {appointments.map(appt => (
              <div key={appt.id} className="appointment-card">
                <div className="card-top-row">
                  <h4 className="card-title">{appt.title}</h4>
                  <span className={`status-badge ${appt.status.toLowerCase()}`}>{appt.status}</span>
                </div>
                <div className="card-details">
                  <p><strong><span role="img" aria-label="doctor">👤</span> Doctor:</strong> {appt.doctor}</p>
                  <p><strong><span role="img" aria-label="when">⏱</span> When:</strong> {appt.date} | {appt.time}</p>
                  <p><strong><span role="img" aria-label="where">📍</span> Location:</strong> {appt.room}</p>
                </div>
                <div className="card-actions">
                  <button className="btn outline" onClick={() => alert("Reschedule feature coming soon!")}>Reschedule</button>
                  <button className="btn danger" onClick={() => cancelAppointment(appt.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. EXPLORE THERAPIES SECTION */}
      <div className="section-container explore-section">
        <div className="explore-header">
          <h3 className="section-heading">Explore Healing Therapies</h3>
          <div className="compact-search">
            <input 
              type="text" 
              placeholder="Search treatments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="therapy-grid">
          {filteredTherapies.length > 0 ? (
            filteredTherapies.map(therapy => (
              <div key={therapy.id} className="therapy-card">
                {/* Therapy Thumbnail */}
                <img src={therapy.image} alt={therapy.title} className="therapy-thumbnail" />
                <div className="card-body">
                  <h4 className="card-title">{therapy.title}</h4>
                  <p className="card-desc">{therapy.description}</p>
                  <div className="card-meta">
                    <span className="card-duration">⏱ Duration: {therapy.duration}</span>
                    {/* Add a placeholder for recommended clinic if you want */}
                    {/* <p className="recommended">Recommended: {nearestClinic.name}</p> */}
                  </div>
                </div>
                <div className="card-actions mt-auto">
                  <button className="btn solid full-width" onClick={() => bookTherapy(therapy)}>Book Now</button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-state">No therapies match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}