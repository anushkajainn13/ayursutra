import React, { useState, useEffect } from "react";
import "./Stylesheet/Dashboard.css";
import { FaHeartbeat, FaUserMd, FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// --- Mock Data ---
const clinicsData = [
  { id: 1, name: 'Jiva Ayurveda', location: 'Jaipur', rating: 4.8, primaryDoctor: 'Dr. Rajesh Kumar', specialty: 'Panchakarma', price: 800 },
  { id: 2, name: 'Patanjali Wellness', location: 'Jaipur', rating: 4.6, primaryDoctor: 'Dr. Priya Mehta', specialty: 'Women\'s Health', price: 600 },
  { id: 3, name: 'Jaipur Ayurveda', location: 'Jaipur', rating: 4.7, primaryDoctor: 'Dr. Sanjay Gupta', specialty: 'General Wellness', price: 700 },
  { id: 4, name: 'Arya Vaidya Sala', location: 'Delhi', rating: 4.9, primaryDoctor: 'Dr. Suresh Nair', specialty: 'Arthritis', price: 1200 },
  { id: 5, name: 'Delhi Ayurvedic', location: 'Delhi', rating: 4.5, primaryDoctor: 'Dr. Anika Sharma', specialty: 'Skin & Hair', price: 900 },
  { id: 6, name: 'Vaidya Healthcare', location: 'Mumbai', rating: 4.8, primaryDoctor: 'Dr. Rohan Joshi', specialty: 'Stress Management', price: 1000 },
];

const doctorsData = [
  { id: 101, clinicId: 1, name: 'Dr. Rajesh Kumar', photo: 'https://www.jiva.com/wp-content/uploads/2021/04/dr-partap-chauhan-1.jpg', specialty: 'Panchakarma & Detoxification', rating: 4.9, reviewsCount: 182, testimonials: [{ patient: 'Sunita S.', quote: '"Dr. Kumar\'s treatment gave me immense relief from my chronic pain."' }, { patient: 'Manish G.', quote: '"The panchakarma therapy was excellent."' }] },
  { id: 102, clinicId: 1, name: 'Dr. Meena Singh', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-LAO8a8a9m1F-Bsf-i621aR0x3Co50L4sAw&s', specialty: 'Ayurvedic Nutrition', rating: 4.7, reviewsCount: 112, testimonials: [{ patient: 'Ravi P.', quote: '"Perfect diet plan!"' }] },
  { id: 201, clinicId: 2, name: 'Dr. Priya Mehta', photo: 'https://www.pristyncare.com/blog/wp-content/uploads/2021/07/How-to-Become-a-Gynecologist.jpg', specialty: 'Women\'s Health', rating: 4.8, reviewsCount: 230, testimonials: [{ patient: 'Anjali K.', quote: '"Very understanding."' }] },
  { id: 301, clinicId: 3, name: 'Dr. Sanjay Gupta', photo: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg', specialty: 'General Wellness', rating: 4.7, reviewsCount: 150, testimonials: [] },
  { id: 302, clinicId: 3, name: 'Dr. Swati Agarwal', photo: 'https://link.to.a.broken/image.jpg', specialty: 'Digestive Health', rating: 4.8, reviewsCount: 98, testimonials: [] },
];

// --- Helper Components ---
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<FaStar key={i} color={i <= rating ? '#f5b942' : '#e4e5e9'} />);
  }
  return <div className="stars">{stars}</div>;
};

const DoctorAvatar = ({ photo, name }) => {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => {
    const nameParts = name.replace("Dr. ", "").split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  };

  if (imgError || !photo) {
    return (
      <div className="doctor-photo-container">
        <div className="doctor-initials-avatar">
          <span>{getInitials(name)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-photo-container">
      <img 
        src={photo} 
        alt={name} 
        className="doctor-photo" 
        onError={() => setImgError(true)} 
      />
    </div>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);
  const [location, setLocation] = useState('');
  const [nearbyClinics, setNearbyClinics] = useState([]);
  const [viewMode, setViewMode] = useState('clinics');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if they have fully unlocked the dashboard stats
    const hasCompletedConsultation = localStorage.getItem("hasConsulted");
    setIsFirstLogin(!hasCompletedConsultation);

    // 2. Check if they have already taken the Prakriti Quiz
    const userPrakriti = localStorage.getItem("userPrakriti");
    setHasTakenQuiz(!!userPrakriti);

    // 3. Load user location
    const userLocation = localStorage.getItem('userLocation') || 'Jaipur';
    setLocation(userLocation);
    const filteredClinics = clinicsData.filter(c => c.location === userLocation);
    setNearbyClinics(filteredClinics);
  }, []);

  // --- THE FIXED ROUTING LOGIC ---
  const handleConsultationClick = () => {
    const userPrakriti = localStorage.getItem("userPrakriti");
    
    if (userPrakriti) {
      // If they already took the quiz, skip it and go straight to the Chatbot/Recommendations
      navigate("/patient/recommendations");
    } else {
      // First time user goes to the quiz
      navigate("/patient/consultation");
    }
  };

  const handleRetakeQuiz = () => {
    // Clear their old Prakriti data and send them to the quiz
    localStorage.removeItem("userPrakriti");
    navigate("/patient/consultation");
  };

  const handleViewClinicDetails = (clinic) => {
    setSelectedClinic(clinic);
    const doctors = doctorsData.filter(d => d.clinicId === clinic.id);
    setAvailableDoctors(doctors);
    setViewMode('doctors');
  };

  const handleBackToClinics = () => {
    setViewMode('clinics');
    setSelectedClinic(null);
  };

  const handleResetJourney = () => {
    localStorage.removeItem("hasConsulted");
    localStorage.removeItem("userPrakriti");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="healing-hero">
        <div className="healing-overlay">
          {!hasTakenQuiz ? (
            <>
              <h2>Welcome to AyurSutra 🌿</h2>
              <p>Your journey to holistic health starts here. Let our AI analyze your Prakriti to suggest the best path.</p>
              <button className="healing-btn" onClick={handleConsultationClick}>
                Start AI Consultation
              </button>
            </>
          ) : (
            <>
              <h2>Welcome Back, {localStorage.getItem("userPrakriti")?.toUpperCase()} Type</h2>
              <p>Continue your healing journey and chat with your AI guide.</p>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
                <button className="healing-btn" onClick={handleConsultationClick}>
                  Open AI Chatbot
                </button>
                
                <button 
                  onClick={handleRetakeQuiz}
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(255,255,255,0.6)',
                    color: 'white',
                    padding: '12px 25px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  Retake Quiz
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Conditional Stats or Onboarding Steps */}
      {!isFirstLogin ? (
        <section className="stats animate-fade">
          <div className="stat-card">
            <FaHeartbeat className="icon" />
            <div><h3>3</h3><p>Active Treatments</p></div>
          </div>
          <div className="stat-card">
            <IoCalendarOutline className="icon" />
            <div><h3>Tomorrow</h3><p>Abhyanga therapy</p></div>
          </div>
          <div className="stat-card">
            <AiOutlineBarChart className="icon" />
            <div><h3>85%</h3><p>Wellness Score</p></div>
          </div>
          <div className="stat-card">
            <FaUserMd className="icon" />
            <div><h3>12</h3><p>Completed Sessions</p></div>
          </div>
        </section>
      ) : (
        <section className="first-step-guide animate-fade">
          <div className="guide-card">
            <h3>Your Healing Path Starts Here 🌿</h3>
            <p>Complete these steps to unlock your personalized Wellness Dashboard and track your progress.</p>
            <div className="journey-steps">
              <div className={`step ${hasTakenQuiz ? 'completed' : ''}`}>
                <div className="step-number">{hasTakenQuiz ? '✓' : '1'}</div>
                <span>Prakriti Analysis</span>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <span>AI Recommendations</span>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <span>Unlock Dashboard</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Clinics/Doctors Section */}
      <section className="clinics-section">
        {viewMode === 'clinics' ? (
          <>
            <h2>Ayurveda Clinics near {location || 'your area'}</h2>
            <p className="section-subtitle">Trusted Ayurvedic experts curated for your healing journey.</p>
            <div className="clinics-grid">
              {nearbyClinics.map(clinic => (
                <div key={clinic.id} className="clinic-card">
                  <div className="clinic-header">
                    <h3>{clinic.name}</h3>
                    <div className="clinic-logo">{clinic.name.charAt(0)}</div>
                  </div>
                  <div className="clinic-details">
                    <p>Feat. {clinic.primaryDoctor} - {clinic.specialty}</p>
                    <p><strong>~ ₹{clinic.price}</strong> / consultation</p>
                  </div>
                  <div className="clinic-rating">
                    <StarRating rating={clinic.rating} /> <strong>{clinic.rating}</strong>
                  </div>
                  <button onClick={() => handleViewClinicDetails(clinic)}>View Practitioners</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={handleBackToClinics} className="back-button">
              <BsArrowLeftShort /> Back to All Clinics
            </button>
            <h2>Practitioners at {selectedClinic?.name}</h2>
            <div className="doctors-grid">
              {availableDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <DoctorAvatar photo={doctor.photo} name={doctor.name} />
                  <div className="doctor-details">
                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <div className="doctor-rating">
                      <StarRating rating={doctor.rating} />
                      <span className="reviews-count">({doctor.reviewsCount} reviews)</span>
                    </div>
                    <div className="feedback-section">
                      {doctor.testimonials && doctor.testimonials.length > 0 ? (
                        doctor.testimonials.map((t, i) => (
                          <div key={i} className="feedback-quote">
                            <p>"{t.quote}"</p>
                            <span>- {t.patient}</span>
                          </div>
                        ))
                      ) : (
                        <p>No feedback available yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Optional Reset Button for Testing */}
      <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
        <button 
          onClick={handleResetJourney} 
          style={{ background: 'transparent', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', color: '#666' }}>
          Reset Journey (Test Mode)
        </button>
      </div>

    </div>
  );
};

export default Dashboard;