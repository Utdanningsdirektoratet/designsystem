import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChatIcon,
  EnvelopeClosedFillIcon,
  HeartFillIcon,
  InboxIcon,
  PencilIcon,
  VideoFillIcon,
  VideoIcon,
} from '@navikt/aksel-icons';
import { Badge, Tabs } from '../alpha';
import { Button } from '../beta';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Preview: Story = {
  args: {
    count: 10,
    maxCount: 9,
  },
};

export const Floating: Story = {
  args: { 'data-color': 'accent' },
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-6)',
    },
  },
  render: (args) => (
    <>
      <Badge.Position placement="top-right">
        <Badge {...args} />
        <EnvelopeClosedFillIcon title="Meldinger" />
      </Badge.Position>
      <Badge.Position placement="top-left">
        <Badge {...args} />
        <EnvelopeClosedFillIcon title="Meldinger" />
      </Badge.Position>
      <Badge.Position placement="bottom-right">
        <Badge {...args} />
        <EnvelopeClosedFillIcon title="Meldinger" />
      </Badge.Position>
      <Badge.Position placement="bottom-left">
        <Badge {...args} />
        <EnvelopeClosedFillIcon title="Meldinger" />
      </Badge.Position>
      <Badge.Position placement="top-right" overlap="circle">
        <Badge {...args} />
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-color-support2-base-default)',
          }}
        />
      </Badge.Position>
      <Badge.Position placement="top-left" overlap="circle">
        <Badge {...args} />
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-color-support2-base-default)',
          }}
        />
      </Badge.Position>
      <Badge.Position placement="bottom-right" overlap="circle">
        <Badge {...args} />
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-color-support2-base-default)',
          }}
        />
      </Badge.Position>
      <Badge.Position placement="bottom-left" overlap="circle">
        <Badge {...args} />
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: 'var(--ds-color-support2-base-default)',
          }}
        />
      </Badge.Position>
    </>
  ),
};

export const CustomPlacement: Story = {
  args: { 'data-color': 'danger' },
  render: (args) => (
    <Badge.Position
      placement="top-right"
      style={{
        top: '16%',
        right: '10%',
      }}
    >
      <Badge data-color="accent"></Badge>
      <EnvelopeClosedFillIcon title="Meldinger" />
    </Badge.Position>
  ),
};

export const Status: Story = {
  args: { 'data-color': 'danger' },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-size-4)',
      }}
    >
      <Badge.Position data-size="sm">
        <Badge {...args} />
        <VideoFillIcon title="Videokamera" />
      </Badge.Position>
      <Badge.Position data-size="md">
        <Badge {...args} />
        <VideoFillIcon title="Videokamera" />
      </Badge.Position>
      <Badge.Position data-size="lg">
        <Badge {...args} />
        <VideoFillIcon title="Videokamera" />
      </Badge.Position>
    </div>
  ),
};

export const InTabs: Story = {
  args: { 'data-color': 'neutral' },
  render: (args) => (
    <Tabs defaultValue="value1">
      <Tabs.List>
        <Tabs.Tab value="value1">
          <HeartFillIcon aria-hidden />
          Favoritter
          <Badge {...args} count={64} maxCount={10} />
        </Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">
          <PencilIcon aria-hidden />
          Nylige
          <Badge {...args} count={2} />
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="value1">content 1</Tabs.Panel>
      <Tabs.Panel value="value2">content 2</Tabs.Panel>
      <Tabs.Panel value="value3">content 3</Tabs.Panel>
    </Tabs>
  ),
};

export const InButton: Story = {
  args: { 'data-color': 'danger' },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-size-4)',
      }}
    >
      <Button icon variant="tertiary">
        <Badge.Position>
          <Badge {...args} count={1000} maxCount={99} />
          <InboxIcon title="Innboks" />
        </Badge.Position>
      </Button>
      <Button icon variant="tertiary">
        <Badge.Position>
          <Badge {...args} count={10} />
          <ChatIcon title="Meldinger" />
        </Badge.Position>
      </Button>
      <Button icon variant="tertiary">
        <Badge.Position>
          <Badge {...args}></Badge>
          <VideoIcon title="Skru på video" />
        </Badge.Position>
      </Button>
    </div>
  ),
};

const VariantsMap: {
  [key: string]: { [key: string]: string };
} = {
  neutralBase: {
    'data-color': 'neutral',
  },
  neutralTinted: {
    'data-color': 'neutral',
    'data-variant': 'tinted',
  },
  dangerBase: {
    'data-color': 'danger',
  },
  dangerTinted: {
    'data-color': 'danger',
    'data-variant': 'tinted',
  },
  infoBase: {
    'data-color': 'info',
  },
  infoTinted: {
    'data-color': 'info',
    'data-variant': 'tinted',
  },
  warningBase: {
    'data-color': 'warning',
  },
  warningTinted: {
    'data-color': 'warning',
    'data-variant': 'tinted',
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--ds-size-2)',
        height: '100%',
        width: '100%',
      }}
    >
      {Object.entries(VariantsMap).map(([key, value]) => (
        <Badge key={key} {...value} count={15} maxCount={9} />
      ))}
    </div>
  ),
};
