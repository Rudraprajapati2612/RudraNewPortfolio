'use client';

import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface CollectionHeaderProps {
  showDetails: boolean;
  onToggleDetails: () => void;
  motionEnabled: boolean;
  onToggleMotion: () => void;
  activeCategory: string;
  itemCount: number;
}

export function CollectionHeader({
  showDetails,
  onToggleDetails,
  motionEnabled,
  onToggleMotion,
  activeCategory,
  itemCount,
}: CollectionHeaderProps) {
  return (
    <div className="h-14 shrink-0 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border)] bg-[#F3F1E8] flex items-center justify-between text-xs font-mono">
      {/* Left editorial descriptor */}
      <div className="flex items-center gap-2 sm:gap-3 text-[#252922]">
        <span className="font-serif italic text-sm sm:text-base text-[#304738] font-normal">
          Work, play &amp; everything in between.
        </span>
        <span className="text-[#D8D6CA] hidden sm:inline">|</span>
        <span className="text-[11px] text-[#77786E] uppercase tracking-wider hidden sm:inline">
          {activeCategory} ({itemCount})
        </span>
      </div>

      {/* Right control toggles */}
      <div className="flex items-center gap-4">
        {/* Details Toggle */}
        <button
          onClick={onToggleDetails}
          aria-pressed={showDetails}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer ${
            showDetails
              ? 'bg-[#EDE7D8] border-[#93A18A] text-[#252922] font-medium'
              : 'bg-transparent border-[#D8D6CA] text-[#77786E] hover:text-[#252922]'
          }`}
          title="Toggle supporting card descriptions"
        >
          <SlidersHorizontal className="w-3 h-3 text-[#304738]" />
          <span className="text-[11px]">
            Details: <span className="font-semibold">{showDetails ? 'ON' : 'OFF'}</span>
          </span>
        </button>

        {/* Motion Toggle */}
        <button
          onClick={onToggleMotion}
          aria-pressed={motionEnabled}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] border transition-colors cursor-pointer ${
            motionEnabled
              ? 'bg-[#EDE7D8] border-[#93A18A] text-[#252922] font-medium'
              : 'bg-transparent border-[#D8D6CA] text-[#77786E] hover:text-[#252922]'
          }`}
          title="Toggle animations and transitions"
        >
          <Sparkles className="w-3 h-3 text-[#304738]" />
          <span className="text-[11px]">
            Motion: <span className="font-semibold">{motionEnabled ? 'ON' : 'OFF'}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
