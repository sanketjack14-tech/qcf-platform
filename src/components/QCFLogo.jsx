import React from 'react';

export default function QCFLogo({ className = "w-12 h-12", size = "normal", variant = "dark", showText = true }) {
  const isLight = variant === "light";
  const titleTextColor = isLight ? "text-white" : "text-emerald-950";
  const subtitleTextColor = isLight ? "text-emerald-300" : "text-emerald-700";

  return (
    <div className={`relative flex items-center gap-3 ${size === 'large' ? 'gap-3.5' : ''}`}>
      <img
        src="/qcf_logo.jpg"
        alt="Quality Careers Framework Logo"
        className={`${className} object-contain rounded-full shadow-lg shrink-0 ring-2 ring-emerald-500/30 bg-black`}
      />

      {showText && (
        <div>
          <div className={`font-black tracking-tight leading-none font-heading ${titleTextColor} ${size === 'large' ? 'text-xl' : 'text-base'}`}>
            QUALITY CAREERS
          </div>
          <div className={`font-bold tracking-wider uppercase text-[10px] ${subtitleTextColor} mt-1 flex items-center gap-1.5`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            FRAMEWORK (QCF)
          </div>
        </div>
      )}
    </div>
  );
}
