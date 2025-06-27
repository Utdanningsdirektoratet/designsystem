export const hideTocForIds: Set<string> = new Set();

export function HideToc() {
  const params = new URLSearchParams(window.location.search);
  const pageId = params.get('id');
  if (pageId) {
    hideTocForIds.add(pageId);
  }
  return null;
}
