import React from "react";
import '../App.css';

const StarRating = ({ rating, onRatingChange }) => {
    const handleStarclick = (value) => {
        onRatingChange(value);
    };
    return (
        <div className="star-rating fs-2 mb-0">
            {[1,2,3,4,5].map((starValue) => (
                <span key={starValue} className={starValue <= rating? 'star-filled' : 'star-empty'} onClick={() => handleStarclick(starValue)}>
                    ★
                </span>
            ))}
        </div>
    )
};
export default StarRating;