// Polyfill CSS.supports for jsdom (used by @digdir/designsystemet-web at module load time)
if (typeof globalThis.CSS === 'undefined') {
  globalThis.CSS = { supports: () => false } as unknown as typeof CSS;
}
