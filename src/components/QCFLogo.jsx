import React from 'react';

export default function QCFLogo({ className = "w-10 h-10", size = "normal" }) {
  return (
    <div className={`relative flex items-center gap-3 ${size === 'large' ? 'gap-4' : ''}`}>
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Dark Ring */}
        <circle cx="100" cy="100" r="94" stroke="#16362B" strokeWidth="11" />
        
        {/* Inner Thin Border */}
        <circle cx="100" cy="100" r="82" stroke="#52967E" strokeWidth="2.5" />
        
        {/* Circular Curved Text Path */}
        <path
          id="textPathTop"
          d="M 25,100 A 75,75 0 1,1 175,100"
          fill="none"
        />
        <path
          id="textPathBottom"
          d="M 175,100 A 75,75 0 0,1 25,100"
          fill="none"
        />

        <text fill="#16362B" fontSize="16" fontWeight="800" letterSpacing="3.5">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            QUALITY CAREERS
          </textPath>
        </text>

        <text fill="#16362B" fontSize="16" fontWeight="800" letterSpacing="4">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            FRAMEWORK
          </textPath>
        </text>

        {/* Side Stars */}
        <path d="M 32 100 L 36 94 L 42 94 L 38 100 L 40 106 L 34 102 L 28 106 L 30 100 Z" fill="#52967E" />
        <path d="M 168 100 L 172 94 L 178 94 L 174 100 L 176 106 L 170 102 L 164 106 L 166 100 Z" fill="#52967E" />

        {/* Inner Arc */}
        <path
          d="M 55,100 A 45,45 0 0,1 145,100"
          stroke="#52967E"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 55,100 A 45,45 0 0,0 145,100"
          stroke="#52967E"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Central Bold QCF Text */}
        <text
          x="100"
          y="108"
          fill="#16362B"
          fontSize="48"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          letterSpacing="1"
        >
          QCF
        </text>

        {/* Emerald Checkmark Icon at bottom inside arc */}
        <path
          d="M 82,132 L 95,145 L 122,118"
          stroke="#2C6450"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div>
        <div className="font-heading font-extrabold text-emerald-950 tracking-tight leading-none text-lg">
          Quality Careers Framework
        </div>
        <div className="text-xs font-medium text-emerald-700 tracking-wide mt-0.5 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Dubai Schools Evaluation Platform
        </div>
      </div>
    </div>
  );
}
