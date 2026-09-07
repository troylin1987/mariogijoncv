import { useState } from 'react';
import { mediaPath } from '../lib/paths';

type CVPageProps = { copy: any };

type Project = {
  client: string; logo: string | null; title: string;
  period: string; summary: string; technologies: string[];
};
type Experience = {
  company: string; logo: string | null; role: string;
  period: string; location: string; description: string; projects: Project[];
};
type Education = { institution: string; logo: string | null; degree: string; period: string; location: string; };
type Skill = { name: string; domain: string; };
type Language = { name: string; level: string; };

// ── Language flag map ──
const FLAG_MAP: Record<string, string> = {
  'Español':   'es',
  'Inglés':    'en',
  'Català':    'ca',
  'Catalán':   'ca',
  'Français':  'fr',
  'Francés':   'fr',
  'Deutsch':   'de',
  'Alemán':    'de',
  'Italiano':  'it',
  '中文':      'zh',
  'Chino':     'zh',
  '日本語':    'ja',
  'Japonés':   'ja',
  'Русский':   'ru',
  'Ruso':      'ru',
  'Polski':    'pl',
  'Polaco':    'pl',
  // English keys
  'Spanish':   'es',
  'English':   'en',
  'Catalan':   'ca',
  'French':    'fr',
  'German':    'de',
  'Italian':   'it',
  'Chinese':   'zh',
  'Japanese':  'ja',
  'Russian':   'ru',
  'Polish':    'pl',
};

// ── Skill domain icon — expanded set ──
function SkillIcon({ domain }: { domain: string }) {
  const cls = 'h-4 w-4 flex-shrink-0';
  const icons: Record<string, JSX.Element> = {
    architecture: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 10v4m6-4v4M9 18v3m6-3v3"/>
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a5 5 0 0 1 5 5c0 1.5-.6 2.9-1.6 3.9L17 13h-2l-1-1.5A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/>
        <path d="M9 17v4m6-4v4M7 17h10M9.5 10.5h.01M14.5 10.5h.01"/>
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/>
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="7" y="2" width="10" height="20" rx="2.5"/>
        <circle cx="12" cy="17.5" r="0.8" fill="currentColor"/>
        <path d="M10 5.5h4" strokeLinecap="round"/>
      </svg>
    ),
    api: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/>
        <path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    leadership: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="7" r="3.5"/>
        <path d="M4 21v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"/>
        <path d="M18 3l2 2-2 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    web: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/>
      </svg>
    ),
    platform: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4" strokeLinecap="round"/>
      </svg>
    ),
    microservices: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/>
        <circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/>
        <circle cx="12" cy="12" r="2.2"/>
        <path d="M7 6h5M12 10V7M17 6h-5M7 18h5M17 18h-5M12 17v-3"/>
      </svg>
    ),
    security: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    devops: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  };
  return (
    <span className="text-brand-primary">
      {icons[domain] ?? icons.platform}
    </span>
  );
}

// ── Company logo with initials fallback ──
function CompanyLogo({ name, logo, size = 'md' }: { name: string; logo: string | null; size?: 'sm' | 'md' }) {
  const [failed, setFailed] = useState(false);
  const dim = size === 'sm' ? 'h-8 w-8 min-w-[2rem] text-[10px]' : 'h-10 w-10 min-w-[2.5rem] text-xs';
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const ext = logo === 'plataforma-tierra' ? 'jpg' : logo === 'bank-of-cyprus' ? 'webp' : 'png';
  const src = logo ? mediaPath(`/media/companies/${logo}.${ext}`) : null;

  if (!src || failed) {
    return (
      <div className={`${dim} flex items-center justify-center rounded-lg font-bold text-brand-primary`}
        style={{ background: 'rgba(31,191,173,0.10)', border: '1px solid rgba(31,191,173,0.25)' }}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={name} onError={() => setFailed(true)}
      className={`${dim} rounded-lg bg-white object-contain p-1 flex-shrink-0`} />
  );
}

// ── Education logo ──
function EduLogo({ name, logo }: { name: string; logo: string | null }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const src = logo ? mediaPath(`/media/education/formal/${logo}.png`) : null;

  if (!src || failed) {
    return (
      <div className="h-9 w-9 min-w-[2.25rem] flex items-center justify-center rounded-lg font-bold text-[10px] text-brand-primary"
        style={{ background: 'rgba(31,191,173,0.10)', border: '1px solid rgba(31,191,173,0.25)' }}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={name} onError={() => setFailed(true)}
      className="h-9 w-9 min-w-[2.25rem] rounded-lg bg-white object-contain p-1 flex-shrink-0" />
  );
}

// ── Language flag ──
function LangFlag({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const code = FLAG_MAP[name];
  if (!code || failed) {
    return (
      <span className="text-brand-light/70">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      </span>
    );
  }
  return (
    <img
      src={mediaPath(`/media/languages/${code}.svg`)}
      alt={name}
      onError={() => setFailed(true)}
      className="h-4 w-6 rounded-[2px] object-cover flex-shrink-0 shadow-sm"
    />
  );
}

// ── Experience entry ──
function ExperienceEntry({ exp, index, isFirst }: { exp: Experience; index: number; isFirst: boolean }) {
  const [open, setOpen] = useState(isFirst);

  return (
    <div className={`relative pl-6 card-lift fade-up stagger-${Math.min(index + 1, 6)}`}>
      <div className="timeline-track" />
      <div className={isFirst ? 'timeline-dot-active' : 'timeline-dot'} style={{ top: '18px' }} />

      <div className="panel overflow-hidden glow-border">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-start gap-4 p-5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
        >
          <CompanyLogo name={exp.company} logo={exp.logo} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white text-[14px] leading-snug">{exp.role}</p>
                <p className="text-brand-primary text-[13px] font-medium mt-0.5">{exp.company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] text-brand-light/50 font-mono">{exp.period}</p>
                <p className="text-[11px] text-brand-teal/50 mt-0.5">{exp.location}</p>
              </div>
            </div>
            {!open && (
              <p className="mt-2 text-[13px] text-white/55 line-clamp-1">{exp.description}</p>
            )}
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`h-4 w-4 flex-shrink-0 text-brand-primary/50 transition-transform duration-300 mt-0.5 ${open ? 'rotate-180' : ''}`}>
            <path d="m6 9 6 6 6-6" strokeLinecap="round"/>
          </svg>
        </button>

        {open && (
          <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 space-y-4">
            <p className="text-[13px] leading-relaxed text-white/70">{exp.description}</p>
            {exp.projects.length > 0 && (
              <div className="space-y-2">
                {exp.projects.map((proj, pi) => (
                  <div key={`${proj.client}-${pi}`}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 space-y-3 hover:border-brand-primary/25 hover:bg-brand-primary/[0.03] transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <CompanyLogo name={proj.client} logo={proj.logo} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-1">
                          <div>
                            <p className="text-[13px] font-semibold text-white/90">{proj.client}</p>
                            <p className="text-[11px] text-brand-primary/80 font-medium mt-0.5">{proj.title}</p>
                          </div>
                          <span className="text-[11px] text-brand-light/45 font-mono flex-shrink-0">{proj.period}</span>
                        </div>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">{proj.summary}</p>
                      </div>
                    </div>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pl-11">
                        {proj.technologies.map(t => <span key={t} className="tag-tech">{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ──
export default function CVPage({ copy }: CVPageProps) {
  const c = copy.cv;
  const experiences: Experience[] = c.experience ?? [];
  const education: Education[] = c.education ?? [];
  const skills: Skill[] = c.skills ?? [];
  const certifications: string[] = c.certifications ?? [];
  const languages: Language[] = c.languages ?? [];

  return (
    <section className="space-y-14 max-w-3xl mx-auto">

      {/* ── HEADER CARD ── */}
      <div className="panel-glass p-7 md:p-9 fade-up" style={{ boxShadow: '0 2px 60px rgba(0,0,0,0.4), 0 0 40px rgba(31,191,173,0.05)' }}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
          <div className="media-frame h-[90px] w-[90px] flex-shrink-0"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            <img src={mediaPath('/media/personal/mario-photo.jpg')} alt="Mario Gijón"
              className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="tag text-[11px]">
                {c.currentRoleLabel}: {c.currentRole}
              </span>
              <span className="tag-tech">{c.currentCompany}</span>
            </div>
            <h1 className="text-3xl font-mono font-bold text-white md:text-4xl">{copy.siteTitle}</h1>
            <p className="shimmer-text text-[14px] font-mono font-bold mt-1">{copy.siteSubtitle}</p>
            <p className="mt-1.5 text-[12px] text-brand-light/55 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 text-brand-primary/70">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              {c.location}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-white/70 max-w-xl">{c.profile}</p>
            <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="cta-secondary mt-4 self-start text-[13px] px-4 py-2">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {c.linkedinCta}
            </a>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <div>
        <p className="section-label mb-6">{c.experienceTitle}</p>
        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <ExperienceEntry key={`${exp.company}-${i}`} exp={exp} index={i} isFirst={i === 0} />
          ))}
        </div>
      </div>

      {/* ── SKILLS + EDUCATION + LANGUAGES ── */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* Skills */}
        <div className="panel p-6 space-y-3 fade-up stagger-3">
          <p className="section-label">{c.skillsTitle}</p>
          <div className="space-y-1">
            {skills.map(skill => (
              <div key={skill.name}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-primary/[0.07] group">
                <SkillIcon domain={skill.domain} />
                <span className="text-[13px] text-brand-light/80 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Education */}
          <div className="panel p-5 space-y-4 fade-up stagger-4">
            <p className="section-label">{c.educationTitle}</p>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.institution} className="flex items-start gap-3">
                  <EduLogo name={edu.institution} logo={edu.logo} />
                  <div>
                    <p className="text-[13px] font-semibold text-white/90 leading-snug">{edu.degree}</p>
                    <p className="text-[12px] text-brand-primary/80 mt-0.5">{edu.institution}</p>
                    <p className="text-[11px] text-brand-teal/60 font-mono mt-0.5">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="panel p-5 space-y-1 fade-up stagger-5">
            <p className="section-label mb-3">{c.languagesTitle}</p>
            {languages.map(lang => (
              <div key={lang.name}
                className="flex items-center justify-between px-1 py-2.5 border-b border-white/[0.05] last:border-0 group hover:bg-brand-primary/[0.04] rounded-lg transition-colors">
                <span className="flex items-center gap-2.5">
                  <LangFlag name={lang.name} />
                  <span className="text-[13px] text-brand-light/85 group-hover:text-white transition-colors">{lang.name}</span>
                </span>
                <span className="text-[11px] font-semibold text-brand-primary px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(31,191,173,0.10)', border: '1px solid rgba(31,191,173,0.20)' }}>
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div className="panel p-6 space-y-4 fade-up stagger-6">
        <p className="section-label">{c.certTitle}</p>
        <div className="flex flex-wrap gap-2">
          {certifications.map(cert => (
            <span key={cert} className="tag-tech">{cert}</span>
          ))}
        </div>
      </div>

      {/* ── LinkedIn CTA ── */}
      <div className="panel-accent p-6 flex flex-col sm:flex-row items-center justify-between gap-4 fade-up stagger-7"
        style={{ boxShadow: '0 0 40px rgba(31,191,173,0.07)' }}>
        <div>
          <p className="text-[13px] font-semibold text-white/90">Perfil completo en LinkedIn</p>
          <p className="text-[12px] text-brand-light/50 mt-0.5">Recomendaciones, proyectos y más</p>
        </div>
        <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="cta-primary flex-shrink-0">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          {c.linkedinCta}
        </a>
      </div>

    </section>
  );
}
