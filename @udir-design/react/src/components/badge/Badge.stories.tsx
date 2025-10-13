import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChatIcon,
  EnvelopeClosedFillIcon,
  InboxIcon,
  PencilIcon,
  VideoIcon,
  FloppydiskFillIcon,
} from '@udir-design/icons';
import { Badge } from './Badge';
import { CSSProperties } from 'react';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Tabs } from '../tabs/Tabs';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details:
        'Vi har begrenset fargevalg til semantiske farger og Udirs hovedfarger.',
    },
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
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
  args: { 'data-color': 'danger' },
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
        <Avatar
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
    <Badge.Position placement="top-right">
      <Badge
        style={
          {
            '--dsc-badge-top': '16%',
            '--dsc-badge-right': '10%',
          } as CSSProperties
        }
        {...args}
      />
      <EnvelopeClosedFillIcon title="Meldinger" />
    </Badge.Position>
  ),
};

export const Status: Story = {
  args: { 'data-color': 'danger' },
  render: (args) => (
    <div>
      <Badge.Position data-size="lg">
        <Badge {...args} />
        <FloppydiskFillIcon title="Lagre" />
      </Badge.Position>
    </div>
  ),
};

export const InTabs: Story = {
  args: { 'data-color': 'accent' },
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

const ColorsMap: {
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
};

const SemanticColorsMap: {
  [key: string]: { [key: string]: string };
} = {
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
  successBase: {
    'data-color': 'success',
  },
  successTinted: {
    'data-color': 'success',
    'data-variant': 'tinted',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 60px)',
        gap: 'var(--ds-size-2)',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {Object.entries(ColorsMap).map(([key, value]) => (
        <Badge key={key} {...value} count={15} maxCount={9} />
      ))}
    </div>
  ),
};

export const SemanticColorVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 60px)',
        gap: 'var(--ds-size-2)',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {Object.entries(SemanticColorsMap).map(([key, value]) => (
        <Badge key={key} {...value} count={15} maxCount={9} />
      ))}
    </div>
  ),
};
