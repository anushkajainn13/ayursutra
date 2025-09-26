import React, { useState } from 'react';
import './Stylesheet/RecommendationPage.css';

// --- Therapy Detail Modal Component (NEW) ---
const TherapyDetailModal = ({ therapy, onClose }) => {
    // Dummy image URLs for demonstration (Replace with actual URLs)
    const images = {
        "Panchakarma Detox": "https://vediherbals.com/cdn/shop/articles/Ayurvedic_Panchakarma_Therapy_The_Ultimate_Detox_Solution_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_520x500_fda0ddc7-2dfd-4b3d-9c84-de22f4935e31.jpg?v=1736933715",
        "Abhyanga Massage": "https://i.imgur.com/xH5V6aT.jpeg",
        "Shirodhara": "https://i.imgur.com/gK9pI0i.jpeg",
        "Vasti Karma": "https://i.imgur.com/vH5tXmJ.jpeg",
        "Virechana": "https://i.imgur.com/L7r0Yg3.jpeg",
        "Swedana": "https://i.imgur.com/qR8v2k2.jpeg",
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content therapy-detail-modal">
                <span className="close-btn" onClick={onClose}>×</span>
                
                <h2 className="therapy-detail-title">{therapy.name}</h2>
                
                <div className="therapy-image-container">
                    <img src={images[therapy.name] || 'https://i.imgur.com/default.jpeg'} alt={therapy.name} className="therapy-main-image" />
                </div>

                <div className="therapy-key-details">
                    <p><strong>Duration:</strong> {therapy.duration}</p>
                    <p><strong>Focus:</strong> {therapy.tags.join(', ')}</p>
                </div>

                <p className="therapy-description-text">
                    {therapy.details}
                    <br/><br/>
                    {/* Yahan therapy ki aur zyada details hain */}
                    {therapy.name} is a comprehensive Ayurvedic treatment designed to flush out toxins from the deepest tissues, promoting revitalization and long-term well-being. It is highly effective for managing {therapy.tags[0]} and {therapy.tags[1]}.
                </p>
                
                <button className="btn-consult-doctor" onClick={onClose}>Schedule this Therapy</button>
            </div>
        </div>
    );
};
// ----------------------------------------

// --- Doctor Consultation Modal Component ---
const DoctorConsultationModal = ({ onClose }) => {
    const doctors = [
        { name: "Dr. Priya Sharma", spec: "Ayurveda Specialist", exp: "12 yrs", fee: "₹500", status: "Available Now" },
        { name: "Dr. Rajesh Kumar", spec: "Panchakarma Expert", exp: "8 yrs", fee: "₹450", status: "Busy" },
        { name: "Dr. Sunita Rao", spec: "Stress Management", exp: "15 yrs", fee: "₹600", status: "Available Now" },
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>×</span>
                <h3 className="section-title-green">Consultation with Experts</h3>
                <p>Book an instant slot with one of our specialized Ayurvedic practitioners.</p>
                
                <div className="doctor-list">
                    {doctors.map((doc, index) => (
                        <div key={index} className="doctor-card">
                            <div className="doc-info">
                                <h4>{doc.name}</h4>
                                <p className="doc-spec">{doc.spec} • {doc.exp}</p>
                            </div>
                            <div className="doc-actions">
                                {/* ✅ **FIXED HERE:** Removed invalid characters */}
                                <span className={`doc-status ${doc.status.includes('Available') ? 'available' : 'busy'}`}>{doc.status}</span>
                                <p className="doc-fee">{doc.fee}</p>
                                <button className="btn-book-slot">Book Slot</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
// ----------------------------------------


const RecommendationPage = () => {
    const commonSymptoms = [
        "Digestive Issues", "Stress & Anxiety", "Joint Pain", 
        "Insomnia", "Skin problems", "Fatigue", 
        "Weight management", "Headaches"
    ];

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
    const [selectedTherapy, setSelectedTherapy] = useState(null); // State for the Therapy Detail Modal

    const handleSymptomClick = (symptom) => {
        setSelectedSymptoms(prev => 
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
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

            {/* Section 1: Health Concerns */}
            <div className="card section-concerns">
                <h3 className="section-title-green">
                    <span role="img" aria-label="pen">📝</span> Describe Your Health Concerns
                </h3>
                <p>Share your symptoms or health goals to get personalized Ayurveda recommendations</p>

                <h4>Common symptoms (click to select):</h4>
                <div className="symptoms-list">
                    {commonSymptoms.map(symptom => (
                        <button
                            key={symptom}
                            // ✅ **FIXED HERE:** Removed invalid characters
                            className={`symptom-tag ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                            onClick={() => handleSymptomClick(symptom)}
                        >
                            {symptom}
                        </button>
                    ))}
                </div>

                <h4 className="additional-details-title">Additional details:</h4>
                <textarea
                    className="additional-details-textarea"
                    placeholder="Describe your symptoms, lifestyle, diet habits, or specific health goals in detail..."
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    rows="4"
                ></textarea>

                <button className="btn-get-recommendation" onClick={handleGetRecommendations}>
                    <span role="img" aria-label="sparkles">✨</span> Get Personalized Recommendations
                </button>
            </div>
            
            {/* Section 2: Recommended Therapies */}
            {showRecommendations && (
                <div className="card section-recommendations">
                    <h3 className="section-title-green">
                        <span role="img" aria-label="star">🌟</span> Recommended Therapies
                    </h3>
                    <p>Based on your concerns, here are suitable Ayurveda treatments</p>

                    <div className="therapy-list">
                        {currentRecommendations.length > 0 ? (
                            currentRecommendations.map((therapy, index) => (
                                <div key={index} className="therapy-item">
                                    <div className="therapy-details">
                                        <h4>{therapy.name}</h4>
                                        <p>{therapy.details}</p>
                                        <span className="duration">{therapy.duration}</span>
                                    </div>
                                    <button 
                                        className="arrow-btn"
                                        onClick={() => setSelectedTherapy(therapy)} // Shows the new Therapy Detail Modal
                                    >
                                        →
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No specific recommendations found for your selection. Please try adding more detail or consult a doctor.</p>
                        )}
                    </div>

                    <button className="btn-consult-doctor" onClick={() => setShowDoctorConsultation(true)}>Consult Doctor for Treatment Plan</button>
                </div>
            )}

            {/* Section 3: Action Buttons (Bottom Bar) */}
            <div className="action-bar-full-width">
                 <div className="action-bar-inner">
                    <button className="action-btn">
                        <span role="img" aria-label="chat">💬</span> Instant Consultation
                    </button>
                    <button className="action-btn">
                        <span role="img" aria-label="download">⬇️</span> Download Reports
                    </button>
                    <button className="action-btn">
                        <span role="img" aria-label="help">❓</span> Help & Support
                    </button>
                </div>
            </div>

            {/* Modals */}
            {showDoctorConsultation && <DoctorConsultationModal onClose={() => setShowDoctorConsultation(false)} />}
            {selectedTherapy && (
                <TherapyDetailModal 
                    therapy={selectedTherapy} 
                    onClose={() => setSelectedTherapy(null)} 
                />
            )}
        </div>
    );
};

export default RecommendationPage;