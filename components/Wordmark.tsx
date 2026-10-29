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
      className={`group cursor-pointer select-none text-left transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#304738] rounded-[2px] inline-block ${className}`}
      aria-label="Rudra Prajapati portfolio home"
    >
      <div className="relative inline-block">
        {/* Name with subtle arrow accent */}
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif tracking-tight text-[#252922] group-hover:text-[#304738] transition-colors duration-250 leading-none font-bold whitespace-nowrap block ${
              isCompact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[25px]'
            }`}
          >
            Rudra Prajapati
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#93A18A] group-hover:text-[#304738] transition-all duration-250 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Hand-drawn organic underline that animates / draws on hover */}
        <div className="w-full h-2 mt-1 overflow-visible relative">
          <svg
            viewBox="0 0 160 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#304738] transition-all duration-300 origin-left scale-x-90 group-hover:scale-x-100 opacity-60 group-hover:opacity-100"
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
      </div>

      {/* Descriptor beneath */}
      <p className="font-mono text-[10px] tracking-[0.16em] text-[#77786E] uppercase mt-0.5">
        ENGINEER / BUILDER / EXPLORER
      </p>
    </div>
  );
}
