'use client';
/* eslint-disable @next/next/no-img-element -- compact third-party SVG marks are intentionally unoptimized */

import React, { useMemo, useState } from 'react';
import { Anchor as AnchorIcon, Code2, Database, Globe2, Network, Radio } from 'lucide-react';
import { SKILLS, SKILL_CATEGORIES, SkillCategoryId, SkillDefinition } from '@/data/skills';
import { ProjectItem } from '@/data/projects';

const simpleIconSlug: Record<string, string> = {
  rust: 'rust', typescript: 'typescript', javascript: 'javascript', solidity: 'solidity',
  tokio: 'tokio', grpc: 'grpc', protobuf: 'protobuf', websockets: 'websocket', kafka: 'apachekafka', redis: 'redis',
  solana: 'solana', helius: 'helius', pyth: 'pyth', ethereum: 'ethereum', foundry: 'foundry', hardhat: 'hardhat',
  circom: 'circom', snarkjs: 'snarkjs', nodejs: 'nodedotjs', express: 'express', bun: 'bun', elysiajs: 'elysia', trpc: 'trpc',
  react: 'react', nextjs: 'nextdotjs', 'tailwind-css': 'tailwindcss', postgresql: 'postgresql', prisma: 'prisma',
  mongodb: 'mongodb', git: 'git', 'github-actions': 'githubactions', docker: 'docker', postman: 'postman',
};

const officialIconUrl: Record<string, string> = {
  elysiajs: 'https://elysiajs.com/assets/elysia.svg',
  grpc: 'https://grpc.io/img/logos/grpc-icon-color.png',
};

const fallbackIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  anchor: AnchorIcon,
  'yellowstone-grpc': Radio,
  sql: Database,
  'http-1-1': Globe2,
  grpc: Network,
};

// Brand colors are supplied to Simple Icons while the Lucide mark remains a
// neutral fallback for concepts without a canonical logo.
const brandColor: Record<string, string> = {
  rust: 'DEA584', typescript: '3178C6', javascript: 'F7DF1E', solidity: '363636', tokio: '000000',
  anchor: 'FF6B35', 'yellowstone-grpc': 'D6A72C', sql: '4479A1', 'http-1-1': '007EC6',
  grpc: '244C5A', protobuf: '4285F4', websockets: '010101', kafka: '231F20', redis: 'DC382D',
  solana: '9945FF', helius: '8B5CF6', pyth: 'E5A93D', ethereum: '3C3C3D', foundry: '1A1A1A', hardhat: 'FFF100',
  circom: '3C3C3C', snarkjs: '1D4ED8', nodejs: '339933', express: '000000', bun: '000000', elysiajs: '8D8E8D', trpc: '2596BE',
  react: '61DAFB', nextjs: '000000', 'tailwind-css': '06B6D4', postgresql: '4169E1', prisma: '2D3748',
  mongodb: '47A248', git: 'F05032', 'github-actions': '2088FF', docker: '2496ED', postman: 'FF6C37',
};

const featuredSkills: Record<SkillCategoryId, string[]> = {
  languages: ['rust', 'typescript', 'solidity', 'sql'],
  'systems-networking': ['tokio', 'http-1-1', 'grpc', 'redis'],
  'solana-web3': ['solana', 'anchor', 'yellowstone-grpc', 'ethereum'],
  'backend-web': ['nodejs', 'bun', 'elysiajs', 'nextjs'],
  'data-infrastructure': ['postgresql', 'prisma', 'docker', 'github-actions'],
};

function SkillGlyph({ skill }: { skill: SkillDefinition }) {
  const slug = simpleIconSlug[skill.id];
  const iconSource = officialIconUrl[skill.id] ?? (slug ? `https://cdn.simpleicons.org/${slug}/${brandColor[skill.id] ?? '304738'}` : null);
  const FallbackIcon = fallbackIcon[skill.id] ?? Code2;
  const [iconFailed, setIconFailed] = React.useState(false);
  return (
    <span className="relative mt-px flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden text-[#304738]" style={{ color: `#${brandColor[skill.id] ?? '304738'}` }} aria-hidden>
      {(!slug || iconFailed) && <FallbackIcon className="h-3.5 w-3.5" />}
      {iconSource && !iconFailed && <img
        className="block h-4 w-4 shrink-0 object-contain"
        src={iconSource}
        alt=""
        onError={() => setIconFailed(true)}
      />}
    </span>
  );
}

interface SkillMapProps {
  projects: ProjectItem[];
  onOpenProject?: (project: ProjectItem) => void;
  className?: string;
  mode?: 'overview' | 'directory' | 'visual';
}

export function SkillMap({ projects, onOpenProject, className = '', mode = 'directory' }: SkillMapProps) {
  const [activeDomain, setActiveDomain] = useState<SkillCategoryId | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = SKILLS.find((item) => item.id === selectedId) ?? null;
  const linkedProjects = useMemo(
    () => selected ? projects.filter((project) => selected.projectIds.includes(project.id)) : [],
    [projects, selected],
  );

  const selectDomain = (id: SkillCategoryId) => {
    setSelectedId(null);
    setActiveDomain((current) => current === id ? null : id);
  };

  const currentSkills = activeDomain ? SKILLS.filter((item) => item.category === activeDomain) : [];
  const isOverview = mode === 'overview' || mode === 'visual';

  return (
    <section className={`min-w-0 ${className}`} aria-label="Technical skill map">
      <div className={isOverview ? 'grid grid-cols-1 gap-2 sm:grid-cols-2' : 'flex flex-wrap gap-1.5'}>
        {SKILL_CATEGORIES.map((domain, index) => {
          const active = activeDomain === domain.id;
          const domainSkills = SKILLS.filter((item) => item.category === domain.id);
          const visible = isOverview ? domainSkills.filter((item) => featuredSkills[domain.id].includes(item.id)) : [];
          return (
            <div key={domain.id} className={isOverview && index === SKILL_CATEGORIES.length - 1 ? 'sm:col-span-2' : ''}>
              <button
                type="button"
                onClick={() => selectDomain(domain.id)}
                aria-pressed={active}
                className={`skill-domain w-full border p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#604BB4] focus-visible:ring-offset-2 ${
                  active ? 'border-[#604BB4] bg-[#E7E4F2]/70' : 'border-[#D8D6CA] bg-[#F8F7F1] hover:border-[#93A18A] hover:bg-[#FAF8F3]'
                } ${isOverview ? 'min-h-[106px]' : 'px-2.5 py-2'}`}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${active ? 'text-[#604BB4]' : 'text-[#304738]'}`}>{domain.name}</span>
                  <span className="font-mono text-[10px] tabular-nums text-[#77786E]">0{index + 1}</span>
                </span>
                {isOverview ? (
                  <span className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1.5">
                    {visible.map((skill) => <span key={skill.id} className="flex min-w-0 items-start gap-1.5 font-mono text-[10px] leading-tight text-[#252922]"><SkillGlyph skill={skill} /><span className="break-words">{skill.name}</span></span>)}
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}
      </div>

      {!isOverview && !activeDomain && (
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-[#77786E]">Choose a domain to open its complete technology directory.</p>
      )}

      {activeDomain && (
        <div className="skill-map-reveal mt-3 border-t border-[#D8D6CA] pt-3" aria-live="polite">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#304738]">{SKILL_CATEGORIES.find((item) => item.id === activeDomain)?.name}</h4>
            <button type="button" onClick={() => { setActiveDomain(null); setSelectedId(null); }} className="min-h-10 px-1 font-mono text-[10px] text-[#604BB4] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#604BB4]">Clear domain</button>
          </div>
          <div className="grid grid-cols-1 gap-1.5 min-[420px]:grid-cols-2">
            {currentSkills.map((skill) => {
              const active = selectedId === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setSelectedId(active ? null : skill.id)}
                  aria-pressed={active}
                  className={`skill-map-item flex min-h-10 items-center gap-2 border px-2.5 py-2 text-left font-mono text-[11px] leading-snug focus:outline-none focus-visible:ring-2 focus-visible:ring-[#604BB4] focus-visible:ring-offset-1 ${
                    active ? 'border-[#604BB4] bg-[#E7E4F2] text-[#604BB4]' : 'border-[#D8D6CA] bg-[#F8F7F1] text-[#252922] hover:border-[#93A18A] hover:bg-[#EDE7D8]/55'
                  }`}
                >
                  <SkillGlyph skill={skill} />
                  <span className="break-words">{skill.name}</span>
                  {skill.projectIds.length > 0 && <span className="ml-auto shrink-0 text-[9px] tabular-nums text-[#77786E]">{skill.projectIds.length}×</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selected && (
        <div className="skill-map-reveal mt-3 border border-[#D8D6CA] bg-[#EDE7D8]/45 p-3" aria-live="polite">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[#604BB4]"><SkillGlyph skill={selected} /><h4 className="font-mono text-xs font-bold">{selected.name}</h4></div>
              <p className="mt-1 max-w-prose text-xs leading-relaxed text-[#77786E]">{selected.description}</p>
            </div>
            <button type="button" onClick={() => setSelectedId(null)} className="min-h-10 shrink-0 px-1 font-mono text-[10px] text-[#604BB4] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#604BB4]">Clear</button>
          </div>
          <div className="mt-3 border-t border-[#D8D6CA] pt-2">
            <p className="mb-1.5 font-mono text-[9px] uppercase tracking-wider text-[#77786E]">Used in</p>
            {linkedProjects.length ? (
              <div className="flex flex-wrap gap-1.5">
                {linkedProjects.map((project) => <button key={project.id} type="button" onClick={() => onOpenProject?.(project)} className="min-h-10 border border-[#D8D6CA] bg-[#F8F7F1] px-2 text-left font-mono text-[10px] text-[#304738] hover:border-[#93A18A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#604BB4]">{project.headline} <span aria-hidden>↗</span></button>)}
              </div>
            ) : <p className="font-mono text-[10px] leading-relaxed text-[#77786E]">No project link is shown until it is verified in the project record.</p>}
          </div>
        </div>
      )}
    </section>
  );
}
