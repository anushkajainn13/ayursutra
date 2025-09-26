import React, { useState, useEffect } from "react";
import "./Stylesheet/Dashboard.css";
import { FaHeartbeat, FaUserMd, FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

// --- Mock Data (एक फोटो का लिंक जानबूझकर गलत किया गया है) ---
const clinicsData = [
    { id: 1, name: 'Jiva Ayurveda', location: 'Jaipur', rating: 4.8, primaryDoctor: 'Dr. Rajesh Kumar', specialty: 'Panchakarma', price: 800 },
    { id: 2, name: 'Patanjali Wellness', location: 'Jaipur', rating: 4.6, primaryDoctor: 'Dr. Priya Mehta', specialty: 'Women\'s Health', price: 600 },
    { id: 3, name: 'Jaipur Ayurveda', location: 'Jaipur', rating: 4.7, primaryDoctor: 'Dr. Sanjay Gupta', specialty: 'General Wellness', price: 700 },
    { id: 4, name: 'Arya Vaidya Sala', location: 'Delhi', rating: 4.9, primaryDoctor: 'Dr. Suresh Nair', specialty: 'Arthritis', price: 1200 },
    { id: 5, name: 'Delhi Ayurvedic', location: 'Delhi', rating: 4.5, primaryDoctor: 'Dr. Anika Sharma', specialty: 'Skin & Hair', price: 900 },
    { id: 6, name: 'Vaidya Healthcare', location: 'Mumbai', rating: 4.8, primaryDoctor: 'Dr. Rohan Joshi', specialty: 'Stress Management', price: 1000 },
];

const doctorsData = [
    { id: 101, clinicId: 1, name: 'Dr. Rajesh Kumar', photo: 'https://www.jiva.com/wp-content/uploads/2021/04/dr-partap-chauhan-1.jpg', specialty: 'Panchakarma & Detoxification', rating: 4.9, reviewsCount: 182, testimonials: [{ patient: 'Sunita S.', quote: '"Dr. Kumar\'s treatment gave me immense relief from my chronic pain."' }, { patient: 'Manish G.', quote: '"The panchakarma therapy was excellent. Feeling rejuvenated."' }] },
    { id: 102, clinicId: 1, name: 'Dr. Meena Singh', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-LAO8a8a9m1F-Bsf-i621aR0x3Co50L4sAw&s', specialty: 'Ayurvedic Nutrition', rating: 4.7, reviewsCount: 112, testimonials: [{ patient: 'Ravi P.', quote: '"She helped me create a perfect diet plan that improved my energy levels."' }] },
    { id: 201, clinicId: 2, name: 'Dr. Priya Mehta', photo: 'https://www.pristyncare.com/blog/wp-content/uploads/2021/07/How-to-Become-a-Gynecologist.jpg', specialty: 'Women\'s Health & Wellness', rating: 4.8, reviewsCount: 230, testimonials: [{ patient: 'Anjali K.', quote: '"Highly recommend Dr. Mehta. Very understanding."' }, { patient: 'Neha B.', quote: '"She is the best for PCOD related issues. Very helpful."' }] },
    { id: 301, clinicId: 3, name: 'Dr. Sanjay Gupta', photo: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg', specialty: 'General Ayurvedic Wellness', rating: 4.7, reviewsCount: 150, testimonials: [{ patient: 'Amit V.', quote: '"Very good for overall health consultation."' }] },
    // ✅ **इस डॉक्टर की फोटो का लिंक गलत है ताकि आप फॉलबैक देख सकें**
    { id: 302, clinicId: 3, name: 'Dr. Swati Agarwal', photo: 'https://link.to.a.broken/image.jpg', specialty: 'Digestive Health', rating: 4.8, reviewsCount: 98, testimonials: [{ patient: 'Karan M.', quote: '"My digestive issues have been solved thanks to her guidance."' }] },
    { id: 401, clinicId: 4, name: 'Dr. Suresh Nair', photo: 'https://st2.depositphotos.com/3591429/5997/i/450/depositphotos_59979859-stock-photo-confident-senior-doctor-at-hospital.jpg', specialty: 'Joint Pain & Arthritis Specialist', rating: 4.9, reviewsCount: 310, testimonials: [] },
    { id: 501, clinicId: 5, name: 'Dr. Anika Sharma', photo: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg', specialty: 'Ayurvedic Dermatology', rating: 4.6, reviewsCount: 95, testimonials: [{ patient: 'Pooja G.', quote: '"My skin has never been better. Thank you Dr. Sharma!"' }] },
    { id: 601, clinicId: 6, name: 'Dr. Rohan Joshi', photo: 'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', specialty: 'Mental Wellness & Stress', rating: 4.8, reviewsCount: 188, testimonials: [{ patient: 'Vikram R.', quote: '"Helped me manage my stress through Ayurveda. Life-changing."' }] },
];
// -----------------------------

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) { stars.push(<FaStar key={i} color={i <= rating ? '#f5b942' : '#e4e5e9'} />); }
  return <div className="stars">{stars}</div>;
};

// ✅ --- फोटो के लिए नया कॉम्पोनेन्ट ---
const DoctorAvatar = ({ photo, name }) => {
  const [imgError, setImgError] = useState(false);

  // नाम से पहले दो अक्षर निकालना (जैसे: "Dr. Rajesh Kumar" -> "RK")
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
// ------------------------------------

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [nearbyClinics, setNearbyClinics] = useState([]);
  const [viewMode, setViewMode] = useState('clinics');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);

  useEffect(() => {
    const userLocation = localStorage.getItem('userLocation');
    if (userLocation) {
      setLocation(userLocation);
      const filteredClinics = clinicsData.filter(c => c.location === userLocation);
      setNearbyClinics(filteredClinics);
    }
  }, []);

  const handleViewClinicDetails = (clinic) => {
    setSelectedClinic(clinic);
    const doctors = doctorsData.filter(d => d.clinicId === clinic.id);
    setAvailableDoctors(doctors);
    setViewMode('doctors');
  };

  const handleBackToClinics = () => { setViewMode('clinics'); setSelectedClinic(null); };

  return (
    <div className="dashboard">
      <section className="welcome">
        <h2>Welcome back to your healing journey</h2>
        <p>Continue your path to wellness with personalized Ayurvedic care</p>
      </section>
      <section className="stats">
        <div className="stat-card"><FaHeartbeat className="icon" /><div><h3>3</h3><p>Active Treatments</p></div></div>
        <div className="stat-card"><IoCalendarOutline className="icon" /><div><h3>Tomorrow</h3><p>Abhyanga therapy</p></div></div>
        <div className="stat-card"><AiOutlineBarChart className="icon" /><div><h3>85%</h3><p>Wellness Score</p></div></div>
        <div className="stat-card"><FaUserMd className="icon" /><div><h3>12</h3><p>Completed Sessions</p></div></div>
      </section>

      <section className="clinics-section">
        {viewMode === 'clinics' ? (
          <>
            <h2>Ayurveda Clinics near {location || 'your area'}</h2>
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
            <button onClick={handleBackToClinics} className="back-button"><BsArrowLeftShort /> Back to All Clinics</button>
            <h2>Practitioners at {selectedClinic.name}</h2>
            <div className="doctors-grid">
              {availableDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  {/* ✅ पुराने <img> टैग की जगह नया कॉम्पोनेन्ट इस्तेमाल करें */}
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
                        doctor.testimonials.map((t, i) => <div key={i} className="feedback-quote"><p>"{t.quote}"</p><span>- {t.patient}</span></div>)
                      ) : <p>No feedback available yet.</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;