export function normalizePath(p?: string): string {
  if (!p) return '';
  const path = new URL(p, 'http://x').pathname;
  return path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
}
