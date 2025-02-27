import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent } from 'storybook/test';
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { Dropdown } from '../alpha';
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
          Dropdown
        </Dropdown.Trigger>
        <Dropdown {...args}>
          <Dropdown.Heading>First heading</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Button 1.1</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Button 1.2</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
          <Dropdown.Heading>Second heading</Dropdown.Heading>
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Button 2.1</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Button 2.2</Dropdown.Button>
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
        <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
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

export const Controlled: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger onClick={() => setOpen(!open)}>
          Dropdown
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
                Jeg lukker dropdownen
              </Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button onClick={() => setOpen(false)}>
                Jeg lukker også
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
        <Button popovertarget="dropdown">Dropdown</Button>
        <Dropdown id="dropdown">
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Item</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </>
    );
  },
};
