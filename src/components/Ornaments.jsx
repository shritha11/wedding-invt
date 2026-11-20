import React from 'react';

/**
 * Auspicious Lord Ganesha Emblem (Delicate Champagne Gold)
 */
export function GaneshaIcon({ className = "w-10 h-10", color = "#C4A46A" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lord Ganesha Emblem"
    >
      {/* Crown / Mukut */}
      <path d="M50 12 L56 26 L44 26 Z M48 27 H52 V32 H48 Z" />
      <circle cx="50" cy="18" r="2.5" />
      
      {/* Head & Forehead Tilak */}
      <path d="M38 32 C38 28 62 28 62 32 C62 38 58 42 50 44 C42 42 38 38 38 32 Z" opacity="0.9" />
      <path d="M47 28 H53 V38 H47 Z" fill="#C4A46A" />
      <circle cx="50" cy="34" r="1.5" fill="#603A3D" />

      {/* Ears */}
      <path d="M38 32 C30 30 25 38 26 46 C27 52 34 54 39 48 C37 42 37 36 38 32 Z" />
      <path d="M62 32 C70 30 75 38 74 46 C73 52 66 54 61 48 C63 42 63 36 62 32 Z" />

      {/* Trunk */}
      <path d="M48 42 C48 50 49 58 44 65 C40 70 32 70 32 64 C32 60 37 60 38 64 C39 67 42 67 44 63 C47 57 46 51 46 42 Z" />

      {/* Modak bowl on palm */}
      <circle cx="31" cy="62" r="3.5" />

      {/* Blessings Hand */}
      <path d="M66 54 C66 48 72 49 72 55 C72 61 68 64 64 64 L65 57 Z" />
      <circle cx="68" cy="55" r="1.5" fill="#C4A46A" />

      {/* Base Lotus */}
      <path d="M26 84 C34 76 45 80 50 86 C55 80 66 76 74 84 C66 90 58 88 50 92 C42 88 34 90 26 84 Z" opacity="0.85" />
    </svg>
  );
}

/**
 * Traditional Temple Gopuram (Delicate Outline)
 */
export function GopuramIcon({ className = "w-14 h-14", color = "#C4A46A" }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 6 V14 M56 14 H64 M58 10 H62" />
      <path d="M54 18 H66 L68 28 H52 Z" />
      <path d="M48 28 H72 L75 40 H45 Z" />
      <path d="M42 40 H78 L82 54 H38 Z" />
      <path d="M34 54 H86 L90 70 H30 Z" />
      <path d="M24 70 H96 L98 90 H22 Z" />
      <path d="M50 90 V76 Q60 70 70 76 V90" />
      <circle cx="60" cy="47" r="2" fill={color} />
    </svg>
  );
}

/**
 * Delicate Botanical Garland / Toran (Sage & Muted Blush)
 */
export function BotanicalToran() {
  return (
    <div className="w-full flex justify-center items-center py-4 select-none pointer-events-none opacity-80">
      <svg viewBox="0 0 800 36" className="w-full max-w-4xl h-8" fill="none">
        <path d="M0 10 Q100 22 200 10 Q300 22 400 10 Q500 22 600 10 Q700 22 800 10" stroke="#C4A46A" strokeWidth="1" strokeDasharray="3 3" />
        {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750].map((cx, i) => (
          <g key={i}>
            {/* Sage leaf */}
            <path 
              d={`M${cx} 12 C${cx - 4} 18 ${cx - 3} 26 ${cx} 30 C${cx + 3} 26 ${cx + 4} 18 ${cx} 12 Z`} 
              fill="#A7AD91" 
              opacity="0.8" 
            />
            {/* Blush blossom dot */}
            <circle cx={cx} cy={11} r="3" fill="#D9B9B0" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Minimal Editorial Divider
 */
export function EditorialDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8 opacity-75">
      <div className="w-12 h-[1px] bg-[#C4A46A]/60" />
      <span className="text-[#C4A46A] text-xs">✦</span>
      <div className="w-12 h-[1px] bg-[#C4A46A]/60" />
    </div>
  );
}
