    import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';
import './Stylesheet/FeedbackPage.css';
import { FaComments, FaThumbsUp } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const FeedbackPage = () => {
  // Load reviews from localStorage
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews');
    return saved
      ? JSON.parse(saved)
      : [
          {
            therapy: 'Abhyanga Therapy',
            practitioner: 'Dr. Priya Sharma',
            rating: 4.5,
            comment:
              'Excellent session with Dr. Sharma. Feeling very relaxed and rejuvenated.',
          },
          {
            therapy: 'Panchakarma Consultation',
            practitioner: 'Dr. Rajesh Kumar',
            rating: 5,
            comment:
              'Very thorough assessment. The treatment plan looks comprehensive.',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Form states
  const [therapy, setTherapy] = useState('');
  const [practitioner, setPractitioner] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ✅ Delete function
  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !therapy.trim() ||
      !practitioner.trim() ||
      !comment.trim() ||
      rating === 0
    ) {
      alert('Please fill all fields and give a rating.');
      return;
    }

    const newReview = {
      therapy: therapy.trim(),
      practitioner: practitioner.trim(),
      rating,
      comment:
        comment.trim() +
        (suggestion.trim() ? ` (Suggestion: ${suggestion.trim()})` : ''),
    };

    setReviews([newReview, ...reviews]);

    setSuccessMessage('✅ Feedback submitted successfully!');
    setTherapy('');
    setPractitioner('');
    setRating(0);
    setComment('');
    setSuggestion('');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // 🔹 Insights Data
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const chartData = reviews.map((r) => ({
    therapy: r.therapy,
    rating: r.rating,
  }));

  // Pie chart data
  const pieData = [
    { name: 'Improved', value: avgRating * 20 },
    { name: 'Stable', value: (5 - avgRating) * 10 },
    {
      name: 'Remaining',
      value: 100 - avgRating * 20 - (5 - avgRating) * 10,
    },
  ];

  const COLORS = ['#4caf50', '#ffc107', '#e57373'];

  return (
    <div className="feedback-container">
      {/* Header */}
      <div className="feedback-header">
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            borderBottom: '3px solid #4caf50',
            display: 'inline-block',
            paddingBottom: '6px',
            marginBottom: '15px',
          }}
        >
          Feedback & Reviews
        </h1>
        <p>Share your experience and help improve our services</p>
      </div>

      {/* Insights Section */}
      <div className="insights-section">
        <h3>🌱 Motivation & Recovery Insights</h3>
        <p>
          Your healing journey is on track! Average Rating:{' '}
          <strong>{avgRating.toFixed(2)}/5</strong>
        </p>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Bar Chart */}
          <div style={{ flex: 1, minWidth: '350px' }}>
            <h4>Therapy Wise Average Ratings</h4>
            <BarChart
              width={420}
              height={280}
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="therapy"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rating" fill="#4caf50" />
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h4>Wellness Progress</h4>
            <PieChart width={340} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={false} // ❌ No permanent labels
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip /> {/* ✅ Hover par show hoga */}
              <Legend verticalAlign="bottom" height={36} /> {/* ✅ Legend always visible */}
            </PieChart>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="feedback-content">
        {/* Left Section */}
        <div className="feedback-form">
          <h3>
            <FaComments style={{ marginRight: '8px', color: '#4CAF50' }} />
            Share Your Experience
          </h3>
          <p>Help us improve our services with your feedback.</p>

          {successMessage && (
            <div
              style={{
                backgroundColor: '#d6f5d6',
                color: '#2e7d32',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '15px',
                fontWeight: '500',
              }}
            >
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h4>Therapy Name</h4>
              <input
                type="text"
                placeholder="e.g. Shirodhara Therapy"
                value={therapy}
                onChange={(e) => setTherapy(e.target.value)}
              />
            </div>

            <div className="form-section">
              <h4>Practitioner Name</h4>
              <input
                type="text"
                placeholder="e.g. Dr. Meera Gupta"
                value={practitioner}
                onChange={(e) => setPractitioner(e.target.value)}
              />
            </div>

            <div className="form-section">
              <h4>Rate your recent session</h4>
              <StarRating rating={rating} setRating={setRating} />
            </div>

            <div className="form-section">
              <h4>Your Feedback</h4>
              <textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="form-section">
              <h4>Suggestions for Improvement</h4>
              <textarea
                placeholder="Any suggestions?"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="previous-reviews">
          <h3>
            <FaThumbsUp style={{ marginRight: '8px', color: '#FFC107' }} />
            Your Previous Reviews
          </h3>
          <p>Track your feedback history</p>

          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              therapy={review.therapy}
              practitioner={review.practitioner}
              rating={review.rating}
              comment={review.comment}
              onDelete={() => handleDelete(index)}
            />
          ))}

          <button className="view-all-button">View All Feedback History</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;