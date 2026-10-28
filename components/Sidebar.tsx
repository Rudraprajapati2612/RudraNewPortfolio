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
            className="shrink-0 px-3 py-1.5 bg-[#EDE7D8] hover:bg-[#E7E4F2] border border-[#D8D6CA] hover:border-[#604BB4]/40 rounded-[2px] text-xs font-mono font-medium text-[#252922] transition-colors"
          >
            {isMobileExpanded ? 'Close' : 'Explore +'}
          </button>
        </div>

        {/* Short Personal Introduction */}
        <p className="text-xs text-[#77786E] leading-relaxed mt-3">
          &ldquo;{AUTHOR.intro}&rdquo;
        </p>

        {/* Small "A little about me ↗" link */}
        <div className="mt-2.5">
          <button
            onClick={onOpenAbout}
            className="group inline-flex items-center gap-1 text-xs font-mono text-[#304738] hover:text-[#252922] transition-colors"
          >
            <span className="underline underline-offset-4 decoration-[#CAD5B3] group-hover:decoration-[#304738]">
              A little about me
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Inline Expanded Mobile Content (Pushes collection down naturally) */}
        {isMobileExpanded && (
          <div className="mt-5 pt-5 border-t border-[#D8D6CA] space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Search Input */}
            <div>
              <SearchInput
                query={searchQuery}
                onChange={onSearchChange}
              />
            </div>

            {/* Collection Categories */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2 px-1">
                <span>COLLECTION CATEGORIES</span>
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
                      className={`flex items-center justify-between px-2.5 py-2 text-xs font-mono rounded-[2px] text-left transition-colors ${
                        isActive
                          ? 'bg-[#E7E4F2] text-[#604BB4] font-medium'
                          : 'bg-[#EDE7D8]/50 text-[#252922] hover:bg-[#EDE7D8]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#604BB4]' : 'bg-[#D8D6CA]'}`} />
                        <span className="truncate">{cat}</span>
                      </span>
                      <span className="text-[10px] tabular-nums text-[#77786E] shrink-0 pl-1">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Structured Links */}
            <div className="pt-3 border-t border-[#D8D6CA] grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => {
                  setIsMobileExpanded(false);
                  onOpenGlance();
                }}
                className="p-2.5 bg-[#EDE7D8]/40 border border-[#D8D6CA] rounded-[2px] text-left flex items-center justify-between hover:border-[#93A18A]"
              >
                <span>The work, at a glance</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E]" />
              </button>

              <button
                onClick={() => {
                  setIsMobileExpanded(false);
                  onOpenResume();
                }}
                className="p-2.5 bg-[#EDE7D8]/40 border border-[#D8D6CA] rounded-[2px] text-left flex items-center justify-between hover:border-[#93A18A]"
              >
                <span>Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E]" />
              </button>
            </div>

            {/* Mobile Footer & Contact Strip */}
            <div className="pt-3 border-t border-[#D8D6CA] flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileExpanded(false);
                  onOpenContact();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#304738] hover:text-[#252922]"
              >
                <span className="underline underline-offset-4 decoration-[#CAD5B3]">
                  Say hello
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 text-[#77786E]">
                {AUTHOR.links.github && (
                  <a
                    href={AUTHOR.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-1 hover:text-[#252922]"
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
                    className="p-1 hover:text-[#252922]"
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
                  className="p-1 hover:text-[#252922]"
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
      {/* ======================================================== */}
      <aside
        aria-label="Portfolio sidebar navigation"
        className="hidden md:flex w-[260px] lg:w-[275px] shrink-0 sticky top-0 h-screen flex-col justify-between p-5 lg:p-6 bg-[#F8F7F1] border-r border-[var(--color-border)] select-none overflow-y-auto"
      >
        <div className="space-y-6">
          {/* 1. Distinctive Wordmark */}
          <Wordmark
            onClick={onResetToHome}
          />

          {/* 2. Short Introduction */}
          <p className="text-xs text-[#77786E] leading-relaxed">
            &ldquo;{AUTHOR.intro}&rdquo;
          </p>

          {/* 3. A little about me link */}
          <div>
            <button
              onClick={onOpenAbout}
              className="group inline-flex items-center gap-1 text-xs font-mono text-[#304738] hover:text-[#252922] transition-colors"
            >
              <span className="underline underline-offset-4 decoration-[#CAD5B3] group-hover:decoration-[#304738]">
                A little about me
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* 4. Search Control */}
          <div className="pt-1">
            <SearchInput
              query={searchQuery}
              onChange={onSearchChange}
            />
          </div>

          {/* 5. Collection Categories Navigation */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2.5 px-1">
              <span>COLLECTION</span>
              <span>[{totalCount}]</span>
            </div>

            <nav aria-label="Project categories" className="space-y-1">
              {categories.map((cat) => {
                const count = cat === "Everything" ? totalCount : categoryCounts[cat] || 0;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono rounded-[2px] transition-all text-left ${
                      isActive
                        ? 'bg-[#E7E4F2] text-[#604BB4] font-medium'
                        : 'text-[#77786E] hover:bg-[#EDE7D8]/80 hover:text-[#252922]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#604BB4]' : 'bg-[#D8D6CA]'
                        }`}
                      />
                      <span>{cat}</span>
                    </span>
                    <span
                      className={`text-[10px] tabular-nums ${
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

          {/* 6. Quick Index & Resume Links */}
          <div className="pt-2 border-t border-[#D8D6CA] space-y-2">
            <button
              onClick={onOpenGlance}
              className="group w-full flex items-center justify-between text-xs font-mono text-[#252922] hover:text-[#304738] py-1 transition-colors text-left"
            >
              <span className="group-hover:underline underline-offset-4 decoration-[#D8D6CA]">
                The work, at a glance
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] group-hover:text-[#304738] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onOpenResume}
              className="group w-full flex items-center justify-between text-xs font-mono text-[#252922] hover:text-[#304738] py-1 transition-colors text-left"
            >
              <span className="group-hover:underline underline-offset-4 decoration-[#D8D6CA]">
                Résumé
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] group-hover:text-[#304738] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 7. Bottom Contact & Understated Footer */}
        <div className="pt-6 border-t border-[#D8D6CA] space-y-4">
          <div>
            <button
              onClick={onOpenContact}
              className="group inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#304738] hover:text-[#252922] transition-colors"
            >
              <span className="underline underline-offset-4 decoration-[#CAD5B3] group-hover:decoration-[#304738]">
                Say hello
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Social Icons with Accessible Tooltips */}
          <div className="flex items-center gap-3 text-[#77786E]">
            {AUTHOR.links.github && (
              <a
                href={AUTHOR.links.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className="hover:text-[#252922] transition-colors p-1 -m-1"
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
                className="hover:text-[#252922] transition-colors p-1 -m-1"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={onOpenContact}
              title="Direct Email"
              aria-label="Direct Email"
              className="hover:text-[#252922] transition-colors p-1 -m-1"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Tagline and Location */}
          <div className="text-[10px] font-mono text-[#77786E] space-y-0.5">
            <p className="italic font-serif text-[11px] text-[#252922]">
              &ldquo;{AUTHOR.tagline}&rdquo;
            </p>
            <div className="flex items-center justify-between pt-1">
              <span>{AUTHOR.location}</span>
              {istTime && <span className="text-[#304738]">{istTime}</span>}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
