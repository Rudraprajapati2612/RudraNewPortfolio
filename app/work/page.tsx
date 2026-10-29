import { WorkCollection } from '@/components/WorkCollection';
import { WorkContact } from '@/components/WorkContact';
import { WorkFooter } from '@/components/WorkContact';
import { WorkHeader } from '@/components/WorkHeader';

export default function WorkPage() {
  return <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]"><WorkHeader /><WorkCollection /><div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12"><WorkContact /></div><WorkFooter /></div>;
}
