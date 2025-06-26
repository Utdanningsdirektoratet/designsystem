import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Badge, Dropdown, Link } from '@udir-design/react/alpha';
import { BriefcaseIcon, ChevronUpIcon } from '@navikt/aksel-icons';

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

const profileImage =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Preview: Story = {
  args: {
    'aria-label': 'Ola Nordmann',
    children: '',
  },
};

export const Content: Story = {
  args: { 'aria-label': 'Ola Nordmann' },
  render: (args) => (
    <>
      <Avatar {...args} />
      <Avatar {...args} initials="ON" />
      <Avatar {...args}>
        <BriefcaseIcon />
      </Avatar>
      <Avatar {...args}>
        <img src={profileImage} alt="" />
      </Avatar>
    </>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Avatar {...args} data-size="xs" aria-label="extra small" initials="xs" />
      <Avatar {...args} data-size="xs" aria-label="extra small" />
      <Avatar {...args} data-size="sm" aria-label="small" initials="sm" />
      <Avatar {...args} data-size="sm" aria-label="small" />
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
        <Avatar
          {...args}
          aria-label="Ola Nordmann"
          data-size="sm"
          initials="ON"
        />
        Ola Nordmann
        <ChevronUpIcon aria-hidden />
      </Dropdown.Trigger>
      <Dropdown placement="bottom-end" data-size="md" open>
        <Dropdown.Heading>Velg profil</Dropdown.Heading>
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>
              <Badge.Position overlap="circle">
                <Badge data-color="danger" data-size="sm" />
                <Avatar
                  {...args}
                  aria-label="Ola Nordmann"
                  data-size="xs"
                  initials="ON"
                />
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
                <BriefcaseIcon />
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
    <Link
      href="https://www.udir.no/"
      style={{ display: 'flex', gap: 'var(--ds-size-2)', alignItems: 'center' }}
    >
      <Avatar {...args} />
      Ola Nordmann
    </Link>
  ),
};
