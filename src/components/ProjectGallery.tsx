import { useMemo, useState } from 'react';
import type { Project } from '../data/projects';

type ProjectGalleryProps = {
  project: Pick<Project, 'id' | 'title' | 'kind' | 'image'>;
  className?: string;
};

const PROJECT_SCREENSHOTS: Record<string, string[]> = {
  aupromas: ['/media/screenshots/aupromas.png'],
  'bank-of-cyprus': ['/media/screenshots/bankofcyprus.png'],
  'f-c-barcelona-tickets': ['/media/screenshots/barcelona.png', '/media/screenshots/barcelona2.png', '/media/screenshots/barcelona3.png'],
  bizkaiup: ['/media/screenshots/bizkaiup.png'],
  'delivery-notes': ['/media/screenshots/deliverynotes.png'],
  enemalta: ['/media/screenshots/enemalta.png'],
  'evo-banco': ['/media/screenshots/evobank.png'],
  'handling-services': ['/media/screenshots/handlingservices.png'],
  insite: ['/media/screenshots/insite.png'],
  'materials-inspect': ['/media/screenshots/materialsinspect.png'],
  'passenger-plus': ['/media/screenshots/passengerplus.png'],
  'plataforma-tierra': ['/media/screenshots/plataformatierra.png'],
  sofia: ['/media/screenshots/sofia.png']
};

export default function ProjectGallery({ project, className = '' }: ProjectGalleryProps) {
  const images = useMemo(() => {
    const screenshotImages = PROJECT_SCREENSHOTS[project.id];
    if (screenshotImages && screenshotImages.length > 0) {
      return screenshotImages;
    }

    return [project.image ?? `/media/projects/${project.id}.svg`];
  }, [project.id, project.image]);

  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const hasMultipleImages = images.length > 1;

  const activeSrc = failed[active] ? `/media/kinds/${project.kind.toLowerCase()}.svg` : images[active];

  return (
    <div className={`space-y-3 lg:h-full ${className}`.trim()}>
      <div className="media-frame min-h-[270px] lg:h-full lg:min-h-0">
        <img
          src={activeSrc}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed((prev) => ({ ...prev, [active]: true }))}
        />

        {hasMultipleImages ? (
          <div className="absolute bottom-3 left-3 right-3 hidden grid-cols-4 gap-2 rounded-xl border border-slate-700/80 bg-slate-950/70 p-2 backdrop-blur-sm lg:grid">
            {images.map((src, index) => (
              <button
                key={`${src}-desktop`}
                type="button"
                onClick={() => setActive(index)}
                className={`media-frame aspect-[16/9] border transition ${
                  active === index ? 'border-brand-turquoise ring-1 ring-brand-turquoise/60' : 'border-slate-700'
                }`}
              >
                <img
                  src={failed[index] ? `/media/kinds/${project.kind.toLowerCase()}.svg` : src}
                  alt={`${project.title} preview ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="grid grid-cols-4 gap-2 lg:hidden">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`media-frame aspect-[16/9] border transition ${
                active === index ? 'border-brand-turquoise ring-1 ring-brand-turquoise/60' : 'border-slate-700'
              }`}
            >
              <img
                src={failed[index] ? `/media/kinds/${project.kind.toLowerCase()}.svg` : src}
                alt={`${project.title} preview ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
