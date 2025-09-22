import type { Decorator } from '@storybook/react-vite';

const handleScrollHash = (event: MouseEvent) => {
  const anchor = (event.target as Element).closest<HTMLAnchorElement>(
    'a[href^="#"]',
  );
  const hash = anchor?.hash;
  if (!hash) return;
  event.preventDefault();
  const element = document.getElementById(decodeURIComponent(hash).slice(1));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    element.focus({ preventScroll: true });
  }
};

export const withScrollHashBehavior: Decorator = (Story, c) => {
  // Add an event listener to the canvasElement instead of adding another wrapper div.
  // This way, we don't break the customStylesDecorator or rely on the order of decorators
  c.canvasElement.addEventListener('click', handleScrollHash);
  return <Story />;
};
