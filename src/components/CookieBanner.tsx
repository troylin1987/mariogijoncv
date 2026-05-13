import { useMemo, useState } from 'react';
import { readCookieConsent, saveCookieConsent } from '../lib/analytics';

export default function CookieBanner() {
  const initialConsent = useMemo(() => readCookieConsent(), []);
  const [hidden, setHidden] = useState(initialConsent !== null);

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[760px] rounded-2xl border border-brand-turquoise/40 bg-[linear-gradient(140deg,rgba(15,23,42,0.98),rgba(2,6,23,0.96))] p-5 shadow-[0_20px_50px_rgba(2,6,23,0.65)] lg:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-turquoise">Cookies y analitica</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">
          Este sitio utiliza analitica para medir uso y mejorar la experiencia. Para continuar navegando debes aceptar.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Si no deseas aceptarlo, debes salir de la pagina.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            saveCookieConsent('accepted');
            setHidden(true);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-gradient-to-r from-brand-turquoise to-brand-orange px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(20,184,166,0.38)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-brand-turquoise/70"
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