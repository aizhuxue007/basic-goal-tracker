import React from "react";

const Countdown = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <>`${minutes}:${seconds}`
    </>
  );
};

export default Countdown;
