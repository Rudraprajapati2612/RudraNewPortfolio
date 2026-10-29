import { redirect } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { ProjectPage } from '@/components/ProjectPage';

export default function AboutPage() {
  const project = PROJECTS.find((item) => item.id === 'about-rudra');
  if (!project) redirect('/');
  return <ProjectPage project={project} />;
}
