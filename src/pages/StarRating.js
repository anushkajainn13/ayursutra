import React from 'react';
import './Stylesheet/StarRating.css';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => setRating(index)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;