import ProjectCard from '../components/ProjectCard';
import type { Project } from '../data/projects';
import { mediaPath } from '../lib/paths';

type ProfessionalPageProps = {
  copy: any;
  professionalProjects: Project[];
  locale: string;
};

type CapabilityBlock = {
  iconName: string;
  label: string;
  text: string;
};

export default function ProfessionalPage({ copy, professionalProjects, locale }: ProfessionalPageProps) {
  const capabilityBlocks = (copy.professional.capabilityBlocks ?? []) as CapabilityBlock[];

  return (
    <section className="space-y-6">
      <div className="panel p-8 lg:p-10">
        <div className="grid gap-7 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{copy.professional.title}</h1>
            <p className="mt-4 max-w-4xl text-slate-300">{copy.professional.description}</p>

            <div className="mt-7 panel-soft p-6 text-slate-200">
              <span className="text-xs uppercase tracking-[0.24em] text-orange-300">{copy.professional.currentRoleLabel}</span>
              <p className="mt-3 text-2xl font-semibold text-white">{copy.professional.currentRole}</p>
              <img
                src={mediaPath('/media/companies/ibm.png')}
                alt="IBM"
                className="mt-4 h-10 rounded-md bg-white px-3 py-1 object-contain"
              />
            </div>
          </div>

          <img src={mediaPath('/media/personal/mario-photo2.jpg')} alt="Mario Gijon" className="h-[235px] w-full self-end rounded-2xl border border-orange-500/30 bg-white p-2 object-contain shadow-lg" />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {capabilityBlocks.map((item, index) => {
            return (
              <div key={item.label} className={`panel-soft p-4 fade-up stagger-${index + 1} border-orange-400/30`}>
                <img src={mediaPath(`/media/capabilities/${item.iconName}.svg`)} alt={item.label} className="h-10 w-10" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-orange-400/70">{item.label}</p>
                <p className="mt-2 text-sm text-white/80">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/kinds/portfolio.svg')} alt="Portfolio" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.professional.projectsTitle}</h2>
        </div>
        <p className="mt-3 text-slate-300">{copy.professional.projectsDescription}</p>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {professionalProjects.map((project, index) => (
            <div key={project.id} className={`fade-up stagger-${(index % 6) + 1} h-full`}>
              <ProjectCard project={project} copy={copy} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
