'use client';

import React from 'react';

interface WordmarkProps {
  onClick?: () => void;
  className?: string;
  isCompact?: boolean;
}

export function Wordmark({ onClick, className = '', isCompact = false }: WordmarkProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group cursor-pointer select-none text-left transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#304738] rounded-[2px] ${className}`}
      aria-label="Rudra Prajapati portfolio home"
    >
      <div className="inline-block relative">
        <span
          className={`font-serif tracking-tight text-[#252922] group-hover:text-[#304738] transition-colors leading-none font-bold block ${
            isCompact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-[26px]'
          }`}
        >
          Rudra Prajapati
        </span>
        {/* Subtle, fine organic editorial underline inspired by unabrijed.xyz */}
        <svg
          viewBox="0 0 160 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-1.5 text-[#304738]/50 group-hover:text-[#304738] transition-all duration-300 mt-1"
          preserveAspectRatio="none"
        >
          <path
            d="M 2 4.5 Q 42 1.5, 80 4.5 T 158 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="font-mono text-[10px] tracking-[0.16em] text-[#77786E] uppercase mt-1">
        ENGINEER / BUILDER / EXPLORER
      </p>
    </div>
  );
}
