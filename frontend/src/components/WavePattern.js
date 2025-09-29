import React from 'react';
import './WavePattern.css';

const WavePattern = ({ 
  height = '140px', 
  animated = false, 
  className = '' 
}) => {
  return (
    <div className={`wave-pattern ${className}`} style={{ height }}>
      <svg
        className="wave-svg"
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background fill - matching Figma design */}
        <rect width="1200" height="140" fill="#1a3a3a" />
        
        {/* Wave Layer 1 - Bottom wave (darker, more prominent) */}
        <path
          className={`wave-path wave-1 ${animated ? 'animated' : ''}`}
          d="M0,140 C300,100 600,120 900,110 C1050,105 1200,115 1200,115 L1200,140 L0,140 Z"
          fill="#0f2a2a"
        />
        
        {/* Wave Layer 2 - Top wave (lighter, subtle) */}
        <path
          className={`wave-path wave-2 ${animated ? 'animated' : ''}`}
          d="M0,115 C200,85 400,95 600,90 C800,85 1000,95 1200,90 L1200,140 L0,140 Z"
          fill="#1a4a4a"
        />
      </svg>
    </div>
  );
};

export default WavePattern;
