import type { CSSProperties } from 'react';
import {
  Chat2Icon,
  EnvelopeClosedFillIcon,
  EnvelopeClosedIcon,
  FloppydiskFillIcon,
  VideoIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Details } from '../details/Details';
import { Tabs } from '../tabs/Tabs';
import { Tag } from '../tag/Tag';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Badge, BadgePosition } from './Badge';

const meta = preview.meta({
  component: Badge,
  subcomponents: {
    'Badge.Position': BadgePosition,
  },
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har begrenset fargevalg til varselfarger og neutral.',
    },
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export const Preview = meta.story({
  args: {
    count: 10,
    maxCount: 9,
  },
});

export const Floating = meta.story({
  args: { 'data-color': 'danger' },
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-6)',
    },
  },
  render: (args) => (
    <>
      <style>
        {`
.example-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}`}
      </style>
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
        <Avatar className="example-avatar" aria-label={'Avatar 1'} />
      </Badge.Position>
      <Badge.Position placement="top-left" overlap="circle">
        <Badge {...args} />
        <Avatar className="example-avatar" aria-label={'Avatar 1'} />
      </Badge.Position>
      <Badge.Position placement="bottom-right" overlap="circle">
        <Badge {...args} />
        <Avatar className="example-avatar" aria-label={'Avatar 1'} />
      </Badge.Position>
      <Badge.Position placement="bottom-left" overlap="circle">
        <Badge {...args} />
        <Avatar className="example-avatar" aria-label={'Avatar 1'} />
      </Badge.Position>
    </>
  ),
});

export const CustomPlacement = meta.story({
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
});

export const Status = meta.story({
  args: { 'data-color': 'danger' },
  render: (args) => (
    <Badge.Position data-size="lg">
      <Badge {...args} />
      <FloppydiskFillIcon title="Lagre" />
    </Badge.Position>
  ),
});

export const InTabs = meta.story({
  parameters: {
    /* a11y complains on aria-controls on tabs when there is no tabs-panel, which there are several places in the examples */
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-valid-attr-value',
            enabled: false,
          },
        ],
      },
    },
  },
  args: { 'data-color': 'neutral' },
  render: (args) => (
    <Tabs defaultValue="value1">
      <Tabs.List>
        <Tabs.Tab value="value1">
          Nye saker
          <Badge {...args} count={64} maxCount={10} />
        </Tabs.Tab>
        <Tabs.Tab value="value2">
          Pågående saker
          <Badge {...args} count={2} />
        </Tabs.Tab>
        <Tabs.Tab value="value3">Løste saker</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  ),
});

export const InButton = meta.story({
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
          <EnvelopeClosedIcon title="Innboks" />
        </Badge.Position>
      </Button>
      <Button icon variant="tertiary">
        <Badge.Position>
          <Badge {...args} count={10} />
          <Chat2Icon title="Meldinger" />
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
});

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

export const ColorVariants = meta.story({
  render: (args) => (
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
        <Badge key={key} {...value} count={15} maxCount={9} {...args} />
      ))}
    </div>
  ),
});

export const SystemAlerts = meta.story({
  render: (args) => (
    <>
      <style>
        {`
.example-main {
  display: flex;
  flex-direction: column;
  width: 30rem;
}
.example-heading {
  margin-block-end: var(--ds-size-4);
}
.example-details-content {
  gap: var(--ds-size-4);
  display: flex;
  flex-direction: column;
}`}
      </style>
      <div className="example-main">
        <Heading className="example-heading">Systemvarsler</Heading>
        <Details>
          <Details.Summary>
            Kritisk{' '}
            <Badge count={2} maxCount={9} data-color="danger" {...args} />
          </Details.Summary>
          <Details.Content className="example-details-content">
            {Array.from({ length: 2 }, (_, i) => (
              <Varsel key={i} importance="danger" />
            ))}
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>
            Advarsler{' '}
            <Badge count={6} maxCount={9} data-color="warning" {...args} />
          </Details.Summary>
          <Details.Content className="example-details-content">
            {Array.from({ length: 6 }, (_, i) => (
              <Varsel key={i} importance="warning" />
            ))}
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>
            Andre hendelser{' '}
            <Badge count={11} maxCount={9} data-color="info" {...args} />
          </Details.Summary>
          <Details.Content className="example-details-content">
            {Array.from({ length: 11 }, (_, i) => (
              <Varsel key={i} importance="info" />
            ))}
          </Details.Content>
        </Details>
      </div>
    </>
  ),
});

function Varsel({ importance }: { importance: 'danger' | 'warning' | 'info' }) {
  const tagText = importance === 'danger' ? 'Kritisk' : 'Advarsler';
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading level={3} data-size="xs">
          Varsel
        </Heading>
        {importance !== 'info' && (
          <Tag data-color={importance} data-size="sm">
            {tagText}
          </Tag>
        )}
      </div>
      <Paragraph>Dette er et varsel.</Paragraph>
    </Card>
  );
}
