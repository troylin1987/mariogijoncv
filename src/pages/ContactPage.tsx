type ContactPageProps = {
  copy: any;
};

import { trackEvent } from '../lib/analytics';
import { mediaPath } from '../lib/paths';

export default function ContactPage({ copy }: ContactPageProps) {
  return (
    <section className="space-y-6">
      <div className="panel overflow-hidden p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{copy.contact.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-300">{copy.contact.description}</p>

            <div className="mt-7 panel-soft p-6">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-brand-turquoise">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 7h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
                  <path d="m4 8 8 6 8-6" />
                </svg>
                {copy.contact.emailLabel}
              </p>
              <a href={`mailto:${copy.contact.email}`} className="mt-3 block text-2xl font-semibold text-white hover:text-brand-turquoise">
                {copy.contact.email}
              </a>
              <a
                href={`mailto:${copy.contact.email}`}
                onClick={() => {
                  trackEvent('contact_email_click', { email: copy.contact.email });
                }}
                className="cta-primary mt-7 inline-flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 7h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
                  <path d="m4 8 8 6 8-6" />
                </svg>
                {copy.contact.button}
              </a>
            </div>
          </div>

          <div className="media-frame min-h-[260px] overflow-hidden rounded-2xl border border-orange-500/30 bg-white">
            <img
              src={mediaPath('/media/personal/mario-photo4.jpg')}
              alt="Mario Gijon"
              className="h-full w-full object-cover object-[50%_38%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
