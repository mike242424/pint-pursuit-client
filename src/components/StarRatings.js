import React from "react";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRatings = ({ rating }) => {
  const renderStarRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesomeIcon
            className="text-success"
            icon={faStar}
            key={i}
            size="xl"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon
            className="text-success"
            icon={faStarHalfAlt}
            key={i}
            size="xl"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} opacity={0.3} size="xl" />
        );
      }
    }

    return stars;
  };

  return <div className="star-rating">{renderStarRating()}</div>;
};

export default StarRatings;
