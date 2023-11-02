"use client";
import ReactStars from "react-rating-star-with-type";

const Ratings = ({ rate = 0, activeColors = ["red", "orange"] }) => {
  return <ReactStars value={rate} activeColors={activeColors} />;
};

export default Ratings;
