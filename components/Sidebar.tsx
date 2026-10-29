'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCategory, AUTHOR } from '@/data/projects';
import { Wordmark } from './Wordmark';
import { SearchInput } from './SearchInput';
import { ArrowUpRight, Github, Linkedin, Mail, Copy, Check } from 'lucide-react';

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

// Crisp official 𝕏 icon
function XIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
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
  const [istTime, setIstTime] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(AUTHOR.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback
      onOpenContact();
    }
  };

  const formatCount = (count: number) => {
    return count.toString().padStart(2, '0');
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. MOBILE EDITORIAL INSET PANEL (<md)                     */}
      {/* Self-contained card with outer margin, NO hamburger icon  */}
      {/* All links & categories displayed inline matching reference */}
      {/* ======================================================== */}
      <section
        aria-label="Author introduction and navigation"
        className="md:hidden m-3 sm:m-4 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] p-4 sm:p-5 select-none shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4"
      >
        {/* Wordmark */}
        <div>
          <Wordmark
            isCompact={true}
            onClick={onResetToHome}
          />
        </div>

        {/* Short Personal Introduction */}
        <p className="text-xs text-[#252922] leading-relaxed">
          {AUTHOR.intro}
        </p>

        {/* "A little about me ↗" link with animated underline */}
        <div>
          <button
            onClick={onOpenAbout}
            className="editorial-link group gap-1 text-xs font-mono text-[#304738] hover:text-[#252922]"
          >
            <span className="editorial-link-text">A little about me</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Thin Divider */}
        <div className="border-t border-[#D8D6CA]" />

        {/* THE COLLECTION with total count */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2 px-1">
            <span>THE COLLECTION</span>
            <span className="tabular-nums">({formatCount(totalCount)})</span>
          </div>

          {/* Categories Grid (2 columns on mobile for compact inline fit) */}
          <div className="grid grid-cols-2 gap-1 font-mono text-xs">
            {categories.map((cat) => {
              const count = cat === "Everything" ? totalCount : categoryCounts[cat] || 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-[2px] text-left transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#E7E4F2] text-[#604BB4] font-medium'
                      : 'bg-transparent text-[#252922] hover:text-[#304738] category-hover'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className={`text-xs shrink-0 select-none ${isActive ? 'text-[#604BB4] font-bold' : 'text-[#77786E]'}`}>
                      {isActive ? '↳' : '·'}
                    </span>
                    <span className="truncate category-label">{cat}</span>
                  </span>
                  <span
                    className={`text-[10px] tabular-nums shrink-0 pl-1 ${
                      isActive ? 'text-[#604BB4] font-semibold' : 'text-[#77786E]'
                    }`}
                  >
                    {formatCount(count)}
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

        {/* Thin Divider */}
        <div className="border-t border-[#D8D6CA]" />

        {/* Structured Secondary Links */}
        <div className="flex flex-col gap-2 text-xs font-mono">
          <div>
            <button
              onClick={onOpenGlance}
              className="editorial-link group w-full flex items-center justify-between text-[#252922] hover:text-[#304738] text-left"
            >
              <span className="editorial-link-text">The work, at a glance</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <div>
            <button
              onClick={onOpenResume}
              className="editorial-link group w-full flex items-center justify-between text-[#252922] hover:text-[#304738] text-left"
            >
              <span className="editorial-link-text">Résumé</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Thin Divider */}
        <div className="border-t border-[#D8D6CA]" />

        {/* Say hello with copy action */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onOpenContact}
            className="editorial-link group gap-1 text-xs font-mono font-medium text-[#252922] hover:text-[#304738]"
          >
            <span className="editorial-link-text">Say hello</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="h-3.5 w-[1px] bg-[#D8D6CA]" />
            <button
              onClick={handleCopyEmail}
              title={copied ? "Email copied!" : "Copy email address"}
              aria-label={copied ? "Email copied" : "Copy email address to clipboard"}
              className="p-1 text-[#77786E] hover:text-[#252922] transition-colors cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#304738]" />
                  <span className="text-[10px] font-mono text-[#304738]">Copied</span>
                </>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center gap-3.5 text-[#77786E] pt-1">
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
          {AUTHOR.links.x && (
            <a
              href={AUTHOR.links.x}
              target="_blank"
              rel="noopener noreferrer"
              title="X Profile"
              aria-label="X Profile"
              className="hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer p-0.5"
            >
              <XIcon className="w-3.5 h-3.5" />
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

        {/* Tagline */}
        <p className="italic font-serif text-[11px] text-[#252922]">
          &ldquo;{AUTHOR.tagline}&rdquo;
        </p>

        {/* Location & IST Time */}
        <div className="text-[10px] font-mono text-[#77786E] flex items-center justify-between pt-1 border-t border-[#D8D6CA]/60">
          <span>{AUTHOR.location}</span>
          {istTime && <span className="text-[#304738] font-medium">{istTime}</span>}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DESKTOP PERSISTENT EDITORIAL SIDEBAR (>=md)          */}
      {/* Inset panel matching unabrijed.xyz proportions & order   */}
      {/* ======================================================== */}
      <div className="hidden md:block w-[248px] lg:w-[260px] shrink-0 p-3 lg:p-4 pr-0 sticky top-0 h-screen select-none">
        <aside
          aria-label="Portfolio sidebar navigation"
          className="w-full h-full bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 lg:p-5.5 flex flex-col justify-between overflow-y-auto"
        >
          <div className="space-y-4 lg:space-y-4.5">
            {/* 1. Distinctive Wordmark */}
            <div>
              <Wordmark onClick={onResetToHome} />
            </div>

            {/* 2. Short Introduction (Clean, unquoted) */}
            <p className="text-xs text-[#252922] leading-relaxed">
              {AUTHOR.intro}
            </p>

            {/* 3. "A little about me ↗" link with animated underline */}
            <div>
              <button
                onClick={onOpenAbout}
                className="editorial-link group gap-1 text-xs font-mono text-[#304738] hover:text-[#252922]"
              >
                <span className="editorial-link-text">A little about me</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* 4. Thin horizontal divider */}
            <div className="border-t border-[#D8D6CA]" />

            {/* 5. THE COLLECTION with dynamic item count */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2 px-1">
                <span>THE COLLECTION</span>
                <span className="tabular-nums">({formatCount(totalCount)})</span>
              </div>

              {/* 6. Collection Categories:
                  - Active: bg-[#E7E4F2] text-[#604BB4] with ↳ indicator
                  - Inactive: · indicator, animated text underline on hover (NO pill box)
              */}
              <nav aria-label="Project categories" className="space-y-0.5">
                {categories.map((cat) => {
                  const count = cat === "Everything" ? totalCount : categoryCounts[cat] || 0;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => onSelectCategory(cat)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono rounded-[2px] text-left transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#E7E4F2] text-[#604BB4] font-medium'
                          : 'bg-transparent text-[#252922] hover:text-[#304738] category-hover'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`text-xs shrink-0 select-none ${isActive ? 'text-[#604BB4] font-bold' : 'text-[#77786E]'}`}>
                          {isActive ? '↳' : '·'}
                        </span>
                        <span className="truncate category-label">{cat}</span>
                      </span>
                      <span
                        className={`text-[10px] tabular-nums shrink-0 pl-1 ${
                          isActive ? 'text-[#604BB4] font-semibold' : 'text-[#77786E]'
                        }`}
                      >
                        {formatCount(count)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* 7. Search Field directly under categories */}
            <div className="pt-0.5">
              <SearchInput
                query={searchQuery}
                onChange={onSearchChange}
              />
            </div>

            {/* 8. Thin horizontal divider */}
            <div className="border-t border-[#D8D6CA]" />

            {/* 9 & 10. "The work, at a glance ↗" & "Résumé ↗" */}
            <div className="space-y-2">
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

          {/* 11. Divider and Bottom Group */}
          <div className="pt-4 border-t border-[#D8D6CA] space-y-3">
            {/* 12. "Say hello ↗" with Copy Email button */}
            <div className="flex items-center justify-between">
              <button
                onClick={onOpenContact}
                className="editorial-link group gap-1 text-xs font-mono font-medium text-[#252922] hover:text-[#304738]"
              >
                <span className="editorial-link-text">Say hello</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <div className="flex items-center gap-2">
                <div className="h-3.5 w-[1px] bg-[#D8D6CA]" />
                <button
                  onClick={handleCopyEmail}
                  title={copied ? "Email copied!" : "Copy email address"}
                  aria-label={copied ? "Email copied" : "Copy email address to clipboard"}
                  className="p-1 text-[#77786E] hover:text-[#252922] transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#304738]" />
                      <span className="text-[10px] font-mono text-[#304738]">Copied</span>
                    </>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* 13. Social Icons: GitHub, LinkedIn, 𝕏, Email */}
            <div className="flex items-center gap-3.5 text-[#77786E]">
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

              {AUTHOR.links.x && (
                <a
                  href={AUTHOR.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X Profile"
                  aria-label="X Profile"
                  className="hover:text-[#304738] transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer p-0.5"
                >
                  <XIcon className="w-3.5 h-3.5" />
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

            {/* 14. Personal Tagline */}
            <p className="italic font-serif text-[11px] text-[#252922]">
              &ldquo;{AUTHOR.tagline}&rdquo;
            </p>

            {/* 15. Location and Live Time */}
            <div className="text-[10px] font-mono text-[#77786E] flex items-center justify-between pt-1 border-t border-[#D8D6CA]/60">
              <span>{AUTHOR.location}</span>
              {istTime && <span className="text-[#304738] font-medium">{istTime}</span>}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
