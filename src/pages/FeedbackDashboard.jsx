import React, { useState } from 'react';
import './Stylesheet/FeedbackDashboard.css';
import {
    FaStar,
    FaRegStar,
    FaRegComment,
    FaRegCalendarAlt,
    FaFilter,
    FaFileExport,
    FaChartLine,
    FiTrendingUp
} from './Icons';

const patientData = {
    feedback: [
        { id: 1, name: "Rajesh Kumar", treatment: "Abhyanga Massage", date: "Dec 22, 2024", rating: 5, condition: "Back Pain", improvement: "Significant", comment: "Feeling much better after the session. Pain reduced from 8/10 to 3/10. Very satisfied with the treatment.", nextSession: "Dec 25, 2024" },
        { id: 2, name: "Meera Patel", treatment: "Shirodhara", date: "Dec 21, 2024", rating: 4, condition: "Stress & Anxiety", improvement: "Moderate", comment: "Felt relaxed and calm during the session. Sleep quality has improved. Would like to continue treatment.", nextSession: "Dec 24, 2024" },
        { id: 3, name: "Amit Singh", treatment: "Panchakarma Detox", date: "Dec 20, 2024", rating: 5, condition: "Digestive Issues", improvement: "Excellent", comment: "Digestion has improved significantly. Energy levels are better. Very happy with the progress.", nextSession: "Dec 27, 2024" },
        { id: 4, name: "Lakshmi Devi", treatment: "Nasya Treatment", date: "Dec 19, 2024", rating: 3, condition: "Migraine", improvement: "Slight", comment: "Some relief from headaches but still experiencing occasional pain. Need to continue treatment.", nextSession: "Dec 26, 2024" }
    ],
    recoveryTrends: [
        { id: 1, name: "Rajesh Kumar", painBefore: 8, painAfter: 3, sessions: 8, percentage: -62 },
        { id: 2, name: "Meera Patel", painBefore: 7, painAfter: 4, sessions: 6, percentage: -43 },
        { id: 3, name: "Amit Singh", painBefore: 6, painAfter: 2, sessions: 15, percentage: -67 },
        { id: 4, name: "Lakshmi Devi", painBefore: 9, painAfter: 7, sessions: 3, percentage: -22 }
    ],
    practitionerNotes: [
        { id: 1, patientName: "Rajesh Kumar", note: "Consider reducing session frequency to twice weekly. Excellent progress with Abhyanga." },
        { id: 2, patientName: "Lakshmi Devi", note: "May need to combine Nasya with stress management techniques. Monitor closely." }
    ],
    thisWeek: { feedbackReceived: 8, avgRating: "4.5", improvements: 6, followUps: 2 }
};

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = totalStars - fullStars;
    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="star-filled" />)}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="star-empty" />)}
        </div>
    );
};

const StatsCard = ({ title, value, rating, icon, trendIcon }) => {
    return (
        <div className="stats-card">
            <p className="stats-title">{title}</p>
            <div className="stats-value-container">
                <p className="stats-value">{value}</p>
                {rating && <StarRating rating={rating} />}
                {icon && <span className="stats-icon">{icon}</span>}
                {trendIcon && <span className="stats-trend-icon">{trendIcon}</span>}
            </div>
        </div>
    );
};

const PatientFeedbackCard = ({ feedback }) => {
    const getImprovementClass = (improvement) => {
        switch (improvement.toLowerCase()) {
            case 'significant': case 'excellent': return 'improvement-significant';
            case 'moderate': return 'improvement-moderate';
            case 'slight': return 'improvement-slight';
            default: return '';
        }
    };
    return (
        <div className="patient-feedback-card">
            <div className="feedback-header">
                <div>
                    <h3 className="patient-name">{feedback.name}</h3>
                    <p className="treatment-type">{feedback.treatment}</p>
                </div>
                <div className="feedback-rating-date">
                    <StarRating rating={feedback.rating} />
                    <p className="feedback-date">{feedback.date}</p>
                </div>
            </div>
            <div className="condition-improvement">
                <div className="info-group">
                    <p className="info-label">Condition</p>
                    <p className="info-value">{feedback.condition}</p>
                </div>
                <div className="info-group">
                    <p className="info-label">Improvement</p>
                    <p className={`info-value improvement-tag ${getImprovementClass(feedback.improvement)}`}>{feedback.improvement}</p>
                </div>
            </div>
            <p className="feedback-comment">"{feedback.comment}"</p>
            <div className="feedback-footer">
                <p className="next-session">Next Session: {feedback.nextSession}</p>
                <button className="view-details-btn">View Details</button>
            </div>
        </div>
    );
};

const FeedbackDashboard = () => {
    const [notes, setNotes] = useState(patientData.practitionerNotes);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteText, setNewNoteText] = useState("");
    const [newNotePatient, setNewNotePatient] = useState("");

    const handleAddNote = () => {
        if (newNoteText.trim() === "" || newNotePatient.trim() === "") {
            alert("Please enter patient name and note.");
            return;
        }
        const newNoteObject = { id: Date.now(), patientName: newNotePatient, note: newNoteText };
        setNotes([newNoteObject, ...notes]);
        setNewNoteText("");
        setNewNotePatient("");
        setIsAddingNote(false);
    };

    const handleRemoveNote = (idToRemove) => {
        setNotes(notes.filter(note => note.id !== idToRemove));
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Your Feedback & Progress Tracking</h1>
            
                </div>
                <div className="header-actions">
                    <button className="filter-btn"><FaFilter /> Filter</button>
                    <button className="export-btn"><FaFileExport /> Export Report</button>
                </div>
            </header>

            <section className="stats-grid">
                <StatsCard title="Avg Satisfaction" value="4.3" rating={4} />
                <StatsCard title="Recovery Rate" value="78%" trendIcon={<FiTrendingUp />} />
                <StatsCard title="Total Feedback" value="156" icon={<FaRegComment />} />
                <StatsCard title="This Month" value="24" icon={<FaRegCalendarAlt />} />
            </section>

            <main className="dashboard-main-content">
                <div className="left-column">
                    <h2>Recent Patient Feedback</h2>
                    {patientData.feedback.map(item => (<PatientFeedbackCard key={item.id} feedback={item} />))}
                </div>
                <div className="right-column">
                    <div className="widget-card">
                        <h3 className="widget-title"><FaChartLine /> Recovery Trends</h3>
                        {patientData.recoveryTrends.map(trend => (
                            <div key={trend.id} className="recovery-trend-item">
                                <div className="trend-header">
                                    <p className="patient-name">{trend.name}</p>
                                    <p className={`trend-percentage ${trend.percentage > 0 ? 'positive' : 'negative'}`}>{trend.percentage > 0 ? '+' : ''}{trend.percentage}%</p>
                                </div>
                                <p className="trend-details">Pain: {trend.painBefore}/10 → {trend.painAfter}/10 ({trend.sessions} sessions)</p>
                                <div className="progress-bar-container"><div className="progress-bar" style={{ width: `${100 - Math.abs(trend.percentage)}%` }}></div></div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="widget-card">
                        <h3 className="widget-title">Practitioner Notes</h3>
                        {notes.map(note => (
                            <div key={note.id} className="practitioner-note">
                                <div className="practitioner-note-header">
                                     <h4>{note.patientName}</h4>
                                     <span className="remove-note-btn" onClick={() => handleRemoveNote(note.id)}>&times;</span>
                                </div>
                                <p>{note.note}</p>
                            </div>
                        ))}
                        
                        {isAddingNote ? (
                            <div className="add-note-form">
                                <input type="text" placeholder="Patient Name" value={newNotePatient} onChange={(e) => setNewNotePatient(e.target.value)} />
                                <textarea placeholder="Write your note here..." value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)}></textarea>
                                <div className="form-actions">
                                    <button className="cancel-note-btn" onClick={() => setIsAddingNote(false)}>Cancel</button>
                                    <button className="save-note-btn" onClick={handleAddNote}>Save Note</button>
                                </div>
                            </div>
                        ) : (
                            <button className="add-note-btn" onClick={() => setIsAddingNote(true)}>Add New Note</button>
                        )}
                    </div>

                    <div className="widget-card">
                        <h3 className="widget-title">This Week</h3>
                        <div className="weekly-stats">
                            <div className="weekly-stat-item"><span>Feedback Received</span><span>{patientData.thisWeek.feedbackReceived}</span></div>
                            <div className="weekly-stat-item"><span>Avg Rating</span><span>{patientData.thisWeek.avgRating}/5</span></div>
                            <div className="weekly-stat-item"><span>Improvements</span><span className="improvements-value">{patientData.thisWeek.improvements}</span></div>
                            <div className="weekly-stat-item"><span>Follow-ups</span><span>{patientData.thisWeek.followUps}</span></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FeedbackDashboard;