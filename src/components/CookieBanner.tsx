import { useMemo, useState } from 'react';
import { readCookieConsent, saveCookieConsent } from '../lib/analytics';

export default function CookieBanner() {
  const initialConsent = useMemo(() => readCookieConsent(), []);
  const [hidden, setHidden] = useState(initialConsent !== null);

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="panel mx-auto w-full max-w-[760px] border-orange-300/30 bg-[linear-gradient(135deg,rgba(62,31,22,0.9),rgba(26,14,10,0.94))] p-6 lg:p-7">
        <p className="inline-flex rounded-full border border-orange-400/45 bg-orange-500/15 px-3 py-1 text-xs uppercase tracking-[0.24em] text-orange-200">
          Cookies y analítica
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-100 lg:text-base">
          Este sitio utiliza analítica para medir el uso y mejorar la experiencia. Para continuar navegando debes aceptar.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 lg:text-base">
          Si no deseas aceptarlo, debes salir de la página.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              saveCookieConsent('accepted');
              setHidden(true);
            }}
            className="cta-primary w-full gap-2 rounded-xl px-5 py-3 shadow-orange-950/40 focus:outline-none focus:ring-2 focus:ring-orange-300/70 sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
              <path d="m5 12 4 4L19 6" />
            </svg>
            Aceptar y continuar
          </button>
        </div>
      </div>
    </div>
  );
}