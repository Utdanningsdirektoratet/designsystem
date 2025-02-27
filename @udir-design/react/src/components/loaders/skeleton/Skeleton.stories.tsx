import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Skeleton } from '../../beta';
import { Heading, Paragraph } from '../../alpha';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  tags: ['alpha'],
  parameters: {
    a11y: {
      config: {
        // Disable a11y empty heading rule as we intentionally set aria-hidden="true" on the Skeleton component inside Headings
        rules: [{ id: 'empty-heading', selector: ':has(.ds-skeleton)' }],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Preview: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

export const Components: Story = {
  args: {
    height: 50,
  },
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Skeleton variant="circle" width="50px" {...args} />
        <Skeleton variant="rectangle" width="100px" {...args} />
        <Paragraph>
          <Skeleton variant="text" width="10" {...args} />
        </Paragraph>
      </div>
    );
  },
};

export const UsageExample: Story = {
  render: (args) => {
    return (
      <div
        style={{
          maxWidth: 400,
        }}
      >
        <Skeleton height="150px" {...args} />
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            padding: '5px 0 5px 0',
          }}
        >
          <Skeleton variant="circle" width="30px" height="30px" {...args} />
          <Heading>
            <Skeleton variant="text" {...args}>
              En medium tittel
            </Skeleton>
          </Heading>
        </div>
        <Skeleton variant="text" width="140" />
      </div>
    );
  },
};

export const Children: Story = {
  args: {
    variant: 'rectangle',
    children: [
      <Paragraph>
        Her er en tekst som blir sendt inn som barn av en Skeleton.
      </Paragraph>,
      <Paragraph>
        Se hvordan Skeleton da dekker den samlede bredden og høyden til barna.
      </Paragraph>,
      <Button>Knapp</Button>,
    ],
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px', maxWidth: 300 }}>
      <div style={{ flex: '1 1 200px' }}>
        <Heading>En tittel</Heading>
        <Paragraph data-size="sm">
          Her er en paragraf som går over flere linjer
        </Paragraph>
      </div>
      <div style={{ flex: '1 1 200px' }}>
        <Heading>
          <Skeleton {...args}>En tittel</Skeleton>
        </Heading>
        <Paragraph data-size="sm">
          <Skeleton width={44} {...args} />
        </Paragraph>
      </div>
    </div>
  ),
};
