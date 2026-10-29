'use client';
/* eslint-disable @next/next/no-img-element -- Simple Icons are loaded by slug for a compact technology mark. */

import { Code2 } from 'lucide-react';
import { useState } from 'react';

const iconSlug: Record<string, string> = {
  Rust: 'rust', TypeScript: 'typescript', JavaScript: 'javascript', Solidity: 'solidity',
  Tokio: 'tokio', gRPC: 'grpc', Redis: 'redis', Solana: 'solana', Anchor: 'anchor',
  Ethereum: 'ethereum', Bun: 'bun', Elysia: 'elysia', ElysiaJS: 'elysia', React: 'react',
  'Next.js': 'nextdotjs', PostgreSQL: 'postgresql', Prisma: 'prisma', Docker: 'docker',
  GitHub: 'github', SARIF: 'githubactions', TensorFlow: 'tensorflow', Python: 'python',
  Streamlit: 'streamlit', OpenZeppelin: 'openzeppelin', HTTP: 'http', WebSockets: 'websocket',
};

function TechnologyMark({ tag }: { tag: string }) {
  const [failed, setFailed] = useState(false);
  const slug = iconSlug[tag];
  if (!slug || failed) return <Code2 className="h-3.5 w-3.5 text-[var(--color-forest)]" aria-hidden="true" />;
  return <img src={`https://cdn.simpleicons.org/${slug}/304738`} alt="" className="h-3.5 w-3.5 object-contain" onError={() => setFailed(true)} />;
}

export function TechnologyList({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Technologies used"><span className="sr-only">Technologies used:</span>{tags.map((tag) => <span key={tag} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-muted)]"><TechnologyMark tag={tag} />{tag}</span>)}</div>;
}
