import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import "./Stylesheet/FeedbackPage.css";
import { FaComments, FaThumbsUp } from "react-icons/fa";
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
} from "recharts";

const FeedbackPage = () => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved
      ? JSON.parse(saved)
      : [
          {
            therapy: "Abhyanga Therapy",
            practitioner: "Dr. Priya Sharma",
            rating: 4.5,
            comment:
              "Excellent session with Dr. Sharma. Feeling relaxed and rejuvenated.",
          },
          {
            therapy: "Panchakarma Consultation",
            practitioner: "Dr. Rajesh Kumar",
            rating: 5,
            comment:
              "Very thorough assessment. The treatment plan looks comprehensive.",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const [therapy, setTherapy] = useState("");
  const [practitioner, setPractitioner] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!therapy.trim() || !practitioner.trim() || !comment.trim() || rating === 0) {
      alert("Please fill all fields and give a rating.");
      return;
    }

    const newReview = {
      therapy: therapy.trim(),
      practitioner: practitioner.trim(),
      rating,
      comment:
        comment.trim() +
        (suggestion.trim() ? ` (Suggestion: ${suggestion.trim()})` : ""),
    };

    setReviews([newReview, ...reviews]);

    setSuccessMessage("✅ Feedback submitted successfully!");

    setTherapy("");
    setPractitioner("");
    setRating(0);
    setComment("");
    setSuggestion("");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const chartData = reviews.map((r) => ({
    therapy: r.therapy,
    rating: r.rating,
  }));

  const pieData = [
    { name: "Improved", value: avgRating * 20 },
    { name: "Stable", value: (5 - avgRating) * 10 },
    {
      name: "Remaining",
      value: Math.max(0, 100 - avgRating * 20 - (5 - avgRating) * 10),
    },
  ];

  const COLORS = ["#4caf50", "#ffc107", "#e57373"];

  return (
    <div className="feedback-container">

      {/* HEADER */}
      <div className="feedback-header">
        <h1>Feedback & Reviews</h1>
        <p>Your healing journey insights and feedback history.</p>
      </div>

      {/* INSIGHTS */}
      <div className="insights-grid">

        <div className="insight-card">
          <h3>Therapy Wise Ratings</h3>

          <BarChart
            width={420}
            height={260}
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="therapy"
              angle={-20}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fill: "#444", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#444" }} />
            <Tooltip />
            <Bar dataKey="rating" fill="#69b578" />
          </BarChart>
        </div>

        <div className="insight-card">
          <h3>Wellness Progress</h3>

          <PieChart width={320} height={260}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={95}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <p className="avg-rating">
            Average Rating: <strong>{avgRating.toFixed(2)}/5</strong>
          </p>
        </div>
      </div>

      {/* FORM + REVIEWS */}
      <div className="feedback-content">

        {/* FORM */}
        <div className="feedback-form">
          <h3>
            <FaComments /> Share Your Experience
          </h3>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Therapy Name"
              value={therapy}
              onChange={(e) => setTherapy(e.target.value)}
            />

            <input
              type="text"
              placeholder="Practitioner Name"
              value={practitioner}
              onChange={(e) => setPractitioner(e.target.value)}
            />

            <div className="rating-section">
              <StarRating rating={rating} setRating={setRating} />
            </div>

            <textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <textarea
              placeholder="Suggestions (optional)"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />

            <button type="submit">Submit Feedback</button>
          </form>
        </div>

        {/* REVIEWS */}
        <div className="previous-reviews">
          <h3>
            <FaThumbsUp /> Your Previous Reviews
          </h3>

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
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;