'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCategory, AUTHOR, ProjectItem } from '@/data/projects';
import { SearchInput } from './SearchInput';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X, Sparkles } from 'lucide-react';

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
}: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* Mobile Sticky Top Header (<md) */}
      <div className="md:hidden sticky top-0 z-40 bg-[#F8F7F1] border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-sm text-[#252922] tracking-tight">
            {AUTHOR.name}
          </h1>
          <p className="text-[10px] font-mono text-[#77786E] tracking-wider uppercase">
            {AUTHOR.role}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenContact}
            aria-label="Say hello"
            className="text-xs font-mono text-[#304738] px-2.5 py-1 border border-[#D8D6CA] rounded-[2px] bg-[#EDE7D8]"
          >
            Say hello ↗
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-1.5 text-[#252922] border border-[#D8D6CA] rounded-[2px] bg-[#F8F7F1]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-[#252922]/50 backdrop-blur-xs pt-14"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#F8F7F1] border-b border-[var(--color-border)] p-5 max-h-[85vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchInput
              query={searchQuery}
              onChange={onSearchChange}
            />

            <div>
              <p className="text-[11px] font-mono uppercase text-[#77786E] tracking-wider mb-2">
                COLLECTION [{totalCount}]
              </p>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const count = cat === "Everything" ? totalCount : categoryCounts[cat] || 0;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono rounded-[2px] transition-colors ${
                        isActive
                          ? 'bg-[#E7E4F2] text-[#604BB4] font-semibold'
                          : 'text-[#252922] hover:bg-[#EDE7D8]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#604BB4]' : 'bg-[#D8D6CA]'}`} />
                        {cat}
                      </span>
                      <span className="text-[10px] text-[#77786E]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#D8D6CA] space-y-2 text-xs font-mono">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAbout();
                }}
                className="w-full text-left py-1 text-[#304738] flex items-center justify-between"
              >
                <span>A little about me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGlance();
                }}
                className="w-full text-left py-1 text-[#252922] flex items-center justify-between"
              >
                <span>The work, at a glance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full text-left py-1 text-[#252922] flex items-center justify-between"
              >
                <span>Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside
        aria-label="Portfolio sidebar navigation"
        className="hidden md:flex w-[260px] lg:w-[270px] shrink-0 sticky top-0 h-screen flex-col justify-between p-5 lg:p-6 bg-[#F8F7F1] border-r border-[var(--color-border)] select-none overflow-y-auto"
      >
        <div className="space-y-6">
          {/* 1. Identity & Descriptor */}
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#252922]">
              {AUTHOR.name}
            </h1>
            <p className="text-[10px] font-mono tracking-wider text-[#77786E] uppercase mt-0.5">
              {AUTHOR.role}
            </p>
          </div>

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
                        : 'text-[#252922] hover:bg-[#EDE7D8]/80 text-[#77786E] hover:text-[#252922]'
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
