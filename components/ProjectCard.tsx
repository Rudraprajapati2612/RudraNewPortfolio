'use client';

import React from 'react';
import { PROJECTS, ProjectItem } from '@/data/projects';
import { VisualPanel } from './VisualPanels';
import { SkillMap } from './SkillMap';
import { SKILL_CATEGORIES, projectLinkedSkillCount } from '@/data/skills';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  showDetails: boolean;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, showDetails, onSelect }: ProjectCardProps) {
  if (project.category === 'Skills') {
    return (
      <article className={`editorial-card relative flex flex-col bg-[#F8F7F1] border border-[var(--color-border)] rounded-[2px] min-w-0 max-w-full ${project.gridSpanDesktop}`}>
        <div className="min-h-[42px] py-2 px-3 sm:px-4 border-b border-[var(--color-border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#77786E] tracking-wider uppercase bg-[#F8F7F1] min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-[#304738] shrink-0 tabular-nums w-5">{project.index}</span>
            <span className="text-[#D8D6CA]">/</span>
            <span className="font-medium truncate">{project.eyebrow}</span>
          </div>
          <button type="button" onClick={() => onSelect(project)} className="inline-flex items-center gap-1 shrink-0 text-[#77786E] hover:text-[#304738] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#604BB4] rounded-[2px]">
            Open <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="p-3.5 sm:p-4 bg-[#F8F7F1]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-3">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#604BB4]">Technical skill map</p>
              <h3 className="mt-0.5 text-lg sm:text-xl font-bold tracking-tight text-[#252922]">Languages <span className="font-serif italic font-normal text-[#304738]">/ Systems</span> / Web3</h3>
            </div>
            <span className="font-mono text-[9px] text-[#77786E] uppercase">Select a tool</span>
          </div>
          <SkillMap mode="overview" projects={PROJECTS.filter((item) => item.category !== 'Skills')} onOpenProject={onSelect} />
        </div>
        <footer className="mt-auto px-3.5 sm:px-4 py-2.5 border-t border-[#D8D6CA] flex flex-wrap justify-between gap-2 font-mono text-[9px] uppercase tracking-wider text-[#77786E]">
          <span>Technical domains: {String(SKILL_CATEGORIES.length).padStart(2, '0')}</span>
          <span>Project-linked skills: {projectLinkedSkillCount}</span>
        </footer>
      </article>
    );
  }

  // Render headline with selective serif italic emphasis
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
              <span key={i} className="font-serif italic font-normal tracking-normal text-[#304738]">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`Open project details for ${project.headline}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      className={`editorial-card group relative flex flex-col bg-[#F8F7F1] border border-[var(--color-border)] rounded-[2px] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#304738] focus-visible:ring-offset-2 min-w-0 max-w-full ${project.gridSpanDesktop}`}
    >
      {/* Top Header Strip: Standardized min-height, fixed-width index, predictable alignment, graceful wrapping */}
      <div className="min-h-[38px] sm:min-h-[42px] py-2 px-3 sm:px-4 border-b border-[var(--color-border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#77786E] tracking-wider uppercase bg-[#F8F7F1] group-hover:bg-[#FAF8F3] transition-colors duration-250 select-none min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 pr-2">
          <span className="font-bold text-[#304738] shrink-0 tabular-nums w-4 sm:w-5 text-left">{project.index}</span>
          <span className="text-[#D8D6CA] shrink-0 select-none">/</span>
          <span className="group-hover:text-[#252922] transition-colors duration-250 font-medium leading-tight">
            {project.eyebrow}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] text-[#77786E] group-hover:text-[#304738] transition-colors duration-200 font-mono hidden xs:inline sm:inline">
            Open
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] group-hover:text-[#304738] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Visual Content Panel Container: Clean, uncluttered, no overlapping hover badge */}
      <div className="w-full overflow-hidden relative flex-shrink-0">
        <VisualPanel project={project} isDetailed={false} />
      </div>

      {/* Text & Content Lower Section: Flexible flex-col with mt-auto footer */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between bg-[#F8F7F1] group-hover:bg-[#FAF8F3] transition-colors duration-250 min-w-0">
        <div className="space-y-1.5 sm:space-y-2 mb-3">
          {/* Editorial Headline with animated underline on hover */}
          <h3 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-[#252922] group-hover:text-[#1F231D] leading-snug transition-colors duration-250">
            <span className="editorial-link-text">
              {renderHeadline()}
            </span>
          </h3>

          {/* Description - Respects Details Toggle */}
          {showDetails && (
            <p className="text-[11px] sm:text-xs lg:text-[13px] text-[#77786E] group-hover:text-[#5E6057] leading-relaxed transition-colors duration-250">
              {project.description}
            </p>
          )}
        </div>

        {/* Standardized Metadata & Tags Footer: Aligned to bottom of card via mt-auto */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-[#D8D6CA]/70 flex flex-wrap items-center justify-between gap-y-1.5 text-[10px] sm:text-[11px] font-mono text-[#77786E] min-w-0">
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 min-w-0">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="hover:text-[#252922] transition-colors truncate">{tag}</span>
                {idx < Math.min(project.tags.length, 3) - 1 && (
                  <span className="text-[#D8D6CA] select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0 text-[10px]">
            <span className="text-[#304738] font-semibold uppercase tracking-wider group-hover:underline">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
