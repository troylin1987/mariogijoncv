import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../data/projects';
import { trackEvent } from '../lib/analytics';

type SearchPageProps = {
  copy: any;
  projects: Project[];
  locale: string;
};

export default function SearchPage({ copy, projects, locale }: SearchPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [term, setTerm] = useState<string>(query);
  const normalizedQuery = query.trim().toLowerCase();
  const hasSearched = normalizedQuery.length > 0;

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return projects.filter((project) => {
      const content = [
        project.title,
        project.summary,
        project.context,
        project.role,
        project.kind,
        project.category,
        ...project.technologies,
        project.details.description,
        project.details.problem,
        project.details.solution,
        project.details.results,
        ...project.details.tags
      ]
        .join(' ')
        .toLowerCase();

      return content.includes(normalizedQuery);
    });
  }, [normalizedQuery, projects]);

  return (
    <section className="space-y-6">
      <div className="panel p-8 lg:p-10">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">{copy.search.title}</h1>
        <p className="mt-4 text-slate-300">{copy.search.summary}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const submittedTerm = term.trim();
            setSearchParams(submittedTerm ? { q: submittedTerm } : {});
            trackEvent('search_submit', {
              search_term: submittedTerm,
              has_term: submittedTerm.length > 0
            });
          }}
          className="mt-8 panel-soft flex flex-col gap-3 rounded-2xl border border-slate-700/60 p-4 sm:flex-row"
        >
          <label className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder={copy.search.placeholder}
              className="min-w-0 w-full rounded-2xl border border-slate-700 bg-slate-950 px-12 py-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-turquoise focus:ring-2 focus:ring-brand-turquoise/30"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-orange/40 bg-gradient-to-r from-brand-turquoise to-brand-orange px-6 py-4 text-sm font-semibold text-slate-950 shadow-[0_8px_30px_rgba(20,184,166,0.35)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-brand-turquoise/70"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-4 w-4" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            {copy.navigation.search}
          </button>
        </form>

        {hasSearched && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-brand-turquoise/40 bg-brand-turquoise/15 px-3 py-1 text-brand-turquoise">
              {`"${query}"`}
            </span>
            <button
              type="button"
              onClick={() => {
                setTerm('');
                setSearchParams({});
                trackEvent('search_clear', { previous_term: query });
              }}
              className="rounded-full border border-slate-600 px-3 py-1 text-slate-300 transition hover:border-slate-400 hover:text-white"
            >
              {copy.search.clearButton}
            </button>
          </div>
        )}
      </div>

      <div className="panel p-7 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">{copy.search.results}</h2>
          {hasSearched && (
            <span className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
              {(copy.search.resultsCount ?? '{count}').replace('{count}', `${filteredProjects.length}`)}
            </span>
          )}
        </div>

        {!hasSearched ? (
          <p className="mt-4 rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3 text-slate-300">{copy.search.prompt}</p>
        ) : filteredProjects.length === 0 ? (
          <p className="mt-4 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-orange-200">{copy.search.noResults}</p>
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {filteredProjects.map((project) => (
              <div key={project.id} className="h-full">
                <ProjectCard project={project} copy={copy} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
