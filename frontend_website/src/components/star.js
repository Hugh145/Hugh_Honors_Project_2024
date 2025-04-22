// src/components/star.js
import React, { useState } from 'react';

// StarRating component to display a star rating system
// It allows users to select a rating by clicking on stars
// It also supports hover effects to preview the rating before selection
const StarRating = ({ initialRating = 0, onRate = () => {} }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map(starValue => (
        <span
          key={starValue}
          onClick={() => {
            setRating(starValue);
            onRate(starValue);
          }}
          onMouseEnter={() => setHover(starValue)}
          onMouseLeave={() => setHover(0)}
          style={{
            cursor: 'pointer',
            color: starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
            fontSize: '24px',
            marginRight: '4px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;