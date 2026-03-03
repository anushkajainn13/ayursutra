import React, { useState } from 'react';
// Make sure this CSS file is in the same folder or the path is correct
import './Stylesheet/RecommendationPage.css'; 

// --- Therapy Detail Modal Component ---
const TherapyDetailModal = ({ therapy, onClose }) => {
    const images = {
        "Panchakarma Detox": "https://vediherbals.com/cdn/shop/articles/Ayurvedic_Panchakarma_Therapy_The_Ultimate_Detox_Solution_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_fda0ddc7-2dfd-4b3d-9c84-de22f4935e31.jpg?v=1736933715",
        "Abhyanga Massage": "https://i.imgur.com/xH5V6aT.jpeg",
        "Shirodhara": "https://i.imgur.com/gK9pI0i.jpeg",
        "Vasti Karma": "https://i.imgur.com/vH5tXmJ.jpeg",
        "Virechana": "https://i.imgur.com/L7r0Yg3.jpeg",
        "Swedana": "https://i.imgur.com/qR8v2k2.jpeg",
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content therapy-detail-modal" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>×</span>
                <img src={images[therapy.name] || 'https://i.imgur.com/default.jpeg'} alt={therapy.name} className="therapy-main-image" />
                <h2 className="therapy-detail-title">{therapy.name}</h2>
                <div className="therapy-key-details">
                    <span><strong>Duration:</strong> {therapy.duration}</span>
                    <span><strong>Focus:</strong> {therapy.tags.join(', ')}</span>
                </div>
                <p className="therapy-description-text">
                    {therapy.details}. This is a comprehensive Ayurvedic treatment designed to flush out toxins, promoting revitalization and well-being. It is highly effective for managing {therapy.tags[0]} and {therapy.tags[1]}.
                </p>
                {/* ✅ FIXED CLASSNAME */}
                <button className="btn-primary" style={{width: '100%'}} onClick={onClose}>Schedule this Therapy</button>
            </div>
        </div>
    );
};

// --- Doctor Consultation Modal Component ---
const DoctorConsultationModal = ({ onClose }) => {
    const doctors = [
        { name: "Dr. Priya Sharma", spec: "Ayurveda Specialist", exp: "12 yrs", fee: "₹500", status: "Available Now", avatar: "https://i.imgur.com/doc-avatar-1.jpeg" },
        { name: "Dr. Rajesh Kumar", spec: "Panchakarma Expert", exp: "8 yrs", fee: "₹450", status: "Busy", avatar: "https://i.imgur.com/doc-avatar-2.jpeg" },
        { name: "Dr. Sunita Rao", spec: "Stress Management", exp: "15 yrs", fee: "₹600", status: "Available Now", avatar: "https://i.imgur.com/doc-avatar-3.jpeg" },
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>×</span>
                {/* ✅ FIXED CLASSNAME */}
                <h3 className="section-title">Consultation with Experts</h3>
                <p>Book an instant slot with one of our specialized Ayurvedic practitioners.</p>
                <div className="doctor-list">
                    {doctors.map((doc, index) => (
                        <div key={index} className="doctor-card">
                            <img src={doc.avatar} alt={doc.name} className="doctor-avatar" />
                            <div className="doctor-info">
                                <h4>{doc.name}</h4>
                                <p className="doc-spec">{doc.spec} • {doc.exp}</p>
                            </div>
                            <div className="doc-actions">
                                <span className={`doc-status ${doc.status.includes('Available') ? 'available' : 'busy'}`}>{doc.status}</span>
                                <p className="doc-fee">{doc.fee}</p>
                                {/* ✅ FIXED CLASSNAME */}
                                <button className="btn-primary consult-btn">Book Slot</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Main Page Component ---
const RecommendationPage = () => {
    const commonSymptoms = [ "Digestive Issues", "Stress & Anxiety", "Joint Pain", "Insomnia", "Skin problems", "Fatigue", "Weight management", "Headaches" ];
    const allTherapies = [
        { name: "Panchakarma Detox", details: "Complete body purification", duration: "21 days", tags: ["Digestive Issues", "Skin problems", "Fatigue", "Weight management"] },
        { name: "Abhyanga Massage", details: "Full body oil massage therapy", duration: "60 min", tags: ["Stress & Anxiety", "Fatigue", "Joint Pain", "Headaches"] },
        { name: "Shirodhara", details: "Medicated oil pouring for mental peace", duration: "45 min", tags: ["Stress & Anxiety", "Insomnia", "Headaches"] },
        { name: "Vasti Karma", details: "Herbal enema for Vata regulation", duration: "8 days", tags: ["Digestive Issues", "Joint Pain", "Fatigue"] },
        { name: "Swedana", details: "Herbal steam for detoxification", duration: "30 min", tags: ["Fatigue", "Joint Pain"] },
        { name: "Virechana", details: "Purification therapy for Pitta", duration: "1 day", tags: ["Skin problems", "Digestive Issues"] },
    ];

    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showDoctorConsultation, setShowDoctorConsultation] = useState(false);
    const [selectedTherapy, setSelectedTherapy] = useState(null);

    const handleSymptomClick = (symptom) => {
        setSelectedSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
        setShowRecommendations(false);
    };

    const handleGetRecommendations = () => {
        if (selectedSymptoms.length > 0 || additionalDetails.trim() !== '') {
            setShowRecommendations(true);
        } else {
            alert("Please select at least one symptom or describe your health concerns.");
        }
    };

    const getRecommendedTherapies = () => {
        if (!showRecommendations) return [];
        if (selectedSymptoms.length === 0) return allTherapies.slice(0, 3);
        const recommendations = new Set();
        allTherapies.forEach(therapy => {
            if (therapy.tags.some(tag => selectedSymptoms.includes(tag))) {
                recommendations.add(therapy);
            }
        });
        return Array.from(recommendations);
    };
    const currentRecommendations = getRecommendedTherapies();

    return (
        <div className="recommendation-page-container">
            <div className="page-header">
                <h2>Describe your health concerns and get personalized Ayurveda recommendations from our expert practitioners.</h2>
            </div>

            <div className="card">
               <h3 className="section-title">
    {/* 👇 Replace the old span with this SVG 👇 */}
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
    Describe Your Health Concerns
</h3>
                  <p className="page-subtitle">Share your symptoms or health goals to get personalized Ayurveda recommendations</p>
                <div className="symptoms-list">
                    {commonSymptoms.map(symptom => (
                        <button key={symptom} className={`symptom-tag ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`} onClick={() => handleSymptomClick(symptom)}>
                            {symptom}
                        </button>
                    ))}
                </div>
                <textarea className="additional-details-textarea" placeholder="Describe your symptoms, lifestyle, diet habits, or specific health goals..." value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} rows="4"></textarea>
                <button className="btn-primary" style={{width: '100%', marginTop: '16px'}} onClick={handleGetRecommendations}>
                    <span role="img" aria-label="sparkles">✨</span> Get Personalized Recommendations
                </button>
            </div>

            {showRecommendations && (
                <div className="card">
                    <h3 className="section-title"><span role="img" aria-label="star">🌟</span> Recommended Therapies</h3>
                    <p>Based on your concerns, here are suitable Ayurveda treatments</p>
                    <div className="therapy-list">
                        {currentRecommendations.length > 0 ? (
                            currentRecommendations.map((therapy, index) => (
                                <div key={index} className="therapy-item">
                                    <div className="therapy-details">
                                        <h4>{therapy.name}</h4>
                                        <p>{therapy.details} • <span className="duration">{therapy.duration}</span></p>
                                    </div>
                                    <button className="arrow-btn" onClick={() => setSelectedTherapy(therapy)}>→</button>
                                </div>
                            ))
                        ) : (
                            <p>No specific recommendations found. Please try adding more detail or consult a doctor.</p>
                        )}
                    </div>
                    <button className="btn-primary" style={{width: '100%', marginTop: '16px'}} onClick={() => setShowDoctorConsultation(true)}>
                        Consult Doctor for Treatment Plan
                    </button>
                </div>
            )}

            {showDoctorConsultation && <DoctorConsultationModal onClose={() => setShowDoctorConsultation(false)} />}
            {selectedTherapy && <TherapyDetailModal therapy={selectedTherapy} onClose={() => setSelectedTherapy(null)} />}
        </div>
    );
};

export default RecommendationPage;