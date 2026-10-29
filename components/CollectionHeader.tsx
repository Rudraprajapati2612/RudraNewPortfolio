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
    <div className="min-h-[50px] sm:min-h-[56px] shrink-0 px-4 sm:px-6 lg:px-8 py-2 bg-[#F3F1E8] border-b border-[var(--color-border)] flex items-center justify-between text-xs font-mono w-full min-w-0 box-border gap-3 select-none">
      {/* Left editorial descriptor matching image_c3d2469a.png */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-serif italic text-sm sm:text-base text-[#384337] leading-snug">
          Work. play &amp; everything in between.
        </span>
        <span className="text-[#D8D6CA] hidden lg:inline select-none">|</span>
        <span className="uppercase tracking-wider hidden lg:inline shrink-0 text-[#252922] font-mono text-[11px]">
          {activeCategory} ({itemCount})
        </span>
      </div>

      {/* Right toggle buttons matching previous design in reference screenshot */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Details Button */}
        <button
          type="button"
          onClick={onToggleDetails}
          aria-pressed={showDetails}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[3px] border transition-colors cursor-pointer select-none text-[10px] sm:text-[11px] font-mono shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
            showDetails
              ? 'bg-[#E7E2D3] border-[#BCB6A4] text-[#252922]'
              : 'bg-[#F2EFE7] border-[#D6D2C4] text-[#7A7B72] hover:text-[#252922]'
          }`}
          title="Toggle project details"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#304738] shrink-0" />
          <div className="flex flex-col items-center justify-center leading-none">
            <span className="text-[9.5px] sm:text-[10px] text-[#4F5448]">Details:</span>
            <span className="text-[10px] sm:text-[11px] font-bold mt-0.5">
              {showDetails ? 'ON' : 'OFF'}
            </span>
          </div>
        </button>

        {/* Motion Button */}
        <button
          type="button"
          onClick={onToggleMotion}
          aria-pressed={motionEnabled}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[3px] border transition-colors cursor-pointer select-none text-[10px] sm:text-[11px] font-mono shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
            motionEnabled
              ? 'bg-[#E7E2D3] border-[#BCB6A4] text-[#252922]'
              : 'bg-[#F2EFE7] border-[#D6D2C4] text-[#7A7B72] hover:text-[#252922]'
          }`}
          title="Toggle motion and animations"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#304738] shrink-0" />
          <div className="flex flex-col items-center justify-center leading-none">
            <span className="text-[9.5px] sm:text-[10px] text-[#4F5448]">Motion:</span>
            <span className="text-[10px] sm:text-[11px] font-bold mt-0.5">
              {motionEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
