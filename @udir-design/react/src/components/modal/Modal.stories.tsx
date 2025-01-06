import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Preview: Story = {
  render: (args) => (
    <Modal.TriggerContext>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal {...args}>
        <Heading>Modal header</Heading>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          doloremque obcaecati assumenda odio ducimus sunt et.
        </Paragraph>
        <Paragraph>Modal footer</Paragraph>
      </Modal>
    </Modal.TriggerContext>
  ),
};
