import { mediaPath } from '../lib/paths';

type ContactPageProps = { copy: any };

export default function ContactPage({ copy }: ContactPageProps) {
  const c = copy.contact;

  return (
    <section className="max-w-xl mx-auto space-y-8 fade-up">

      {/* Header */}
      <div className="space-y-2 stagger-1 fade-up">
        <p className="section-label">Contact</p>
        <h1 className="text-4xl font-mono font-bold text-white md:text-5xl">{c.title}</h1>
        <p className="text-[15px] leading-relaxed text-white/50 pt-1">{c.description}</p>
      </div>

      {/* LinkedIn main card */}
      <div className="panel-glass p-7 space-y-6 stagger-2 fade-up"
        style={{ boxShadow: '0 2px 60px rgba(0,0,0,0.4), 0 0 40px rgba(31,191,173,0.04)' }}>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: '#0A66C2', boxShadow: '0 4px 16px rgba(10,102,194,0.4)' }}>
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <p className="section-label mb-0.5">{c.linkedinLabel}</p>
            <p className="text-white font-semibold text-[15px]">{c.linkedinHandle}</p>
          </div>
        </div>

        <a
          href={c.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="cta-primary w-full justify-center text-[14px]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          {c.linkedinCta}
        </a>
      </div>

      {/* Info chips */}
      <div className="grid grid-cols-2 gap-3 stagger-3 fade-up">
        <div className="panel-soft p-4 space-y-2">
          <p className="section-label">{c.locationLabel}</p>
          <div className="flex items-start gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              className="h-4 w-4 text-brand-primary mt-0.5 flex-shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <p className="text-[13px] text-white/65 leading-snug">{c.location}</p>
          </div>
        </div>
        <div className="panel-soft p-4 space-y-2">
          <p className="section-label">{c.availabilityLabel}</p>
          <div className="flex items-start gap-2">
            <span className="avail-dot mt-1.5" />
            <p className="text-[13px] text-white/65 leading-snug">{c.availability}</p>
          </div>
        </div>
      </div>

      {/* Photo */}
      <div className="media-frame aspect-[16/7] overflow-hidden stagger-4 fade-up"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
        <img
          src={mediaPath('/media/personal/mario-photo4.jpg')}
          alt="Mario Gijón"
          className="absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-transform duration-700 hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C19]/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071C19]/50 to-transparent" />
      </div>

    </section>
  );
}
