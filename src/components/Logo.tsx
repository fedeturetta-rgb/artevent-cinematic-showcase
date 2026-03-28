import React from "react";

export type LogoProps = {
  /**
  * Optional numeric value in pixels. The SVG is square, so this sets both
  * width and height inline.
   */
  size?: number;
  /**
   * Extra classNames to apply to the SVG. Useful for responsive sizing or
   * further styling (opacity, filters, etc.).
   */
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ size, className }) => (
  <svg
    style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="60" cy="60" r="60" fill="url(#paint0_linear)" />
    <path
      d="M30 60h60"
      stroke="white"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="60"
        y1="0"
        x2="60"
        y2="120"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8456EC" />
        <stop offset="1" stopColor="#D96AFF" />
      </linearGradient>
    </defs>
  </svg>
);
