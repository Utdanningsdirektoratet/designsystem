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
import { Badge } from './Badge';

const meta = preview.meta({
  component: Badge,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details:
        'Vi har begrenset fargevalg til varselfarger og Udirs hovedfarger.',
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
    <div>
      <Badge.Position data-size="lg">
        <Badge {...args} />
        <FloppydiskFillIcon title="Lagre" />
      </Badge.Position>
    </div>
  ),
});

export const InTabs = meta.story({
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
});

export const SystemAlerts = meta.story({
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '30rem' }}>
      <Heading style={{ marginBlockEnd: 'var(--ds-size-4' }}>
        Systemvarsler
      </Heading>
      <Details>
        <Details.Summary>
          Kritisk <Badge count={2} maxCount={9} data-color="danger" />
        </Details.Summary>
        <Details.Content
          style={{
            gap: 'var(--ds-size-4)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {Array.from({ length: 2 }, (_) => (
            <Varsel importance="danger" />
          ))}
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>
          Advarsler <Badge count={6} maxCount={9} data-color="warning" />
        </Details.Summary>
        <Details.Content
          style={{
            gap: 'var(--ds-size-4)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {Array.from({ length: 6 }, (_) => (
            <Varsel importance="warning" />
          ))}
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>
          Andre hendelser <Badge count={11} maxCount={9} data-color="info" />
        </Details.Summary>
        <Details.Content>
          <Details.Content
            style={{
              gap: 'var(--ds-size-4)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {Array.from({ length: 11 }, (_) => (
              <Varsel importance="info" />
            ))}
          </Details.Content>
        </Details.Content>
      </Details>
    </div>
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
