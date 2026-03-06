import React, { useEffect, useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every minute (60000ms)
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Only update state when minutes change to avoid unnecessary re-renders

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Format the time to display only hours and minutes using toLocaleTimeString
  // Options for 2-digit hours and minutes in 24-hour format:
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to true for 12-hour format with AM/PM
  });
  return <p className="time-display">{formattedTime}</p>;
};

export default Clock;
