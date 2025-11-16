import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const CircularProgress = ({ progress = 0, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(
    circumference - (progress / 100) * circumference
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOffset(
        circumference - (Math.min(progress, 100) / 100) * circumference
      );
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [circumference, progress]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle /}
          <circle
            stroke="#e6e6e6"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />

          {/ Progress circle */}
      <motion.circle
        stroke={progress <= 100 ? "#207fe8" : "#e7000b"} // Progress color
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round" // Optional: rounded ends for the progress line
        initial={{ strokeDashoffset: circumference }} // Start with no progress
        animate={{ strokeDashoffset: offset }} // Animate to the current progress
        transition={{ duration: 0.5, ease: "easeInOut" }} // Animation timing
      />
    </svg>
  );
};

export default CircularProgress;
