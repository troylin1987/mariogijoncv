import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import copy from './content/copy.json';
import { getLocalizedProjects } from './data/projects';
import CookieBanner from './components/CookieBanner';
import { applyCookieConsent, readCookieConsent, trackPageView } from './lib/analytics';
import { mediaPath, withBase } from './lib/paths';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PersonalPage = lazy(() => import('./pages/PersonalPage'));
const ProfessionalPage = lazy(() => import('./pages/ProfessionalPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

function deepMerge(defaultContent: Record<string, any>, localeContent: Record<string, any>): Record<string, any> {
  if (typeof defaultContent !== 'object' || defaultContent === null) return localeContent;
  if (typeof localeContent !== 'object' || localeContent === null) return localeContent;

  const merged: Record<string, any> = Array.isArray(defaultContent) ? [...defaultContent] : { ...defaultContent };

  for (const key of Object.keys(localeContent)) {
    const defaultValue = defaultContent[key];
    const localeValue = localeContent[key];

    if (
      defaultValue &&
      localeValue &&
      typeof defaultValue === 'object' &&
      typeof localeValue === 'object' &&
      !Array.isArray(defaultValue) &&
      !Array.isArray(localeValue)
    ) {
      merged[key] = deepMerge(defaultValue, localeValue);
    } else {
      merged[key] = localeValue;
    }
  }

  return merged;
}

function AppContent() {
  const location = useLocation();
  const [locale, setLocale] = useState<string>(copy.defaultLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const languageOptions = copy.supportedLanguages as string[];
  const contentMap = copy.content as Record<string, any>;
  const defaultContent = contentMap[copy.defaultLanguage] || {};
  const localeContent = useMemo(() => {
    const selectedContent = contentMap[locale] || {};
    return deepMerge(defaultContent, selectedContent);
  }, [locale, contentMap, defaultContent]);

  const localizedProjects = useMemo(() => getLocalizedProjects(locale), [locale]);
  const localizedProfessionalProjects = useMemo(
    () => localizedProjects.filter((project) => project.category === 'Profesional'),
    [localizedProjects]
  );
  const localizedPersonalProjects = useMemo(
    () => localizedProjects.filter((project) => project.category === 'Personal'),
    [localizedProjects]
  );

  const version = import.meta.env.VITE_APP_VERSION ?? 'v1.0.0-local';
  const navigationItems = [
    { to: '/', label: localeContent.navigation.home },
    { to: '/about', label: localeContent.navigation.about },
    { to: '/professional', label: localeContent.navigation.professional },
    { to: '/personal', label: localeContent.navigation.personal },
    { to: '/search', label: localeContent.navigation.search },
    { to: '/contact', label: localeContent.navigation.contact }
  ];

  const localeFlagMap: Record<string, string> = {
    SPA: '🇪🇸',
    ENG: '🇬🇧',
    CAT: '🇪🇸',
    GLG: '🇪🇸',
    EUS: '🇪🇸',
    FRA: '🇫🇷',
    ITA: '🇮🇹',
    DEU: '🇩🇪',
    ZHO: '🇨🇳',
    JPN: '🇯🇵',
    RUS: '🇷🇺',
    POL: '🇵🇱'
  };

  useEffect(() => {
    applyCookieConsent(readCookieConsent());
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="app-shell text-slate-100">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-20" />
      <header className="pointer-events-none fixed left-0 right-0 top-4 z-[160]">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/30 bg-slate-950/80 text-white backdrop-blur-md transition hover:border-white/60"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6 18 18" />
                <path d="M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>

          <div className={`pointer-events-auto panel-soft flex items-center gap-3 px-3 py-2 ${menuOpen ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className="text-right">
              <a href={withBase('/')} className="text-base font-semibold tracking-tight text-white">
                {localeContent.siteTitle}
              </a>
              <p className="text-xs text-white/80">{localeContent.siteSubtitle}</p>
            </div>
            <img
              src={mediaPath('/media/personal/mario-photo.jpg')}
              alt="Mario Gijon"
              className="h-11 w-11 rounded-full border border-white/30 object-cover"
            />
          </div>
        </div>
      </header>

      {menuOpen ? (
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-[2px]"
          aria-label="Close menu backdrop"
        />
      ) : null}

      <div className="relative mx-auto min-h-screen w-full max-w-[1500px] px-4 py-4 lg:px-6">
          <aside
            className={`panel fixed left-4 top-4 z-[130] h-[calc(100vh-2rem)] w-[320px] transition-all duration-300 ${
              menuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-[120%] opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex h-full flex-col gap-8 px-6 pb-6 pt-20">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">Menú</p>
              </div>

              <div className="panel-soft p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-400/70">{localeContent.languageSelectLabel}</p>
                <label className="sr-only" htmlFor="language-select">
                  {localeContent.languageSelectLabel}
                </label>
                <select
                  id="language-select"
                  value={locale}
                  onChange={(event) => setLocale(event.target.value)}
                  className="mt-3 w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white outline-none transition backdrop-blur-md hover:border-white/50 focus:border-purple-400/70 focus:ring-1 focus:ring-purple-400/30"
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language} className="bg-slate-900 text-white">
                      {(localeFlagMap[language] ?? '🌐') + ' ' + language}
                    </option>
                  ))}
                </select>
              </div>

              <nav aria-label="Primary navigation" className="grid gap-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'border border-purple-400/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg shadow-purple-500/20'
                          : 'border border-transparent text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto panel-soft p-4 text-sm text-white/70">
                <p>{localeContent.footer?.version?.replace('{version}', version)}</p>
                <p className="mt-2 text-xs text-white/50">{localeContent.footer?.copyright?.replace('{year}', `${new Date().getFullYear()}`).replace('{version}', version)}</p>
              </div>
            </div>
          </aside>

          <div className="fade-up space-y-6 pt-20">
            <main className="space-y-6">
              <Suspense
                fallback={
                  <div className="panel p-10 text-center">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Loading</p>
                    <p className="mt-3 text-lg text-slate-200">Preparing next section...</p>
                  </div>
                }
              >
                <div key={location.pathname} className="route-swap">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <HomePage copy={localeContent} />
                      }
                    />
                    <Route path="/about" element={<AboutPage copy={localeContent} locale={locale} />} />
                    <Route path="/professional" element={<ProfessionalPage copy={localeContent} professionalProjects={localizedProfessionalProjects} locale={locale} />} />
                    <Route path="/personal" element={<PersonalPage copy={localeContent} personalProjects={localizedPersonalProjects} locale={locale} />} />
                    <Route path="/portfolio" element={<Navigate to="/professional" replace />} />
                    <Route path="/search" element={<SearchPage copy={localeContent} projects={localizedProjects} locale={locale} />} />
                    <Route path="/project/:projectId" element={<ProjectDetailPage copy={localeContent} locale={locale} />} />
                    <Route path="/contact" element={<ContactPage copy={localeContent} />} />
                    <Route path="*" element={<NotFoundPage copy={localeContent} />} />
                  </Routes>
                </div>
              </Suspense>
            </main>
          </div>
      </div>
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={withBase('/')}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
