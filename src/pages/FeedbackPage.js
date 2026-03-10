import React, { useState } from "react";
import "./Stylesheet/FeedbackPage.css";
import { FaChevronDown, FaChevronUp, FaStar, FaRegStar } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

// Mock Data for past sessions (matches your screenshot)
const pastSessions = [
  {
    id: 1,
    therapy: "Abhyanga Massage",
    date: "Feb 28, 2026",
    clinic: "Vedic Wellness Center",
    doctor: "Dr. Ananya Sharma",
  },
  {
    id: 2,
    therapy: "Shirodhara",
    date: "Mar 5, 2026",
    clinic: "Prakruti Ayurveda Clinic",
    doctor: "Dr. Meera Iyer",
  },
  {
    id: 3,
    therapy: "Panchakarma Detox",
    date: "Mar 8, 2026",
    clinic: "AyurVida Spa & Resort",
    doctor: "Dr. Lakshmi Menon",
  },
];

// Interactive Star Rating Component
const CustomStarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => setRating(star)} className="star">
          {star <= rating ? <FaStar className="star-filled" /> : <FaRegStar className="star-outline" />}
        </span>
      ))}
    </div>
  );
};

const FeedbackPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Form State
  const [centerRating, setCenterRating] = useState(0);
  const [centerReview, setCenterReview] = useState("");
  const [practitionerRating, setPractitionerRating] = useState(0);
  const [practitionerReview, setPractitionerReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSession) {
      alert("Please select a session first.");
      return;
    }
    
    // UI Feedback state
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedSession(null);
      setCenterRating(0);
      setCenterReview("");
      setPractitionerRating(0);
      setPractitionerReview("");
    }, 3000);
  };

  return (
    /* ✨ This wrapper fixes the white background issue forever ✨ */
    <div className="feedback-page-wrapper">
      <div className="premium-feedback-container">
        
        {/* Header */}
        <div className="feedback-header">
          <h1>Your Feedback</h1>
          <p>Share your experience to help others on their healing journey</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form-wrapper">
          
          {/* Session Selector */}
          <div className="feedback-card">
            <h2 className="card-title">Select Your Therapy Session</h2>
            
            <div className="custom-dropdown">
              <div 
                className="dropdown-trigger" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedSession ? (
                  <div className="selected-session-text">
                    <strong>{selectedSession.therapy}</strong>
                    <span>{selectedSession.date} · {selectedSession.clinic}</span>
                  </div>
                ) : (
                  <span className="placeholder">Choose a completed therapy...</span>
                )}
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {pastSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="dropdown-item"
                      onClick={() => handleSelectSession(session)}
                    >
                      <h4>{session.therapy}</h4>
                      <p>{session.date} · {session.clinic} · {session.doctor}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Render Reviews only if a session is selected */}
          {selectedSession && (
            <div className="animate-fade-in">
              
              {/* Center Review */}
              <div className="feedback-card">
                <div className="review-card-header">
                  <div>
                    <h2 className="card-title">Center Review</h2>
                    <p className="card-subtitle">{selectedSession.clinic}</p>
                  </div>
                  <CustomStarRating rating={centerRating} setRating={setCenterRating} />
                </div>
                <textarea 
                  className="premium-textarea"
                  placeholder="How was the ambiance, cleanliness, and overall experience at the center?"
                  value={centerReview}
                  onChange={(e) => setCenterReview(e.target.value)}
                />
              </div>

              {/* Practitioner Review */}
              <div className="feedback-card">
                <div className="review-card-header">
                  <div>
                    <h2 className="card-title">Practitioner Review</h2>
                    <p className="card-subtitle">{selectedSession.doctor}</p>
                  </div>
                  <CustomStarRating rating={practitionerRating} setRating={setPractitionerRating} />
                </div>
                <textarea 
                  className="premium-textarea"
                  placeholder="How was your practitioner's expertise, communication, and care?"
                  value={practitionerReview}
                  onChange={(e) => setPractitionerReview(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-feedback-btn">
                {isSubmitted ? "Feedback Submitted!" : <><IoPaperPlaneOutline className="send-icon" /> Submit Feedback</>}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;