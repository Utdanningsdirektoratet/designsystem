import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Badge, Dropdown } from '../alpha';
import { BriefcaseIcon } from '@navikt/aksel-icons';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['alpha'],
  parameters: {
    layout: 'padded',
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Preview: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
    variant: 'circle',
    children: '',
  },
};

export const NoName: Story = {
  args: { 'aria-label': 'Ola' },
  render: (args) => <Avatar {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Avatar {...args} data-size="xs" aria-label="extra small" initials="xs" />
      <Avatar {...args} data-size="xs" aria-label="extra small" />
      <Avatar {...args} data-size="sm" aria-label="small" initials="sm" />
      <Avatar {...args} data-size="sm" aria-label="small" />
      <Avatar {...args} aria-label="default" initials="md" />
      <Avatar {...args} data-size="md" aria-label="medium" initials="md" />
      <Avatar {...args} data-size="md" aria-label="medium" />
      <Avatar {...args} data-size="lg" aria-label="large" initials="lg" />
      <Avatar {...args} data-size="lg" aria-label="large" />
    </>
  ),
};

export const ColorVariants: Story = {
  render: (args) => (
    <>
      <Avatar {...args} data-color="neutral" aria-label="color neutral" />
      <Avatar {...args} data-color="accent" aria-label="color accent" />
      <Avatar {...args} data-color="support1" aria-label="color support1" />
      <Avatar {...args} data-color="support2" aria-label="color support2" />
    </>
  ),
};

export const ShapeVariants: Story = {
  render: (args) => (
    <>
      <Avatar {...args} variant="circle" aria-label="variant circle" />
      <Avatar {...args} variant="square" aria-label="variant square" />
      <Avatar {...args} variant="circle" aria-label="Ola Nordman">
        ON
      </Avatar>
      <Avatar {...args} variant="square" aria-label="Ola Nordman">
        ON
      </Avatar>
    </>
  ),
};

export const WithImage: Story = {
  args: {
    'aria-label': 'Ola Nordman',
  },
  render: (args) => (
    <Avatar {...args}>
      <img
        src={
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        alt=""
      />
    </Avatar>
  ),
};

export const InDropdown: Story = {
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      height: '320px',
    },
  },
  render: (args) => (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger variant="tertiary">
        <Avatar {...args} aria-label="Ola Nordmann" data-size="sm">
          ON
        </Avatar>
        Velg Profil
      </Dropdown.Trigger>
      <Dropdown placement="bottom-end" data-size="md" open>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>
              <Badge.Position overlap="circle">
                <Badge data-color="danger" data-size="sm" />
                <Avatar {...args} aria-label="Ola Nordmann" data-size="xs">
                  ON
                </Avatar>
              </Badge.Position>
              Ola Nordmann
            </Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>
              <Avatar
                data-size="xs"
                data-color="support1"
                aria-label="Sogndal Kommune"
              >
                <BriefcaseIcon aria-hidden />
              </Avatar>
              Sogndal kommune
            </Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  ),
};

export const AsLink: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
  },
  render: (args) => (
    <a href="https://www.udir.no/">
      <Avatar {...args} />
    </a>
  ),
};
