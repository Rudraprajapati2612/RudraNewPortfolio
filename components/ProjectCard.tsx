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
      aria-label={`Open details for ${project.headline}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col bg-[#F8F7F1] border border-[var(--color-border)] rounded-[2px] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#304738] focus-visible:ring-offset-2 transition-all duration-200 hover:border-[#93A18A] ${project.gridSpanDesktop}`}
    >
      {/* Top Header Strip */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[#77786E] tracking-wider uppercase bg-[#F8F7F1]">
        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-[#304738]">{project.index}</span>
          <span className="text-[#D8D6CA]">/</span>
          <span className="truncate">{project.eyebrow}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pl-2">
          <span className="text-[10px] text-[#77786E] hidden sm:inline">VIEW</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#77786E] group-hover:text-[#304738] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Visual Content Panel */}
      <div className="w-full">
        <VisualPanel project={project} isDetailed={false} />
      </div>

      {/* Text & Content Lower Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#F8F7F1]">
        <div>
          {/* Big Editorial Headline */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#252922] leading-tight mb-2">
            {renderHeadline()}
          </h3>

          {/* Description - Respects Details Toggle */}
          {showDetails && (
            <p className="text-xs sm:text-sm text-[#77786E] leading-relaxed line-clamp-3 mb-4">
              {project.description}
            </p>
          )}
        </div>

        {/* Unboxed Metadata & Tags following Zero-Pill Rules */}
        <div className="pt-3 border-t border-[#D8D6CA]/70 flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-[#77786E]">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="hover:text-[#252922] transition-colors">{tag}</span>
                {idx < project.tags.length - 1 && (
                  <span className="text-[#D8D6CA] select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 text-[10px]">
            <span className="text-[#304738] font-medium uppercase tracking-wider">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
