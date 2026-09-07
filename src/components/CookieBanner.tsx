import { useMemo, useState } from 'react';
import { readCookieConsent, saveCookieConsent } from '../lib/analytics';

type CookieBannerProps = {
  copy: any;
};

const TEXTS: Record<string, { title: string; body: string; accept: string }> = {
  SPA: {
    title: 'Cookies & analítica',
    body: 'Este sitio usa analítica para medir el uso y mejorar la experiencia. Al continuar, aceptas el uso de cookies.',
    accept: 'Aceptar y continuar',
  },
  ENG: {
    title: 'Cookies & analytics',
    body: 'This site uses analytics to measure usage and improve the experience. By continuing, you accept the use of cookies.',
    accept: 'Accept and continue',
  },
};

export default function CookieBanner({ copy }: CookieBannerProps) {
  const initialConsent = useMemo(() => readCookieConsent(), []);
  const [hidden, setHidden] = useState(initialConsent !== null);

  if (hidden) return null;

  // Detect locale from copy's siteSubtitle key — fallback to SPA
  const locale = (copy?.siteSubtitle ?? '').includes('Computer') ? 'ENG' : 'SPA';
  const t = TEXTS[locale] ?? TEXTS.SPA;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[180] p-4">
      <div className="mx-auto max-w-2xl panel border-brand-primary/20 bg-brand-darker/95 backdrop-blur-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">{t.title}</p>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">{t.body}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            saveCookieConsent('accepted');
            setHidden(true);
          }}
          className="cta-primary flex-shrink-0 whitespace-nowrap"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
