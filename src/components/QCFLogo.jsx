import React from 'react';

export default function QCFLogo({ className = "w-11 h-11", size = "normal", variant = "dark", showText = true }) {
  const isLight = variant === "light";

  // Palette customization based on light vs dark background
  const outerRingColor = isLight ? "#FFFFFF" : "#16362B";
  const innerRingColor = isLight ? "#52967E" : "#2C6450";
  const textColor = isLight ? "#FFFFFF" : "#16362B";
  const starColor = isLight ? "#52967E" : "#52967E";
  const checkmarkColor = isLight ? "#52967E" : "#2C6450";

  const titleTextColor = isLight ? "text-white" : "text-emerald-950";
  const subtitleTextColor = isLight ? "text-emerald-300" : "text-emerald-700";

  return (
    <div className={`relative flex items-center gap-3 ${size === 'large' ? 'gap-3.5' : ''}`}>
      <svg
        viewBox="0 0 200 200"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Ring */}
        <circle cx="100" cy="100" r="92" stroke={outerRingColor} strokeWidth="10" />
        
        {/* Inner Thin Border */}
        <circle cx="100" cy="100" r="81" stroke={innerRingColor} strokeWidth="2.5" />
        
        {/* Curved Text Paths */}
        <path
          id="textPathTop"
          d="M 26,100 A 74,74 0 1,1 174,100"
          fill="none"
        />
        <path
          id="textPathBottom"
          d="M 174,100 A 74,74 0 0,1 26,100"
          fill="none"
        />

        <text fill={textColor} fontSize="15" fontWeight="800" letterSpacing="3.5">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            QUALITY CAREERS
          </textPath>
        </text>

        <text fill={textColor} fontSize="15" fontWeight="800" letterSpacing="4">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            FRAMEWORK
          </textPath>
        </text>

        {/* Side Stars */}
        <path d="M 32 100 L 36 94 L 42 94 L 38 100 L 40 106 L 34 102 L 28 106 L 30 100 Z" fill={starColor} />
        <path d="M 168 100 L 172 94 L 178 94 L 174 100 L 176 106 L 170 102 L 164 106 L 166 100 Z" fill={starColor} />

        {/* Inner Arc */}
        <path
          d="M 55,100 A 45,45 0 0,1 145,100"
          stroke={innerRingColor}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 55,100 A 45,45 0 0,0 145,100"
          stroke={innerRingColor}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Central Bold QCF Text */}
        <text
          x="100"
          y="108"
          fill={textColor}
          fontSize="46"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          letterSpacing="1"
        >
          QCF
        </text>

        {/* Checkmark Icon inside bottom arc */}
        <path
          d="M 82,132 L 95,145 L 122,118"
          stroke={checkmarkColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div>
          <div className={`font-heading font-extrabold tracking-tight leading-none text-lg ${titleTextColor}`}>
            Quality Careers Framework
          </div>
          <div className={`text-xs font-medium tracking-wide mt-1 flex items-center gap-1.5 ${subtitleTextColor}`}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Dubai Schools Evaluation Platform
          </div>
        </div>
      )}
    </div>
  );
}
