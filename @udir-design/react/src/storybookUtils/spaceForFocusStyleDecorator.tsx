import type { Decorator } from '@storybook/react';

export const spaceForFocusStyleDecorator: Decorator = (Story) => (
  <div style={{ padding: '6px' }}>
    <Story />
  </div>
);
