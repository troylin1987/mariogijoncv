import { Link, useParams } from 'react-router-dom';
import { getProjectById } from '../data/projects';
import ProjectGallery from '../components/ProjectGallery';
import DomainBadge from '../components/DomainBadge';
import { mediaPath } from '../lib/paths';

type ProjectDetailPageProps = {
  copy: any;
  locale: string;
};

const PROFESSIONAL_COMPANY_LOGOS: Record<string, { src: string; alt: string }> = {
  'el-corte-ingles-ai-solutions': { src: mediaPath('/media/companies/el-corte-ingles.png'), alt: 'El Corte Inglés' },
  'banco-santander': { src: mediaPath('/media/companies/banco-santander.png'), alt: 'Banco Santander' },
  bankinter: { src: mediaPath('/media/companies/bankinter.png'), alt: 'Bankinter' },
  'f-c-barcelona-tickets': { src: mediaPath('/media/companies/fc-barcelona.png'), alt: 'Fútbol Club Barcelona' },
  disruptions: { src: mediaPath('/media/companies/iberia.png'), alt: 'Iberia' },
  'llocs-de-treball': { src: mediaPath('/media/companies/ctti.png'), alt: 'CTTI' },
  'passenger-plus': { src: mediaPath('/media/companies/iberia.png'), alt: 'Iberia' },
  'materials-inspect': { src: mediaPath('/media/companies/tecnicas-reunidas.png'), alt: 'Técnicas Reunidas' },
  'bank-of-cyprus': { src: mediaPath('/media/companies/bank-of-cyprus.webp'), alt: 'Bank of Cyprus' },
  bizkaiup: { src: mediaPath('/media/companies/bizkaiup.png'), alt: 'BizkaiUP' },
  aupromas: { src: mediaPath('/media/companies/navantia.png'), alt: 'Navantia' },
  'delivery-notes': { src: mediaPath('/media/companies/ferrovial.png'), alt: 'Ferrovial' },
  sofia: { src: mediaPath('/media/companies/tecnicas-reunidas.png'), alt: 'Técnicas Reunidas' },
  enemalta: { src: mediaPath('/media/companies/enemalta.png'), alt: 'Enemalta' },
  'evo-banco': { src: mediaPath('/media/companies/evobank.png'), alt: 'Evo Banco' },
  'handling-services': { src: mediaPath('/media/companies/ferrovial.png'), alt: 'Ferrovial' },
  'plataforma-tierra': { src: mediaPath('/media/companies/plataforma-tierra.jpg'), alt: 'Plataforma Tierra' },
  insite: { src: mediaPath('/media/companies/ferrovial.png'), alt: 'Ferrovial' }
};

export default function ProjectDetailPage({ copy, locale }: ProjectDetailPageProps) {
  const { projectId } = useParams();
  const project = typeof projectId === 'string' ? getProjectById(projectId, locale) : undefined;
  const projectDetailCopy = copy?.projectDetail ?? {
    notFoundMessage: 'Project not found.',
    backButton: 'Back to projects',
    roleLabel: 'Role',
    viewWebsite: 'View website',
    contextTitle: 'Context',
    descriptionTitle: 'Description',
    problemTitle: 'Problem',
    solutionTitle: 'Solution',
    resultsTitle: 'Results',
    technologiesTitle: 'Technologies',
    featuresTitle: 'Features',
    tagsTitle: 'Tags',
  };

  if (!project) {
    return (
      <section className="panel p-10 text-center">
        <h1 className="text-4xl font-semibold text-white">404</h1>
        <p className="mt-4 text-slate-300">{projectDetailCopy.notFoundMessage}</p>
        <Link to="/professional" className="cta-primary mt-6">
          {projectDetailCopy.backButton}
        </Link>
      </section>
    );
  }

  const projectCardCopy = copy?.projectCard ?? {};
  const kindLabel = projectCardCopy.kindLabels?.[project.kind] ?? project.kind;
  const categoryLabel = projectCardCopy.categoryLabels?.[project.category] ?? project.category;
  const technologyLabels = projectCardCopy.technologyLabels ?? {};
  const LIVE_URL_ALLOWED = new Set(['f-c-barcelona-tickets', 'bank-of-cyprus', 'plataforma-tierra']);
  const showLiveUrl = project.liveUrl && (project.category === 'Personal' || LIVE_URL_ALLOWED.has(project.id));
  const companyLogo = project.category === 'Profesional' ? PROFESSIONAL_COMPANY_LOGOS[project.id] : undefined;

  return (
    <section className="space-y-6">
      <div className="panel overflow-hidden p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-stretch">
          <div>
            <span className="inline-flex rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-brand-orange">
              {categoryLabel} · {kindLabel}
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-300">{project.summary}</p>

            <div className="mt-6 panel-soft p-5 text-slate-200">
              <span className="text-xs uppercase tracking-[0.24em] text-brand-turquoise">{projectDetailCopy.roleLabel}</span>
              <p className="mt-3 text-lg font-semibold text-white">{project.role}</p>
              {companyLogo ? (
                <div className="mt-4 flex items-center gap-2">
                  <img
                    src={companyLogo.src}
                    alt={companyLogo.alt}
                    className="h-10 max-w-[150px] rounded-md bg-white px-3 py-1 object-contain"
                  />
                  <img
                    src={mediaPath('/media/companies/ibm.png')}
                    alt="IBM"
                    className="h-10 max-w-[150px] rounded-md bg-white px-3 py-1 object-contain"
                  />
                </div>
              ) : null}
              {showLiveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="cta-primary mt-5">
                  {projectDetailCopy.viewWebsite}
                </a>
              ) : null}
            </div>
          </div>

          <ProjectGallery project={project} className="lg:h-full" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
        <div className="panel p-7 lg:p-8">
          <h2 className="text-2xl font-semibold text-white">{projectDetailCopy.contextTitle}</h2>
          <p className="mt-4 text-slate-300">{project.context}</p>
          <div className="mt-6 space-y-5 text-slate-300">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <h3 className="text-xl font-semibold text-white">{projectDetailCopy.descriptionTitle}</h3>
              <p className="mt-3">{project.details.description}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <h3 className="text-xl font-semibold text-white">{projectDetailCopy.problemTitle}</h3>
              <p className="mt-3">{project.details.problem}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <h3 className="text-xl font-semibold text-white">{projectDetailCopy.solutionTitle}</h3>
              <p className="mt-3">{project.details.solution}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <h3 className="text-xl font-semibold text-white">{projectDetailCopy.resultsTitle}</h3>
              <p className="mt-3">{project.details.results}</p>
            </div>
          </div>
        </div>

        <aside className="panel space-y-6 p-7 lg:p-8">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
            <h3 className="text-xl font-semibold text-white">{projectDetailCopy.technologiesTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <DomainBadge key={technology} label={technologyLabels[technology] ?? technology} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
            <h3 className="text-xl font-semibold text-white">{projectDetailCopy.featuresTitle}</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              {project.details.features.map((feature) => (
                <li key={feature} className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
            <h3 className="text-xl font-semibold text-white">{projectDetailCopy.tagsTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.details.tags.map((tag) => (
                <DomainBadge key={tag} label={tag} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
