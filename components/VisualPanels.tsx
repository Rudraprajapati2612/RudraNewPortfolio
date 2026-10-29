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
    case 'sentinel-guard':
      return <SentinelGuardDiagram isDetailed={isDetailed} />;
    case 'ferrum-pipeline':
      return <FerrumPipelineDiagram isDetailed={isDetailed} />;
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

// 1. HYDRAMARKET: Engineering Architecture & Prediction Market Order-Matching Diagram
function HydraMarketDiagram({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-5 sm:p-7 min-h-[360px]' : 'p-3.5 sm:p-4.5 min-h-[290px] sm:min-h-[305px]'
      }`}
    >
      {/* Background technical dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#304738 1px, transparent 1px)',
          backgroundSize: '13px 13px',
        }}
      />

      {/* Top Header Bar: Architecture Route & State Indicators */}
      <div className="relative flex items-center justify-between text-[10px] sm:text-[11px] font-mono pb-2 border-b border-[#D8D6CA]/80">
        <div className="flex items-center gap-1.5 font-semibold text-[#304738]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#304738] group-hover:scale-125 transition-transform" />
          <span className="tracking-wide">API GATEWAY</span>
          <span className="text-[#93A18A]">→</span>
          <span className="tracking-wide">RUST ENGINE</span>
          <span className="text-[#93A18A]">→</span>
          <span className="tracking-wide text-[#252922]">SOLANA</span>
        </div>
        <span className="text-[9.5px] font-mono text-[#77786E] px-1.5 py-0.5 bg-[#F8F7F1]/90 border border-[#D8D6CA] rounded-[2px] shrink-0">
          OFF-CHAIN MATCHING
        </span>
      </div>

      {/* Central Architecture Flow: 3 Connected Modular Layers */}
      <div className="relative my-2 flex flex-col gap-1.5 sm:gap-2">
        {/* Layer 01: API & Ingestion Gateway */}
        <div className="flex items-center justify-between px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 group-hover:border-[#93A18A]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[9px] font-mono font-bold text-[#77786E]">01</span>
            <span className="text-[11px] font-mono font-bold text-[#252922] truncate">API GATEWAY</span>
            <span className="text-[9.5px] font-mono text-[#77786E] hidden sm:inline">[gRPC / Tokio]</span>
          </div>
          <span className="text-[9px] font-mono text-[#304738] bg-[#CAD5B3]/40 px-1.5 py-0.5 rounded-[2px] shrink-0">
            Order Ingestion · Signature Auth
          </span>
        </div>

        {/* Transition Line: Gateway -> Matching Core */}
        <div className="flex items-center justify-center gap-1.5 -my-0.5 sm:-my-1 text-[#93A18A] transition-transform duration-200 group-hover:translate-y-0.5">
          <span className="text-[9px] font-mono tracking-tighter">↓ lock-free ring buffer</span>
        </div>

        {/* Layer 02: Rust Matching Core with Compact Order-Book & YES/NO Indicators */}
        <div className="bg-[#F8F7F1] border border-[#93A18A] rounded-[2px] p-2.5 sm:p-3 shadow-xs transition-all duration-200 group-hover:border-[#304738] group-hover:shadow-sm">
          {/* Engine Header */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#D8D6CA]">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-[#304738]">02</span>
              <span className="text-[11px] font-mono font-bold text-[#252922]">RUST MATCHING ENGINE</span>
            </div>
            <span className="text-[9px] font-mono text-[#304738] font-bold bg-[#CAD5B3]/60 px-1.5 py-0.5 rounded-[2px]">
              PRICE-TIME PRIORITY
            </span>
          </div>

          {/* Compact Order-Book: YES outcome bids vs NO outcome asks */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10px] font-mono">
            {/* YES Bids Column */}
            <div className="p-1.5 bg-[#EDE7D8]/60 border border-[#D8D6CA] rounded-[2px] space-y-1">
              <div className="flex items-center justify-between text-[9px] text-[#77786E] border-b border-[#D8D6CA]/60 pb-0.5">
                <span className="font-semibold text-[#304738]">OUTCOME [YES]</span>
                <span className="text-[8.5px]">BIDS</span>
              </div>
              {/* Matched row (highlighted on hover) */}
              <div className="flex items-center justify-between px-1 py-0.5 bg-[#CAD5B3]/50 border border-[#93A18A]/60 rounded-[2px] text-[#252922] font-semibold transition-colors duration-200 group-hover:bg-[#CAD5B3]/80 group-hover:border-[#304738]">
                <span className="text-[#304738]">0.64 SOL</span>
                <span className="tabular-nums">25.0 qty</span>
                <span className="text-[8.5px] text-[#77786E]">T_01</span>
              </div>
              <div className="flex items-center justify-between px-1 py-0.5 text-[#77786E]">
                <span>0.63 SOL</span>
                <span className="tabular-nums">50.0 qty</span>
                <span className="text-[8.5px]">T_02</span>
              </div>
            </div>

            {/* NO Asks Column */}
            <div className="p-1.5 bg-[#EDE7D8]/60 border border-[#D8D6CA] rounded-[2px] space-y-1">
              <div className="flex items-center justify-between text-[9px] text-[#77786E] border-b border-[#D8D6CA]/60 pb-0.5">
                <span className="font-semibold text-[#77786E]">OUTCOME [NO]</span>
                <span className="text-[8.5px]">ASKS</span>
              </div>
              {/* Matched complementary row (highlighted on hover) */}
              <div className="flex items-center justify-between px-1 py-0.5 bg-[#CAD5B3]/50 border border-[#93A18A]/60 rounded-[2px] text-[#252922] font-semibold transition-colors duration-200 group-hover:bg-[#CAD5B3]/80 group-hover:border-[#304738]">
                <span className="text-[#304738]">0.36 SOL</span>
                <span className="tabular-nums">25.0 qty</span>
                <span className="text-[8.5px] text-[#77786E]">T_01</span>
              </div>
              <div className="flex items-center justify-between px-1 py-0.5 text-[#77786E]">
                <span>0.37 SOL</span>
                <span className="tabular-nums">40.0 qty</span>
                <span className="text-[8.5px]">T_02</span>
              </div>
            </div>
          </div>

          {/* Matching Event Cue & Complementary Fill Annotation */}
          <div className="mt-1.5 pt-1.5 border-t border-[#D8D6CA]/70 flex items-center justify-between text-[9px] font-mono">
            <span className="text-[#77786E] flex items-center gap-1 truncate">
              <span className="text-[#304738] font-bold">MATCH STATE:</span>
              <span className="truncate">0.64 YES + 0.36 NO = 1.00 SOL</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[#304738] font-bold shrink-0 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#304738] group-hover:scale-125 transition-transform" />
              FIFO MATCHED
            </span>
          </div>
        </div>

        {/* Transition Line: Matching Core -> Solana Settlement */}
        <div className="flex items-center justify-center gap-1.5 -my-0.5 sm:-my-1 text-[#93A18A] transition-transform duration-200 group-hover:translate-y-0.5">
          <span className="text-[9px] font-mono tracking-tighter">↓ batched fill commits · async worker</span>
        </div>

        {/* Layer 03: Solana On-Chain Settlement Layer */}
        <div className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-[#304738] text-[#F8F7F1] rounded-[2px] shadow-xs transition-colors duration-200 group-hover:bg-[#252922]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-[#CAD5B3] font-bold">03</span>
              <span className="text-[11px] font-mono font-bold text-[#F8F7F1]">SOLANA SETTLEMENT</span>
              <span className="text-[9.5px] font-mono text-[#CAD5B3] hidden sm:inline">[Anchor Programs]</span>
            </div>
            <span className="text-[9px] font-mono text-[#CAD5B3] bg-[#252922]/50 px-1.5 py-0.5 rounded-[2px]">
              ON-CHAIN SETTLEMENT
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1 sm:gap-1.5 text-[8.5px] sm:text-[9px] font-mono text-[#EDE7D8]">
            <span className="px-1.5 py-0.5 bg-[#252922]/50 rounded-[2px] border border-[#93A18A]/30">
              Market Registry
            </span>
            <span className="px-1.5 py-0.5 bg-[#252922]/50 rounded-[2px] border border-[#93A18A]/30">
              Escrow Vault
            </span>
            <span className="px-1.5 py-0.5 bg-[#252922]/50 rounded-[2px] border border-[#93A18A]/30">
              Resolution Adapter
            </span>
            <span className="ml-auto text-[#CAD5B3] font-medium hidden xs:inline">
              Non-Custodial
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Technical Footnote */}
      <div className="relative pt-1 border-t border-[#D8D6CA]/70 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#77786E]">
        <span>OFF-CHAIN SPEED · ON-CHAIN CUSTODY</span>
        <span className="text-[#304738] font-semibold group-hover:underline">
          ARCHITECTURE SPECIFICATION
        </span>
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

// 3. SENTINELGUARD: Real-time Solana Security Monitoring & Emergency Circuit-Breaker
function SentinelGuardDiagram({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-5 sm:p-7 min-h-[360px]' : 'p-3.5 sm:p-4.5 min-h-[290px] sm:min-h-[305px]'
      }`}
    >
      {/* Background technical dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#304738 1px, transparent 1px)',
          backgroundSize: '13px 13px',
        }}
      />

      {/* Top Header Bar: Threat Detection & Pipeline */}
      <div className="relative flex items-center justify-between text-[10px] sm:text-[11px] font-mono pb-2 border-b border-[#D8D6CA]/80">
        <div className="flex items-center gap-1.5 font-semibold text-[#304738]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#304738] group-hover:scale-125 transition-transform" />
          <span className="tracking-wide">SOLANA STREAM</span>
          <span className="text-[#93A18A]">→</span>
          <span className="tracking-wide">RUST WATCHER</span>
          <span className="text-[#93A18A]">→</span>
          <span className="tracking-wide text-[#252922]">GUARDIAN</span>
        </div>
        <span className="text-[9.5px] font-mono text-[#304738] font-bold px-1.5 py-0.5 bg-[#CAD5B3]/50 border border-[#93A18A]/60 rounded-[2px] shrink-0">
          3 RULES ACTIVE
        </span>
      </div>

      {/* Middle: Live Ingestion & 3 Heuristic Detection Rules */}
      <div className="relative my-2 flex flex-col gap-1.5 sm:gap-2">
        {/* Stream Ingestion Badge */}
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[9px] font-mono font-bold text-[#77786E]">GRPC</span>
            <span className="text-[10.5px] font-mono font-bold text-[#252922] truncate">
              yellowstone-grpc · subscribe(pools)
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#77786E] bg-[#EDE7D8]/80 px-1.5 py-0.5 rounded-[2px] shrink-0">
            slot: 284,912,044
          </span>
        </div>

        {/* 3 Detection Rules Cards */}
        <div className="grid grid-cols-3 gap-1.5 text-[9px] sm:text-[9.5px] font-mono">
          {/* Rule 1: FlashLoanDrain */}
          <div className="p-2 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] space-y-1">
            <div className="flex items-center justify-between border-b border-[#D8D6CA]/60 pb-1">
              <span className="font-bold text-[#304738] truncate">01. FlashLoan</span>
              <span className="text-[8px] text-[#93A18A]">OK</span>
            </div>
            <div className="text-[8.5px] text-[#77786E]">Δ Borrow/Repay</div>
            <div className="text-[#252922] font-semibold">0.04% dev</div>
          </div>

          {/* Rule 2: TvlVelocity */}
          <div className="p-2 bg-[#F8F7F1] border border-[#93A18A] rounded-[2px] space-y-1 bg-[#CAD5B3]/20">
            <div className="flex items-center justify-between border-b border-[#D8D6CA]/60 pb-1">
              <span className="font-bold text-[#304738] truncate">02. TvlVelocity</span>
              <span className="text-[8px] font-bold text-[#304738]">ACTIVE</span>
            </div>
            <div className="text-[8.5px] text-[#77786E]">d(TVL) / dt</div>
            <div className="text-[#304738] font-bold">-$14.2k / 10s</div>
          </div>

          {/* Rule 3: BridgeOutflow */}
          <div className="p-2 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] space-y-1">
            <div className="flex items-center justify-between border-b border-[#D8D6CA]/60 pb-1">
              <span className="font-bold text-[#252922] truncate">03. BridgeSpike</span>
              <span className="text-[8px] text-[#93A18A]">OK</span>
            </div>
            <div className="text-[8.5px] text-[#77786E]">CPI Volume</div>
            <div className="text-[#252922] font-semibold">&lt; 5k SOL limit</div>
          </div>
        </div>

        {/* Action Dispatcher / Circuit Breaker */}
        <div className="px-2.5 py-1.5 sm:py-2 bg-[#F8F7F1] border border-[#93A18A]/80 rounded-[2px] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#604BB4]" />
            <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-[#252922]">
              anchor::sentinel_guardian::pause_withdrawals()
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9px] font-mono text-[#304738] font-bold bg-[#CAD5B3]/60 px-1.5 py-0.5 rounded-[2px]">
            TRIGGER READY
          </span>
        </div>
      </div>

      {/* Bottom Metrics Strip */}
      <div className="relative pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[9.5px] font-mono text-[#77786E]">
        <span className="flex items-center gap-1 truncate">
          <span className="text-[#304738] font-bold">DISPATCH LATENCY:</span>
          <span>~14ms on Tokio worker</span>
        </span>
        <span className="text-[#304738] font-semibold shrink-0">ANCHOR 0.30</span>
      </div>
    </div>
  );
}

// 4. FERRUM: High-Throughput HTTP/1.1 Engine & Radix-Trie Routing Pipeline
function FerrumPipelineDiagram({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#F8F7F1] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#FAF8F3] ${
        isDetailed ? 'p-5 sm:p-7 min-h-[360px]' : 'p-3.5 sm:p-4.5 min-h-[290px] sm:min-h-[305px]'
      }`}
    >
      {/* Background technical dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.20] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#304738 1px, transparent 1px)',
          backgroundSize: '13px 13px',
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between text-[10px] sm:text-[11px] font-mono pb-2 border-b border-[#D8D6CA]/80">
        <div className="flex items-center gap-1.5 font-semibold text-[#304738]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#304738]" />
          <span className="tracking-wide">RAW TCP</span>
          <span className="text-[#93A18A]">→</span>
          <span className="tracking-wide">HTTP PARSER</span>
          <span className="text-[#93A18A]">→</span>
          <span className="tracking-wide text-[#252922]">RADIX TRIE</span>
        </div>
        <span className="text-[9.5px] font-mono text-[#77786E] px-1.5 py-0.5 bg-[#EDE7D8]/80 border border-[#D8D6CA] rounded-[2px] shrink-0">
          ZERO EXTERNAL HTTP CRATES
        </span>
      </div>

      {/* Pipeline Blocks */}
      <div className="relative my-2 flex flex-col gap-1.5 sm:gap-2">
        {/* Layer 01: Raw TCP Socket & Hex Ingestion */}
        <div className="p-2 sm:p-2.5 bg-[#EDE7D8]/60 border border-[#D8D6CA] rounded-[2px]">
          <div className="flex items-center justify-between text-[9px] font-mono text-[#77786E] mb-1">
            <span className="font-bold text-[#252922]">01. TCP INGESTION [Tokio Async I/O]</span>
            <span className="text-[#304738] font-mono">127.0.0.1:8080</span>
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono bg-[#F8F7F1] px-2 py-1 border border-[#D8D6CA]/60 rounded-[2px]">
            <span className="text-[#77786E] truncate">47 45 54 20 2F 61 70 69 2F 75 73 65 72 73 2F 34 32</span>
            <span className="text-[#304738] font-bold shrink-0 ml-1">GET /api/users/42</span>
          </div>
        </div>

        {/* Transition Line */}
        <div className="flex items-center justify-center -my-1 text-[#93A18A]">
          <span className="text-[8.5px] font-mono tracking-tighter">↓ zero-copy byte slice parser</span>
        </div>

        {/* Layer 02: Radix-Trie Prefix Routing Tree */}
        <div className="p-2 sm:p-2.5 bg-[#EDE7D8]/60 border border-[#93A18A] rounded-[2px]">
          <div className="flex items-center justify-between text-[9px] font-mono pb-1 mb-1 border-b border-[#D8D6CA]/70">
            <span className="font-bold text-[#304738]">02. RADIX-TRIE ROUTER</span>
            <span className="text-[8.5px] text-[#77786E]">O(k) PATH MATCHING</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-mono overflow-x-auto py-0.5">
            <span className="px-1.5 py-0.5 bg-[#F8F7F1] border border-[#D8D6CA] rounded text-[#77786E]">/</span>
            <span className="text-[#93A18A]">→</span>
            <span className="px-1.5 py-0.5 bg-[#F8F7F1] border border-[#D8D6CA] rounded text-[#77786E]">api/</span>
            <span className="text-[#93A18A]">→</span>
            <span className="px-1.5 py-0.5 bg-[#F8F7F1] border border-[#D8D6CA] rounded text-[#77786E]">users/</span>
            <span className="text-[#93A18A]">→</span>
            <span className="px-1.5 py-0.5 bg-[#CAD5B3]/70 border border-[#93A18A] rounded font-bold text-[#304738]">
              :id [id=&quot;42&quot;]
            </span>
          </div>
        </div>

        {/* Layer 03: Middleware Stack to Handler */}
        <div className="p-1.5 sm:p-2 bg-[#F8F7F1] border border-[#D8D6CA] rounded-[2px] flex items-center justify-between text-[9px] font-mono">
          <div className="flex items-center gap-1">
            <span className="text-[#77786E]">MIDDLEWARE:</span>
            <span className="px-1 bg-[#EDE7D8] border border-[#D8D6CA] rounded text-[#252922]">Logger</span>
            <span className="text-[#93A18A]">→</span>
            <span className="px-1 bg-[#EDE7D8] border border-[#D8D6CA] rounded text-[#252922]">Cors</span>
            <span className="text-[#93A18A]">→</span>
            <span className="px-1 bg-[#EDE7D8] border border-[#D8D6CA] rounded text-[#252922]">Auth</span>
          </div>
          <span className="text-[#304738] font-bold bg-[#CAD5B3]/50 px-1.5 py-0.5 rounded-[2px] shrink-0">
            200 OK
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[9.5px] font-mono text-[#77786E]">
        <span>RFC 7230 HTTP/1.1 SPEC</span>
        <span className="text-[#304738] font-semibold">&lt; 0.2ms ROUTE DISPATCH</span>
      </div>
    </div>
  );
}

// 5. SWAPLIT: Constant Product AMM Curve (x · y = k)
function SwaplitCurve({ isDetailed }: { isDetailed: boolean }) {
  return (
    <div
      className={`w-full bg-[#EDE7D8] relative overflow-hidden flex flex-col justify-between border-b border-[var(--color-border)] select-none transition-colors duration-300 group-hover:bg-[#EAE4D4] ${
        isDetailed ? 'p-5 sm:p-7 min-h-[360px]' : 'p-3.5 sm:p-4.5 min-h-[290px] sm:min-h-[305px]'
      }`}
    >
      {/* Background technical dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#304738 1px, transparent 1px)',
          backgroundSize: '13px 13px',
        }}
      />

      {/* Top Header */}
      <div className="relative flex items-center justify-between text-[10px] sm:text-[11px] font-mono pb-2 border-b border-[#D8D6CA]/80">
        <div className="flex items-center gap-1.5 font-semibold text-[#304738]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#304738]" />
          <span className="tracking-wide">INVARIANT: x · y = k</span>
        </div>
        <span className="text-[9.5px] font-mono text-[#77786E] px-1.5 py-0.5 bg-[#F8F7F1]/90 border border-[#D8D6CA] rounded-[2px] shrink-0">
          CONSTANT PRODUCT AMM
        </span>
      </div>

      {/* SVG Hyperbolic Curve with State A and State B */}
      <div className="relative my-2 w-full flex-1 flex items-center justify-center">
        <svg viewBox="0 0 340 140" className="w-full h-full overflow-visible">
          {/* Subtle grid lines */}
          <line x1="35" y1="20" x2="330" y2="20" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.5" />
          <line x1="35" y1="58" x2="330" y2="58" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.5" />
          <line x1="35" y1="92" x2="330" y2="92" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.5" />
          <line x1="90" y1="10" x2="90" y2="120" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.5" />
          <line x1="175" y1="10" x2="175" y2="120" stroke="#D8D6CA" strokeDasharray="3 3" opacity="0.5" />

          {/* Coordinate axes */}
          <line x1="35" y1="10" x2="35" y2="122" stroke="#77786E" strokeWidth="1.2" />
          <line x1="35" y1="122" x2="330" y2="122" stroke="#77786E" strokeWidth="1.2" />

          {/* Axis labels */}
          <text x="10" y="16" fill="#77786E" fontSize="9" fontFamily="monospace" fontWeight="600">Token Y (USDC)</text>
          <text x="245" y="136" fill="#77786E" fontSize="9" fontFamily="monospace" fontWeight="600">Token X (ETH) →</text>

          {/* Hyperbolic constant-product curve */}
          <path
            d="M 45 18 Q 70 58, 120 78 T 320 112"
            fill="none"
            stroke="#304738"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-300 group-hover:stroke-[#252922]"
          />

          {/* Tangent slope at Point A representing Marginal Price */}
          <line
            x1="55"
            y1="32"
            x2="135"
            y2="76"
            stroke="#604BB4"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* State A projection dashed lines */}
          <line x1="35" y1="52" x2="92" y2="52" stroke="#93A18A" strokeDasharray="2 2" strokeWidth="1" />
          <line x1="92" y1="52" x2="92" y2="122" stroke="#93A18A" strokeDasharray="2 2" strokeWidth="1" />

          {/* State B projection dashed lines */}
          <line x1="35" y1="88" x2="178" y2="88" stroke="#93A18A" strokeDasharray="2 2" strokeWidth="1" />
          <line x1="178" y1="88" x2="178" y2="122" stroke="#93A18A" strokeDasharray="2 2" strokeWidth="1" />

          {/* Coordinate Point A (Initial State) */}
          <circle
            cx="92"
            cy="52"
            r="4.5"
            fill="#304738"
            stroke="#EDE7D8"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:scale-125"
          />
          <text x="98" y="48" fill="#252922" fontSize="9.5" fontWeight="700" fontFamily="monospace">
            A (x₀, y₀)
          </text>

          {/* Curved Transition Swap Arrow A -> B */}
          <path
            d="M 104 58 Q 128 72, 166 84"
            fill="none"
            stroke="#604BB4"
            strokeWidth="1.8"
          />

          {/* Coordinate Point B (Post-Swap State) */}
          <circle
            cx="178"
            cy="88"
            r="4.5"
            fill="#93A18A"
            stroke="#EDE7D8"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:scale-125"
          />
          <text x="185" y="86" fill="#77786E" fontSize="9.5" fontWeight="700" fontFamily="monospace">
            B (x₁, y₁)
          </text>

          {/* Annotations */}
          <text x="120" y="104" fill="#604BB4" fontSize="8.5" fontFamily="monospace" fontWeight="600">
            +Δx (in) → -Δy (out)
          </text>
          <text x="220" y="45" fill="#77786E" fontSize="8.5" fontFamily="monospace">
            Spot Price: -dy/dx
          </text>
        </svg>
      </div>

      {/* Reserves & Slippage Strip */}
      <div className="relative pt-2 border-t border-[#D8D6CA] flex items-center justify-between text-[9.5px] font-mono text-[#77786E]">
        <span className="flex items-center gap-1.5">
          <span className="text-[#304738] font-bold">FORMULA:</span>
          <span>(x + Δx)(y - Δy) = k</span>
        </span>
        <span className="text-[#304738] font-bold bg-[#CAD5B3]/50 px-1.5 py-0.5 rounded-[2px]">
          SLIPPAGE &lt; 0.2%
        </span>
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
