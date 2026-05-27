import React from "react";

const ProgressBar = (props) => {
  // const { currentSlide, numberOfSlides } = props;
  return (
    <div
      id="progress-bar"
      role="progressbar"
      aria-label="Tutorial progress"
      aria-valuenow={props.currentSlide}
      aria-valuemin={0}
      aria-valuemax={props.numberOfSlides}
    ></div>
  );
};

export default ProgressBar;
