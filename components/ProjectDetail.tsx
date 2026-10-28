'use client';

import React, { useEffect } from 'react';
import { ProjectItem } from '@/data/projects';
import { VisualPanel } from './VisualPanels';
import { SkillsPanel } from './SkillsPanel';
import { X, ArrowUpRight, Github, ExternalLink, Calendar, Clock, Tag } from 'lucide-react';

interface ProjectDetailProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject?: (project: ProjectItem) => void;
  allProjects?: ProjectItem[];
}

export function ProjectDetail({
  project,
  onClose,
  onSelectProject,
  allProjects,
}: ProjectDetailProps) {
  useEffect(() => {
    if (!project) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Render headline with selective serif italic
  const renderHeadline = () => {
    if (!project.headlineSerif) {
      return project.headline;
    }
    const parts = project.headline.split(new RegExp(`(${project.headlineSerif})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => {
          if (part.toLowerCase() === project.headlineSerif?.toLowerCase()) {
            return (
              <span key={i} className="font-serif italic font-normal text-[#304738]">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-8 bg-[#252922]/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Main Full-height Editorial Modal Window */}
      <div className="relative w-full h-full md:h-[94vh] max-w-6xl bg-[#F8F7F1] border border-[var(--color-border)] shadow-2xl flex flex-col rounded-[2px] overflow-hidden">
        {/* Top Navigation Strip */}
        <header className="h-14 shrink-0 px-4 sm:px-6 bg-[#EDE7D8] border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono text-[#77786E]">
            <span className="font-bold text-[#304738]">RUDRA PRAJAPATI</span>
            <span>/</span>
            <span className="uppercase text-[#252922] font-medium hidden sm:inline">
              COLLECTION [{project.index} OF 08]
            </span>
            <span className="text-[#93A18A] uppercase font-semibold">
              · {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#77786E] hidden sm:inline">
              PRESS <kbd className="px-1.5 py-0.5 bg-[#F8F7F1] border border-[#D8D6CA] rounded text-[10px]">ESC</kbd> TO CLOSE
            </span>
            <button
              onClick={onClose}
              aria-label="Close detail modal"
              className="p-1.5 hover:bg-[#D8D6CA]/60 rounded text-[#252922] transition-colors flex items-center gap-1 font-mono text-xs"
            >
              <span className="hidden sm:inline font-medium">CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 2-Column Split Content Canvas */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Visual & Architecture Column (Sticky on Desktop) */}
          <div className="w-full lg:w-5/12 bg-[#EDE7D8]/60 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Visual Panel */}
              <div className="border border-[var(--color-border)] bg-[#F8F7F1] rounded-[2px] overflow-hidden shadow-sm">
                <VisualPanel project={project} isDetailed={true} />
              </div>

              {/* Project Metadata Specs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-mono border-b border-[#D8D6CA] pb-2">
                  <span className="text-[#77786E]">CLASSIFICATION</span>
                  <span className="font-medium text-[#252922]">{project.eyebrow}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono border-b border-[#D8D6CA] pb-2">
                  <span className="text-[#77786E]">STAGE</span>
                  <span className="font-medium text-[#304738]">{project.status}</span>
                </div>

                {project.readTime && (
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#D8D6CA] pb-2">
                    <span className="text-[#77786E]">READ ESTIMATE</span>
                    <span className="font-medium text-[#252922]">{project.readTime}</span>
                  </div>
                )}

                <div className="text-xs font-mono pt-1">
                  <span className="text-[#77786E] block mb-1.5 uppercase text-[10px] tracking-wider">
                    TECHNOLOGIES & DOMAINS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#F8F7F1] border border-[#D8D6CA] px-2 py-0.5 text-[11px] text-[#252922] rounded-[2px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Links if configured */}
            <div className="pt-6 mt-6 border-t border-[#D8D6CA] flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#304738] text-[#F8F7F1] hover:bg-[#252922] text-xs font-mono rounded-[2px] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] text-[#252922] text-xs font-mono rounded-[2px] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right Editorial Text & Deep Documentation Column */}
          <div className="w-full lg:w-7/12 p-6 sm:p-8 lg:p-10 overflow-y-auto bg-[#F8F7F1]">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Header Title Section */}
              <div className="border-b border-[#D8D6CA] pb-6">
                <div className="text-[11px] font-mono text-[#77786E] uppercase tracking-wider mb-2">
                  {project.eyebrow}
                </div>
                <h1
                  id="detail-title"
                  className="text-2xl sm:text-4xl font-bold text-[#252922] tracking-tight leading-tight"
                >
                  {renderHeadline()}
                </h1>
                <p className="mt-3 text-base text-[#77786E] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Special View for Skills */}
              {project.category === 'Skills' ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                      PHILOSOPHY
                    </h3>
                    <p className="text-sm text-[#252922] leading-relaxed">
                      {project.details.overview}
                    </p>
                  </div>
                  <SkillsPanel />
                  {project.details.sections && (
                    <div className="space-y-4 pt-4 border-t border-[#D8D6CA]">
                      {project.details.sections.map((sec, i) => (
                        <div key={i} className="space-y-1">
                          <h4 className="text-xs font-mono font-bold text-[#252922] uppercase">
                            {sec.heading}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#77786E] leading-relaxed">
                            {sec.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Standard Project / Research / Writing Content */
                <div className="space-y-8 text-[#252922]">
                  {/* Overview */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                      OVERVIEW
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#252922]">
                      {project.details.overview}
                    </p>
                  </div>

                  {/* Role */}
                  {project.details.role && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        MY ROLE
                      </h3>
                      <p className="text-sm leading-relaxed text-[#77786E]">
                        {project.details.role}
                      </p>
                    </div>
                  )}

                  {/* Research Questions (if Research) */}
                  {project.details.researchQuestions && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        RESEARCH QUESTIONS UNDER INVESTIGATION
                      </h3>
                      <ul className="space-y-2 text-sm text-[#252922]">
                        {project.details.researchQuestions.map((q, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="font-mono text-xs text-[#93A18A] shrink-0 font-bold">
                              Q{idx + 1}.
                            </span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Architecture Breakdown */}
                  {project.details.architecture && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        SYSTEM ARCHITECTURE
                      </h3>
                      <div className="space-y-3">
                        {project.details.architecture.map((item, idx) => {
                          const [title, ...descParts] = item.split(':');
                          return (
                            <div
                              key={idx}
                              className="p-3.5 bg-[#EDE7D8]/40 border border-[#D8D6CA] rounded-[2px]"
                            >
                              <div className="font-mono text-xs font-bold text-[#252922] mb-1">
                                {idx + 1}. {title}
                              </div>
                              <p className="text-xs sm:text-sm text-[#77786E] leading-relaxed">
                                {descParts.join(':')}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Technical Challenges */}
                  {project.details.challenges && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        TECHNICAL CHALLENGES
                      </h3>
                      <ul className="space-y-2 text-sm text-[#77786E]">
                        {project.details.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#304738] select-none font-bold">·</span>
                            <span className="leading-relaxed">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Implementation Details */}
                  {project.details.implementation && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        IMPLEMENTATION DETAILS
                      </h3>
                      <ul className="space-y-2 text-sm text-[#77786E]">
                        {project.details.implementation.map((detail, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#304738] select-none font-bold">·</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sections (People / Writing) */}
                  {project.details.sections && (
                    <div className="space-y-6">
                      {project.details.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                            {sec.heading}
                          </h3>
                          <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">
                            {sec.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Results & Lessons */}
                  {project.details.results && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        RESULTS & BENCHMARKS
                      </h3>
                      <ul className="space-y-2 text-sm text-[#252922]">
                        {project.details.results.map((result, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#93A18A] select-none font-mono">✓</span>
                            <span className="leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Limitations (Honest engineering disclosure) */}
                  {project.details.limitations && (
                    <div className="p-4 bg-[#EDE7D8]/50 border border-[#D8D6CA] rounded-[2px] space-y-2">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#77786E] font-bold">
                        CURRENT LIMITATIONS & FUTURE WORK
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[#77786E]">
                        {project.details.limitations.map((lim, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="select-none font-mono">⚠</span>
                            <span className="leading-relaxed">{lim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
