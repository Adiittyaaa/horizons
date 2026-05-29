import React from 'react';

interface ProgressRingProps {
  /** Percentage from 0 to 100 */
  progress: number;
  /** Diameter in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Optional color gradient id */
  gradientId?: string;
}

/**
 * SVG circular progress indicator with smooth animation.
 * Uses `stroke-dashoffset` to represent progress.
 */
export default function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 8,
  gradientId = 'progress-gradient',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeOpacity={0.1}
        strokeWidth={strokeWidth}
        className="text-slate-300 dark:text-slate-800"
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#ba1a1a" />
        </linearGradient>
      </defs>
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]"
      />
    </svg>
  );
}
