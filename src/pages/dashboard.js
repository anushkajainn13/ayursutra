import React, { useState, useEffect } from "react";
import "./Stylesheet/Dashboard.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

// --- Mock Data ---
const clinicsData = [
  { 
    id: 1, name: 'Vedic Wellness Center', location: 'Jaipur', distance: '1.2 km',
    rating: 4.8, reviews: 124, address: '42 Lotus Lane, Koramangala', time: '8:00 AM - 8:00 PM',
    tags: ['Panchakarma', 'Abhyanga', 'Shirodhara'], practitioners: ['Dr. Ananya Sharma', 'Dr. Vikram Patel'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600',
    primaryDoctor: 'Dr. Ananya Sharma', specialty: 'Panchakarma'
  },
  { 
    id: 2, name: 'Prakruti Ayurveda Clinic', location: 'Jaipur', distance: '2.8 km',
    rating: 4.6, reviews: 89, address: '15 Heritage Road, Indiranagar', time: '9:00 AM - 7:00 PM',
    tags: ['Nasya', 'Herbal Therapy', 'Diet Consultation'], practitioners: ['Dr. Meera Iyer', 'Dr. Rajan Nair'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=600',
    primaryDoctor: 'Dr. Meera Iyer', specialty: 'Herbal Therapy'
  },
  { 
    id: 3, name: 'AyurVida Spa & Resort', location: 'Jaipur', distance: '5.4 km',
    rating: 4.9, reviews: 203, address: '8 Serenity Blvd, Whitefield', time: '7:00 AM - 9:00 PM',
    tags: ['Full Detox', 'Yoga Therapy', 'Rejuvenation'], practitioners: ['Dr. Lakshmi Menon', 'Dr. Arjun Kapoor'],
    image: 'https://images.unsplash.com/photo-1620608554763-8a3597d3a042?q=80&w=600',
    primaryDoctor: 'Dr. Lakshmi Menon', specialty: 'Rejuvenation'
  }
];

const upcomingSessions = [
  { id: 1, therapy: "Abhyanga Massage", date: "Mar 15, 2026 · 10:00 AM", status: "Confirmed" },
  { id: 2, therapy: "Shirodhara", date: "Mar 18, 2026 · 2:00 PM", status: "Pending" },
  { id: 3, therapy: "Panchakarma Detox", date: "Mar 22, 2026 · 9:00 AM", status: "Confirmed" },
];

const doctorsData = [
  { id: 101, clinicId: 1, name: 'Dr. Ananya Sharma', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150', specialty: 'Panchakarma & Detoxification', rating: 4.9, reviewsCount: 182, testimonials: [{ patient: 'Sunita S.', quote: '"Immense relief from chronic pain."' }] },
  { id: 102, clinicId: 1, name: 'Dr. Vikram Patel', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150', specialty: 'Ayurvedic Nutrition', rating: 4.7, reviewsCount: 112, testimonials: [{ patient: 'Ravi P.', quote: '"Perfect diet plan!"' }] }
];

// --- Helper Components ---
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<FaStar key={i} color={i <= rating ? '#e2ba5a' : 'rgba(255,255,255,0.2)'} />);
  }
  return <div className="stars" style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [nearbyClinics, setNearbyClinics] = useState([]);
  const [viewMode, setViewMode] = useState('clinics');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userLocation = localStorage.getItem('userLocation') || 'Jaipur';
    setLocation(userLocation);
    
    // Filter clinics (case-insensitive)
    const filteredClinics = clinicsData.filter(
      c => c.location.toLowerCase() === userLocation.toLowerCase()
    );

    // FIX: Agar location ke hisaab se koi clinic nahi mila, toh saare dikha do
    if (filteredClinics.length > 0) {
      setNearbyClinics(filteredClinics);
    } else {
      setNearbyClinics(clinicsData); 
    }
  }, []);

  const handleConsultationClick = () => {
    // 🚀 DIRECT CHATBOT ROUTING (No Quiz)
    navigate("/patient/recommendations");
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

  return (
    <div className="dashboard">
      
      {/* Floating Action Button */}
      <button className="floating-fab" onClick={() => setIsModalOpen(true)}>
        📅 My Sessions
      </button>

      {/* The Sessions Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
              <IoClose />
            </button>

            <div className="modal-header">
              <h2>Scheduled Healing Sessions</h2>
              <p>Your upcoming appointments</p>
            </div>

            <div className="sessions-list">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="session-item">
                  <div className="session-info">
                    <h4>{session.therapy}</h4>
                    <p>{session.date}</p>
                  </div>
                  
                  <div className={`status-badge ${session.status.toLowerCase()}`}>
                    {session.status === "Confirmed" && <FaRegCheckCircle className="badge-icon" />}
                    {session.status}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="healing-hero">
        <div className="healing-overlay">
          <div className="hero-pill">✦ ANCIENT WISDOM, MODERN HEALING ✦</div>
          <h2>Your Healing Journey</h2>
          <p>Discover personalized Ayurvedic therapies rooted in 5,000 years of tradition, crafted for your unique constitution.</p>
          
          {/* ✨ DIRECT AI BOT BUTTON */}
          <button className="prakriti-btn" onClick={handleConsultationClick} style={{ marginTop: '20px' }}>
            ✨ Start AI Consultation
          </button>
        </div>
      </section>

      {/* Clinics & Doctors Section */}
      <section className="clinics-section">
        {viewMode === 'clinics' ? (
          <>
            <div className="section-header-centered">
              <span className="near-you-text">NEAR YOU</span>
              <h2>Ayurveda Clinics in {location}</h2>
              <p className="section-subtitle">Discover trusted Ayurvedic practitioners and wellness centers</p>
            </div>

            <div className="clinics-grid">
              {nearbyClinics.map(clinic => (
                <div key={clinic.id} className="clinic-card-new">
                  <div className="clinic-image-container">
                    <img src={clinic.image} alt={clinic.name} />
                    <span className="distance-badge">📍 {clinic.distance}</span>
                  </div>

                  <div className="clinic-content">
                    <div className="clinic-title-row">
                      <h3>{clinic.name}</h3>
                      <span className="clinic-rating">
                        <span className="gold-star">★</span> {clinic.rating} <span className="reviews-count">({clinic.reviews})</span>
                      </span>
                    </div>

                    <div className="clinic-info-rows">
                      <p>📍 {clinic.address}</p>
                      <p>🕒 {clinic.time}</p>
                    </div>

                    <div className="clinic-tags">
                      {clinic.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="practitioners-list">
                      <p className="list-title">Practitioners</p>
                      {clinic.practitioners.map((doc, i) => (
                        <strong key={i} className="doc-name">{doc}</strong>
                      ))}
                    </div>

                    <button className="view-clinic-btn" onClick={() => handleViewClinicDetails(clinic)}>
                      View Clinic →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="doctors-view">
            <button onClick={handleBackToClinics} className="back-button">
              <BsArrowLeftShort /> Back to All Clinics
            </button>
            <h2 style={{fontFamily: 'Playfair Display', color: 'var(--gold)', marginBottom: '30px'}}>
              Practitioners at {selectedClinic?.name}
            </h2>
            
            <div className="doctors-grid">
              {availableDoctors.length > 0 ? availableDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <img src={doctor.photo} alt={doctor.name} className="doctor-photo-new" />
                  <div className="doctor-details">
                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <div className="doctor-rating">
                      <StarRating rating={doctor.rating} />
                      <span className="reviews-count">({doctor.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
              )) : <p>No doctors listed for this clinic yet.</p>}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;