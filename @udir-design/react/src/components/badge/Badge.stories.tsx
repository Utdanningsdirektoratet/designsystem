import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChatIcon,
  EnvelopeClosedFillIcon,
  InboxIcon,
  InboxFillIcon,
  PencilIcon,
  VideoIcon,
} from '@navikt/aksel-icons';
import { Avatar, Tabs } from '../alpha';
import { Badge } from '../beta';
import { Button } from '../beta';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['beta'],
  parameters: {
    layout: 'centered',
    right: 40,
  },
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
        <Badge {...args} data-size="lg" />
        <Avatar
          data-color="support2"
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
          }}
          aria-label={'Avatar 1'}
        />
      </Badge.Position>
      <Badge.Position placement="top-left" overlap="circle">
        <Badge {...args} />
        <Avatar
          data-color="support2"
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
          }}
          aria-label={'Avatar 1'}
        />
      </Badge.Position>
      <Badge.Position placement="bottom-right" overlap="circle">
        <Badge {...args} />
        <Avatar
          data-color="support2"
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
          }}
          aria-label={'Avatar 1'}
        />
      </Badge.Position>
      <Badge.Position placement="bottom-left" overlap="circle">
        <Badge {...args} />
        <Avatar
          data-color="support2"
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
          }}
          aria-label={'Avatar 1'}
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
        <InboxFillIcon title="Innboks" />
      </Badge.Position>
      <Badge.Position data-size="md">
        <Badge {...args} />
        <InboxFillIcon title="Innboks" />
      </Badge.Position>
      <Badge.Position data-size="lg">
        <Badge {...args} />
        <InboxFillIcon title="Innboks" />
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
          <InboxIcon aria-hidden />
          Innboks
          <Badge {...args} count={64} maxCount={10} />
        </Tabs.Tab>
        <Tabs.Tab value="value2">
          <PencilIcon aria-hidden />
          Pågående saker
          <Badge {...args} count={2} />
        </Tabs.Tab>
        <Tabs.Tab value="value3">Løste saker</Tabs.Tab>
      </Tabs.List>
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
  accentBase: {
    'data-color': 'accent',
  },
  accentTinted: {
    'data-color': 'accent',
    'data-variant': 'tinted',
  },
  support1Base: {
    'data-color': 'support1',
  },
  support1Tinted: {
    'data-color': 'support1',
    'data-variant': 'tinted',
  },
  support2Base: {
    'data-color': 'support2',
  },
  support2Tinted: {
    'data-color': 'support2',
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
        gridTemplateColumns: 'repeat(14, 1fr )',
        gap: 'var(--ds-size-4)',
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
