import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
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
    await expect(popover).toBeVisible();
  },
});

export const Preview = meta.story({
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
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Heading>Velg format</Dropdown.Heading>
            </Dropdown.Item>
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
    await expect(dropdown).toBeVisible();
    const dropdownButton = within(ctx.canvasElement).getByText('.pdf');
    await userEvent.click(dropdownButton);
    await userEvent.click(button);
    await expect(dropdown).not.toBeVisible();

    // Check close with click outside
    await userEvent.click(button);
    await expect(dropdown).toBeVisible();
    await userEvent.click(ctx.canvasElement);
    await expect(dropdown).not.toBeVisible();

    await userEvent.click(button);
  },
});

export const Icons = meta.story({
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
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Heading>Velg profil</Dropdown.Heading>
            </Dropdown.Item>
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

export const Controlled = meta.story({
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger onClick={() => setOpen(!open)} variant="secondary">
          Utdanningsløp
          {open ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown {...args} open={open} onClose={() => setOpen(false)}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Heading>Grunnskolen</Dropdown.Heading>
            </Dropdown.Item>
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
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Heading>Videregående opplæring</Dropdown.Heading>
            </Dropdown.Item>
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

export const WithoutTrigger = meta.story({
  render: () => {
    return (
      <>
        <Button
          popovertarget="dropdown"
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
    await expect(dropdown).toBeVisible();
    await userEvent.click(button);
    await expect(dropdown).not.toBeVisible();
    await userEvent.click(button);
  },
});
