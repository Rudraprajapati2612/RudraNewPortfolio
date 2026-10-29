'use client';

import React from 'react';
import { ProjectItem } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { SearchX, RotateCcw } from 'lucide-react';

interface ProjectGridProps {
  projects: ProjectItem[];
  showDetails: boolean;
  onSelectProject: (project: ProjectItem) => void;
  onResetFilters: () => void;
  searchQuery?: string;
  activeCategory?: string;
}

export function ProjectGrid({
  projects,
  showDetails,
  onSelectProject,
  onResetFilters,
  searchQuery,
  activeCategory,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[50vh]">
        <div className="w-12 h-12 rounded-[2px] bg-[#EDE7D8] border border-[#D8D6CA] flex items-center justify-center text-[#304738] mb-4">
          <SearchX className="w-5 h-5" />
        </div>
        <h3 className="font-mono text-sm font-bold uppercase text-[#252922] mb-1">
          No matching records found
        </h3>
        <p className="text-xs text-[#77786E] max-w-sm mb-5 leading-relaxed font-mono">
          No works matched your query {searchQuery ? `"${searchQuery}"` : ''} in category {activeCategory ? `"${activeCategory}"` : ''}.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#304738] text-[#F8F7F1] hover:bg-[#252922] text-xs font-mono rounded-[2px] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset search &amp; filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full min-w-0">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          showDetails={showDetails}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
}
