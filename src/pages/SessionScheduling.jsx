//pract ki scheduling
import React, { useState } from "react";
import "./Stylesheet/SessionScheduling.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];
const therapies = ["Abhyanga", "Shirodhara", "Pizhichil", "Njavarakizhi", "Kizhi"]; // Panchakarma options

export default function SessionScheduling() {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({ patient: "", therapy: "", day: "", time: "", status: "Confirmed" });

  const handleAddSession = () => {
    setSessions([...sessions, newSession]);
    setShowModal(false);
    setNewSession({ patient: "", therapy: "", day: "", time: "", status: "Confirmed" });
  };

  const handleRemoveSession = index => {
    const updated = [...sessions];
    updated.splice(index, 1);
    setSessions(updated);
  };

  const today = "Monday";
  const todaysSessions = sessions.filter(s => s.day === today);

  const totalSlots = days.length * times.length;
  const usedSlots = sessions.length;
  const availableSlots = totalSlots - usedSlots;

  return (
    <div className="schedule-container">
      {/* Calendar */}
      <div className="calendar">
        <h2>Weekly Schedule</h2>
        <div className="grid">
          <div className="header-cell"></div>
          {days.map(day => <div key={day} className="header-cell">{day}</div>)}
          {times.map(time => <>
            <div className="time-cell">{time}</div>
            {days.map(day => {
              // Grey out Sunday
              if (day === "Sunday") return <div key={day+time} className="slot blocked">🚫</div>;
              const session = sessions.find(s => s.day === day && s.time === time);
              if (session) return (
                <div key={day+time} className="slot session">
                  <b>{session.patient}</b><br/>{session.therapy}<br/>
                  <button className="remove-btn" onClick={() => handleRemoveSession(sessions.indexOf(session))}>✖</button>
                </div>
              );
              return <div key={day+time} className="slot empty" onClick={() => { setNewSession({ ...newSession, day, time }); setShowModal(true); }}>+</div>;
            })}
          </>)}
        </div>
      </div>

      {/* Bottom cards spanning full width */}
      <div className="cards-row">
        {/* Today's Sessions */}
        <div className="card">
          <h2>Today's Sessions ({today})</h2>
          {todaysSessions.length === 0 ? <p>No sessions scheduled</p> :
            todaysSessions.map((s,i) => <div key={i}><b>{s.patient}</b> - {s.therapy} ({s.time})<br/>Status: {s.status}</div>)}
        </div>

        {/* This Week Stats */}
       <div className="card stats">
  <h2>This Week</h2>
  <div className="stat"><span>Total:</span> <span>{sessions.length}</span></div>
  <div className="stat"><span>Confirmed:</span> <span>{sessions.filter(s => s.status==="Confirmed").length}</span></div>
  <div className="stat"><span>Pending:</span> <span>{sessions.filter(s => s.status==="Pending").length}</span></div>
  <div className="stat"><span>Available:</span> <span>{availableSlots}</span></div>
</div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <h2>Add your session</h2>
          <button onClick={() => setShowModal(true)}>+ Schedule Session</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Schedule Session</h2>
            <input type="text" placeholder="Patient Name" value={newSession.patient} onChange={e => setNewSession({ ...newSession, patient: e.target.value })}/>
            <select value={newSession.therapy} onChange={e => setNewSession({ ...newSession, therapy: e.target.value })}>
              <option value="">Select Therapy</option>
              {therapies.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={newSession.day} onChange={e => setNewSession({ ...newSession, day: e.target.value })}>
              <option value="">Select Day</option>{days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={newSession.time} onChange={e => setNewSession({ ...newSession, time: e.target.value })}>
              <option value="">Select Time</option>{times.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={newSession.status} onChange={e => setNewSession({ ...newSession, status: e.target.value })}>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddSession}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
