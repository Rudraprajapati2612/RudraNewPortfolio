'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  query: string;
  onChange: (query: string) => void;
  className?: string;
}

export function SearchInput({ query, onChange, className = '' }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /Mac|iPhone|iPod|iPad/.test(navigator.platform || navigator.userAgent);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K focus
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Escape key clears or blurs
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        if (query) {
          onChange('');
        } else {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query, onChange]);

  return (
    <div className={`relative flex items-center w-full min-w-0 box-border ${className}`}>
      {/* Left Search Icon */}
      <Search className="w-3.5 h-3.5 absolute left-3 text-[#77786E] pointer-events-none shrink-0 z-10" />
      
      {/* Input Field: min-w-0, full-width, right-padding reserves space for badge/clear */}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Find something..."
        aria-label="Search collection by title, tag, category, or description"
        className="w-full min-w-0 h-9 pl-8.5 pr-13 py-2 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] text-[11px] sm:text-xs font-mono text-[#252922] placeholder:text-[#77786E] focus:outline-none focus:border-[#304738] focus:ring-1 focus:ring-[#304738] transition-colors cursor-text box-border"
      />
      
      {/* Right controls: Clear button or shortcut indicator */}
      <div className="absolute right-2.5 flex items-center shrink-0 z-10">
        {query ? (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search input"
            className="p-1 text-[#77786E] hover:text-[#252922] transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd
            className="inline-flex items-center px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono text-[#77786E] bg-[#EDE7D8] border border-[#D8D6CA] rounded-[2px] pointer-events-none select-none shrink-0"
            title={isMac ? 'Shortcut: ⌘ K' : 'Shortcut: Ctrl+K'}
          >
            {isMac ? '⌘ K' : 'Ctrl+K'}
          </kbd>
        )}
      </div>
    </div>
  );
}
