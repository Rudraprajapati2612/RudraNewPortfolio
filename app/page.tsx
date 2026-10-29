'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROJECTS, CATEGORIES, ProjectCategory, ProjectItem } from '@/data/projects';
import { Sidebar } from '@/components/Sidebar';
import { CollectionHeader } from '@/components/CollectionHeader';
import { ProjectGrid } from '@/components/ProjectGrid';
import { ProjectDetail } from '@/components/ProjectDetail';
import { AtAGlanceModal } from '@/components/AtAGlanceModal';
import { ResumeModal } from '@/components/ResumeModal';
import { ContactModal } from '@/components/ContactModal';

function PortfolioContent() {
  const searchParams = useSearchParams();

  // State
  const [activeCategory, setActiveCategory] = useState<"Everything" | ProjectCategory>("Everything");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(true);

  // Modals
  const [localProjectId, setLocalProjectId] = useState<string | null>(null);
  const [isGlanceOpen, setIsGlanceOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Subscribe to OS prefers-reduced-motion without synchronous effect render
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => {
      setMotionEnabled(!e.matches);
    };
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  // Compute selected project from either user interaction or URL query parameter
  const queryProjectId = searchParams.get('project');
  const activeProjectId = localProjectId !== null ? localProjectId : queryProjectId;
  const selectedProject = useMemo(() => {
    return activeProjectId ? PROJECTS.find((p) => p.id === activeProjectId) || null : null;
  }, [activeProjectId]);

  // Project selection with URL state update
  const handleSelectProject = useCallback((project: ProjectItem) => {
    setLocalProjectId(project.id);
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.pushState({}, '', url.toString());
  }, []);

  const handleCloseProject = useCallback(() => {
    setLocalProjectId('');
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.pushState({}, '', url.toString());
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setLocalProjectId(params.get('project') || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      counts[cat] = 0;
    }
    for (const p of PROJECTS) {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    }
    return counts;
  }, []);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category match
      if (activeCategory !== "Everything" && project.category !== activeCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesHeadline = project.headline.toLowerCase().includes(query);
        const matchesEyebrow = project.eyebrow.toLowerCase().includes(query);
        const matchesDescription = project.description.toLowerCase().includes(query);
        const matchesCategory = project.category.toLowerCase().includes(query);
        const matchesTags = project.tags.some((t) => t.toLowerCase().includes(query));
        const matchesSimply =
          project.simply.whatItIs.toLowerCase().includes(query) ||
          project.simply.problemExplored.toLowerCase().includes(query);
        const matchesUnderTheHood =
          project.underTheHood.systemArchitectureOverview.toLowerCase().includes(query);

        return (
          matchesHeadline ||
          matchesEyebrow ||
          matchesDescription ||
          matchesCategory ||
          matchesTags ||
          matchesSimply ||
          matchesUnderTheHood
        );
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  // Open "About Rudra" directly
  const handleOpenAbout = useCallback(() => {
    const aboutProj = PROJECTS.find((p) => p.id === 'about-rudra');
    if (aboutProj) {
      handleSelectProject(aboutProj);
    }
  }, [handleSelectProject]);

  const handleResetFilters = useCallback(() => {
    setActiveCategory("Everything");
    setSearchQuery("");
  }, []);

  const allCategories: ("Everything" | ProjectCategory)[] = ["Everything", ...CATEGORIES];

  return (
    <div className={`min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)] flex flex-col md:flex-row ${motionEnabled ? '' : 'reduced-motion'}`}>
      {/* Left Persistent Sidebar */}
      <Sidebar
        categories={allCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categoryCounts={categoryCounts}
        totalCount={PROJECTS.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAbout={handleOpenAbout}
        onOpenGlance={() => setIsGlanceOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onResetToHome={handleResetFilters}
      />

      {/* Main Collection Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Collection Header */}
        <CollectionHeader
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails(!showDetails)}
          motionEnabled={motionEnabled}
          onToggleMotion={() => setMotionEnabled(!motionEnabled)}
          activeCategory={activeCategory}
          itemCount={filteredProjects.length}
        />

        {/* Project Collection Grid */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full">
          <ProjectGrid
            projects={filteredProjects}
            showDetails={showDetails}
            onSelectProject={handleSelectProject}
            onResetFilters={handleResetFilters}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </div>

        {/* Quiet Page Footer */}
        <footer className="mt-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#77786E]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#252922]">Rudra Prajapati</span>
            <span>·</span>
            <span>Collection 2026</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsGlanceOpen(true)}
              className="editorial-link cursor-pointer"
            >
              <span className="editorial-link-text">At a glance</span>
            </button>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="editorial-link cursor-pointer"
            >
              <span className="editorial-link-text">Résumé</span>
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="editorial-link cursor-pointer"
            >
              <span className="editorial-link-text">Say hello</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Modals & Overlays */}
      <ProjectDetail
        project={selectedProject}
        onClose={handleCloseProject}
        onSelectProject={handleSelectProject}
        allProjects={PROJECTS}
      />

      <AtAGlanceModal
        isOpen={isGlanceOpen}
        onClose={() => setIsGlanceOpen(false)}
        projects={PROJECTS}
        onSelectProject={handleSelectProject}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F1E8] flex items-center justify-center font-mono text-xs text-[#77786E]">Loading portfolio...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
