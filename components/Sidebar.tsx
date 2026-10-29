'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCategory, AUTHOR } from '@/data/projects';
import { Wordmark } from './Wordmark';
import { SearchInput } from './SearchInput';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

interface SidebarProps {
  categories: ("Everything" | ProjectCategory)[];
  activeCategory: "Everything" | ProjectCategory;
  onSelectCategory: (cat: "Everything" | ProjectCategory) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAbout: () => void;
  onOpenGlance: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onResetToHome?: () => void;
}

export function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
  totalCount,
  searchQuery,
  onSearchChange,
  onOpenAbout,
  onOpenGlance,
  onOpenResume,
  onOpenContact,
  onResetToHome,
}: SidebarProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setIstTime(timeStr);
      } catch (e) {
        setIstTime('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ======================================================== */}
      {/* 1. MOBILE EDITORIAL COMPACT EXPANDABLE PANEL (<md)       */}
      {/* Inline expansion without hamburger icons or overlays     */}
      {/* ======================================================== */}
      <section
        aria-label="Author introduction and navigation"
        className="md:hidden w-full bg-[#F8F7F1] border-b border-[var(--color-border)] p-4 sm:p-5 transition-all duration-300"
      >
        {/* Top Header Row with Wordmark and Text Control */}
        <div className="flex items-start justify-between gap-3">
          <Wordmark
            isCompact={true}
            onClick={() => {
              onResetToHome?.();
              setIsMobileExpanded(false);
            }}
          />

          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            aria-expanded={isMobileExpanded}
            aria-label={isMobileExpanded ? 'Close navigation panel' : 'Explore collection filters and links'}
            className="shrink-0 px-3 py-1.5 bg-[#EDE7D8] hover:bg-[#E7E4F2] border border-[#D8D6CA] hover:border-[#604BB4]/40 rounded-[2px] text-xs font-mono font-medium text-[#252922] transition-colors cursor-pointer"
          >
            {isMobileExpanded ? 'Close' : 'Explore +'}
          </button>
        </div>

        {/* Short Personal Introduction */}
        <p className="text-xs text-[#77786E] leading-relaxed mt-3">
          &ldquo;{AUTHOR.intro}&rdquo;
        </p>

        {/* Small "A little about me ↗" link with animated underline */}
        <div className="mt-2.5">
          <button
            onClick={onOpenAbout}
            className="editorial-link group gap-1 text-xs font-mono text-[#304738] hover:text-[#252922]"
          >
            <span className="editorial-link-text">A little about me</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Inline Expanded Mobile Content (Pushes collection down naturally) */}
        {isMobileExpanded && (
          <div className="mt-5 pt-5 border-t border-[#D8D6CA] space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Collection Categories */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2.5 px-1">
                <span>THE COLLECTION</span>
                <span>[{totalCount}]</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((cat) => {
                  const count = cat === "Everything" ? totalCount : categoryCounts[cat] || 0;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        setIsMobileExpanded(false);
                      }}
                      className={`flex items-center justify-between px-2.5 py-2 text-xs font-mono rounded-[2px] text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#E7E4F2] text-[#604BB4] font-medium'
                          : 'bg-transparent text-[#252922] hover:text-[#304738] category-hover'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform ${
                            isActive
                              ? 'bg-[#604BB4] scale-110'
                              : 'bg-[#CAD5B3] group-hover:bg-[#304738]'
                          }`}
                        />
                        <span className="truncate category-label">{cat}</span>
                      </span>
                      <span
                        className={`text-[10px] tabular-nums shrink-0 pl-1 ${
                          isActive ? 'text-[#604BB4]' : 'text-[#77786E]'
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input */}
            <div>
              <SearchInput
                query={searchQuery}
                onChange={onSearchChange}
              />
            </div>

            {/* Structured Links with animated underlines */}
            <div className="pt-3 border-t border-[#D8D6CA] flex flex-col gap-2.5 text-xs font-mono">
              <div>
                <button
                  onClick={() => {
                    setIsMobileExpanded(false);
                    onOpenGlance();
                  }}
                  className="editorial-link group gap-1 text-xs font-mono text-[#252922] hover:text-[#304738]"
                >
                  <span className="editorial-link-text">The work, at a glance</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setIsMobileExpanded(false);
                    onOpenResume();
                  }}
                  className="editorial-link group gap-1 text-xs font-mono text-[#252922] hover:text-[#304738]"
                >
                  <span className="editorial-link-text">Résumé</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Mobile Footer & Contact Strip */}
            <div className="pt-3 border-t border-[#D8D6CA] flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileExpanded(false);
                  onOpenContact();
                }}
                className="editorial-link group gap-1 text-xs font-mono font-medium text-[#304738] hover:text-[#252922]"
              >
                <span className="editorial-link-text">Say hello</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <div className="flex items-center gap-3 text-[#77786E]">
                {AUTHOR.links.github && (
                  <a
                    href={AUTHOR.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-1 hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {AUTHOR.links.linkedin && (
                  <a
                    href={AUTHOR.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-1 hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => {
                    setIsMobileExpanded(false);
                    onOpenContact();
                  }}
                  aria-label="Email Rudra"
                  className="p-1 hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 2. DESKTOP PERSISTENT EDITORIAL SIDEBAR (>=md)          */}
      {/* Matches reference width (250px), padding, and order      */}
      {/* ======================================================== */}
      <aside
        aria-label="Portfolio sidebar navigation"
        className="hidden md:flex w-[240px] lg:w-[255px] shrink-0 sticky top-0 h-screen flex-col justify-between px-5 lg:px-6 py-6 bg-[#F8F7F1] border-r border-[var(--color-border)] select-none overflow-y-auto"
      >
        <div className="space-y-5">
          {/* 1. Distinctive Wordmark (includes ENGINEER / BUILDER / EXPLORER descriptor) */}
          <div>
            <Wordmark onClick={onResetToHome} />
          </div>

          {/* 3. Short Introduction */}
          <p className="text-xs text-[#77786E] leading-relaxed">
            &ldquo;{AUTHOR.intro}&rdquo;
          </p>

          {/* 4. "A little about me ↗" link with animated underline */}
          <div>
            <button
              onClick={onOpenAbout}
              className="editorial-link group gap-1 text-xs font-mono text-[#304738] hover:text-[#252922]"
            >
              <span className="editorial-link-text">A little about me</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* 5. Thin horizontal divider */}
          <div className="border-t border-[#D8D6CA]" />

          {/* 6. THE COLLECTION with dynamic item count */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2 px-1">
              <span>THE COLLECTION</span>
              <span className="tabular-nums">[{totalCount}]</span>
            </div>

            {/* 7. Collection Categories with animated underline on hover, NO box hover */}
            <nav aria-label="Project categories" className="space-y-1">
              {categories.map((cat) => {
                const count = cat === "Everything" ? totalCount : categoryCounts[cat] || 0;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono rounded-[2px] text-left transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#E7E4F2] text-[#604BB4] font-medium'
                        : 'bg-transparent text-[#252922] hover:text-[#304738] category-hover'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform ${
                          isActive
                            ? 'bg-[#604BB4] scale-110'
                            : 'bg-[#CAD5B3] group-hover:bg-[#304738]'
                        }`}
                      />
                      <span className="truncate category-label">{cat}</span>
                    </span>
                    <span
                      className={`text-[10px] tabular-nums shrink-0 pl-1 ${
                        isActive ? 'text-[#604BB4]' : 'text-[#77786E]'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 8. Search Field directly under categories */}
          <div className="pt-1">
            <SearchInput
              query={searchQuery}
              onChange={onSearchChange}
            />
          </div>

          {/* 9. Divider */}
          <div className="border-t border-[#D8D6CA]" />

          {/* 10 & 11. "The work, at a glance ↗" & "Résumé ↗" */}
          <div className="space-y-2.5">
            <div>
              <button
                onClick={onOpenGlance}
                className="editorial-link group w-full flex items-center justify-between text-xs font-mono text-[#252922] hover:text-[#304738] text-left"
              >
                <span className="editorial-link-text">The work, at a glance</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <div>
              <button
                onClick={onOpenResume}
                className="editorial-link group w-full flex items-center justify-between text-xs font-mono text-[#252922] hover:text-[#304738] text-left"
              >
                <span className="editorial-link-text">Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 12. Divider and Bottom Group */}
        <div className="pt-5 border-t border-[#D8D6CA] space-y-3.5">
          {/* 13. "Say hello ↗" */}
          <div>
            <button
              onClick={onOpenContact}
              className="editorial-link group gap-1 text-xs font-mono font-medium text-[#304738] hover:text-[#252922]"
            >
              <span className="editorial-link-text">Say hello</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* 14. Social Icons without bounding box */}
          <div className="flex items-center gap-3 text-[#77786E]">
            {AUTHOR.links.github && (
              <a
                href={AUTHOR.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer p-0.5"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {AUTHOR.links.linkedin && (
              <a
                href={AUTHOR.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className="hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer p-0.5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={onOpenContact}
              title="Direct Email"
              aria-label="Direct Email"
              className="hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer p-0.5"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>

          {/* 15. Personal Tagline */}
          <p className="italic font-serif text-[11px] text-[#252922]">
            &ldquo;{AUTHOR.tagline}&rdquo;
          </p>

          {/* 16. Location and Time */}
          <div className="text-[10px] font-mono text-[#77786E] flex items-center justify-between pt-0.5 border-t border-[#D8D6CA]/60">
            <span>{AUTHOR.location}</span>
            {istTime && <span className="text-[#304738] font-medium">{istTime}</span>}
          </div>
        </div>
      </aside>
    </>
  );
}
