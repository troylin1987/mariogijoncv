type DomainBadgeProps = {
  label: string;
  variant?: 'small' | 'normal';
};

function domainForLabel(label: string): 'ai' | 'cloud' | 'mobile' | 'data' | 'security' | 'platform' {
  const value = label.toLowerCase();

  if (/(ai|genai|llm|bedrock|sagemaker|watson|ml)/.test(value)) return 'ai';
  if (/(aws|azure|cloud|openshift|firebase|ibm cloud)/.test(value)) return 'cloud';
  if (/(ios|android|mobile|app|kotlin|swift)/.test(value)) return 'mobile';
  if (/(data|analytics|postgres|mongo|firestore|spark|kafka)/.test(value)) return 'data';
  if (/(security|otp|biometr|identity|cyber)/.test(value)) return 'security';
  return 'platform';
}

function glyph(domain: ReturnType<typeof domainForLabel>) {
  if (domain === 'ai') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3v4" />
        <path d="M5.6 6.2 8.4 9" />
        <path d="M3 12h4" />
        <path d="m5.6 17.8 2.8-2.8" />
        <path d="M12 21v-4" />
        <path d="m18.4 17.8-2.8-2.8" />
        <path d="M21 12h-4" />
        <path d="m18.4 6.2-2.8 2.8" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    );
  }

  if (domain === 'cloud') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z" />
      </svg>
    );
  }

  if (domain === 'mobile') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="3" width="10" height="18" rx="2.2" />
        <circle cx="12" cy="17.5" r="0.9" fill="currentColor" />
      </svg>
    );
  }

  if (domain === 'data') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <ellipse cx="12" cy="6" rx="6.5" ry="2.5" />
        <path d="M5.5 6v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V6" />
        <path d="M5.5 11v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
      </svg>
    );
  }

  if (domain === 'security') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 5 6.2v5.8A10 10 0 0 0 12 21a10 10 0 0 0 7-9V6.2Z" />
        <path d="m9.4 12.2 1.8 1.8 3.4-3.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default function DomainBadge({ label, variant = 'normal' }: DomainBadgeProps) {
  const domain = domainForLabel(label);
  const sizeClass = variant === 'small' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';
  const gradientClass = domain === 'ai' ? 'from-orange-500/30 to-amber-500/30' :
                        domain === 'cloud' ? 'from-orange-500/30 to-amber-500/30' :
                        domain === 'mobile' ? 'from-orange-500/30 to-amber-500/30' :
                        domain === 'data' ? 'from-orange-500/30 to-yellow-500/30' :
                        domain === 'security' ? 'from-red-500/30 to-orange-500/30' :
                        'from-orange-500/30 to-amber-500/30';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-gradient-to-r ${gradientClass} backdrop-blur-md text-white/90 transition-all duration-200 hover:border-white/50 hover:bg-gradient-to-r hover:shadow-lg ${sizeClass}`}>
      {glyph(domain)}
      {label}
    </span>
  );
}
