import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta: Meta<typeof SkipLink> = {
  component: SkipLink,
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Paragraph>
        For å vise skiplinken, tab til dette eksempelet, eller klikk inni
        eksempelet og trykk Tab.
        <SkipLink {...args} href="#main-content">
          Hopp til hovedinnhold
        </SkipLink>
      </Paragraph>
      <Paragraph id="main-content" tabIndex={-1}>
        Region som kan motta fokus fra skiplink.
      </Paragraph>
    </>
  ),
};
