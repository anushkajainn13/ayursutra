//pract dashboard
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stylesheet/PppractitionerDashboard.css";

function PppractitionerDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    { id: 1, name: "Anil Kapoor", therapy: "Physio Therapy", time: "09:00 AM", duration: "60 min", status: "Upcoming" },
    { id: 2, name: "Sneha Sharma", therapy: "Counseling", time: "10:30 AM", duration: "45 min", status: "In Progress" },
    { id: 3, name: "Ravi Singh", therapy: "Rehab Exercise", time: "01:00 PM", duration: "40 min", status: "Upcoming" },
    { id: 4, name: "Asha Verma", therapy: "Chiropractic", time: "03:30 PM", duration: "50 min", status: "Upcoming" },
  ]);

  // --- MODAL KE LIYE STATE VARIABLES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedAppt, setSelectedAppt] = useState(null);
  
  // --- FORM INPUTS KE LIYE STATE ---
  const [patientName, setPatientName] = useState('');
  const [therapy, setTherapy] = useState('');
  const [time, setTime] = useState('');

  const handleAddAppointment = () => {
    setModalMode('add');
    setPatientName('');
    setTherapy('');
    setTime('');
    setIsModalOpen(true);
  };

  const handleReschedule = (id) => {
    const apptToReschedule = appointments.find(appt => appt.id === id);
    if (apptToReschedule) {
      setModalMode('reschedule');
      setSelectedAppt(apptToReschedule);
      setTime(apptToReschedule.time);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppt(null);
  };
  
  const handleSaveAppointment = () => {
    if (modalMode === 'add') {
      if (!patientName || !therapy || !time) {
        alert('Please fill all the fields.');
        return;
      }
      const newAppointment = {
        id: appointments.length + 1, name: patientName, therapy, time,
        duration: "45 min", status: "Upcoming",
      };
      setAppointments([...appointments, newAppointment]);
    } else { 
      if (!time) {
        alert('Please enter a new time.');
        return;
      }
      setAppointments(prev =>
        prev.map(appt =>
          appt.id === selectedAppt.id ? { ...appt, time: time, status: "Rescheduled" } : appt
        )
      );
    }
    handleModalClose();
  };

  const today = new Date().toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // --- POPUP/MODAL CSS (LABEL COLOR CHANGED) ---
  const modalStyles = `
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.7); display: flex;
      justify-content: center; align-items: center; z-index: 1000;
    }
    .modal-content {
      background: #193438; /* Darker shade of new Emerald Pine */
      color: #E0E0E0; /* Off-white text */
      padding: 25px 30px; border-radius: 12px;
      width: 400px; box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      display: flex; flex-direction: column; gap: 15px;
      border: 1px solid #2C5D63;
    }
    .modal-content h2 {
      color: #97BC62; /* Lime Glow heading */
      margin: 0 0 10px 0; padding-bottom: 10px;
      border-bottom: 1px solid #2C5D63; 
      font-size: 1.5rem;
    }
    .modal-content label {
      font-size: 0.9rem; font-weight: 500;
      color: #E0E0E0; /* Muted color se BRIGHTER WHITE kiya gaya */
    }
    .modal-content input {
      padding: 10px; border-radius: 6px; font-size: 1rem;
      background-color: #2C5D63; /* New Emerald Pine color for input background */
      border: 1px solid #3A7C81; /* Lighter shade for border */
      color: #FFFFFF; 
    }
    .modal-content input:focus {
      outline: none; border-color: #97BC62;
      box-shadow: 0 0 0 3px rgba(151, 188, 98, 0.25);
    }
    .modal-actions {
      display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
    }
    .modal-actions button {
      padding: 10px 20px; border: none; border-radius: 6px;
      font-weight: bold; cursor: pointer; transition: filter 0.2s, background-color 0.2s;
    }
    .btn-save { background-color: #97BC62; color: #193438; }
    .btn-save:hover { filter: brightness(0.9); }
    .btn-cancel { background-color: #2C5D63; color: #E0E0E0; }
    .btn-cancel:hover { background-color: #3A7C81; }
  `;

  return (
    <div className="dashboard">
      <style>{modalStyles}</style>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMode === 'add' ? 'Add New Appointment' : `Reschedule for ${selectedAppt.name}`}</h2>
            
            {modalMode === 'add' && (
              <>
                <label>Patient Name</label>
                <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g., Anil Kapoor" />
                <label>Therapy Type</label>
                <input type="text" value={therapy} onChange={(e) => setTherapy(e.target.value)} placeholder="e.g., Physio Therapy" />
              </>
            )}
            
            <label>{modalMode === 'reschedule' ? 'New Time' : 'Time'}</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 09:30 AM" />

            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleModalClose}>Cancel</button>
              <button className="btn-save" onClick={handleSaveAppointment}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <h2>Welcome, DOCTOR👋</h2>
        <p>Today is {today}</p>

        <div className="stats">
          <div className="stat-box"><p>Today's Appointments</p><h3>{appointments.length}</h3></div>
          <div className="stat-box"><p>Active Patients</p><h3>30</h3></div>
          <div className="stat-box"><p>Completed Today</p><h3>2</h3></div>
          <div className="stat-box"><p>Patient Rating</p><h3>4.9 ⭐</h3></div>
        </div>

        <div className="content-row">
          <div className="schedule">
            <h3>Today's Schedule</h3>
            {appointments.map((appt) => (
              <div key={appt.id} className={`session ${appt.status.toLowerCase()}`}>
                <div><strong>{appt.name}</strong><p>{appt.therapy}</p></div>
                <div>
                  <span>{appt.time}</span><small>{appt.duration}</small>
                  <span className={`status ${appt.status.toLowerCase()}`}>{appt.status}</span>
                  <button className="btn-reschedule" onClick={() => handleReschedule(appt.id)}>Reschedule</button>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar">
            <h3>Appointments</h3>
            <button className="btn-primary" onClick={handleAddAppointment}>+ Add Appointment</button>
            <button className="btn-secondary" onClick={() => { if (appointments.length > 0) { handleReschedule(appointments[0].id); } else { alert("No appointments to reschedule!"); } }}>Reschedule First</button>
            <button className="btn-secondary" onClick={() => navigate("/patients")}>View Patient History</button>
            <h3>Notifications</h3>
            <div className="notification" onClick={() => alert("Opening report...")}>Anil Kapoor reported reduced back pain <small>1 hour ago</small></div>
            <div className="notification" onClick={() => alert("Opening session details...")}>Sneha Sharma’s counseling session extended by 10 minutes <small>20 min ago</small></div>
            <div className="notification" onClick={() => navigate("/patients")}>New patient consultation request from Rajeev Nair <small>30 min ago</small></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PppractitionerDashboard;