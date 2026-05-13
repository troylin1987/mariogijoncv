import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import ProjectVisual from './ProjectVisual';
import DomainBadge from './DomainBadge';
import { trackEvent } from '../lib/analytics';

type ProjectCardProps = {
  project: Project;
  copy: any;
  locale?: string;
};

const LIVE_URL_ALLOWED = new Set([
  'f-c-barcelona-tickets',
  'bank-of-cyprus',
  'plataforma-tierra',
]);

export default function ProjectCard({ project, copy }: ProjectCardProps) {
  const projectCardCopy = copy?.projectCard ?? {};
  const technologyLabels = projectCardCopy.technologyLabels ?? {};
  const showLiveUrl = project.liveUrl && (project.category === 'Personal' || LIVE_URL_ALLOWED.has(project.id));

  return (
    <article className="panel float-in flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-2 hover:border-orange-400/50 hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)]">
      <ProjectVisual project={project} compact />

      <p className="mt-3 h-5 text-xs tracking-wide text-slate-400">{project.dateRange ?? '\u00A0'}</p>

      <div className="mt-2">
        <h3 className="glow-text min-h-[3.5rem] text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 min-h-[4.5rem] text-sm text-white/70">{project.summary}</p>
      </div>

      <div className="panel-soft mt-4 min-h-[6.5rem] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-400/70">{copy?.projectDetail?.contextTitle ?? 'Context'}</p>
        <p className="mt-2 text-sm text-white/80">{project.context}</p>
      </div>

      <div className="mt-4 min-h-[3.5rem] overflow-hidden">
        <div className="flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <DomainBadge key={technology} label={technologyLabels[technology] ?? technology} variant="small" />
        ))}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap justify-end gap-2">
        <Link
          to={project.route}
          onClick={() => {
            trackEvent('project_view_details_click', {
              project_id: project.id,
              project_title: project.title,
              project_category: project.category
            });
          }}
          className="rounded-full bg-orange-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:scale-105"
        >
          {projectCardCopy.viewDetails ?? 'View details'}
        </Link>
        {showLiveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackEvent('project_view_website_click', {
                project_id: project.id,
                project_title: project.title,
                project_category: project.category,
                outbound_url: project.liveUrl
              });
            }}
            className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 font-semibold text-slate-100 transition-all duration-200 hover:border-orange-400 hover:text-white hover:shadow-md hover:scale-105"
          >
            {projectCardCopy.viewWebsite ?? 'View website'}
          </a>
        ) : null}
        </div>
      </div>
    </article>
  );
}
