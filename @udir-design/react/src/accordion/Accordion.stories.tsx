import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionHeading,
  AccordionItem,
} from './Accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Preview: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionHeading>Accordion heading text</AccordionHeading>
        <AccordionContent>Accordion content</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeading>Accordion heading text</AccordionHeading>
        <AccordionContent>Accordion content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
