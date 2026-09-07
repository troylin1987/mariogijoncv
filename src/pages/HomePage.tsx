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

export default function HomePage({ copy }: HomePageProps) {
  const c = copy.home;

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

      {/* ── EXPERTISE GRID ── */}
      <div className="fade-up stagger-5 space-y-5">
        <p className="section-label">{c.specialtiesLabel}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(c.specialties ?? []).map((s: string, i: number) => (
            <div
              key={s}
              className={`panel-soft card-lift glow-border px-4 py-3 flex items-center gap-2.5 stagger-${i + 1}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary flex-shrink-0" />
              <span className="text-[13px] font-medium text-white/75">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTORS ── */}
      <div className="fade-up stagger-6 space-y-4">
        <p className="section-label">{c.sectorsLabel}</p>
        <div className="flex flex-wrap gap-2">
          {(c.sectors ?? []).map((s: string) => (
            <span key={s} className="tag-tech">{s}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
