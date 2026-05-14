const BASE_URL = import.meta.env.BASE_URL || '/';

export function withBase(path: string): string {
  if (!path) {
    return BASE_URL;
  }

  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${normalized}`;
}

export function mediaPath(path: string): string {
  if (path.startsWith('/media/')) {
    return withBase(path);
  }

  return withBase(`/media/${path.replace(/^\/+/, '')}`);
}
