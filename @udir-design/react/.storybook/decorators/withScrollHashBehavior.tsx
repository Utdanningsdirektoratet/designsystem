import type { Decorator } from '@storybook/react';
import type { MouseEventHandler } from 'react';

const handleScrollHash: MouseEventHandler<HTMLDivElement> = (event) => {
  const anchor = (event.target as Element).closest<HTMLAnchorElement>(
    'a[href^="#"]',
  );
  const hash = anchor?.hash;
  if (!hash) return;
  event.preventDefault();
  const element = document.getElementById(hash.slice(1));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    element.focus({ preventScroll: true });
  }
};

export const withScrollHashBehavior: Decorator = (Story) => {
  return (
    <div data-storybook-decorator onClick={handleScrollHash}>
      <Story />
    </div>
  );
};
