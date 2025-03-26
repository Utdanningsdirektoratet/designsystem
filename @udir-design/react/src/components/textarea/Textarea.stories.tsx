import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../typography/label/Label';
import { useState } from 'react';
import { Button, Divider, Paragraph, Textarea } from '../alpha';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  tags: ['alpha'],
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
      maxWidth: '20rem',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Preview: Story = {
  args: {
    disabled: false,
    readOnly: false,
    id: 'my-textarea',
  },
  render: (args) => (
    <>
      <Label htmlFor={args.id}>Label</Label>
      <Textarea {...args} />
    </>
  ),
};

export const FullWidth: Story = {
  args: {
    id: 'my-textarea',
  },
  parameters: {
    customStyles: {
      maxWidth: '100%',
    },
  },
  render: (args) => (
    <>
      <Label htmlFor={args.id}>Label</Label>
      <Textarea {...args} />
    </>
  ),
};

export const Controlled: Story = {
  args: {
    id: 'my-textarea',
  },
  render: function Render(args) {
    const [value, setValue] = useState(`${args.value || ''}`);

    return (
      <>
        <Label htmlFor={args.id}>Kontroller meg!</Label>
        <Textarea
          onChange={(e) => setValue(e.target.value)}
          value={value}
          {...args}
        />

        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
          Du har skrevet inn: {value}
        </Paragraph>
        <Button onClick={() => setValue('Pizza')}>Jeg vil ha Pizza</Button>
      </>
    );
  },
};
