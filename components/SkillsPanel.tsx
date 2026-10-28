'use client';

import React from 'react';
import { skillGroups } from '@/data/skills';
import { Terminal, Cpu, Database, Blocks, Brain } from 'lucide-react';

const icons = [Terminal, Cpu, Blocks, Database, Brain];

export function SkillsPanel() {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#D8D6CA] pb-3">
        <p className="text-xs font-mono uppercase tracking-wider text-[#77786E]">
          TECHNICAL TOOLKIT & COMPETENCIES
        </p>
      </div>

      <div className="space-y-5">
        {skillGroups.map((group, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={group.category}
              className="p-4 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px]"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#304738]" />
                  <h4 className="font-mono text-xs font-bold uppercase text-[#252922] tracking-wider">
                    {group.category}
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-[#77786E]">
                  0{idx + 1}
                </span>
              </div>

              <p className="text-xs text-[#77786E] mb-3 leading-relaxed">
                {group.description}
              </p>

              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-[#304738]">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={skill}
                    className="inline-flex items-center bg-[#CAD5B3]/30 px-2 py-0.5 rounded-[2px] text-[11px] font-medium border border-[#93A18A]/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
