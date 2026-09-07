import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import copy from './content/copy.json';
import CookieBanner from './components/CookieBanner';
import { applyCookieConsent, readCookieConsent, trackPageView } from './lib/analytics';
import { mediaPath, withBase } from './lib/paths';

const CVPage       = lazy(() => import('./pages/CVPage'));
const ContactPage  = lazy(() => import('./pages/ContactPage'));
const HomePage     = lazy(() => import('./pages/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function deepMerge(base: Record<string, any>, override: Record<string, any>): Record<string, any> {
  if (typeof base !== 'object' || base === null) return override;
  if (typeof override !== 'object' || override === null) return override;
  const merged: Record<string, any> = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(override)) {
    const bv = base[key];
    const ov = override[key];
    if (bv && ov && typeof bv === 'object' && typeof ov === 'object' && !Array.isArray(bv) && !Array.isArray(ov)) {
      merged[key] = deepMerge(bv, ov);
    } else {
      merged[key] = ov;
    }
  }
  return merged;
}

const LOCALE_FLAG: Record<string, string> = {
  SPA: '🇪🇸', ENG: '🇬🇧', CAT: '🇪🇸', FRA: '🇫🇷',
  DEU: '🇩🇪', ITA: '🇮🇹', ZHO: '🇨🇳', JPN: '🇯🇵',
  RUS: '🇷🇺', POL: '🇵🇱',
};

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-7 w-7 rounded-full border-2 border-brand-primary/30 border-t-brand-primary animate-spin" />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [locale, setLocale] = useState<string>(copy.defaultLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const languageOptions = copy.supportedLanguages as string[];
  const contentMap = copy.content as Record<string, any>;
  const defaultContent = contentMap[copy.defaultLanguage] ?? {};

  const localeContent = useMemo(() => {
    const selected = contentMap[locale] ?? {};
    return deepMerge(defaultContent, selected);
  }, [locale, contentMap, defaultContent]);

  const version = import.meta.env.VITE_APP_VERSION ?? '1.0.0';
  const navItems = [
    { to: '/',        label: localeContent.navigation?.home    ?? 'Home' },
    { to: '/cv',      label: localeContent.navigation?.cv      ?? 'CV'   },
    { to: '/contact', label: localeContent.navigation?.contact ?? 'Contact' },
  ];

  useEffect(() => { applyCookieConsent(readCookieConsent()); }, []);
  useEffect(() => { trackPageView(`${location.pathname}${location.search}`); }, [location.pathname, location.search]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [location.pathname]);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="app-shell text-white">

      {/* ── HEADER ── */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-[rgba(7,28,25,0.88)] backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06)]' : 'header-bg'
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 lg:px-8">

          {/* Logo */}
          <a href={withBase('/')} className="flex items-center gap-3 group select-none">
            <div className="media-frame h-9 w-9 flex-shrink-0 transition-all duration-300 group-hover:scale-105">
              <img
                src={mediaPath('/media/personal/mario-photo.jpg')}
                alt="Mario Gijón"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="text-[13px] font-semibold text-white transition-colors group-hover:text-brand-primary">
                {localeContent.siteTitle}
              </p>
              <p className="text-[11px] text-white/40 mt-0.5">{localeContent.siteSubtitle}</p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-primary'
                      : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-brand-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right: lang + hamburger */}
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                aria-label={localeContent.languageSelectLabel}
                className="appearance-none rounded-lg border border-white/[0.10] bg-white/[0.05] pl-3 pr-7 py-1.5 text-[12px] text-white/60 outline-none cursor-pointer
                           transition-all duration-200 hover:border-brand-primary/40 hover:text-white/90 focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang} className="bg-[#071C19] text-white">
                    {(LOCALE_FLAG[lang] ?? '🌐') + ' ' + lang}
                  </option>
                ))}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-white/30">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.05] text-white/60 transition-all hover:border-brand-primary/40 hover:text-white"
              aria-label={menuOpen ? 'Cerrar' : 'Menú'}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <><path d="M6 6 18 18" strokeLinecap="round"/><path d="M18 6 6 18" strokeLinecap="round"/></>
                ) : (
                  <><path d="M4 7h16" strokeLinecap="round"/><path d="M4 12h16" strokeLinecap="round"/><path d="M4 17h16" strokeLinecap="round"/></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="fixed inset-x-0 top-[57px] z-[95] bg-[rgba(7,28,25,0.97)] backdrop-blur-2xl border-b border-white/[0.07] px-5 py-3 space-y-0.5 shadow-2xl">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                    isActive ? 'text-brand-primary bg-brand-primary/[0.08]' : 'text-white/65 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="px-4 pt-3 pb-1 border-t border-white/[0.07] mt-1">
              <p className="section-label mb-2">{localeContent.languageSelectLabel}</p>
              <select
                value={locale}
                onChange={(e) => { setLocale(e.target.value); setMenuOpen(false); }}
                className="w-full rounded-xl border border-white/[0.10] bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang} className="bg-[#071C19] text-white">
                    {(LOCALE_FLAG[lang] ?? '🌐') + ' ' + lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {/* ── CONTENT ── */}
      <div className="mx-auto max-w-5xl px-5 pt-24 pb-20 lg:px-8">
        <Suspense fallback={<PageFallback />}>
          <div key={location.pathname} className="route-swap">
            <Routes>
              <Route path="/"        element={<HomePage    copy={localeContent} />} />
              <Route path="/cv"      element={<CVPage       copy={localeContent} />} />
              <Route path="/contact" element={<ContactPage copy={localeContent} />} />
              <Route path="*"        element={<NotFoundPage copy={localeContent} />} />
            </Routes>
          </div>
        </Suspense>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 text-[12px] text-white/25">
          <p>{localeContent.footer?.copyright?.replace('{year}', `${new Date().getFullYear()}`)}</p>
          <p className="font-mono">{localeContent.footer?.version?.replace('{version}', version)}</p>
        </div>
      </footer>

      <CookieBanner copy={localeContent} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={withBase('/')}>
      <AppContent />
    </BrowserRouter>
  );
}
