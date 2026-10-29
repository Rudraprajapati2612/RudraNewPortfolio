'use client';

import React from 'react';
import { SkillMap } from './SkillMap';
import { ProjectItem } from '@/data/projects';
import { SKILL_CATEGORIES, SKILLS } from '@/data/skills';

export function SkillsSimply() {
  return (
    <div className="space-y-6 text-[#252922] animate-in fade-in duration-150">
      <section className="space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">What it is</h3>
        <p className="text-sm sm:text-base leading-relaxed">A practical map of the languages, tools, and systems I use to build software.</p>
      </section>
      <section className="space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">How I use it</h3>
        <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">Explore each technology to see where it fits into my work and which projects put it into practice.</p>
      </section>
      <section className="space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">My approach</h3>
        <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">I focus on tools I have used to build real systems, from backend services and databases to Solana programs and smart contracts.</p>
      </section>
    </div>
  );
}

export function SkillsUnderTheHood({ projects, onOpenProject }: { projects: ProjectItem[]; onOpenProject: (project: ProjectItem) => void }) {
  return (
    <div className="space-y-7 text-[#252922] animate-in fade-in duration-150">
      <section>
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold mb-3">Technical domains</h3>
        <div className="grid grid-cols-1 gap-2">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} className="border-b border-[#D8D6CA] pb-2.5 last:border-b-0 last:pb-0">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#304738] font-bold mb-1.5">0{SKILL_CATEGORIES.indexOf(category) + 1} — {category.name}</h4>
              <p className="font-mono text-[11px] leading-relaxed text-[#77786E]">{SKILLS.filter((item) => item.category === category.id).map((item) => item.name).join(', ')}.</p>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] leading-relaxed text-[#77786E]">Technologies without a project link remain in the directory as toolkit references pending project-level verification.</p>
      </section>
      <section className="space-y-1.5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">Implementation</h3>
        <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">My work applies these tools to backend services, asynchronous systems, blockchain programs, smart contracts, and database-backed applications.</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">Engineering approach</h3>
        <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">I choose technologies based on the problem: Rust for systems-level control, TypeScript for application development, and domain-specific tools for blockchain, networking, and data persistence.</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">Project-verified directory</h3>
        <p className="text-sm sm:text-base leading-relaxed text-[#77786E]">Open a domain, then a technology, to see only the projects documented to use it.</p>
        <SkillMap projects={projects} onOpenProject={onOpenProject} className="pt-1" />
      </section>
    </div>
  );
}
