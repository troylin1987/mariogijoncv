import type { Project } from '../data/projects';
import { useMemo, useState } from 'react';

type ProjectVisualProps = {
  project: Pick<Project, 'id' | 'title' | 'kind' | 'category' | 'image'>;
  compact?: boolean;
};

const palettes = [
  'from-cyan-500/35 via-slate-900 to-slate-950',
  'from-orange-500/30 via-slate-900 to-slate-950',
  'from-sky-500/30 via-slate-900 to-slate-950',
  'from-emerald-500/30 via-slate-900 to-slate-950',
  'from-fuchsia-500/25 via-slate-900 to-slate-950',
  'from-indigo-500/30 via-slate-900 to-slate-950'
];

function hashId(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function KindMark({ kind }: { kind: Project['kind'] }) {
  if (kind === 'Data') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    );
  }

  if (kind === 'App') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'Tool') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.2 4.3a4.2 4.2 0 0 0 5.5 5.5l-8.2 8.2a2 2 0 0 1-2.8 0l-2-2a2 2 0 0 1 0-2.8z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 19v-4" />
    </svg>
  );
}

export default function ProjectVisual({ project, compact = false }: ProjectVisualProps) {
  const [imgError, setImgError] = useState(false);
  const palette = palettes[hashId(project.id) % palettes.length];
  const sizeClass = compact ? 'aspect-[16/9]' : 'min-h-[280px]';
  const imageSrc = useMemo(() => {
    if (imgError) {
      return `/media/kinds/${project.kind.toLowerCase()}.svg`;
    }
    if (project.image) {
      return project.image;
    }
    return `/media/projects/${project.id}.svg`;
  }, [imgError, project.id, project.kind, project.image]);

  return (
    <div className={`media-frame ${sizeClass} bg-gradient-to-br ${palette}`}>
      <img
        src={imageSrc}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_30%)]" />
    </div>
  );
}
