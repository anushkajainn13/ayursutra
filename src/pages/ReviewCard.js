 import React from 'react';
import './Stylesheet/ReviewCard.css';

const ReviewCard = ({ therapy, practitioner, rating, comment, onDelete }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "filled" : "empty"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-card">
      <h4>{therapy}</h4>
      <p>{practitioner}</p>
      <div className="review-rating">{renderStars(Math.round(rating))}</div>
      <p className="review-comment">"{comment}"</p>

      {/* ✅ Delete button */}
      <button className="delete-button" onClick={onDelete}>
        ❌ Delete
      </button>
    </div>
  );
};

export default ReviewCard;