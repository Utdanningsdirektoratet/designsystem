import type { Decorator } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

export const WithInertInitialRender: Decorator = (Story, context) => {
  const [inert, setInert] = useState(context.viewMode === 'docs');
  useEffect(() => {
    setTimeout(() => setInert(false), 500);
  }, []);
  return (
    <div data-storybook-decorator inert={inert}>
      <Story />
    </div>
  );
};
