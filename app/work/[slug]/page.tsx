import { notFound } from 'next/navigation';
import { projectSlug, getProjectBySlug, WORK_PROJECTS } from '@/lib/work';
import { ProjectPage } from '@/components/ProjectPage';

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({ slug: projectSlug(project) }));
}

export default async function WorkProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
