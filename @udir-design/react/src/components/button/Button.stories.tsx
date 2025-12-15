import { expect, fn, userEvent, within } from 'storybook/test';
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ArrowUndoIcon,
  BellIcon,
  CogIcon,
  NotePencilIcon,
  PlusCircleIcon,
  PrinterSmallIcon,
  TrashIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { Card } from '../card/Card';
import { Tooltip } from '../tooltip/Tooltip';
import { Label } from '../typography/label/Label';
import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har begrenset fargevalg til neutral og danger.',
    },
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--ds-size-4)',
    },
  },
});

export const Preview = meta.story({
  args: {
    disabled: false,
    variant: 'primary',
    icon: false,
    onClick: fn(),
    children: 'Knapp',
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await step('Element with button role should exist', async () => {
      expect(button).toBeTruthy();
    });
    await step('Button should have expected text', async () => {
      expect(canvas.getByText(args.children as string)).toBeTruthy();
    });
    await step('Onclick should be called when button is clicked', async () => {
      await userEvent.click(button);
      expect(args.onClick).toHaveBeenCalled();
    });
    await userEvent.tab();
  },
});

export const Primary = meta.story({
  args: {
    variant: 'primary',
    children: 'Lagre',
  },
});

export const Secondary = meta.story({
  args: {
    variant: 'secondary',
    children: 'Avbryt',
  },
});

export const Tertiary = meta.story({
  args: {
    variant: 'tertiary',
    children: [<NotePencilIcon aria-hidden />, 'Rediger'],
  },
});

export const Neutral = meta.story({
  args: {
    'data-color': 'neutral',
  },
  render: (args) => {
    return (
      <>
        <Button variant="primary" {...args}>
          <PrinterSmallIcon aria-hidden />
          Skriv ut
        </Button>
        <Button variant="secondary" {...args}>
          <NotePencilIcon aria-hidden />
          Rediger
        </Button>
        <Button variant="tertiary" {...args}>
          <ArrowForwardIcon aria-hidden />
          Videresend
        </Button>
      </>
    );
  },
});

export const Danger = meta.story({
  args: {
    'data-color': 'danger',
  },
  render: (args) => {
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
});

export const CombinedColors = meta.story({
  render: (args) => (
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
});

export const AsLink = meta.story({
  args: {
    asChild: true,
    children: (
      <a target="_blank" rel="noreferrer" href="https://www.udir.no/">
        Gå til udir.no
      </a>
    ),
  },
});

export const TextAndIcon = meta.story({
  args: {
    'data-color': 'neutral',
  },
  render: (args) => {
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
});

export const Loading = meta.story({
  args: {
    loading: true,
    onClick: fn(),
  },
  render: (args) => {
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole('button')[0];
    await step(
      'Button should have aria-busy and aria-disabled attributes',
      async () => {
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      },
    );
    await step('Button should be focusable', async () => {
      await userEvent.tab();
      expect(button).toHaveFocus();
      await userEvent.tab({ shift: true });
    });
  },
});

export const Disabled = meta.story({
  args: {
    disabled: true,
    onClick: fn(),
  },
  render: (args) => {
    return (
      <>
        <Button variant="primary" {...args}>
          Disabled
        </Button>
        <Button variant="secondary" {...args}>
          Disabled
        </Button>
        <Button variant="tertiary" {...args}>
          Disabled
        </Button>
      </>
    );
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole('button')[0];
    await step('Button should be disabled', async () => {
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(args.onClick).not.toHaveBeenCalled();
    });
    await step('Button should not be focusable', async () => {
      await userEvent.tab();
      expect(button).not.toHaveFocus();
    });
  },
});

export const Icons = meta.story({
  args: {
    variant: 'primary',
  },
  render: (args) => {
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
});

export const IconOnly = meta.story({
  args: {
    variant: 'tertiary',
    'data-color': 'neutral',
    icon: true,
  },
  render: (args) => (
    <>
      <Tooltip content="Legg til ny">
        <Button {...args}>
          <PlusCircleIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Varslinger">
        <Button {...args}>
          <BellIcon aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Instillinger">
        <Button {...args}>
          <CogIcon aria-hidden />
        </Button>
      </Tooltip>
    </>
  ),
  parameters: {
    customStyles: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, auto)',
    },
  },
});

export const IconsOnlyPrimary = meta.story({
  args: {
    variant: 'primary',
    icon: true,
  },
  render: (args) => {
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
});

export const ButtonInColorContext = meta.story({
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Button {...args}>Knapp</Button>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const button = within(canvasElement).getByRole('button');
        const expectedColor = getComputedStyle(button).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        expect(button).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
});

type Story = ReturnType<typeof meta.story>;

function makePseudoStatesStory(originalStory: Story): Story['input'] {
  return {
    render: (args, ctx) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gap: 'inherit',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        <Label data-size="sm">Default</Label>
        {originalStory.input.render?.(args, ctx)}
        <Label data-size="sm">Hover</Label>
        {originalStory.input.render?.({ ...args, className: 'hover' }, ctx)}
        <Label data-size="sm">Pressed</Label>
        {originalStory.input.render?.(
          { ...args, className: 'hover active' },
          ctx,
        )}
        <Label data-size="sm">Focused</Label>
        {originalStory.input.render?.(
          { ...args, className: 'focusVisible' },
          ctx,
        )}
      </div>
    ),
    args: originalStory.composed.args,
    parameters: {
      ...originalStory.composed.parameters,
      pseudo: {
        hover: ['.hover'],
        active: ['.active'],
        focusVisible: ['.focusVisible'],
      },
    },
  };
}

export const DangerPseudoStates = meta.story(makePseudoStatesStory(Danger));

export const NeutralPseudoStates = meta.story(makePseudoStatesStory(Neutral));
