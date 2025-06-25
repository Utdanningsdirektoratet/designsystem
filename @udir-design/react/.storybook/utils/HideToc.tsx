import { useEffect } from 'react';

export function HideToc() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'hide-toc-style';
    style.textContent = `
      .sbdocs-toc--custom {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);
  return null;
}
