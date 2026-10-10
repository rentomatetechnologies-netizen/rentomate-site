import React from "react";

const WAVE_PATH = "M0 8 Q150 0 300 8 T600 8 T900 8 T1200 8 V16 H0 Z";

const bubbles = [
  { left: "14%", size: 8, duration: "3.4s", delay: "0.1s" },
  { left: "32%", size: 5, duration: "2.8s", delay: "0.9s" },
  { left: "51%", size: 10, duration: "3.8s", delay: "0.4s" },
  { left: "69%", size: 6, duration: "3.1s", delay: "1.3s" },
  { left: "86%", size: 7, duration: "3.6s", delay: "0.7s" },
];

interface WaterHoverCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card wrapper with a "water rising" hover effect: on hover (or keyboard focus inside),
 * water fills the card from the bottom with a moving wave surface and floating bubbles.
 * Pass the card's own layout/border/background classes through `className`.
 */
export const WaterHoverCard: React.FC<WaterHoverCardProps> = ({ children, className = "" }) => (
  <div className={`water-card group relative overflow-hidden ${className}`}>
    <div aria-hidden="true" className="water-card__water">
      <div className="water-card__bob">
        <svg className="water-card__wave water-card__wave--back" viewBox="0 0 1200 16" preserveAspectRatio="none">
          <path d={WAVE_PATH} />
        </svg>
        <svg className="water-card__wave" viewBox="0 0 1200 16" preserveAspectRatio="none">
          <path d={WAVE_PATH} />
        </svg>
      </div>
      {bubbles.map((bubble) => (
        <span
          key={bubble.left}
          className="water-card__bubble"
          style={{ left: bubble.left, width: bubble.size, height: bubble.size, animationDuration: bubble.duration, animationDelay: bubble.delay }}
        />
      ))}
    </div>
    <div className="relative z-10 h-full">{children}</div>
  </div>
);
