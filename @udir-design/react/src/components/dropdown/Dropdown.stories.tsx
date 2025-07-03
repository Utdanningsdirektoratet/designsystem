import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent } from 'storybook/test';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LeaveIcon,
  LinkIcon,
  MenuElipsisVerticalIcon,
  TrashFillIcon,
} from '@navikt/aksel-icons';
import { useState } from 'react';
import { Avatar, Divider, Dropdown } from '../alpha';
import { Button } from '../beta';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  tags: ['alpha'],
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      display: 'grid',
      alignItems: 'start',
      justifyItems: 'center',
      story: {
        boxSizing: 'border-box',
        width: '100cqw',
        height: '100cqh',
        maxWidth: '800px',
        maxHeight: '800px',
      },
    },
  },
  play: async (ctx) => {
    // When not in Docs mode, automatically open the dropdown
    const button = within(ctx.canvasElement).getByRole('button');
    await userEvent.click(button);
    const dropdown = ctx.canvasElement.querySelector('[popover]');
    await expect(dropdown).toBeVisible();
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Preview: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => {
    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger data-color={args['data-color']}>
          Utdanningsløp
        </Dropdown.Trigger>
        <Dropdown {...args}>
          <Dropdown.Heading>Grunnskolen</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Barneskolen</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Ungdomsskolen</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.Heading>Videregående opplæring</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Studieforberedende</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Yrkesfaglig</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
};

export const Icons: Story = {
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
};

export const Avatars: Story = {
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
                Sarpsborg kommune
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
};

export const Controlled: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger onClick={() => setOpen(!open)}>
          Velg læreplan
          {open ? (
            <ChevronUpIcon aria-hidden />
          ) : (
            <ChevronDownIcon aria-hidden />
          )}
        </Dropdown.Trigger>
        <Dropdown {...args} open={open} onClose={() => setOpen(false)}>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Engelsk (ENG01-05)
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Kroppsøving (KRO01-05)
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Kunst og håndverk (KVH01-02)
              </Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
};

export const WithoutTrigger: Story = {
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
};
