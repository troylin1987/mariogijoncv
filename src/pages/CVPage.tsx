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

// ── Company logo with initials fallback ──
function Logo({ name, logo, size = 'md' }: { name: string; logo: string | null; size?: 'sm' | 'md' }) {
  const [failed, setFailed] = useState(false);
  const dim = size === 'sm' ? 'h-8 w-8 min-w-[2rem] text-[10px]' : 'h-10 w-10 min-w-[2.5rem] text-xs';
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const src = logo ? mediaPath(`/media/companies/${logo}.png`) : null;

  if (!src || failed) {
    return (
      <div className={`${dim} flex items-center justify-center rounded-lg font-bold text-brand-primary`}
        style={{ background: 'rgba(31,191,173,0.08)', border: '1px solid rgba(31,191,173,0.20)' }}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={name} onError={() => setFailed(true)}
      className={`${dim} rounded-lg bg-white object-contain p-1 flex-shrink-0`} />
  );
}

// ── Skill domain icon ──
function SkillIcon({ domain }: { domain: string }) {
  const cls = 'h-[15px] w-[15px] flex-shrink-0 text-brand-primary/70';
  const icons: Record<string, JSX.Element> = {
    ai: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M16.9 16.9l1.4 1.4M5.6 18.4l1.4-1.4M16.9 7.1l1.4-1.4"/></svg>,
    cloud: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/></svg>,
    mobile: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="7" y="3" width="10" height="18" rx="2.2"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/></svg>,
    api: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round"/></svg>,
    leadership: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>,
    web: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>,
    platform: <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  };
  return icons[domain] ?? icons.platform;
}

// ── Experience entry ──
function ExperienceEntry({ exp, index, isFirst }: { exp: Experience; index: number; isFirst: boolean }) {
  const [open, setOpen] = useState(isFirst);

  return (
    <div className={`relative pl-6 card-lift fade-up stagger-${Math.min(index + 1, 6)}`}>
      {/* Timeline track */}
      <div className="timeline-track" />
      <div className={isFirst ? 'timeline-dot-active' : 'timeline-dot'} style={{ top: '18px' }} />

      <div className="panel overflow-hidden glow-border">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-start gap-4 p-5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
        >
          <Logo name={exp.company} logo={exp.logo} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white text-[14px] leading-snug">{exp.role}</p>
                <p className="text-brand-primary text-[13px] font-medium mt-0.5">{exp.company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] text-white/40 font-mono">{exp.period}</p>
                <p className="text-[11px] text-white/30 mt-0.5">{exp.location}</p>
              </div>
            </div>
            {!open && (
              <p className="mt-2 text-[13px] text-white/45 line-clamp-1">{exp.description}</p>
            )}
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`h-4 w-4 flex-shrink-0 text-brand-primary/40 transition-transform duration-300 mt-0.5 ${open ? 'rotate-180' : ''}`}>
            <path d="m6 9 6 6 6-6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Expanded */}
        {open && (
          <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 space-y-4">
            <p className="text-[13px] leading-relaxed text-white/55">{exp.description}</p>
            {exp.projects.length > 0 && (
              <div className="space-y-2">
                {exp.projects.map((proj, pi) => (
                  <div key={`${proj.client}-${pi}`}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3 hover:border-brand-primary/20 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <Logo name={proj.client} logo={proj.logo} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-1">
                          <div>
                            <p className="text-[13px] font-semibold text-white/90">{proj.client}</p>
                            <p className="text-[11px] text-brand-primary/70 font-medium mt-0.5">{proj.title}</p>
                          </div>
                          <span className="text-[11px] text-white/30 font-mono flex-shrink-0">{proj.period}</span>
                        </div>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">{proj.summary}</p>
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
      <div className="panel-glass p-7 md:p-9 fade-up" style={{ boxShadow: '0 2px 60px rgba(0,0,0,0.4), 0 0 40px rgba(31,191,173,0.04)' }}>
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
            <p className="mt-1.5 text-[12px] text-white/35 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 text-brand-primary/60">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              {c.location}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-white/55 max-w-xl">{c.profile}</p>
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

      {/* ── SKILLS + EDUCATION ── */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* Skills */}
        <div className="panel p-6 space-y-4 fade-up stagger-3">
          <p className="section-label">{c.skillsTitle}</p>
          <div className="space-y-1.5">
            {skills.map(skill => (
              <div key={skill.name}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-primary/[0.05] group">
                <SkillIcon domain={skill.domain} />
                <span className="text-[13px] text-white/65 group-hover:text-white/90 transition-colors">{skill.name}</span>
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
                  <Logo name={edu.institution} logo={edu.logo} size="sm" />
                  <div>
                    <p className="text-[13px] font-semibold text-white/90 leading-snug">{edu.degree}</p>
                    <p className="text-[11px] text-brand-primary/70 mt-0.5">{edu.institution}</p>
                    <p className="text-[11px] text-white/30 font-mono mt-0.5">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="panel p-5 space-y-3 fade-up stagger-5">
            <p className="section-label">{c.languagesTitle}</p>
            {languages.map(lang => (
              <div key={lang.name}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0">
                <span className="text-[13px] text-white/75">{lang.name}</span>
                <span className="text-[11px] font-medium text-brand-primary">{lang.level}</span>
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
        style={{ boxShadow: '0 0 40px rgba(31,191,173,0.06)' }}>
        <div>
          <p className="text-[13px] font-semibold text-white/80">Perfil completo en LinkedIn</p>
          <p className="text-[12px] text-white/40 mt-0.5">Recomendaciones, proyectos y más</p>
        </div>
        <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="cta-primary flex-shrink-0">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          {c.linkedinCta}
        </a>
      </div>

    </section>
  );
}
