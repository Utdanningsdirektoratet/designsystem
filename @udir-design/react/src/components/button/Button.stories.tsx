import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { Button } from './Button';
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ArrowUndoIcon,
  BellIcon,
  CogIcon,
  ExternalLinkIcon,
  PencilWritingIcon,
  PlusCircleIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Tooltip } from '../alpha';

export type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-4)',
    },
  },
  tags: ['alpha'],
};

export default meta;

export const _Button: Story = {
  args: {
    children: 'Action',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    expect(button).toBeTruthy();
    expect(canvas.getByText(args.children as string)).toBeTruthy();
  },
};

export const Preview: Story = {
  args: {
    disabled: false,
    variant: 'primary',
    icon: false,
    children: 'Knapp',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Lagre',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Avbryt',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: [<PencilWritingIcon aria-hidden />, 'Rediger'],
  },
};

export const Accent: Story = {
  args: {
    'data-color': 'accent',
  },

  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" {...args}>
          Gå videre
        </Button>
        <Button variant="secondary" {...args}>
          Fortsett senere
        </Button>
        <Button variant="tertiary" {...args}>
          Avbryt
        </Button>
      </>
    );
  },
};

export const AccentHover: Story = {
  ...Accent,
  parameters: {
    ...Accent.parameters,
    pseudo: { hover: true },
    chromatic: { modes: { mobile: { disable: true } } },
  },
};

export const AccentPressed: Story = {
  ...Accent,
  parameters: {
    ...Accent.parameters,
    pseudo: { active: true },
    chromatic: { modes: { mobile: { disable: true } } },
  },
};

export const Neutral: Story = {
  args: {
    'data-color': 'neutral',
  },
  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" {...args}>
          <PrinterSmallIcon aria-hidden />
          Skriv ut
        </Button>
        <Button variant="secondary" {...args}>
          <PencilWritingIcon aria-hidden />
          Rediger
        </Button>
        <Button variant="tertiary" {...args}>
          <ArrowForwardIcon aria-hidden />
          Videresend
        </Button>
      </>
    );
  },
};

export const NeutralHover: Story = {
  ...Neutral,
  parameters: {
    ...Neutral.parameters,
    pseudo: { hover: true },
    chromatic: { modes: { mobile: { disable: true } } },
  },
};

export const NeutralPressed: Story = {
  ...Neutral,
  parameters: {
    ...Neutral.parameters,
    pseudo: { active: true },
    chromatic: { modes: { mobile: { disable: true } } },
  },
};

export const Danger: Story = {
  args: {
    'data-color': 'danger',
  },
  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" {...args}>
          <TrashIcon aria-hidden />
          Slett
        </Button>
        <Button variant="secondary" {...args}>
          <TrashIcon aria-hidden />
          Slett
        </Button>
        <Button variant="tertiary" {...args}>
          <TrashIcon aria-hidden />
          Slett
        </Button>
      </>
    );
  },
};

export const DangerHover: Story = {
  ...Danger,
  parameters: {
    ...Danger.parameters,
    pseudo: { hover: true },
    chromatic: { modes: { mobile: { disable: true } } },
  },
};

export const DangerPressed: Story = {
  ...Danger,
  parameters: {
    ...Danger.parameters,
    pseudo: { active: true },
    chromatic: { modes: { mobile: { disable: true } } },
  },
};

export const CombinedColors: Story = {
  render: ({ ...args }) => (
    <>
      <Button variant="primary" data-color="neutral" {...args}>
        Publiser
      </Button>
      <Button variant="secondary" data-color="neutral" {...args}>
        Lagre kladd
      </Button>
      <Button variant="tertiary" data-color="danger" {...args}>
        Forkast
      </Button>
    </>
  ),
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <a target="_blank" rel="noreferrer" href="https://www.udir.no/">
        Gå til Udirs hjemmeside
        <ExternalLinkIcon title="Ekstern lenke" />
      </a>
    ),
  },
};

export const TextAndIcon: Story = {
  args: {
    'data-color': 'neutral',
  },
  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" {...args}>
          Start utfylling
          <ArrowRightIcon aria-hidden />
        </Button>
        <Button variant="secondary" {...args}>
          <ArrowUndoIcon aria-hidden />
          Angre
        </Button>
      </>
    );
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: ({ ...args }) => {
    return (
      <>
        <Button variant="primary" {...args}>
          Laster...
        </Button>
        <Button variant="secondary" {...args}>
          Laster...
        </Button>
        <Button variant="tertiary" {...args}>
          Laster...
        </Button>
      </>
    );
  },
};

export const Icons: Story = {
  args: {
    variant: 'primary',
  },
  render: ({ ...args }) => {
    return (
      <>
        <Button data-size="sm" icon {...args}>
          <CogIcon title="Innstillinger" />
        </Button>
        <Button data-size="sm" {...args}>
          <CogIcon aria-hidden />
          Small
        </Button>
        <Button data-size="md" icon {...args}>
          <CogIcon title="Innstillinger" />
        </Button>
        <Button data-size="md" {...args}>
          <CogIcon aria-hidden />
          Medium
        </Button>
        <Button data-size="lg" icon {...args}>
          <CogIcon title="Innstillinger" />
        </Button>
        <Button data-size="lg" {...args}>
          <CogIcon aria-hidden />
          Large
        </Button>
      </>
    );
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'tertiary',
    'data-color': 'neutral',
    icon: true,
  },
  render: ({ ...args }) => (
    <>
      <Tooltip content="Legg til ny">
        <Button aria-label="Legg til ny" {...args}>
          <PlusCircleIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Varslinger">
        <Button aria-label="Varslinger" {...args}>
          <BellIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Instillinger">
        <Button aria-label="Innstillinger" {...args}>
          <CogIcon aria-hidden />
        </Button>
      </Tooltip>
    </>
  ),
};
IconOnly.parameters = {
  customStyles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
  },
};

export const IconsOnlyPrimary: Story = {
  args: {
    variant: 'primary',
    icon: true,
  },
  render: ({ ...args }) => {
    return (
      <>
        <Button data-size="sm" {...args}>
          <CogIcon title="Innstillinger" />
        </Button>
        <Button data-size="md" {...args}>
          <CogIcon title="Innstillinger" />
        </Button>
        <Button data-size="lg" {...args}>
          <CogIcon title="Innstillinger" />
        </Button>
      </>
    );
  },
};
