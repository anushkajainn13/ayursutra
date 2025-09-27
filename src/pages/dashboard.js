import React from "react";
import { useNavigate } from 'react-router-dom'; 
import "./Stylesheet/Dashboard.css";
import { FaHeartbeat, FaUserMd } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <section className="welcome">
        <h2>Welcome back to your healing journey</h2>
        <p>Continue your path to wellness with personalized Ayurvedic care</p>
      </section>
      <section className="stats">
        <div className="stat-card">
          <FaHeartbeat className="icon" />
          <div>
            <h3>3</h3>
            <p>Active Treatments</p>
          </div>
        </div>
        <div className="stat-card">
          <IoCalendarOutline className="icon" />
          <div>
            <h3>Tomorrow</h3>
            <p>Abhyanga therapy at 10:00 AM</p>
          </div>
        </div>
        <div className="stat-card">
          <AiOutlineBarChart className="icon" />
          <div>
            <h3>85%</h3>
            <p>Wellness Score</p>
          </div>
        </div>
        <div className="stat-card">
          <FaUserMd className="icon" />
          <div>
            <h3>12</h3>
            <p>Completed Sessions</p>
          </div>
        </div>
      </section>

      <div className="main-grid">
        <section className="activities">
          <h3>Recent Activities</h3>
          <div className="timeline">
            <div className="activity">
              <div className="dot"><FaUserMd /></div>
              <div className="details">
                <h4>Panchakarma Assessment</h4>
                <p>Consultation with Dr. Sharma completed</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="activity">
              <div className="dot"><FaHeartbeat /></div>
              <div className="details">
                <h4>Shirodhara Therapy</h4>
                <p>Session completed successfully</p>
                <span>1 day ago</span>
              </div>
            </div>
            <div className="activity">
              <div className="dot"><IoCalendarOutline /></div>
              <div className="details">
                <h4>Follow-up Scheduled</h4>
                <p>Next appointment booked for tomorrow</p>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </section>
        <section className="quick-actions">
          <h3>Shortcuts</h3>
          <button className="primary" onClick={() => navigate('/patient/scheduling')}>
            Schedule New Therapy <BsArrowRightShort />
          </button>
          <button onClick={() => alert('Feature coming soon!')}>Consult Practitioner</button>
          <button onClick={() => alert('Feature coming soon!')}>Update Health Status</button>
          <button onClick={() => navigate('/patient/feedback')}>View Progress Report</button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;