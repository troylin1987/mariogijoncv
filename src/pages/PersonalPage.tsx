import ProjectCard from '../components/ProjectCard';
import type { Project } from '../data/projects';
import { mediaPath } from '../lib/paths';

type PersonalPageProps = {
  copy: any;
  personalProjects: Project[];
  locale: string;
};

type CapabilityBlock = {
  iconName: string;
  label: string;
  text: string;
};

export default function PersonalPage({ copy, personalProjects, locale }: PersonalPageProps) {
  const capabilityBlocks = (copy.personal.capabilityBlocks ?? []) as CapabilityBlock[];

  return (
    <section className="space-y-6">
      <div className="panel p-8 lg:p-10">
        <div className="grid gap-7 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{copy.personal.title}</h1>
            <p className="mt-4 max-w-4xl text-slate-300">{copy.personal.description}</p>
          </div>

          <img src={mediaPath('/media/personal/mario-photo3.jpg')} alt="Mario Gijon" className="h-[320px] w-full self-end rounded-2xl border border-orange-500/30 bg-white object-[50%_82%] object-cover shadow-lg md:h-[235px]" />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {capabilityBlocks.map((item, index) => (
            <div key={item.label} className={`panel-soft p-4 fade-up stagger-${index + 1} border-orange-400/30`}>
              <img src={mediaPath(`/media/capabilities/${item.iconName}.svg`)} alt={item.label} className="h-10 w-10" />
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-orange-400/70">{item.label}</p>
              <p className="mt-2 text-sm text-white/80">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/kinds/portfolio.svg')} alt="Portfolio" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.personal.projectsTitle}</h2>
        </div>
        <p className="mt-4 text-slate-300">{copy.personal.projectsDescription}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {personalProjects.map((project, index) => (
          <div key={project.id} className={`fade-up stagger-${(index % 6) + 1} h-full`}>
            <ProjectCard project={project} copy={copy} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}
