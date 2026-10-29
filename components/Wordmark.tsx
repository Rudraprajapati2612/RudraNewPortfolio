'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface WordmarkProps {
  onClick?: () => void;
  className?: string;
  isCompact?: boolean;
}

export function Wordmark({ onClick, className = '', isCompact = false }: WordmarkProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group cursor-pointer select-none text-left transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#304738] rounded-[2px] inline-block min-w-0 max-w-full ${className}`}
      aria-label="Rudra Prajapati portfolio home"
    >
      <div className="relative inline-block max-w-full min-w-0">
        {/* Name with subtle dot & arrow accent */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`font-serif tracking-tight text-[#252922] group-hover:text-[#304738] transition-colors duration-200 leading-none font-bold block whitespace-nowrap ${
              isCompact ? 'text-[17px] xs:text-[19px] sm:text-[20px]' : 'text-[19px] sm:text-[21px] lg:text-[22px]'
            }`}
          >
            Rudra Prajapati<span className="text-[#604BB4]">.</span>
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#604BB4] group-hover:text-[#304738] transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </div>

        {/* Hand-drawn organic wavy underline ending in dot matching unabrijed.xyz */}
        <div className="w-full h-2 mt-1 overflow-visible relative">
          <svg
            viewBox="0 0 160 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#77786E]/70 group-hover:text-[#304738] transition-all duration-300 origin-left"
            preserveAspectRatio="none"
          >
            <path
              d="M 2 5.5 C 35 1.5, 55 9.5, 90 4.5 C 120 0.5, 138 7.5, 153 5.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              className="wordmark-wave"
            />
            <circle cx="157" cy="5.5" r="2" fill="#604BB4" />
          </svg>
        </div>
      </div>

      {/* Descriptor beneath - EXPLORER fully visible and never truncated */}
      <p className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.09em] sm:tracking-[0.12em] text-[#77786E] uppercase mt-1 whitespace-nowrap">
        ENGINEER / BUILDER / EXPLORER
      </p>
    </div>
  );
}
