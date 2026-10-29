'use client';

import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Download, ArrowUpRight } from 'lucide-react';
import { AUTHOR } from '@/data/projects';
import { skillGroups } from '@/data/skills';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHOR.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#252922]/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#F8F7F1] border border-[var(--color-border)] rounded-[2px] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <header className="px-5 py-3.5 bg-[#EDE7D8] border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#77786E]">
            <span className="font-bold text-[#304738]">CURRICULUM VITAE</span>
            <span>/</span>
            <span className="text-[#252922]">Rudra Prajapati</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              aria-label="Print résumé"
              className="px-2.5 py-1 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] text-xs font-mono text-[#252922] rounded-[2px] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#304738]" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="px-2.5 py-1 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] text-xs font-mono text-[#252922] rounded-[2px] flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#304738]" />
                  <span className="hidden sm:inline">Copy Email</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              aria-label="Close résumé modal"
              className="p-1 hover:bg-[#D8D6CA] rounded text-[#252922] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Printable Editorial Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#F8F7F1] text-[#252922]">
          {/* Header */}
          <div className="border-b border-[#D8D6CA] pb-6">
            <h1 id="resume-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
              Rudra Prajapati
            </h1>
            <p className="font-mono text-xs text-[#304738] font-semibold tracking-wider mt-1 uppercase">
              ENGINEER / BUILDER / EXPLORER
            </p>
            <p className="text-xs font-mono text-[#77786E] mt-2">
              India (IST) · {AUTHOR.email} · github.com/rudraprajapati
            </p>
            <p className="text-sm text-[#77786E] mt-3 leading-relaxed">
              Software engineer focused on distributed systems, low-latency order matching, decentralized protocol mechanics, and computer vision classification pipelines. Dedicated to building clean, resilient architectures with verifiable invariants.
            </p>
          </div>

          {/* Core Competencies */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold border-b border-[#D8D6CA] pb-1">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {skillGroups.map((group) => (
                <div key={group.category} className="p-2.5 bg-[#EDE7D8]/40 border border-[#D8D6CA] rounded-[2px]">
                  <span className="font-bold text-[#252922] block mb-1 uppercase text-[11px]">
                    {group.category}
                  </span>
                  <p className="text-[#77786E] text-[11px] leading-relaxed">
                    {group.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Engineering Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold border-b border-[#D8D6CA] pb-1">
              ENGINEERING & PROTOCOL HIGHLIGHTS
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-sm text-[#252922]">
                    HydraMarket — Hybrid Prediction Market Architecture
                  </span>
                  <span className="font-mono text-[#77786E] text-[11px]">Rust, Solana, gRPC</span>
                </div>
                <p className="text-[#77786E] leading-relaxed mb-1.5">
                  Designed an asynchronous off-chain FIFO orderbook matching engine in Rust that decouples rapid trade executions from batched on-chain settlement transactions on Solana via Anchor.
                </p>
                <ul className="list-disc list-inside text-[#77786E] space-y-0.5 text-[11px]">
                  <li>Utilized zero-copy serialization buffers to minimize thread context switching.</li>
                  <li>Implemented deterministic settlement batch reconciliation with escrow state validation.</li>
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-sm text-[#252922]">
                    SwapLiT — Automated Market Maker & Constant-Product DEX
                  </span>
                  <span className="font-mono text-[#77786E] text-[11px]">Solidity, OpenZeppelin, Prisma</span>
                </div>
                <p className="text-[#77786E] leading-relaxed mb-1.5">
                  Built decentralized AMM contracts preserving the constant-product invariant (x * y = k) with internal LP token accounting, geometric-mean minting, and multi-hop routing with slippage protection.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-sm text-[#252922]">
                    Layoutd — Solana Account Layout Diff & CI Gate
                  </span>
                  <span className="font-mono text-[#77786E] text-[11px]">Rust, Anchor, Syn, SARIF, GitHub Actions</span>
                </div>
                <p className="text-[#77786E] leading-relaxed mb-1.5">
                  Engineered an off-chain CLI and CI gate analyzing Borsh and zero-copy account layouts, classifying field changes as Safe, Review, or Danger to prevent breaking on-chain migrations.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-sm text-[#252922]">
                    Engram — Conversational AI Assistant with Long-Term Memory
                  </span>
                  <span className="font-mono text-[#77786E] text-[11px]">Bun, ElysiaJS, Gemini, pgvector, Redis, BullMQ</span>
                </div>
                <p className="text-[#77786E] leading-relaxed mb-1.5">
                  Architected a dual-path AI memory pipeline decoupling real-time WebSocket token streaming from asynchronous BullMQ fact extraction and PostgreSQL pgvector semantic retrieval.
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-sm text-[#252922]">
                    AgroAid — Plant Pathology Computer Vision Classifier
                  </span>
                  <span className="font-mono text-[#77786E] text-[11px]">Python, TensorFlow, CNN</span>
                </div>
                <p className="text-[#77786E] leading-relaxed">
                  Engineered a convolutional image classification pipeline identifying early crop leaf lesions with 91.4% test accuracy on held-out controlled validation splits.
                </p>
              </div>
            </div>
          </section>

          {/* Engineering Philosophy */}
          <section className="space-y-2 border-t border-[#D8D6CA] pt-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#304738] font-bold">
              APPROACH
            </h2>
            <p className="text-xs text-[#77786E] leading-relaxed">
              I prioritize reproducible benchmarks, clear failure recovery mechanisms, explicit invariant proofs, and empathetic visual design over unnecessary framework churn.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
