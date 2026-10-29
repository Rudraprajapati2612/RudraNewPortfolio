'use client';

import React, { useEffect, useState } from 'react';
import { ProjectItem } from '@/data/projects';
import { VisualPanel } from './VisualPanels';
import { SkillsPanel } from './SkillsPanel';
import { X, ArrowUpRight, Github, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

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
  allProjects = [],
}: ProjectDetailProps) {
  const [tabByProject, setTabByProject] = useState<Record<string, 'simply' | 'underTheHood'>>({});
  const activeTab = project ? (tabByProject[project.id] ?? 'simply') : 'simply';
  const setActiveTab = (tab: 'simply' | 'underTheHood') => {
    if (project) {
      setTabByProject((prev) => ({ ...prev, [project.id]: tab }));
    }
  };

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

  // Calculate previous and next project for bottom navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

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
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 lg:p-6 bg-[#252922]/65 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Main Full-Screen/Near Full-Screen Editorial Detail Window */}
      <div className="relative w-full h-full md:h-[94vh] max-w-7xl bg-[#F8F7F1] border border-[var(--color-border)] shadow-2xl flex flex-col rounded-[2px] overflow-hidden">
        {/* A. Slim Full-Width Detail Header */}
        <header className="h-12 shrink-0 px-4 sm:px-6 bg-[#EDE7D8] border-b border-[var(--color-border)] flex items-center justify-between select-none">
          {/* Left Title Lockup: • rudraprajapati / 02 */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#252922] truncate">
            <span className="w-2 h-2 rounded-full bg-[#604BB4] shrink-0" />
            <span className="text-[#304738] font-bold">rudraprajapati</span>
            <span className="text-[#D8D6CA]">/</span>
            <span className="text-[#252922] font-semibold">{project.index}</span>
            <span className="text-[#D8D6CA] hidden sm:inline">·</span>
            <span className="text-[#77786E] uppercase hidden sm:inline">{project.category}</span>
          </div>

          {/* Right Close & Escape Hint */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              aria-label="Close detail modal"
              className="px-2 py-1 hover:bg-[#D8D6CA]/70 rounded-[2px] text-[#252922] transition-colors flex items-center gap-1.5 font-mono text-xs cursor-pointer"
            >
              <span>Close</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#F8F7F1] border border-[#D8D6CA] rounded text-[10px] text-[#77786E]">esc</kbd>
              <X className="w-3.5 h-3.5 text-[#252922]" />
            </button>
          </div>
        </header>

        {/* B. Two-Panel Responsive Layout: Single smooth scroll on mobile, side-by-side on lg */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          {/* Left Panel: ~43% width on desktop */}
          <div className="w-full lg:w-[43%] bg-[#EDE7D8]/80 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-visible lg:overflow-y-auto">
            <div className="space-y-6">
              {/* 1. Large Project Visual / Architecture Diagram */}
              <div className="border border-[var(--color-border)] bg-[#F8F7F1] rounded-[2px] overflow-hidden shadow-sm">
                <VisualPanel project={project} isDetailed={true} />
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs font-mono border-b border-[#D8D6CA] pb-2">
                  <span className="text-[#77786E]">CLASSIFICATION</span>
                  <span className="font-medium text-[#252922]">{project.eyebrow}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono border-b border-[#D8D6CA] pb-2">
                  <span className="text-[#77786E]">STAGE</span>
                  <span className="font-semibold text-[#304738]">{project.status}</span>
                </div>

                {project.readTime && (
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#D8D6CA] pb-2">
                    <span className="text-[#77786E]">READ ESTIMATE</span>
                    <span className="font-medium text-[#252922]">{project.readTime}</span>
                  </div>
                )}

                <div className="text-xs font-mono pt-1">
                  <span className="text-[#77786E] block mb-2 uppercase text-[10px] tracking-wider">
                    TECHNOLOGY & DOMAIN TAGS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#F8F7F1] border border-[#D8D6CA] px-2.5 py-1 text-[11px] text-[#252922] rounded-[2px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* External Links Strip */}
            <div className="pt-6 mt-6 border-t border-[#D8D6CA] flex flex-wrap gap-2.5 sm:gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#304738] text-[#F8F7F1] hover:bg-[#252922] text-xs font-mono rounded-[2px] transition-colors shadow-xs cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{project.contractsUrl ? 'Application Repository' : 'GitHub Repository'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.contractsUrl && (
                <a
                  href={project.contractsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] hover:bg-[#EDE7D8] text-[#252922] text-xs font-mono rounded-[2px] transition-colors shadow-xs cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-[#304738]" />
                  <span>Smart Contracts</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.dashboardUrl && (
                <a
                  href={project.dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] hover:bg-[#EDE7D8] text-[#252922] text-xs font-mono rounded-[2px] transition-colors shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#304738]" />
                  <span>Live Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.docsUrl && (
                <a
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] hover:bg-[#EDE7D8] text-[#252922] text-xs font-mono rounded-[2px] transition-colors shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#304738]" />
                  <span>Documentation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] text-[#252922] text-xs font-mono rounded-[2px] transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#304738]" />
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right Panel: ~57% width on desktop */}
          <div className="w-full lg:w-[57%] p-5 sm:p-8 lg:p-10 overflow-visible lg:overflow-y-auto bg-[#F8F7F1] flex flex-col justify-between">
            <div className="max-w-2xl mx-auto w-full space-y-6">
              {/* Header Title & Intro */}
              <div className="border-b border-[#D8D6CA] pb-5">
                <div className="text-[11px] font-mono text-[#77786E] uppercase tracking-wider mb-2">
                  {project.category} · {project.eyebrow}
                </div>
                <h1
                  id="detail-title"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#252922] tracking-tight leading-tight"
                >
                  {renderHeadline()}
                </h1>
                <p className="mt-2.5 text-sm sm:text-base text-[#77786E] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Working Tabs: [Simply] and [Under the hood] with editorial underline indicator */}
              <div className="flex items-center gap-6 border-b border-[#D8D6CA]" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'simply'}
                  aria-controls="panel-simply"
                  onClick={() => setActiveTab('simply')}
                  className={`pb-2.5 text-xs font-mono transition-all cursor-pointer relative ${
                    activeTab === 'simply'
                      ? 'text-[#604BB4] font-semibold border-b-2 border-[#604BB4] -mb-[1px]'
                      : 'text-[#77786E] hover:text-[#252922] border-b-2 border-transparent'
                  }`}
                >
                  Simply
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'underTheHood'}
                  aria-controls="panel-under-the-hood"
                  onClick={() => setActiveTab('underTheHood')}
                  className={`pb-2.5 text-xs font-mono transition-all cursor-pointer relative ${
                    activeTab === 'underTheHood'
                      ? 'text-[#604BB4] font-semibold border-b-2 border-[#604BB4] -mb-[1px]'
                      : 'text-[#77786E] hover:text-[#252922] border-b-2 border-transparent'
                  }`}
                >
                  Under the hood
                </button>
              </div>

              {/* Tab C: Simply Tab Content */}
              {activeTab === 'simply' && (
                <div id="panel-simply" role="tabpanel" className="space-y-6 text-[#252922] animate-in fade-in duration-150">
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                      WHAT IT IS
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#252922]">
                      {project.simply.whatItIs}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                      {project.simply.ideaTitle || 'THE PROBLEM IT EXPLORES'}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">
                      {project.simply.problemExplored}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                      WHY THIS ARCHITECTURE
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">
                      {project.simply.architecturalWhy}
                    </p>
                  </div>

                  {project.simply.roleAndContribution && (
                    <div className="p-3.5 bg-[#EDE7D8]/50 border border-[#D8D6CA] rounded-[2px] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#304738] font-bold tracking-wider block">
                        MY ROLE &amp; CONTRIBUTION
                      </span>
                      <p className="text-xs sm:text-sm text-[#252922] leading-relaxed">
                        {project.simply.roleAndContribution}
                      </p>
                    </div>
                  )}

                  {project.simply.currentStage && (
                    <div className="flex items-center justify-between text-xs font-mono pt-2 text-[#77786E]">
                      <span>CURRENT STAGE</span>
                      <span className="font-semibold text-[#304738]">{project.simply.currentStage}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab D: Under The Hood Tab Content */}
              {activeTab === 'underTheHood' && (
                <div id="panel-under-the-hood" role="tabpanel" className="space-y-7 text-[#252922] animate-in fade-in duration-150">
                  {project.underTheHood.customSections && project.underTheHood.customSections.length > 0 ? (
                    // Modular Technical Sections (SentinelGuard, Ferrum, SwapLiT)
                    <div className="space-y-6">
                      {project.underTheHood.systemArchitectureOverview && (
                        <div className="space-y-2">
                          <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                            SYSTEM ARCHITECTURE
                          </h3>
                          <p className="text-sm sm:text-base leading-relaxed text-[#252922]">
                            {project.underTheHood.systemArchitectureOverview}
                          </p>
                        </div>
                      )}

                      {project.underTheHood.customSections.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                            {sec.title}
                          </h3>
                          {sec.content && (
                            <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">
                              {sec.content}
                            </p>
                          )}
                          {sec.items && sec.items.length > 0 && (
                            <ul className="space-y-2 text-sm sm:text-base text-[#252922]">
                              {sec.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2">
                                  <span className="text-[#304738] select-none font-bold mt-1">·</span>
                                  <div className="leading-relaxed">
                                    <strong className="font-semibold text-[#252922]">{item.name}:</strong>{' '}
                                    <span className="text-[#77786E]">{item.description}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {/* Verified Tech Stack */}
                      <div className="pt-4 border-t border-[#D8D6CA]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#77786E] block mb-2">
                          VERIFIED TECH STACK
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          {(project.underTheHood.techTags || project.tags).map((tech, idx) => (
                            <React.Fragment key={tech}>
                              <span className="px-2 py-0.5 bg-[#EDE7D8]/70 border border-[#D8D6CA] rounded-[2px] text-[#252922]">
                                {tech}
                              </span>
                              {idx < (project.underTheHood.techTags || project.tags).length - 1 && (
                                <span className="text-[#93A18A] select-none">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : project.underTheHood.matchingAndSettlement ? (
                    // Focused 3-Section Technical Spec for HydraMarket
                    <div className="space-y-6">
                      {/* Section 1: ARCHITECTURE */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                          ARCHITECTURE
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-[#252922]">
                          {project.underTheHood.systemArchitectureOverview}
                        </p>
                      </div>

                      {/* Section 2: MATCHING & SETTLEMENT */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                          MATCHING &amp; SETTLEMENT
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">
                          {project.underTheHood.matchingAndSettlement}
                        </p>
                      </div>

                      {/* Section 3: ON-CHAIN PROGRAMS */}
                      {project.underTheHood.onChainPrograms && project.underTheHood.onChainPrograms.length > 0 && (
                        <div className="space-y-2.5">
                          <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                            ON-CHAIN PROGRAMS
                          </h3>
                          <ul className="space-y-2 text-sm sm:text-base text-[#252922]">
                            {project.underTheHood.onChainPrograms.map((prog, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#304738] select-none font-bold mt-1">·</span>
                                <div className="leading-relaxed">
                                  <strong className="font-semibold text-[#252922]">{prog.name}:</strong>{' '}
                                  <span className="text-[#77786E]">{prog.description}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Compact Technology-Tag Row */}
                      <div className="pt-4 border-t border-[#D8D6CA]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#77786E] block mb-2">
                          VERIFIED TECH STACK
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          {(project.underTheHood.techTags || project.tags).map((tech, idx) => (
                            <React.Fragment key={tech}>
                              <span className="px-2 py-0.5 bg-[#EDE7D8]/70 border border-[#D8D6CA] rounded-[2px] text-[#252922]">
                                {tech}
                              </span>
                              {idx < (project.underTheHood.techTags || project.tags).length - 1 && (
                                <span className="text-[#93A18A] select-none">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Standard components for other projects
                    <>
                      {/* Architecture Overview */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                          SYSTEM ARCHITECTURE &amp; EXECUTION FLOW
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-[#252922]">
                          {project.underTheHood.systemArchitectureOverview}
                        </p>
                      </div>

                      {/* Components Breakdown */}
                      {project.underTheHood.components && project.underTheHood.components.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#77786E] font-bold">
                            CORE SYSTEM MODULES
                          </h4>
                          <div className="space-y-3">
                            {project.underTheHood.components.map((comp, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 bg-[#EDE7D8]/40 border border-[#D8D6CA] rounded-[2px]"
                              >
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="font-mono text-xs font-bold text-[#252922]">
                                    {idx + 1}. {comp.title}
                                  </span>
                                  {comp.protocolOrStack && (
                                    <span className="text-[10px] font-mono text-[#304738] bg-[#CAD5B3]/40 px-1.5 py-0.5 rounded-[2px]">
                                      {comp.protocolOrStack}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm text-[#77786E] leading-relaxed">
                                  {comp.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Skills Panel inclusion for Skills project */}
                  {project.category === 'Skills' && (
                    <div className="pt-2">
                      <SkillsPanel />
                    </div>
                  )}

                  {/* Technical Challenges & Trade-offs */}
                  {project.underTheHood.technicalChallenges.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        TECHNICAL CHALLENGES &amp; TRADE-OFFS
                      </h4>
                      <div className="space-y-2.5">
                        {project.underTheHood.technicalChallenges.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] text-xs space-y-1"
                          >
                            <div className="font-mono font-semibold text-[#252922]">
                              Challenge: {item.challenge}
                            </div>
                            <div className="text-[#77786E] leading-relaxed">
                              Resolution &amp; Trade-off: {item.tradeoff}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Implementation Details */}
                  {project.underTheHood.implementationHighlights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        IMPLEMENTATION DETAILS
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#77786E]">
                        {project.underTheHood.implementationHighlights.map((hl, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#304738] select-none font-bold">·</span>
                            <span className="leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Results & Benchmarks */}
                  {project.underTheHood.resultsAndBenchmarks.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
                        RESULTS &amp; BENCHMARKS
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#252922]">
                        {project.underTheHood.resultsAndBenchmarks.map((res, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[#93A18A] select-none font-mono">✓</span>
                            <span className="leading-relaxed">{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Verified Limitations */}
                  {project.underTheHood.limitations.length > 0 && (
                    <div className="p-3.5 bg-[#EDE7D8]/50 border border-[#D8D6CA] rounded-[2px] space-y-1.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#77786E] font-bold">
                        LIMITATIONS &amp; KNOWN CONSTRAINTS
                      </h4>
                      <ul className="space-y-1 text-xs text-[#77786E]">
                        {project.underTheHood.limitations.map((lim, idx) => (
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

            {/* E. Bottom Navigation: FOLLOW ANOTHER THREAD */}
            {allProjects.length > 1 && onSelectProject && (
              <div className="pt-8 mt-8 border-t border-[#D8D6CA] max-w-2xl mx-auto w-full">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#77786E] block mb-3 font-semibold">
                  FOLLOW ANOTHER THREAD
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectProject(prevProject)}
                    className="p-3 bg-[#EDE7D8]/40 hover:bg-[#EDE7D8] border border-[#D8D6CA] hover:border-[#93A18A] rounded-[2px] text-left transition-colors group"
                  >
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#77786E] mb-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      PREVIOUS [{prevProject.index}]
                    </span>
                    <span className="font-semibold text-xs text-[#252922] block truncate">
                      {prevProject.headline}
                    </span>
                  </button>

                  <button
                    onClick={() => onSelectProject(nextProject)}
                    className="p-3 bg-[#EDE7D8]/40 hover:bg-[#EDE7D8] border border-[#D8D6CA] hover:border-[#93A18A] rounded-[2px] text-right transition-colors group"
                  >
                    <span className="flex items-center justify-end gap-1 text-[10px] font-mono text-[#77786E] mb-1">
                      NEXT [{nextProject.index}]
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="font-semibold text-xs text-[#252922] block truncate">
                      {nextProject.headline}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
