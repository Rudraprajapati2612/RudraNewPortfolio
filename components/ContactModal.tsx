'use client';

import React, { useEffect, useState } from 'react';
import { X, Mail, Copy, Check, ArrowUpRight, Github, Linkedin, Clock } from 'lucide-react';
import { AUTHOR } from '@/data/projects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    // Format IST time
    const updateTime = () => {
      try {
        const now = new Date();
        const istString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setIstTime(istString);
      } catch (err) {
        setIstTime('IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

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
      aria-labelledby="contact-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252922]/60 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#F8F7F1] border border-[var(--color-border)] rounded-[2px] shadow-2xl p-6 sm:p-7 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8D6CA] mb-5">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#304738]" />
            <h2 id="contact-title" className="text-base font-bold text-[#252922]">
              Say Hello
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact modal"
            className="p-1 hover:bg-[#D8D6CA] rounded text-[#252922] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#77786E] leading-relaxed mb-5">
          Whether you want to discuss low-latency order matching, DeFi protocol mechanics, system failures, or simply exchange ideas—feel free to reach out.
        </p>

        {/* Primary Email Box */}
        <div className="p-3.5 bg-[#EDE7D8] border border-[#D8D6CA] rounded-[2px] mb-5">
          <span className="text-[10px] font-mono uppercase text-[#77786E] block mb-1">
            DIRECT EMAIL
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#252922] truncate select-all">
              {AUTHOR.email}
            </span>
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="px-2.5 py-1 bg-[#F8F7F1] border border-[#D8D6CA] hover:border-[#93A18A] text-[11px] font-mono text-[#252922] rounded-[2px] flex items-center gap-1 shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#304738]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Direct Send button */}
        <div className="flex gap-2 mb-6">
          <a
            href={`mailto:${AUTHOR.email}?subject=Hello%20Rudra`}
            className="flex-1 py-2.5 px-4 bg-[#304738] text-[#F8F7F1] hover:bg-[#252922] text-xs font-mono font-medium rounded-[2px] text-center flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Email Client</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Timezone and social strip */}
        <div className="pt-4 border-t border-[#D8D6CA] flex items-center justify-between text-xs font-mono text-[#77786E]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#304738]" />
            <span>{AUTHOR.location}</span>
            {istTime && <span>· {istTime}</span>}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={AUTHOR.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-[#77786E] hover:text-[#252922] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={AUTHOR.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-[#77786E] hover:text-[#252922] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
