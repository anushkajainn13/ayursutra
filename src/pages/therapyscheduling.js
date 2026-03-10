import React, { useState } from "react";
import "./Stylesheet/therapyscheduling.css";
import { FiSearch, FiChevronLeft } from "react-icons/fi";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { PiGraduationCap } from "react-icons/pi";

// --- Exact Mock Data from Screenshots ---
const mockClinics = [
  { id: 1, name: "Vedic Wellness Center", location: "Mumbai, Maharashtra", desc: "A traditional Ayurvedic center offering authentic Panchakarma and rejuvenation therapies." },
  { id: 2, name: "Prakruti Ayurveda Clinic", location: "Bangalore, Karnataka", desc: "Holistic healing combining ancient wisdom with modern diagnostic techniques." }
];

const mockTherapies = [
  { id: 1, name: "Abhyanga Massage", duration: "60 min", price: "₹2,500", desc: "Full-body warm oil massage to balance doshas and promote deep relaxation." },
  { id: 2, name: "Shirodhara", duration: "45 min", price: "₹3,200", desc: "Continuous stream of warm herbal oil on the forehead for mental clarity." },
  { id: 3, name: "Panchakarma Detox", duration: "90 min", price: "₹5,800", desc: "Five-action detox program for deep purification and rejuvenation." }
];

const mockDoctors = [
  { id: 1, name: "Dr. Ananya Sharma", degrees: "BAMS, MD Ayurveda", specialty: "Stress management and women's health" },
  { id: 2, name: "Dr. Vikram Desai", degrees: "BAMS, Panchakarma Specialist", specialty: "Detoxification and chronic conditions" }
];

export default function TherapyScheduling() {
  // --- Flow State Management ---
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selections
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", time: "", notes: ""
  });

  // --- Handlers ---
  const handleNext = (type, data) => {
    if (type === 'clinic') { setSelectedClinic(data); setStep(2); }
    if (type === 'therapy') { setSelectedTherapy(data); setStep(3); }
    if (type === 'doctor') { setSelectedDoctor(data); setStep(4); }
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setStep(5); // Go to Success Screen
  };

  // --- Render Steps ---
  return (
    <div className="scheduling-page-wrapper">
      <div className="scheduling-container animate-fade-in">
        
        {/* Universal Header (Hides on Step 5 Success) */}
        {step < 5 && (
          <div className="scheduling-header">
            <span className="schedule-pill">SCHEDULE</span>
            <h2>Book Your Healing Session</h2>
            <p>Find the right therapy, practitioner, and time for your wellness journey</p>
          </div>
        )}

        {/* STEP 1: Choose Clinic */}
        {step === 1 && (
          <div className="step-content">
            <div className="step-title-area">
              <h3>Choose Your Clinic</h3>
              <p>Select a wellness center to begin your healing journey</p>
            </div>
            
            <div className="search-bar-wrapper">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search clinics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="cards-list">
              {mockClinics.map(clinic => (
                <div key={clinic.id} className="selection-card" onClick={() => handleNext('clinic', clinic)}>
                  <h4>{clinic.name}</h4>
                  <p className="card-location"><FaMapMarkerAlt /> {clinic.location}</p>
                  <p className="card-desc">{clinic.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Choose Therapy */}
        {step === 2 && (
          <div className="step-content animate-slide-up">
            <button className="breadcrumb-btn" onClick={() => setStep(1)}>
              <FiChevronLeft /> {selectedClinic.name}
            </button>
            
            <div className="step-title-area">
              <h3>Select Your Therapy</h3>
              <p>Therapies available at {selectedClinic.name}</p>
            </div>

            <div className="cards-list">
              {mockTherapies.map(therapy => (
                <div key={therapy.id} className="selection-card" onClick={() => handleNext('therapy', therapy)}>
                  <div className="card-header-row">
                    <h4>{therapy.name}</h4>
                    <span className="duration"><FaRegClock /> {therapy.duration}</span>
                  </div>
                  <p className="card-desc">{therapy.desc}</p>
                  <p className="price">{therapy.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Choose Practitioner */}
        {step === 3 && (
          <div className="step-content animate-slide-up">
            <button className="breadcrumb-btn" onClick={() => setStep(2)}>
              <FiChevronLeft /> {selectedClinic.name} <span className="dot">·</span> {selectedTherapy.name}
            </button>
            
            <div className="step-title-area">
              <h3>Choose Your Practitioner</h3>
              <p>Practitioners for {selectedTherapy.name}</p>
            </div>

            <div className="cards-list">
              {mockDoctors.map(doc => (
                <div key={doc.id} className="selection-card" onClick={() => handleNext('doctor', doc)}>
                  <h4>{doc.name}</h4>
                  <p className="card-location gold-text"><PiGraduationCap /> {doc.degrees}</p>
                  <p className="card-desc">{doc.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Form Details */}
        {step === 4 && (
          <div className="step-content animate-slide-up">
            <button className="breadcrumb-btn" onClick={() => setStep(3)}>
              <FiChevronLeft /> {selectedClinic.name} <span className="dot">·</span> {selectedTherapy.name} <span className="dot">·</span> {selectedDoctor.name}
            </button>
            
            <div className="step-title-area">
              <h3>Your Details</h3>
              <p>Complete your booking for {selectedTherapy.name} with {selectedDoctor.name}</p>
            </div>

            {/* Summary Card */}
            <div className="summary-card">
              <div>
                <span className="summary-label">Clinic</span>
                <strong>{selectedClinic.name}</strong>
              </div>
              <div>
                <span className="summary-label">Therapy</span>
                <strong>{selectedTherapy.name}</strong>
              </div>
              <div>
                <span className="summary-label">Price</span>
                <strong className="gold-text">{selectedTherapy.price}</strong>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={submitBooking} className="booking-form">
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" placeholder="Enter your full name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input required type="email" placeholder="your@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input required type="tel" placeholder="+91 98765 43210" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Preferred Time</label>
                <input required type="text" placeholder="e.g. Weekday mornings, Tuesday 10 AM" onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Additional Notes <span className="optional">(optional)</span></label>
                <textarea placeholder="Any specific concerns..." rows="3" onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>

              <button type="submit" className="submit-booking-btn">Confirm Booking</button>
            </form>
          </div>
        )}

        {/* STEP 5: Success Screen */}
        {step === 5 && (
          <div className="success-screen animate-fade-in">
            <h2>Your appointment request has<br/>been sent. The practitioner will<br/>confirm your schedule soon.</h2>
            <div className="gold-line"></div>
            <button className="return-btn" onClick={() => setStep(1)}>Return to Home</button>
          </div>
        )}

      </div>
    </div>
  );
}