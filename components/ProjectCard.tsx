'use client';

import React from 'react';
import { ProjectItem } from '@/data/projects';
import { VisualPanel } from './VisualPanels';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  showDetails: boolean;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, showDetails, onSelect }: ProjectCardProps) {
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
      {/* Top Header Strip */}
      <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-b border-[var(--color-border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#77786E] tracking-wider uppercase bg-[#F8F7F1] group-hover:bg-[#FAF8F3] transition-colors duration-250 select-none min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0">
          <span className="font-bold text-[#304738] shrink-0">{project.index}</span>
          <span className="text-[#D8D6CA] shrink-0">/</span>
          <span className="truncate group-hover:text-[#252922] transition-colors duration-250">
            {project.eyebrow}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0 pl-1.5">
          <span className="text-[10px] text-[#77786E] group-hover:text-[#304738] transition-colors duration-200 font-mono hidden xs:inline sm:inline">
            Open
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] group-hover:text-[#304738] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Visual Content Panel with Floating Open Badge on Hover */}
      <div className="w-full overflow-hidden relative">
        <VisualPanel project={project} isDetailed={false} />
        
        {/* Floating cream paper "Open ↗" badge revealed on card hover */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-250 ease-out translate-y-1 group-hover:translate-y-0 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F8F7F1]/95 backdrop-blur-xs border border-[#D8D6CA] rounded-[2px] text-[10px] font-mono font-medium text-[#304738] shadow-xs">
            Open ↗
          </span>
        </div>
      </div>

      {/* Text & Content Lower Section */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-[#F8F7F1] group-hover:bg-[#FAF8F3] transition-colors duration-250 min-w-0">
        <div>
          {/* Editorial Headline with animated underline on hover */}
          <h3 className="text-base sm:text-2xl font-bold tracking-tight text-[#252922] group-hover:text-[#1F231D] leading-tight mb-1.5 sm:mb-2 transition-colors duration-250 line-clamp-2 sm:line-clamp-none">
            <span className="editorial-link-text">
              {renderHeadline()}
            </span>
          </h3>

          {/* Description - Respects Details Toggle */}
          {showDetails && (
            <p className="text-[11px] sm:text-sm text-[#77786E] group-hover:text-[#5E6057] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2.5 sm:mb-4 transition-colors duration-250">
              {project.description}
            </p>
          )}
        </div>

        {/* Unboxed Metadata & Tags */}
        <div className="pt-2 sm:pt-3 border-t border-[#D8D6CA]/70 flex flex-wrap items-center justify-between gap-y-1.5 text-[10px] sm:text-[11px] font-mono text-[#77786E] min-w-0">
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
