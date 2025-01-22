import type { Decorator } from '@storybook/react';

export const spaceForFocusStyleDecorator: Decorator = (Story) => (
  <div data-storybook-decorator style={{ padding: '6px' }}>
    <Story />
  </div>
);
