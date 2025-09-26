
import React from 'react';
// Assuming the CSS is imported in App.js or similar
// import './PppractionerDashboard.css'; 

const PractitionerDashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, DOCTOR 👋</h1>
                <p>Saturday, September 27, 2025</p>
            </header>

            {/* Dashboard Stats Section */}
            <section className="dashboard-stats">
                <div className="stat-card">
                    <p className="stat-label">Today's Appointments</p>
                    <p className="stat-value">12 📅</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Active Patients</p>
                    <p className="stat-value">248</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Completed Today</p>
                    <p className="stat-value">8 ✅</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Patient Rating</p>
                    <p className="stat-value">4.9 ⭐</p>
                </div>
            </section>

            {/* Main Content: Schedule & Requests */}
            <main className="dashboard-content">
                
                {/* Today's Schedule Panel */}
                <div className="panel schedule-panel">
                    <h2>Today's Schedule</h2>
                    <ul>
                        <li className="schedule-item">
                            <span className="dot"></span>
                            <div className="details">
                                <p className="name">Sarah Johnson</p>
                                <p className="type">Consultation</p>
                            </div>
                            <span className="time">09:00 AM</span>
                            <span className="status confirmed">confirmed</span>
                        </li>
                        <li className="schedule-item">
                            <span className="dot"></span>
                            <div className="details">
                                <p className="name">Michael Chen</p>
                                <p className="type">Follow-up</p>
                            </div>
                            <span className="time">10:30 AM</span>
                            <span className="status confirmed">confirmed</span>
                        </li>
                        <li className="schedule-item">
                            <span className="dot"></span>
                            <div className="details">
                                <p className="name">Emma Wilson</p>
                                <p className="type">Initial Assessment</p>
                            </div>
                            <span className="time">11:45 AM</span>
                            <span className="status pending">pending</span>
                        </li>
                        <li className="schedule-item">
                            <span className="dot"></span>
                            <div className="details">
                                <p className="name">David Kumar</p>
                                <p className="type">Consultation</p>
                            </div>
                            <span className="time">02:00 PM</span>
                            <span className="status confirmed">confirmed</span>
                        </li>
                        <li className="schedule-item">
                            <span className="dot"></span>
                            <div className="details">
                                <p className="name">Lisa Anderson</p>
                                <p className="type">Therapy Review</p>
                            </div>
                            <span className="time">03:30 PM</span>
                            <span className="status confirmed">confirmed</span>
                        </li>
                    </ul>
                </div>

                {/* Incoming Consultation Requests Panel */}
                <div className="panel requests-panel">
                    <h2>Incoming Consultation Requests</h2>
                    
                    {/* Priya Sharma Request */}
                    <div className="request-card">
                        <div className="request-header">
                            <p className="patient-name">Priya Sharma</p>
                            <span className="payment confirmed-payment">✅ Payment Confirmed</span>
                        </div>
                        <p className="complaint">Experiencing chronic fatigue and digestive issues for the past 2 weeks</p>
                        <p className="preferred-time">Preferred Time: <strong>4:00 PM Today</strong></p>
                        <div className="request-actions">
                            <button className="btn btn-accept">Accept</button>
                            <button className="btn btn-decline">Decline</button>
                        </div>
                    </div>

                    {/* Raj Patel Request */}
                    <div className="request-card">
                        <div className="request-header">
                            <p className="patient-name">Raj Patel</p>
                            <span className="payment confirmed-payment">✅ Payment Confirmed</span>
                        </div>
                        <p className="complaint">Joint pain and stiffness, especially in the morning</p>
                        <p className="preferred-time">Preferred Time: <strong>5:30 PM Today</strong></p>
                        <div className="request-actions">
                            <button className="btn btn-scheduled">🗓️ Scheduled</button>
                            <button className="btn btn-join">🔗 Join Meet</button>
                        </div>
                    </div>

                    {/* Anita Desai Request is removed as requested */}

                </div>
            </main>
        </div>
    );
};

export default PractitionerDashboard;