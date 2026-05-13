import { useState } from 'react';
import { Link } from 'react-router-dom';

type HomePageProps = {
  copy: any;
};

function GuideIcon({ kind }: { kind?: string }) {
  const baseClass = 'h-5 w-5';

  if (kind === 'cv') {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
        <path d="M14 2v5h5" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    );
  }

  if (kind === 'professional') {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h18v13H3z" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    );
  }

  if (kind === 'personal') {
    return (
      <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="M4 8l8 6 8-6" />
    </svg>
  );
}

export default function HomePage({ copy }: HomePageProps) {
  const [photoError, setPhotoError] = useState(false);
  const sectorChips = copy.home.sectors ?? [];
  const specialtyChips = copy.home.specialties ?? [];

  return (
    <section className="space-y-10">
      <div className="panel overflow-hidden p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-brand-orange">
              {copy.home.heroBadge}
            </span>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              {copy.home.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">{copy.home.heroSubtitle}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel-soft p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/70">{copy.home.heroVisualStatLabel}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sectorChips.map((item: string) => (
                    <span key={item} className="rounded-full border border-orange-300/40 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="panel-soft p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-purple-400/70">{copy.home.heroVisualStat2Label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {specialtyChips.map((item: string) => (
                    <span key={item} className="rounded-full border border-amber-300/40 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="media-frame min-h-[420px] overflow-hidden rounded-2xl border border-dashed border-white/30 bg-white/5 relative">
            <img
              src="/media/personal/mario-photo.jpg"
              alt={copy.home.photoSlotAlt}
              className="h-full w-full object-cover"
              onError={() => setPhotoError(true)}
            />
            {photoError ? (
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-white/70">
                {copy.home.photoSlotLabel}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="panel p-7 lg:p-8">
        <h2 className="text-3xl font-semibold text-white">{copy.home.findHereTitle}</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {copy.home.guideCards.map((card: any, index: number) => (
          <div key={card.title} className={`panel flex h-full flex-col p-6 lg:p-7 fade-up stagger-${index + 1}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-sm font-semibold text-cyan-300">
              <GuideIcon kind={card.icon} />
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <h3 className="min-h-[3.5rem] text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 flex-1 text-white/70">{card.description}</p>
              <Link to={card.link} className="cta-primary mt-6 self-start">
                {card.action}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
