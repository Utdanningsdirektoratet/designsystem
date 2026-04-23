import { useId, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DownloadIcon,
  LeaveIcon,
  LinkIcon,
  MenuElipsisVerticalIcon,
  TrashFillIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Divider } from '../divider/Divider';
import { Dropdown } from './Dropdown';

const meta = preview.meta({
  component: Dropdown,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'fullscreen',
    customStyles: {
      alignItems: 'start',
      justifyItems: 'center',
    },
  },
  play: async (ctx) => {
    // When not in Docs mode, automatically open the popover
    const canvas = within(ctx.canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    const popover = ctx.canvasElement.querySelector('[popover]');
    await waitFor(() => {
      expect(popover?.matches(':popover-open')).toBe(true);
    });
  },
});

export const Preview = meta.story({
  parameters: {
    customStyles: { story: { height: 260 } },
  },
  args: {
    placement: 'bottom-end',
  },
  render: (args) => {
    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger>
          Last ned
          <DownloadIcon aria-hidden />
        </Dropdown.Trigger>
        <Dropdown {...args}>
          <Dropdown.Heading>Velg format</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>.pdf</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>.docx</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
  play: async (ctx) => {
    const button = within(ctx.canvasElement).getByRole('button');

    // Check open, click link and close with trigger
    await userEvent.click(button);
    const dropdown = ctx.canvasElement.querySelector('[popover]');
    await waitFor(() => {
      expect(dropdown?.matches(':popover-open')).toBe(true);
    });
    const dropdownButton = within(ctx.canvasElement).getByText('.pdf');
    await userEvent.click(dropdownButton);
    await userEvent.click(button);
    await waitFor(() => {
      expect(dropdown?.matches(':popover-open')).toBe(false);
    });

    // Check close with click outside
    await userEvent.click(button);
    await waitFor(() => {
      expect(dropdown?.matches(':popover-open')).toBe(true);
    });
    await userEvent.click(ctx.canvasElement);
    await waitFor(() => {
      expect(dropdown?.matches(':popover-open')).toBe(false);
    });

    await userEvent.click(button);
  },
});

export const Icons = meta.story({
  parameters: {
    customStyles: { story: { height: 260 } },
  },
  render: (args) => {
    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger>Nyttige lenker</Dropdown.Trigger>
        <Dropdown {...args}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button asChild>
                <a
                  href="https://github.com/Utdanningsdirektoratet/designsystem"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon aria-hidden />
                  Github
                </a>
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button asChild>
                <a href="https://udir.no" target="_blank" rel="noreferrer">
                  <LinkIcon aria-hidden />
                  Udir.no
                </a>
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
});

export const Avatars = meta.story({
  parameters: {
    customStyles: { story: { height: 370 } },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext data-color="accent">
        <Dropdown.Trigger variant="tertiary" onClick={() => setOpen(!open)}>
          <Avatar aria-label="Kai Nordmann" /> Kai Nordmann{' '}
          {open ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown {...args} open={open} onClose={() => setOpen(false)}>
          <Dropdown.Heading>Velg profil</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                <Avatar aria-label="Kai Nordmann" />
                Kai Nordmann
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                <Avatar aria-label="Sarpsborg kommune" data-color="support1">
                  <BriefcaseIcon />
                </Avatar>
                Sarpsborg kommune <Badge count={10} maxCount={9} />
              </Dropdown.Button>
            </Dropdown.Item>
            <Divider />
            <Dropdown.Item>
              <Button variant="tertiary">
                <LeaveIcon aria-hidden />
                Logg ut
              </Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
});

export const Selected = meta.story({
  parameters: {
    customStyles: { story: { height: 260 } },
  },
  args: {
    placement: 'bottom-end',
  },
  render: (args) => {
    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger variant="secondary">
          Velg bakgrunnsfarge
        </Dropdown.Trigger>
        <Dropdown {...args}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Blå</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item aria-current="true">
              <Dropdown.Button>Grønn</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Svart</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
});

export const Controlled = meta.story({
  parameters: {
    customStyles: { story: { height: 402 } },
    docs: advancedCodeDocs,
  },
  render(args) {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger variant="secondary">
          Utdanningsløp
          {open ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown
          {...args}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Dropdown.Heading>Grunnskolen</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Barneskolen
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Ungdomsskolen
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.Heading>Videregående opplæring</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Studieforberedende
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Yrkesfaglig
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
});

export const ControlledWithoutContext = meta.story({
  parameters: {
    customStyles: { story: { height: 402 } },
    docs: advancedCodeDocs,
  },
  render(args) {
    const [open, setOpen] = useState(false);
    const popoverId = useId();

    return (
      <>
        <Button popoverTarget={popoverId} variant="secondary">
          Utdanningsløp
          {open ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Button>
        <Dropdown
          {...args}
          id={popoverId}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Dropdown.Heading>Grunnskolen</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Barneskolen
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Ungdomsskolen
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.Heading>Videregående opplæring</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Studieforberedende
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Yrkesfaglig
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
});

export const WithoutContext = meta.story({
  parameters: {
    customStyles: { story: { height: 260 } },
    docs: { source: { type: 'dynamic' } },
  },
  render: () => {
    return (
      <>
        <Button
          popoverTarget="dropdown"
          variant="tertiary"
          icon
          title="Flere valg"
        >
          <MenuElipsisVerticalIcon aria-hidden />
        </Button>
        <Dropdown id="dropdown">
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>
                <ArrowUpIcon aria-hidden /> Flytt spørsmål opp
              </Dropdown.Button>
              <Dropdown.Button>
                <ArrowDownIcon aria-hidden /> Flytt spørsmål ned
              </Dropdown.Button>
              <Dropdown.Button data-color="danger">
                <TrashFillIcon aria-hidden /> Slett spørsmål
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
  play: async (ctx) => {
    // Check open and close without trigger
    const button = within(ctx.canvasElement).getByRole('button');
    await userEvent.click(button);
    const dropdown = ctx.canvasElement.querySelector('[popover]');
    await waitFor(() => {
      expect(dropdown?.matches(':popover-open')).toBe(true);
    });
    await userEvent.click(button);
    await waitFor(() => {
      expect(dropdown?.matches(':popover-open')).toBe(false);
    });
    await userEvent.click(button);
  },
});
