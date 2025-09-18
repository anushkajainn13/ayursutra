import React, { useState } from "react";
import "./Stylesheet/therapyscheduling.css";

export default function TherapyScheduling() {
  // State: Appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Abhyanga (Full Body Oil Massage)",
      doctor: "Dr. Priya Sharma",
      date: "Tomorrow",
      time: "10:00 AM – 11:30 AM",
      room: "Room 201, AyurCare Center",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Shirodhara (Oil Pouring Therapy)",
      doctor: "Dr. Rajesh Kumar",
      date: "Oct 20, 2024",
      time: "2:00 PM – 3:00 PM",
      room: "Room 103, AyurCare Center",
      status: "pending",
    },
  ]);

  // Available therapies
  const therapies = [
    {
      id: 101,
      title: "Panchakarma Detox",
      desc: "Complete body detoxification and rejuvenation",
      duration: "5 days program",
    },
    {
      id: 102,
      title: "Swedana (Steam Therapy)",
      desc: "Herbal steam therapy for muscle relaxation",
      duration: "45 minutes",
    },
    {
      id: 103,
      title: "Nasya (Nasal Therapy)",
      desc: "Medicated oil administration through nasal passage",
      duration: "30 minutes",
    },
  ];

  // Cancel appointment
  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  // Book therapy as appointment
  const bookTherapy = (therapy) => {
    const newAppointment = {
      id: Date.now(), // unique id
      title: therapy.title,
      doctor: "Assigned Doctor",
      date: "Soon",
      time: "To be scheduled",
      room: "AyurCare Center",
      status: "pending",
    };
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div className="therapy-container">
      <h2 className="page-title">Therapy Scheduling</h2>
      <p className="page-subtitle">
        Manage your Panchakarma therapy sessions and appointments
      </p>

      <div className="therapy-grid">
        {/* Upcoming Appointments */}
        <div className="appointments-card">
          <h3 className="section-title">Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
            appointments.map((appt) => (
              <React.Fragment key={appt.id}>
                <div className="appointment-item">
                  <h4>{appt.title}</h4>
                  <span className={`status ${appt.status}`}>
                    {appt.status}
                  </span>
                  <p>{appt.doctor}</p>
                  <p>{appt.date}</p>
                  <p>{appt.time}</p>
                  <p>{appt.room}</p>
                  <div className="btn-row">
                    {/* --- YAHAN BADLAV KIYA GAYA HAI --- */}
                    <button
                      className="btn" // Secondary class hata di
                      style={{ // Style seedha yahan laga di hai
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #e2e8f0'
                      }}
                      onClick={() =>
                        alert("Reschedule feature coming soon!")
                      }
                    >
                      Reschedule
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => cancelAppointment(appt.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        {/* Available Therapies */}
        <div className="therapies-card">
          <h3 className="section-title">Available Therapies</h3>
          {therapies.map((therapy) => (
            <div key={therapy.id} className="therapy-item">
              <div>
                <h4>{therapy.title}</h4>
                <p>{therapy.desc}</p>
                <span className="duration">{therapy.duration}</span>
              </div>
              <div className="action">
                <button
                  className="btn primary"
                  onClick={() => bookTherapy(therapy)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}