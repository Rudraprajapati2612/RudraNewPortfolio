import Link from 'next/link';
import { AUTHOR } from '@/data/projects';

export function WorkContact() {
  return (
    <section className="border-t border-[var(--color-border)] py-24 sm:py-28" aria-labelledby="work-contact-heading">
      <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-forest)]">A SMALL OPENING</p>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="work-contact-heading" className="max-w-[700px] text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">Have something interesting in mind?</h2>
        <Link href="/contact" className="work-glance-focus editorial-link group shrink-0 self-start font-mono text-xs uppercase tracking-[0.12em] sm:self-end"><span className="editorial-link-text">Say hello ↗</span></Link>
      </div>
      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[var(--color-border)] pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
        <a className="work-glance-focus editorial-link group" href={`mailto:${AUTHOR.email}`}><span className="editorial-link-text">{AUTHOR.email}</span></a>
        <a className="work-glance-focus editorial-link group" href={AUTHOR.links.github} target="_blank" rel="noopener noreferrer"><span className="editorial-link-text">GitHub ↗</span></a>
        <a className="work-glance-focus editorial-link group" href={AUTHOR.links.linkedin} target="_blank" rel="noopener noreferrer"><span className="editorial-link-text">LinkedIn ↗</span></a>
      </div>
    </section>
  );
}

export function WorkFooter() {
  return <footer className="border-t border-[var(--color-border)] px-5 py-6 sm:px-8 lg:px-12"><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"><span>Rudra Prajapati · Collection 2026</span><Link href="/" className="work-glance-focus editorial-link group self-start sm:self-auto"><span className="editorial-link-text">Back to collection</span></Link></div></footer>;
}
