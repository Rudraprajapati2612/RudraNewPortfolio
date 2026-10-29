'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectItem } from '@/data/projects';

interface VisualPanelProps {
  project: ProjectItem;
  isDetailed?: boolean;
}

export function VisualPanel({ project, isDetailed = false }: VisualPanelProps) {
  const [imageError, setImageError] = useState(false);

  switch (project.visualType) {
    case 'hydra-diagram':
      return <HydraMarketDiagram isDetailed={isDetailed} />;
    case 'portrait':
      return (
        <PortraitVisual
          imageError={imageError}
          onError={() => setImageError(true)}
          isDetailed={isDetailed}
        />
      );
    case 'zest-chart':
      return <ZestVaultChart isDetailed={isDetailed} />;
    case 'swaplit-curve':
      return <SwaplitCurve isDetailed={isDetailed} />;
    case 'skills-matrix':
      return <SkillsMatrixVisual isDetailed={isDetailed} />;
    case 'leaf-vision':
      return <AgroAidVision isDetailed={isDetailed} />;
    case 'research-nodes':
      return <ResearchNodesDiagram isDetailed={isDetailed} />;
    case 'notes-paper':
      return <EngineeringNotesVisual isDetailed={isDetailed} />;
    default:
      return (
        <div className="h-48 bg-[#EDE7D8] flex items-center justify-center text-xs font-mono text-[#77786E]">
          Visual Panel
        </div>
      );
  }
}

// 1. HYDRAMARKET: Technical Architecture Diagram with Dotted Grid & Hover Highlights
function HydraMarketDiagram({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-6 md:p-8 min-h-[340px]' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      {/* Background subtle technical dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#304738 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Top status bar */}
      <div className="relative flex items-center justify-between text-[11px] font-mono text-[#77786E] tracking-wider uppercase">
        <span className="flex items-center gap-1.5 font-medium text-[#304738]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#304738] group-hover:scale-125 transition-transform" />
          DUAL-LAYER STATE
        </span>
        <span className="text-[10px] text-[#77786E] group-hover:text-[#252922] transition-colors">
          FIFO MATCHING · ON-CHAIN BATCH
        </span>
      </div>

      {/* 3 Conceptual Architecture Layers with subtle hover reactivity */}
      <div className="relative my-auto flex flex-col gap-2 py-1.5">
        {/* Layer 1: API Gateway */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:border-[#93A18A] group-hover:shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#77786E] font-semibold">01</span>
            <span className="text-xs font-semibold text-[#252922] font-mono">API / GATEWAY</span>
          </div>
          <span className="text-[10px] font-mono text-[#304738] bg-[#CAD5B3]/40 px-1.5 py-0.5 rounded-[2px]">
            gRPC Stream & Diff Engine
          </span>
        </div>

        {/* Transition flow indicator */}
        <div className="flex justify-center -my-1 text-[#93A18A] transition-transform duration-300 group-hover:translate-y-0.5">
          <span className="text-[10px] font-mono tracking-tighter">↓ lock-free ring buffer</span>
        </div>

        {/* Layer 2: Matching Core (Active highlight) */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#CAD5B3]/60 border border-[#93A18A] rounded-[2px] shadow-sm transition-all duration-300 group-hover:bg-[#CAD5B3]/80 group-hover:border-[#304738]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#304738] font-bold">02</span>
            <span className="text-xs font-semibold text-[#252922] font-mono">MATCHING ENGINE (RUST)</span>
          </div>
          <span className="text-[10px] font-mono text-[#304738] font-semibold">
            Price-Time Priority Queue
          </span>
        </div>

        {/* Transition flow indicator */}
        <div className="flex justify-center -my-1 text-[#93A18A] transition-transform duration-300 group-hover:translate-y-0.5">
          <span className="text-[10px] font-mono tracking-tighter">↓ batched fill commits</span>
        </div>

        {/* Layer 3: Settlement */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#304738] text-[#F8F7F1] rounded-[2px] shadow-sm transition-all duration-300 group-hover:bg-[#252922]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#CAD5B3] font-semibold">03</span>
            <span className="text-xs font-semibold font-mono text-[#F8F7F1]">SETTLEMENT LAYER</span>
          </div>
          <span className="text-[10px] font-mono text-[#CAD5B3]">
            Solana Anchor Program
          </span>
        </div>
      </div>

      {/* Bottom technical footnote */}
      <div className="relative pt-1 border-t border-[#D8D6CA]/70 flex items-center justify-between text-[10px] font-mono text-[#77786E]">
        <span>IN-MEMORY EXECUTION</span>
        <span className="text-[#304738] font-medium group-hover:underline">PROTOTYPE SUITE</span>
      </div>
    </div>
  );
}

// 2. PORTRAIT VISUAL: Rudra Prajapati Photograph with Caption
function PortraitVisual({
  imageError,
  onError,
  isDetailed,
}: {
  imageError: boolean;
  onError: () => void;
  isDetailed: boolean;
}) {
  return (
    <div className="w-full flex flex-col bg-[#EDE7D8] border-b border-[var(--color-border)] select-none">
      <div
        className={`w-full relative overflow-hidden bg-[#EDE7D8] ${
          isDetailed ? 'h-[360px] sm:h-[440px] md:h-[480px]' : 'h-64 sm:h-72'
        }`}
      >
        {!imageError ? (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Rudra Prajapati standing by the open lake shore"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-[center_20%] transition-transform duration-400 ease-out group-hover:scale-[1.03]"
              priority
              onError={onError}
              referrerPolicy="no-referrer"
            />
            {!isDetailed && (
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#252922]/70 via-[#252922]/20 to-transparent" />
            )}
          </div>
        ) : (
          /* Fallback if user photo is temporarily missing */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EDE7D8] text-[#77786E]">
            <div className="w-16 h-16 rounded-full border border-[#D8D6CA] bg-[#F8F7F1] flex items-center justify-center mb-3 text-[#304738]">
              <span className="font-mono text-lg font-bold">RP</span>
            </div>
            <p className="font-mono text-xs text-[#252922] font-medium">Rudra Prajapati</p>
            <p className="font-mono text-[10px] mt-1 text-[#77786E]">
              Place photo at <code className="bg-[#D8D6CA]/50 px-1 py-0.5 rounded">public/images/profile.jpg</code>
            </p>
          </div>
        )}

        {/* Floating caption on card view */}
        {!isDetailed && (
          <div className="absolute bottom-3 left-3 bg-[#F8F7F1]/95 backdrop-blur-sm border border-[#D8D6CA] px-2.5 py-1 rounded-[2px] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 ambient-float">
            <span className="font-mono text-xs text-[#252922] font-medium tracking-tight">
              hello, I&apos;m Rudra :)
            </span>
          </div>
        )}

        {/* Small cream paper Open ↗ badge revealed on hover */}
        {!isDetailed && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-250 ease-out translate-y-1 group-hover:translate-y-0 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F8F7F1]/95 backdrop-blur-xs border border-[#D8D6CA] rounded-[2px] text-[10px] font-mono font-medium text-[#304738] shadow-xs">
              Open ↗
            </span>
          </div>
        )}
      </div>

      {/* Monospace caption beneath photo in detailed modal matching unabrijed.xyz */}
      {isDetailed && (
        <div className="px-4 py-2.5 bg-[#EDE7D8] border-t border-[#D8D6CA] text-[11px] font-mono text-[#77786E]">
          Usually happy. Always building.
        </div>
      )}
    </div>
  );
}

// 3. ZESTVAULT: DeFi APY & Pool Dynamics
function ZestVaultChart({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#F8F7F1] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#FAF8F3] ${
        isDetailed ? 'p-6 min-h-[300px]' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#77786E] uppercase">
        <span className="font-medium text-[#304738]">VAULT METRICS</span>
        <span>SOL / USDC LENDING POOL</span>
      </div>

      {/* SVG chart illustration with subtle hover effect */}
      <div className="relative my-2 w-full flex-1 flex items-center">
        <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
          {/* Subtle grid lines */}
          <line x1="0" y1="20" x2="320" y2="20" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.6" />
          <line x1="0" y1="60" x2="320" y2="60" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.6" />
          <line x1="0" y1="100" x2="320" y2="100" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.6" />

          {/* Shaded yield area under curve */}
          <path
            d="M 10 95 Q 60 85, 110 55 T 200 45 T 270 30 L 310 25 L 310 110 L 10 110 Z"
            fill="#CAD5B3"
            className="opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />

          {/* Primary Strategy APY line */}
          <path
            d="M 10 95 Q 60 85, 110 55 T 200 45 T 270 30 L 310 25"
            fill="none"
            stroke="#304738"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-width-3"
          />

          {/* Baseline comparison line */}
          <path
            d="M 10 100 Q 70 95, 140 85 T 230 75 L 310 70"
            fill="none"
            stroke="#93A18A"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Focal tick point */}
          <circle
            cx="270"
            cy="30"
            r="4"
            fill="#304738"
            stroke="#F8F7F1"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:scale-125"
          />
        </svg>
      </div>

      {/* Metrics strip */}
      <div className="pt-2 border-t border-[#D8D6CA] grid grid-cols-3 gap-2 text-left">
        <div>
          <span className="block text-[9px] font-mono text-[#77786E] uppercase">ORACLE FEED</span>
          <span className="font-mono text-xs font-semibold text-[#252922]">Pyth Net</span>
        </div>
        <div>
          <span className="block text-[9px] font-mono text-[#77786E] uppercase">REBALANCE</span>
          <span className="font-mono text-xs font-semibold text-[#304738]">Sliding Win</span>
        </div>
        <div>
          <span className="block text-[9px] font-mono text-[#77786E] uppercase">STATUS</span>
          <span className="font-mono text-xs font-semibold text-[#77786E]">Devnet Mock</span>
        </div>
      </div>
    </div>
  );
}

// 4. SWAPLIT: Constant Product AMM Curve (x * y = k)
function SwaplitCurve({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-6 min-h-[320px]' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#77786E] uppercase">
        <span className="font-medium text-[#304738]">INVARIANT: x · y = k</span>
        <span>SLIPPAGE & RESERVES</span>
      </div>

      {/* SVG Hyperbolic Curve */}
      <div className="relative my-auto w-full flex-1 flex items-center justify-center">
        <svg viewBox="0 0 340 125" className="w-full h-full">
          {/* Coordinate axes */}
          <line x1="30" y1="10" x2="30" y2="110" stroke="#77786E" strokeWidth="1" />
          <line x1="30" y1="110" x2="320" y2="110" stroke="#77786E" strokeWidth="1" />

          {/* Axis labels */}
          <text x="12" y="20" fill="#77786E" fontSize="9" fontFamily="monospace">Token Y</text>
          <text x="275" y="122" fill="#77786E" fontSize="9" fontFamily="monospace">Token X →</text>

          {/* Hyperbolic constant-product curve */}
          <path
            d="M 45 20 Q 60 70, 115 85 T 300 102"
            fill="none"
            stroke="#304738"
            strokeWidth="2.5"
            className="transition-all duration-300 group-hover:stroke-[#252922]"
          />

          {/* Current reserve coordinate point A */}
          <circle
            cx="85"
            cy="58"
            r="4.5"
            fill="#304738"
            stroke="#EDE7D8"
            strokeWidth="1.5"
            className="transition-transform duration-300 group-hover:scale-125"
          />
          <text x="94" y="55" fill="#252922" fontSize="9" fontWeight="600" fontFamily="monospace">A (x₀, y₀)</text>

          {/* Post-swap trade coordinate point B */}
          <circle cx="160" cy="85" r="4" fill="#93A18A" stroke="#EDE7D8" strokeWidth="1.5" />
          <text x="168" y="83" fill="#77786E" fontSize="9" fontFamily="monospace">B (x₁, y₁)</text>

          {/* Tangent line indicating marginal price */}
          <line
            x1="50"
            y1="40"
            x2="130"
            y2="82"
            stroke="#604BB4"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.8"
            className="transition-opacity duration-300 group-hover:opacity-100"
          />
        </svg>
      </div>

      <div className="pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[10px] font-mono text-[#77786E]">
        <span>MARGINAL PRICE = -dy / dx</span>
        <span className="text-[#304738] group-hover:underline">EVM / SOLIDITY STUDY</span>
      </div>
    </div>
  );
}

// 5. SKILLS MATRIX: Typographic Engineering Toolkit
function SkillsMatrixVisual({ isDetailed }: { isDetailed: boolean }) {
  const highlightSkills = [
    { name: "Rust", domain: "Systems / Concurrency", color: "bg-[#CAD5B3]/70 text-[#252922]" },
    { name: "Solana / Anchor", domain: "Decentralized State", color: "bg-[#F8F7F1] text-[#304738]" },
    { name: "TypeScript", domain: "Client & Runtime", color: "bg-[#F8F7F1] text-[#252922]" },
    { name: "Python / TF", domain: "Vision & Models", color: "bg-[#CAD5B3]/50 text-[#252922]" },
    { name: "Redis & Postgres", domain: "Persistence / Cache", color: "bg-[#F8F7F1] text-[#252922]" },
    { name: "Docker / Linux", domain: "Infra & Tooling", color: "bg-[#304738] text-[#F8F7F1]" },
  ];

  return (
    <div
      className={`w-full bg-[#F8F7F1] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#FAF8F3] ${
        isDetailed ? 'p-6' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#77786E] uppercase">
        <span className="font-medium text-[#304738]">CORE STACK MATRIX</span>
        <span>LANGUAGES & INFRA</span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-auto py-1">
        {highlightSkills.map((s, idx) => (
          <div
            key={idx}
            className={`p-2 border border-[#D8D6CA] rounded-[2px] flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.01] ${s.color}`}
          >
            <span className="text-xs font-mono font-semibold">{s.name}</span>
            <span className="text-[9px] font-mono opacity-80 mt-0.5">{s.domain}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[10px] font-mono text-[#77786E]">
        <span>5 CATEGORIES</span>
        <span>VERIFIED WORKFLOW</span>
      </div>
    </div>
  );
}

// 6. AGROAID: Leaf Disease CNN Vision
function AgroAidVision({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-6 min-h-[300px]' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#77786E] uppercase">
        <span className="font-medium text-[#304738]">CNN FEATURE EXTRACTION</span>
        <span>CLASSIFIER</span>
      </div>

      {/* Visual illustration of leaf scanning & convolutional filter */}
      <div className="relative my-auto w-full flex items-center justify-center py-1">
        <div className="w-full flex items-center justify-between gap-3">
          {/* Leaf outline and bounding box */}
          <div className="relative w-28 h-24 border border-[#93A18A] bg-[#CAD5B3]/40 rounded-[2px] flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 80 80" className="w-16 h-16 text-[#304738] stroke-current fill-none stroke-[1.5]">
              <path d="M 20 60 C 20 20, 60 20, 60 20 C 60 20, 60 60, 20 60 Z" />
              <path d="M 20 60 Q 40 40, 60 20" strokeWidth="1" strokeDasharray="2 2" />
              {/* Lesion detection circle */}
              <circle
                cx="42"
                cy="38"
                r="6"
                stroke="#93A18A"
                strokeWidth="1"
                strokeDasharray="2 2"
                fill="#F8F7F1"
                fillOpacity="0.7"
              />
            </svg>
            <div className="absolute top-1 left-1 text-[8px] font-mono text-[#304738] bg-[#F8F7F1] px-1 border border-[#D8D6CA]">
              ROI #01
            </div>
          </div>

          {/* Arrow */}
          <div className="text-[10px] font-mono text-[#77786E]">→ Conv2D →</div>

          {/* Predictions distribution */}
          <div className="flex-1 flex flex-col gap-1.5 text-[10px] font-mono">
            <div>
              <div className="flex justify-between text-[#252922] font-medium mb-0.5">
                <span>Healthy Leaf</span>
                <span>8.2%</span>
              </div>
              <div className="w-full bg-[#D8D6CA] h-1.5 rounded-sm overflow-hidden">
                <div className="bg-[#93A18A] h-full" style={{ width: '8.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#304738] font-bold mb-0.5">
                <span>Early Blight</span>
                <span>91.4%</span>
              </div>
              <div className="w-full bg-[#D8D6CA] h-1.5 rounded-sm overflow-hidden">
                <div className="bg-[#304738] h-full" style={{ width: '91.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#77786E] mb-0.5">
                <span>Septoria</span>
                <span>0.4%</span>
              </div>
              <div className="w-full bg-[#D8D6CA] h-1.5 rounded-sm overflow-hidden">
                <div className="bg-[#77786E] h-full" style={{ width: '0.4%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[10px] font-mono text-[#77786E]">
        <span>HELD-OUT TEST ACCURACY: 91.4%</span>
        <span>TF / KERAS</span>
      </div>
    </div>
  );
}

// 7. RESEARCH: Distributed Systems Failure Nodes
function ResearchNodesDiagram({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#F8F7F1] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#FAF8F3] ${
        isDetailed ? 'p-6 min-h-[300px]' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#77786E] uppercase">
        <span className="font-medium text-[#304738]">FAULT INJECTION SIMULATION</span>
        <span>CACHE PARTITION</span>
      </div>

      {/* Network nodes and partition barrier */}
      <div className="relative my-auto w-full py-1">
        <svg viewBox="0 0 320 100" className="w-full h-24">
          {/* Links between cluster nodes */}
          <line x1="50" y1="30" x2="160" y2="30" stroke="#CAD5B3" strokeWidth="2" />
          <line x1="50" y1="30" x2="80" y2="75" stroke="#CAD5B3" strokeWidth="2" />
          <line x1="160" y1="30" x2="260" y2="30" stroke="#93A18A" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="160" y1="30" x2="240" y2="75" stroke="#93A18A" strokeWidth="2" strokeDasharray="3 3" />

          {/* Partition barrier line */}
          <line
            x1="200"
            y1="10"
            x2="200"
            y2="90"
            stroke="#604BB4"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            className="transition-all duration-300 group-hover:stroke-width-2"
          />
          <text x="205" y="20" fill="#604BB4" fontSize="8" fontFamily="monospace">PARTITION BARRIER</text>

          {/* Node 1 */}
          <circle cx="50" cy="30" r="14" fill="#EDE7D8" stroke="#304738" strokeWidth="1.5" />
          <text x="44" y="33" fill="#252922" fontSize="9" fontWeight="600" fontFamily="monospace">N1</text>

          {/* Node 2 (Primary Coordinator) */}
          <circle
            cx="160"
            cy="30"
            r="16"
            fill="#304738"
            stroke="#304738"
            strokeWidth="1.5"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <text x="151" y="34" fill="#F8F7F1" fontSize="10" fontWeight="600" fontFamily="monospace">N2</text>

          {/* Node 3 (Sub-cluster) */}
          <circle cx="80" cy="75" r="12" fill="#EDE7D8" stroke="#304738" strokeWidth="1.5" />
          <text x="74" y="78" fill="#252922" fontSize="9" fontFamily="monospace">N3</text>

          {/* Isolated Node 4 */}
          <circle cx="260" cy="30" r="14" fill="#F8F7F1" stroke="#93A18A" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="254" y="33" fill="#77786E" fontSize="9" fontFamily="monospace">N4</text>

          {/* Isolated Node 5 */}
          <circle cx="240" cy="75" r="12" fill="#F8F7F1" stroke="#93A18A" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="234" y="78" fill="#77786E" fontSize="9" fontFamily="monospace">N5</text>
        </svg>
      </div>

      <div className="pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[10px] font-mono text-[#77786E]">
        <span>EXPONENTIAL BACKOFF: -65% CONTENTION</span>
        <span>CHAOS TESTBED</span>
      </div>
    </div>
  );
}

// 8. NOTES: Engineering Workbench Journal
function EngineeringNotesVisual({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-6 min-h-[300px]' : 'p-4 sm:p-5 h-48 sm:h-56'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#77786E] uppercase">
        <span className="font-medium text-[#304738]">WORKBENCH ARCHIVE</span>
        <span>VOLUME 01</span>
      </div>

      {/* Paper-lined editorial note */}
      <div className="relative my-auto bg-[#F8F7F1] border border-[#D8D6CA] p-3 sm:p-4 rounded-[2px] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
        <p className="font-serif italic text-base sm:text-lg text-[#252922] leading-snug">
          &ldquo;Proving what can never happen is usually more valuable than trying to test every valid path.&rdquo;
        </p>
        <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#77786E] border-t border-[#D8D6CA]/60 pt-1.5">
          <span>Note #02 · Invariant-Centric Systems</span>
          <span className="text-[#304738]">Rudra P.</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[10px] font-mono text-[#77786E]">
        <span>3 ACTIVE NOTES</span>
        <span>WRITTEN ESSAYS</span>
      </div>
    </div>
  );
}
