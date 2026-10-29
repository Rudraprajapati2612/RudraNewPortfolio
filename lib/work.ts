import { PROJECTS, ProjectItem } from '@/data/projects';

export const WORK_PROJECTS = PROJECTS.filter((project) => project.id !== 'about-rudra');

const slugById: Record<string, string> = {
  hydramarket: 'hydramarket',
  'about-rudra': 'about',
  sentinelguard: 'sentinelguard',
  ferrum: 'ferrum',
  'layoutd-cli': 'layout-drift',
  swaplit: 'swaplit',
  'better-uptime': 'better-uptime',
  engram: 'engram',
  'skills-toolkit': 'skills',
  agroaid: 'agroaid',
  'research-notebook': 'systems-research',
  'engineering-notes': 'engineering-notes',
};

const nameById: Record<string, string> = {
  hydramarket: 'HydraMarket',
  'about-rudra': 'Away from the keyboard',
  sentinelguard: 'SentinelGuard',
  ferrum: 'Ferrum',
  'layoutd-cli': 'Layoutd',
  swaplit: 'SwapLiT',
  'better-uptime': 'Better Uptime',
  engram: 'Engram',
  'skills-toolkit': 'The Toolkit',
  agroaid: 'AgroAid',
  'research-notebook': 'Systems research',
  'engineering-notes': 'Engineering notes',
};

export function projectSlug(project: ProjectItem) {
  return slugById[project.id] ?? project.id;
}

export function projectName(project: ProjectItem) {
  return nameById[project.id] ?? project.headline;
}

export function projectPath(project: ProjectItem) {
  return `/work/${projectSlug(project)}`;
}

export function getProjectBySlug(slug: string) {
  return WORK_PROJECTS.find((project) => projectSlug(project) === slug) ?? null;
}

export function getRelatedProjects(project: ProjectItem, limit = 2) {
  return WORK_PROJECTS
    .filter((candidate) => candidate.id !== project.id)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => project.tags.includes(tag)).length;
      const sameCategory = candidate.category === project.category ? 2 : 0;
      return { candidate, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score || a.candidate.index.localeCompare(b.candidate.index))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export const workFilters = ['All', 'Engineering', 'Research', 'Experiments', 'Skills & Tools'] as const;
export type WorkFilter = (typeof workFilters)[number];

export function matchesWorkFilter(project: ProjectItem, filter: WorkFilter) {
  if (filter === 'All') return true;
  if (filter === 'Skills & Tools') return project.category === 'Skills';
  if (filter === 'Experiments') return project.status === 'Prototype' || project.status === 'Archive';
  return project.category === filter;
}
