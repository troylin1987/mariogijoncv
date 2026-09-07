import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { mediaPath } from '../lib/paths';

type HomePageProps = { copy: any };

// Animated counter hook
function useCounter(target: string, duration = 1200) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (Number.isNaN(num)) { setDisplay(target); return; }
    const suffix = target.replace(/[\d]/g, '');
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(ease * num)}${suffix}`);
      if (progress < 1) ref.current = setTimeout(() => tick(performance.now()), 16);
    };
    ref.current = setTimeout(() => tick(performance.now()), 16);
    return () => { if (ref.current) clearTimeout(ref.current); };
  }, [target, duration]);
  return display;
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(visible ? value : '0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className={`text-center counter-up`} style={{ animationDelay: `${delay}ms` }}>
      <p className="text-3xl font-mono font-bold text-brand-primary leading-none">{visible ? count : '0'}</p>
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1.5">{label}</p>
    </div>
  );
}

// ── Specialty icons ──
const SPECIALTY_ICONS: Record<string, JSX.Element> = {
  // SPA
  Arquitectura: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>,
  Cloud:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/></svg>,
  GenAI:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m9.9 9.9 2.1 2.1M4.9 19.1l2.1-2.1m9.9-9.9 2.1-2.1"/></svg>,
  APIs:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Mobile:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><rect x="7" y="2" width="10" height="20" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/><path d="M10 5.5h4" strokeLinecap="round"/></svg>,
  Web:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/></svg>,
  // ENG
  Architecture: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>,
  // CAT
  'Mòbil':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><rect x="7" y="2" width="10" height="20" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/><path d="M10 5.5h4" strokeLinecap="round"/></svg>,
  // DEU
  Architektur:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>,
  Architektura: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>,
  // ZHO
  '架构':       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>,
  '云计算':     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/></svg>,
  'API':        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  '移动端':     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><rect x="7" y="2" width="10" height="20" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/><path d="M10 5.5h4" strokeLinecap="round"/></svg>,
};

// Generic fallback icon by keyword
function getSpecialtyIcon(name: string): JSX.Element {
  const n = name.toLowerCase();
  if (n.includes('architect') || n.includes('arqui') || n.includes('archi') || n.includes('架构') || n.includes('アーキ')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>;
  }
  if (n.includes('cloud') || n.includes('nube') || n.includes('nuvol') || n.includes('облако') || n.includes('クラウド') || n.includes('云') || n.includes('chmura')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/></svg>;
  }
  if (n.includes('genai') || n.includes('ai') || n.includes('ki') || n.includes('ia') || n.includes('ии')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m9.9 9.9 2.1 2.1M4.9 19.1l2.1-2.1m9.9-9.9 2.1-2.1"/></svg>;
  }
  if (n.includes('api') || n.includes('integr')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (n.includes('mobile') || n.includes('móvil') || n.includes('mòbil') || n.includes('モバイル') || n.includes('移动') || n.includes('mobil')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><rect x="7" y="2" width="10" height="20" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/><path d="M10 5.5h4" strokeLinecap="round"/></svg>;
  }
  // web / default
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/></svg>;
}

// ── Sector icons ──
function getSectorIcon(sector: string): JSX.Element {
  const n = sector.toLowerCase();
  const cls = 'h-4 w-4 flex-shrink-0';
  if (n.includes('banca') || n.includes('bank') || n.includes('banque') || n.includes('банк') || n.includes('银行') || n.includes('銀行')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M3 10h18M6 14h.01M10 14h.01M14 14h.01M18 14h.01M6 18h.01M10 18h.01M14 18h.01M18 18h.01"/><path d="M3 10V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10M12 3 3 10h18L12 3Z" strokeLinejoin="round"/></svg>;
  }
  if (n.includes('retail') || n.includes('commerce') || n.includes('handel') || n.includes('ритейл') || n.includes('零售') || n.includes('小売')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/></svg>;
  }
  if (n.includes('aero') || n.includes('airline') || n.includes('aviaci') || n.includes('compagnie') || n.includes('авиа') || n.includes('航空') || n.includes('linie')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round"/></svg>;
  }
  if (n.includes('público') || n.includes('public') || n.includes('sektor') || n.includes('государ') || n.includes('公共') || n.includes('公務')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M3 21h18M3 7l9-4 9 4v1H3V7zM5 8v13M19 8v13M9 8v13M15 8v13"/></svg>;
  }
  if (n.includes('energ') || n.includes('énergi') || n.includes('energia') || n.includes('エネル') || n.includes('能源') || n.includes('energet')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  }
  if (n.includes('industria') || n.includes('industry') || n.includes('industrie') || n.includes('промышл') || n.includes('工业') || n.includes('産業') || n.includes('przemys')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M2 20V8l6-4v4l6-4v4l6-4v16H2zM2 20h20"/></svg>;
  }
  if (n.includes('agro') || n.includes('aliment') || n.includes('lebensmittel') || n.includes('apk') || n.includes('农业') || n.includes('農業') || n.includes('rolno')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12V2a10 10 0 0 1 10 10"/><path d="M12 12 2 12"/></svg>;
  }
  if (n.includes('construc') || n.includes('bau') || n.includes('construç') || n.includes('строит') || n.includes('建筑') || n.includes('建設') || n.includes('budow')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M2 20h20M4 20V8l8-6 8 6v12"/><path d="M9 20v-5h6v5"/></svg>;
  }
  if (n.includes('transport') || n.includes('transporte') || n.includes('verkehr') || n.includes('транспорт') || n.includes('交通') || n.includes('輸送')) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8zM5.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>;
  }
  // fallback
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><circle cx="12" cy="12" r="9"/></svg>;
}

export default function HomePage({ copy }: HomePageProps) {
  const c = copy.home;
  const descs: Record<string, string> = c.specialtyDescriptions ?? {};

  return (
    <section className="space-y-20 md:space-y-28">

      {/* ── HERO ── */}
      <div className="relative grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16 lg:items-center min-h-[calc(100svh-7rem)]">

        {/* Left column */}
        <div className="space-y-8">

          {/* Badge */}
          <div className="fade-up">
            <span className="tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3">
                <circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-4" strokeLinecap="round"/>
              </svg>
              {c.badge}
            </span>
          </div>

          {/* Name */}
          <div className="fade-up stagger-1 space-y-2">
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-mono font-bold text-white leading-[0.95] tracking-tight">
              {c.title}
            </h1>
            <p className="shimmer-text text-xl font-mono font-bold tracking-tight">
              {c.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="fade-up stagger-2 max-w-lg text-[15px] leading-[1.75] text-white/55">
            {c.description}
          </p>

          {/* CTAs */}
          <div className="fade-up stagger-3 flex flex-wrap items-center gap-3">
            <Link to="/cv" className="cta-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" strokeLinejoin="round"/>
                <path d="M14 2v5h5M9 12h6M9 16h6" strokeLinecap="round"/>
              </svg>
              {c.ctaPrimary}
            </Link>
            <Link to="/contact" className="cta-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" strokeLinejoin="round"/>
                <rect width="4" height="12" x="2" y="9" rx="1"/><circle cx="4" cy="4" r="2"/>
              </svg>
              {c.ctaSecondary}
            </Link>
          </div>

          {/* Stats row */}
          <div className="fade-up stagger-4 flex items-center gap-8 pt-5 border-t border-white/[0.07]">
            <StatCard value={c.stat1Value} label={c.stat1Label} delay={400} />
            <div className="w-px h-10 bg-white/[0.08]" />
            <StatCard value={c.stat2Value} label={c.stat2Label} delay={500} />
            <div className="w-px h-10 bg-white/[0.08]" />
            <StatCard value={c.stat3Value} label={c.stat3Label} delay={600} />
          </div>
        </div>

        {/* Photo */}
        <div className="fade-up stagger-2 order-first lg:order-last">
          <div
            className="media-frame mx-auto lg:mx-0 aspect-[3/4] max-w-[300px] lg:max-w-none"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(31,191,173,0.08)' }}
          >
            <img
              src={mediaPath('/media/personal/mario-photo.jpg')}
              alt={c.photoAlt}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
            />
            {/* Gradient overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071C19] to-transparent" />
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(31,191,173,0.35)' }}
            />
          </div>
        </div>
      </div>

      {/* ── EXPERTISE GRID — cards with icon + description ── */}
      <div className="fade-up stagger-5 space-y-5">
        <p className="section-label">{c.specialtiesLabel}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(c.specialties ?? []).map((s: string, i: number) => (
            <div
              key={s}
              className={`panel-soft card-lift glow-border px-5 py-4 flex items-start gap-3.5 stagger-${i + 1}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="mt-0.5 text-brand-primary flex-shrink-0">
                {SPECIALTY_ICONS[s] ?? getSpecialtyIcon(s)}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-white/90 leading-snug">{s}</p>
                {descs[s] && (
                  <p className="text-[12px] text-white/45 leading-snug mt-1">{descs[s]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTORS — chips with icon ── */}
      <div className="fade-up stagger-6 space-y-4">
        <p className="section-label">{c.sectorsLabel}</p>
        <div className="flex flex-wrap gap-2">
          {(c.sectors ?? []).map((s: string) => (
            <span key={s} className="inline-flex items-center gap-1.5 tag-tech">
              <span className="text-brand-light/70">{getSectorIcon(s)}</span>
              {s}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
