import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface WorkHeaderProps {
  current?: 'work' | 'resume' | 'about' | 'skills';
}

export function WorkHeader({ current = 'work' }: WorkHeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="work-glance-focus editorial-link group shrink-0 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="mr-2 text-[var(--color-active-ink)]">•</span>
          <span className="editorial-link-text">Rudra Prajapati</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em] sm:gap-8">
          <Link href="/work" aria-current={current === 'work' ? 'page' : undefined} className={`work-glance-focus editorial-link group ${current === 'work' ? 'text-[var(--color-active-ink)]' : ''}`}><span className="editorial-link-text">Work</span></Link>
          <Link href="/skills" aria-current={current === 'skills' ? 'page' : undefined} className={`work-glance-focus editorial-link group hidden sm:inline-flex ${current === 'skills' ? 'text-[var(--color-active-ink)]' : ''}`}><span className="editorial-link-text">Skills</span></Link>
          <Link href="/resume" aria-current={current === 'resume' ? 'page' : undefined} className={`work-glance-focus editorial-link group ${current === 'resume' ? 'text-[var(--color-active-ink)]' : ''}`}><span className="editorial-link-text">Résumé</span></Link>
          <Link href="/contact" className="work-glance-focus editorial-link group"><span className="editorial-link-text">Say hello</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function BackToWork() {
  return <Link href="/work" className="work-glance-focus editorial-link group inline-flex min-h-10 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]"><span aria-hidden="true">←</span><span className="editorial-link-text">All work</span></Link>;
}

export function ExternalTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="work-glance-focus editorial-link group inline-flex items-center gap-1"><span className="editorial-link-text">{children}</span><ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>;
}
