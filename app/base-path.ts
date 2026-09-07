export function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export function routeFromLocation() {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const raw = window.location.pathname.replace(/\/+$/, '') || '/';
  const path = base && (raw === base || raw.startsWith(`${base}/`)) ? raw.slice(base.length) || '/' : raw;
  if (path === '/female') return 'female';
  if (path === '/male' || path === '/') return 'male';
  return null;
}
