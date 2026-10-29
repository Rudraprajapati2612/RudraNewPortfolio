'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ProjectItem, AUTHOR } from '@/data/projects';
import { ArrowUpRight, X } from 'lucide-react';

interface AtAGlanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

type WorkFilter = 'All' | 'Engineering' | 'Research' | 'Experiments' | 'Skills & Tools';
const FILTERS: WorkFilter[] = ['All', 'Engineering', 'Research', 'Experiments', 'Skills & Tools'];

function getProjectName(project: ProjectItem) {
  const names: Record<string, string> = {
    hydramarket: 'HydraMarket',
    'about-rudra': 'Away from the keyboard',
    sentinelguard: 'SentinelGuard',
    ferrum: 'Ferrum',
    'layoutd-cli': 'Layoutd',
    swaplit: 'SwapLiT',
    'better-uptime': 'Better Uptime',
    engram: 'Engram',
    'skills-toolkit': 'The Toolkit',
    agroaid: 'AgroAid',
    'research-notebook': 'Systems research',
    'engineering-notes': 'Engineering notes',
  };
  return names[project.id] ?? project.headline;
}

function matchesFilter(project: ProjectItem, filter: WorkFilter) {
  if (filter === 'All') return true;
  if (filter === 'Skills & Tools') return project.category === 'Skills';
  if (filter === 'Experiments') return project.status === 'Prototype' || project.status === 'Archive';
  return project.category === filter;
}

export function AtAGlanceModal({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onOpenResume,
  onOpenContact,
}: AtAGlanceModalProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('All');

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter, projects],
  );

  if (!isOpen) return null;

  const openProject = (project: ProjectItem) => {
    onClose();
    onSelectProject(project);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="glance-title" className="fixed inset-0 z-50 overflow-y-auto bg-[var(--color-canvas)] text-[var(--color-ink)] work-glance-shell">
      <div className="min-h-screen">
        <header className="border-b border-[var(--color-border)] bg-[var(--color-canvas)]">
          <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
            <button type="button" onClick={onClose} className="work-glance-focus editorial-link group shrink-0 font-mono text-[11px] uppercase tracking-[0.14em]" aria-label="Back to collection">
              <span className="mr-2 text-[var(--color-active-ink)]">•</span><span className="editorial-link-text">Rudra Prajapati</span>
            </button>
            <nav aria-label="Work page navigation" className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-8">
              <button type="button" onClick={onClose} className="work-glance-focus editorial-link group hidden sm:inline-flex"><span className="editorial-link-text">Collection</span></button>
              <button type="button" onClick={onOpenResume} className="work-glance-focus editorial-link group"><span className="editorial-link-text">Résumé</span></button>
              <button type="button" onClick={onOpenContact} className="work-glance-focus editorial-link group"><span className="editorial-link-text">Say hello</span></button>
              <button type="button" onClick={onClose} aria-label="Close work index" className="work-glance-focus ml-1 inline-flex sm:hidden"><X className="h-4 w-4" aria-hidden="true" /></button>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
          <section className="work-glance-hero border-b border-[var(--color-border)] py-20 sm:py-28 lg:py-32" aria-labelledby="glance-title">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.46fr)] lg:items-end lg:gap-20">
              <div>
                <p className="mb-7 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-forest)]">THE WORK / AT A GLANCE</p>
                <h1 id="glance-title" className="max-w-[850px] text-[clamp(3rem,7.2vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--color-ink)]">A few things I&apos;ve put into the world.</h1>
              </div>
              <p className="max-w-[38rem] text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">Systems, developer tools, blockchain infrastructure, and experiments built to understand how things work.</p>
            </div>
          </section>

          <section className="border-b border-[var(--color-border)] py-7" aria-label="Filter work">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-3" role="group" aria-label="Work categories">
                {FILTERS.map((filter) => {
                  const active = filter === activeFilter;
                  return <button key={filter} type="button" aria-pressed={active} onClick={() => setActiveFilter(filter)} className={`work-glance-filter work-glance-focus relative min-h-10 py-2 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors duration-150 ease-out ${active ? 'text-[var(--color-active-ink)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`}>{filter}</button>;
                })}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]" aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} WORKS SHOWN</p>
            </div>
          </section>

          <section aria-labelledby="work-index-title">
            <div className="flex items-baseline justify-between gap-4 py-5"><h2 id="work-index-title" className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">Selected work</h2><span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)] sm:inline">Open a project ↗</span></div>
            <div className="border-t border-[var(--color-border)]">
              {visibleProjects.length > 0 ? visibleProjects.map((project, index) => (
                <button type="button" key={project.id} onClick={() => openProject(project)} className="work-glance-row work-glance-focus group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto_1.5rem] items-start gap-4 border-b border-[var(--color-border)] py-7 text-left sm:grid-cols-[3rem_minmax(0,1fr)_minmax(8rem,0.28fr)_2rem] sm:gap-6 sm:py-8 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(12rem,0.3fr)_2rem] lg:gap-8" style={{ '--work-row-delay': `${Math.min(index, 8) * 35}ms` } as React.CSSProperties}>
                  <span className="pt-1 font-mono text-[11px] tabular-nums text-[var(--color-sage-muted)]">{project.index}</span>
                  <span className="min-w-0"><span className="block text-[1.25rem] font-medium leading-tight tracking-[-0.025em] text-[var(--color-ink)] transition-colors duration-150 ease-out group-hover:text-[var(--color-forest)] sm:text-[1.4rem]">{getProjectName(project)}</span><span className="mt-2 block max-w-[48rem] text-[15px] leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">{project.description}</span></span>
                  <span className="col-start-2 row-start-2 pt-1 font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-[var(--color-forest)] sm:col-start-3 sm:row-start-1 sm:pt-1">{project.category.toUpperCase()} · {project.status.toUpperCase()}</span>
                  <ArrowUpRight className="col-start-4 row-start-1 mt-1 h-4 w-4 text-[var(--color-muted)] transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-active-ink)]" aria-hidden="true" />
                </button>
              )) : <div className="border-b border-[var(--color-border)] py-16 text-center"><p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">No work in this category yet.</p><button type="button" onClick={() => setActiveFilter('All')} className="work-glance-focus mt-4 font-mono text-xs text-[var(--color-active-ink)] underline underline-offset-4">Show all work</button></div>}
            </div>
          </section>

          <section className="grid gap-10 border-b border-[var(--color-border)] py-24 sm:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24" aria-labelledby="through-line-title">
            <div><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-forest)]">THE THROUGH LINE</p><h2 id="through-line-title" className="text-4xl font-medium leading-none tracking-[-0.05em] sm:text-5xl">Where I&apos;ve been.</h2></div>
            <div className="grid gap-0 border-t border-[var(--color-border)]">
              <div className="grid gap-3 border-b border-[var(--color-border)] py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">CURRENT / {AUTHOR.location}</span><div><h3 className="text-lg font-medium text-[var(--color-ink)]">Engineer / Builder / Explorer</h3><p className="mt-2 max-w-[38rem] text-sm leading-6 text-[var(--color-muted)]">Building systems, exploring ideas, and figuring out how things work under the hood.</p></div></div>
              <div className="grid gap-3 border-b border-[var(--color-border)] py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">THREAD / SYSTEMS</span><div><h3 className="text-lg font-medium text-[var(--color-ink)]">From first principles to working systems.</h3><p className="mt-2 max-w-[38rem] text-sm leading-6 text-[var(--color-muted)]">The work moves through distributed systems, low-latency matching, decentralized protocols, security tooling, and computer vision.</p></div></div>
              <div className="grid gap-3 border-b border-[var(--color-border)] py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">PRACTICE / NOTES</span><div><h3 className="text-lg font-medium text-[var(--color-ink)]">Measure, document, refine.</h3><p className="mt-2 max-w-[38rem] text-sm leading-6 text-[var(--color-muted)]">Research notebooks and engineering notes make the trade-offs visible: what failed, why it failed, and what made the next iteration clearer.</p></div></div>
            </div>
          </section>

          <section className="py-24 sm:py-28" aria-labelledby="contact-heading"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-forest)]">A SMALL OPENING</p><div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><h2 id="contact-heading" className="max-w-[700px] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Have something interesting in mind?</h2><button type="button" onClick={onOpenContact} className="work-glance-focus editorial-link group shrink-0 self-start font-mono text-xs uppercase tracking-[0.12em] sm:self-end"><span className="editorial-link-text">Say hello ↗</span></button></div><div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[var(--color-border)] pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)]"><a className="work-glance-focus editorial-link group" href={`mailto:${AUTHOR.email}`}><span className="editorial-link-text">{AUTHOR.email}</span></a><a className="work-glance-focus editorial-link group" href={AUTHOR.links.github} target="_blank" rel="noopener noreferrer"><span className="editorial-link-text">GitHub ↗</span></a><a className="work-glance-focus editorial-link group" href={AUTHOR.links.linkedin} target="_blank" rel="noopener noreferrer"><span className="editorial-link-text">LinkedIn ↗</span></a></div></section>
        </main>

        <footer className="border-t border-[var(--color-border)] px-5 py-6 sm:px-8 lg:px-12"><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"><span>Rudra Prajapati · Collection 2026</span><button type="button" onClick={onClose} className="work-glance-focus editorial-link group self-start sm:self-auto"><span className="editorial-link-text">Back to collection</span></button></div></footer>
      </div>
    </div>
  );
}
