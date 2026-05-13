import { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../data/projects';

type PortfolioPageProps = {
  copy: any;
  professionalProjects: Project[];
  personalProjects: Project[];
};

const allProjects = (professional: Project[], personal: Project[]) => [...professional, ...personal];

type PortfolioFilter = { id: string; label: string } | string;

function normalizeFilter(filter: PortfolioFilter) {
  if (typeof filter === 'string') {
    return { id: filter, label: filter };
  }
  return filter;
}

export default function PortfolioPage({ copy, professionalProjects, personalProjects }: PortfolioPageProps) {
  const projects = useMemo(() => allProjects(professionalProjects, personalProjects), [professionalProjects, personalProjects]);
  const filters = useMemo(() => copy.portfolio.filters.map(normalizeFilter), [copy.portfolio.filters]);
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]?.id ?? 'all');
  const filteredProjects = useMemo(() => {
    const normalizedFilter = activeFilter.toLowerCase();
    if (normalizedFilter === 'all' || normalizedFilter === 'todos') {
      return projects;
    }

    if (normalizedFilter.includes('profes') || normalizedFilter.includes('profession')) {
      return projects.filter((project) => project.category === 'Profesional');
    }

    if (normalizedFilter === 'personal') {
      return projects.filter((project) => project.category === 'Personal');
    }

    return projects.filter((project) => project.kind.toLowerCase() === normalizedFilter);
  }, [activeFilter, projects]);

  return (
    <section className="space-y-6">
      <div className="panel p-8 lg:p-10">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">{copy.portfolio.title}</h1>
        <p className="mt-4 max-w-4xl text-slate-300">{copy.portfolio.description}</p>
      </div>

      <div className="panel p-5">
        <div className="flex flex-wrap gap-3">
        {filters.map((filter: { id: string; label: string }) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeFilter === filter.id
                ? 'bg-brand-turquoise text-slate-950'
                : 'border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {filteredProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} copy={copy} />
          </div>
        ))}
      </div>
    </section>
  );
}
