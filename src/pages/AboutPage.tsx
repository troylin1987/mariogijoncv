import { useEffect, useMemo, useState } from 'react';
import { mediaPath } from '../lib/paths';

type AboutPageProps = {
  copy: any;
  locale?: string;
};

type CompanyLogoProps = {
  logo?: string;
  company: string;
};

type MultiFormatIconProps = {
  basePath: string;
  alt: string;
  className?: string;
};

function normalizeAssetName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function MultiFormatIcon({ basePath, alt, className = 'h-10 w-10 flex-shrink-0 rounded-md bg-white p-1 object-contain' }: MultiFormatIconProps) {
  const sources = useMemo(
    () => ['png', 'webp', 'jpg', 'svg'].map((ext) => `${basePath}.${ext}`),
    [basePath]
  );
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [basePath]);

  const exhausted = sourceIndex >= sources.length;
  if (exhausted) return null;

  return (
    <img
      src={sources[sourceIndex]}
      alt={alt}
      className={className}
      onError={() => setSourceIndex((prev) => prev + 1)}
    />
  );
}

function CompanyLogo({ logo, company }: CompanyLogoProps) {
  const baseName = normalizeAssetName(logo ?? slugify(company));
  const sources = useMemo(
    () => {
      if (baseName === 'tecnicas-reunidas') {
        return [mediaPath('/media/companies/tecnicas-reunidas.png')];
      }
      return ['png', 'jpg', 'webp', 'svg'].map((ext) => mediaPath(`/media/companies/${baseName}.${ext}`));
    },
    [baseName]
  );
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [baseName]);

  const currentSource = sources[Math.min(sourceIndex, sources.length - 1)];
  const exhausted = sourceIndex >= sources.length;

  if (exhausted) {
    const initials = company
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0].toUpperCase())
      .join('');

    return (
      <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white p-1 text-xs font-bold text-slate-800">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={currentSource}
      alt={company}
      className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-md bg-white p-1 object-contain"
      onError={() => setSourceIndex((prev) => prev + 1)}
    />
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getLanguageFlag(index: number): string {
  const flags = [mediaPath('/media/languages/es.svg'), mediaPath('/media/languages/en.svg')];
  return flags[index % flags.length];
}

const monthAbbrByLocale: Record<string, string[]> = {
  SPA: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  ENG: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
  CAT: ['gen', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'des'],
  GLG: ['xan', 'feb', 'mar', 'abr', 'mai', 'xuñ', 'xul', 'ago', 'set', 'out', 'nov', 'dec'],
  EUS: ['urt', 'ots', 'mar', 'api', 'mai', 'eka', 'uzt', 'abu', 'ira', 'urr', 'aza', 'abe'],
  FRA: ['jan', 'fev', 'mar', 'avr', 'mai', 'jun', 'jul', 'aou', 'sep', 'oct', 'nov', 'dec'],
  ITA: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  DEU: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dez'],
  ZHO: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  JPN: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  RUS: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  POL: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paz', 'lis', 'gru']
};

const presentLabelByLocale: Record<string, string> = {
  SPA: 'Actualidad',
  ENG: 'Present',
  CAT: 'Actualitat',
  GLG: 'Actualidade',
  EUS: 'Gaur egun',
  FRA: 'Present',
  ITA: 'Presente',
  DEU: 'Aktuell',
  ZHO: '至今',
  JPN: '現在',
  RUS: 'По н.в.',
  POL: 'Obecnie'
};

function resolveMonthIndex(tokenRaw: string): number {
  const token = tokenRaw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('.', '');

  const lookup: Record<string, number> = {
    jan: 0,
    january: 0,
    ene: 0,
    enero: 0,
    gen: 0,
    xan: 0,
    urt: 0,
    sty: 0,
    фев: 1,
    feb: 1,
    february: 1,
    febrero: 1,
    ots: 1,
    lut: 1,
    mar: 2,
    march: 2,
    marzo: 2,
    apr: 3,
    april: 3,
    abr: 3,
    abril: 3,
    api: 3,
    kwi: 3,
    may: 4,
    mayo: 4,
    mai: 4,
    mag: 4,
    maj: 4,
    jun: 5,
    june: 5,
    junio: 5,
    xun: 5,
    eka: 5,
    cze: 5,
    jul: 6,
    july: 6,
    julio: 6,
    xul: 6,
    uzt: 6,
    lip: 6,
    aug: 7,
    august: 7,
    ago: 7,
    agosto: 7,
    abu: 7,
    sie: 7,
    sep: 8,
    september: 8,
    set: 8,
    septiembre: 8,
    ira: 8,
    wrz: 8,
    oct: 9,
    october: 9,
    octubre: 9,
    out: 9,
    urr: 9,
    paz: 9,
    nov: 10,
    november: 10,
    noviembre: 10,
    aza: 10,
    lis: 10,
    dec: 11,
    december: 11,
    dic: 11,
    diciembre: 11,
    des: 11,
    abe: 11,
    gru: 11
  };

  return lookup[token] ?? -1;
}

function formatPeriod(period: string, locale?: string): string {
  const localeKey = locale ?? 'SPA';
  const months = monthAbbrByLocale[localeKey] ?? monthAbbrByLocale.SPA;
  const presentLabel = presentLabelByLocale[localeKey] ?? presentLabelByLocale.SPA;

  const formatPart = (partRaw: string): string => {
    const part = partRaw.trim();
    if (!part) return part;

    if (/present|actualidad|actualitat|actualidade|gaur egun|presente|aktuell|obecnie|至今|現在|по н\.в\./i.test(part)) {
      return presentLabel;
    }

    const match = part.match(/^([^\s]+)\s+(\d{4})$/);
    if (!match) return part;

    const monthIndex = resolveMonthIndex(match[1]);
    if (monthIndex < 0 || monthIndex > 11) return part;
    return `${months[monthIndex]} ${match[2]}`;
  };

  const parts = period.split(/\s*[\-–—]\s*/);
  if (parts.length < 2) return formatPart(period);
  return `${formatPart(parts[0])} - ${formatPart(parts[1])}`;
}

function getFormalEducationIconBasePath(index: number, item: string): string {
  if (index === 0) return mediaPath('/media/education/formal/universidad-rey-juan-carlos');
  if (index === 1) return mediaPath('/media/education/formal/escuela-oficial-de-idiomas');
  return mediaPath(`/media/education/formal/${slugify(item)}`);
}

function getOtherCourseIconBasePath(item: string): string {
  const normalized = slugify(item);

  if (normalized.includes('sap')) return mediaPath('/media/education/other/sap');
  if (normalized.includes('android')) return mediaPath('/media/education/other/android');
  if (normalized.includes('linux')) return mediaPath('/media/education/other/linux');
  if (normalized.includes('trainer') || normalized.includes('certificate') || normalized.includes('certification')) {
    return mediaPath('/media/education/other/certificate');
  }
  if (normalized.includes('api') || normalized.includes('development') || normalized.includes('automation')) {
    return mediaPath('/media/education/other/computing');
  }

  return mediaPath(`/media/education/other/${normalized}`);
}

const SKILL_ICON_FALLBACKS = ['architecture', 'mobile', 'cloud', 'genai', 'microservices', 'leadership'];

function getSkillIconName(skill: string, index: number): string {
  const normalized = normalizeAssetName(skill);

  if (
    normalized.includes('api') &&
    (normalized.includes('integr') || normalized.includes('enterprise') || normalized.includes('diseno') || normalized.includes('design'))
  ) {
    return 'architecture';
  }

  if (
    (normalized.includes('mobile') || normalized.includes('movil') || normalized.includes('mugikor')) &&
    (normalized.includes('web') || normalized.includes('soluciones') || normalized.includes('solutions'))
  ) {
    return 'mobile';
  }

  if (normalized.includes('cloud') || normalized.includes('nube') || normalized.includes('hodei')) {
    return 'cloud';
  }

  if (
    normalized.includes('architect') ||
    normalized.includes('arquitect') ||
    normalized.includes('architektur') ||
    normalized.includes('architett') ||
    normalized.includes('arkitekt')
  ) {
    return 'architecture';
  }

  if (normalized.includes('mobile') || normalized.includes('movil') || normalized.includes('mugikor')) {
    return 'mobile';
  }

  if (normalized.includes('genai') || normalized.includes('ai/ml') || normalized.includes('ia') || normalized.includes('ki')) {
    return 'genai';
  }

  if (normalized.includes('microserv') || normalized.includes('ddd') || normalized.includes('scalable') || normalized.includes('escalab')) {
    return 'microservices';
  }

  if (
    normalized.includes('leader') ||
    normalized.includes('lider') ||
    normalized.includes('fokus') ||
    normalized.includes('focus') ||
    normalized.includes('business') ||
    normalized.includes('negocio')
  ) {
    return 'leadership';
  }

  return SKILL_ICON_FALLBACKS[index % SKILL_ICON_FALLBACKS.length];
}

export default function AboutPage({ copy, locale = 'SPA' }: AboutPageProps) {
  const formalEducation = copy.about.formalEducation ?? [];
  const otherCourses = copy.about.otherCourses ?? [];
  const badges = copy.about.badges ?? [];
  const skills = copy.about.skills ?? [];
  const languages = copy.about.languages ?? [];
  const timeline = copy.about.timeline ?? [];
  const interests = String(copy.about.interests ?? '')
    .split(/[,.;]/)
    .map((term) => term.trim())
    .filter(Boolean);

  return (
    <section className="space-y-6">
      <div className="panel overflow-hidden p-8 lg:p-10">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">{copy.about.title}</h1>
        <p className="mt-4 text-slate-300">{copy.about.description}</p>

        <div className="mt-6 space-y-4">
          <div className="panel-soft p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-orange-300">{copy.about.personalInfoTitle ?? 'Informacion personal'}</p>
            <p className="mt-3 text-slate-200">{copy.about.profile}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href="mailto:m.gijon87@gmail.com" className="cta-primary">{copy.about.writeMeAction ?? 'Escribirme'}</a>
              <span className="rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm text-orange-100">m.gijon87@gmail.com</span>
            </div>
          </div>

          <div className="panel-soft p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{copy.about.locationLabel}</p>
            <p className="mt-2 text-lg font-semibold text-white">{copy.about.location}</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/20">
              <iframe
                title="OpenStreetMap Fuenlabrada"
                className="h-[280px] w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-3.865%2C40.247%2C-3.730%2C40.333&layer=mapnik&marker=40.2839%2C-3.7942"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/education/formal.svg')} alt="Formal education" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.formalEducationTitle}</h2>
        </div>
        <ul className="mt-6 space-y-3 text-slate-300">
          {formalEducation.map((item: string, index: number) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <MultiFormatIcon basePath={getFormalEducationIconBasePath(index, item)} alt={item} className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-md bg-white p-1 object-contain" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/education/other.svg')} alt="Other education" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.otherCoursesTitle}</h2>
        </div>
        <ul className="mt-6 space-y-3 text-slate-300">
          {otherCourses.map((item: string) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <MultiFormatIcon basePath={getOtherCourseIconBasePath(item)} alt={item} className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-md bg-white p-1 object-contain" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/skills/key-competencies.svg')} alt="Skills" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.skillsTitle}</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill: string, index: number) => (
            <div key={skill} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-200">
              <img src={mediaPath(`/media/skills/${getSkillIconName(skill, index)}.svg`)} alt={skill} className="h-8 w-8 flex-shrink-0" />
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/languages/languages.svg')} alt="Languages" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.languagesTitle}</h2>
        </div>
        <ul className="mt-6 space-y-3 text-slate-300">
          {languages.map((language: string, index: number) => (
            <li key={language} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <img src={getLanguageFlag(index)} alt={language} className="h-6 w-6 rounded-full" onError={(e) => {(e.currentTarget as HTMLImageElement).style.display = 'none';}} />
              <span>{language}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/badges/badges.svg')} alt="Badges" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.badgesTitle}</h2>
        </div>
        <ul className="mt-6 space-y-3 text-slate-300">
          {badges.map((item: string) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <MultiFormatIcon basePath={mediaPath(`/media/badges/${slugify(item)}`)} alt={item} className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-md bg-white p-1 object-contain" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/timeline/timeline.svg')} alt="Timeline" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.timelineTitle ?? 'Cronologia de experiencia profesional'}</h2>
        </div>
        <div className="mt-6 space-y-3 text-slate-300">
          {timeline.map((item: any) => (
            <div key={`${item.company}-${item.project}`} className="flex gap-3 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <CompanyLogo logo={item.logo} company={item.company} />
              <div>
                <p className="text-sm font-semibold text-white">{item.company} - {item.project}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-orange-300/80">{formatPeriod(item.period, locale)}</p>
                <p className="mt-2 text-sm text-white/80">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-7">
        <div className="flex items-center gap-3">
          <img src={mediaPath('/media/personal/interests.svg')} alt="Interests" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold text-white">{copy.about.interestsTitle}</h2>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {interests.map((term, index) => {
            const sizeClasses = ['text-xs', 'text-xs', 'text-sm', 'text-sm', 'text-base', 'text-lg', 'text-lg', 'text-xl'];
            const colorClasses = [
              'text-orange-300',
              'text-amber-300',
              'text-orange-400',
              'text-yellow-300',
              'text-orange-400',
              'text-amber-400',
              'text-orange-500',
              'text-red-300'
            ];
            const opacityClasses = ['opacity-70', 'opacity-75', 'opacity-80', 'opacity-85', 'opacity-90', 'opacity-95', 'opacity-100'];
            return (
              <span
                key={`${term}-${index}`}
                className={`${sizeClasses[index % sizeClasses.length]} ${colorClasses[index % colorClasses.length]} ${opacityClasses[index % opacityClasses.length]} font-medium tracking-wide hover:scale-110 transition-transform duration-300 cursor-default`}
              >
                {term}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
