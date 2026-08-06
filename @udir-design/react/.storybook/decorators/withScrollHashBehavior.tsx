import type { Decorator } from '@storybook/react-vite';
import { focusFormField } from 'src/utilities/form/focus';

const handleScrollHash = (event: MouseEvent) => {
  if (event.defaultPrevented) {
    return;
  }
  const anchor = (event.target as Element).closest<HTMLAnchorElement>(
    'a[href^="#"]',
  );
  const hash = anchor?.hash;
  if (!hash) return;
  event.preventDefault();
  const element = document.getElementById(decodeURIComponent(hash).slice(1));
  if (element && (event.currentTarget as HTMLElement)?.contains(element)) {
    if (anchor.closest('ds-error-summary')) {
      // This is an anchor inside an error summary.
      // We scroll the entire field (label, optional description, and input) into view,
      // then focus the input field. This prevents scrolling to an input field without showing
      // the related label.
      focusFormField(element);
    } else {
      element.scrollIntoView();
      element.focus({ preventScroll: true });
    }
  }
};

export const withScrollHashBehavior: Decorator = (Story, c) => {
  // Add an event listener to the canvasElement instead of adding another wrapper div.
  // This way, we don't break the CustomStylesDecorator or rely on the order of decorators
  c.canvasElement.addEventListener('click', handleScrollHash);
  return <Story />;
};
