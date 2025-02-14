import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';
import { Paragraph } from '../alpha';

const meta: Meta<typeof Divider> = {
  component: Divider,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Preview: Story = {
  args: {},
  render: (args) => (
    <>
      <Paragraph>
        Divider er brukt for å dele opp innhold i mindre deler.
      </Paragraph>
      <Divider {...args} />
      <Paragraph>
        Den kan også brukes for å skille innhold som er relatert til hverandre.
      </Paragraph>
    </>
  ),
};
