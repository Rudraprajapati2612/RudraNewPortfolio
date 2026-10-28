'use client';

import React, { useEffect } from 'react';
import { ProjectItem } from '@/data/projects';
import { X, ArrowUpRight } from 'lucide-react';

interface AtAGlanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export function AtAGlanceModal({
  isOpen,
  onClose,
  projects,
  onSelectProject,
}: AtAGlanceModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="glance-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#252922]/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#F8F7F1] border border-[var(--color-border)] rounded-[2px] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="px-5 py-4 bg-[#EDE7D8] border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#77786E] uppercase tracking-wider block">
              PORTFOLIO MATRIX
            </span>
            <h2 id="glance-title" className="text-base font-bold text-[#252922]">
              The Work, at a Glance
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 hover:bg-[#D8D6CA] rounded text-[#252922] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Table Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <p className="text-xs text-[#77786E] mb-4 font-mono">
            Structured index of 8 engineering, research, and exploratory works by Rudra Prajapati.
          </p>

          <div className="border border-[#D8D6CA] rounded-[2px] overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#EDE7D8]/60 text-[#77786E] uppercase text-[10px] border-b border-[#D8D6CA]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Headline & Scope</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Core Stack</th>
                  <th className="py-2.5 px-3">Stage</th>
                  <th className="py-2.5 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D6CA]/70 bg-[#F8F7F1]">
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-[#EDE7D8]/40 transition-colors cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProject(p);
                    }}
                  >
                    <td className="py-3 px-3 font-bold text-[#304738]">{p.index}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#252922] block font-sans text-sm">
                        {p.headline}
                      </span>
                      <span className="text-[10px] text-[#77786E] uppercase tracking-wider">
                        {p.eyebrow}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#252922]">{p.category}</td>
                    <td className="py-3 px-3 text-[#77786E]">
                      {p.tags.slice(0, 3).join(', ')}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-semibold text-[#304738] uppercase">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onSelectProject(p);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#304738] hover:text-[#252922] transition-colors"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
