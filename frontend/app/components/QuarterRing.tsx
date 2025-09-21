"use client";
import React from "react";

interface QuarterRingProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const QuarterRing = ({
  size = 208,
  strokeWidth = 12,
  className = "",
}: QuarterRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const quarterLength = circumference / 4;

  // Colors for each quarter (clockwise: red, blue, yellow, green)
  const colors = [
    "#ef4444", // red-500
    "#3b82f6", // blue-500
    "#eab308", // yellow-500
    "#22c55e", // green-500
  ];

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 max-w-full max-h-full"
      >
        {/* Background ring for better visibility */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth / 6}
          className="text-border opacity-20 dark:opacity-30"
        />

        {colors.map((color, index) => {
          const startOffset = quarterLength * index;

          return (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${quarterLength} ${circumference}`}
              strokeDashoffset={-startOffset}
              className="transition-all duration-500 filter drop-shadow-sm hover:drop-shadow-lg dark:drop-shadow-md dark:hover:drop-shadow-xl"
            />
          );
        })}

        {/* Inner glow effect for dark theme */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="url(#innerGlow)"
          strokeWidth={2}
          className="opacity-0 dark:opacity-40"
        />

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.1"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.4"
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default QuarterRing;
