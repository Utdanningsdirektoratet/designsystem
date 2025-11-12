import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  BellIcon,
  CalculatorIcon,
  ChildEyesIcon,
  CogIcon,
  HatSchoolIcon,
  ImageIcon,
  PersonGroupIcon,
  PersonIcon,
} from '@udir-design/icons';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Link } from '../link/Link';
import { List } from '../list/List';
import { Tooltip } from '../tooltip/Tooltip';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import type { TabsProps } from './Tabs';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Preview: Story = {
  args: {
    defaultValue: 'value1',
    children: [
      <Tabs.List>
        <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
      </Tabs.List>,
      <Tabs.Panel value="value1">Innhold for Tab 1</Tabs.Panel>,
      <Tabs.Panel value="value2">Innhold for Tab 2</Tabs.Panel>,
      <Tabs.Panel value="value3">Innhold for Tab 3</Tabs.Panel>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tab1 = canvas.getByRole('tab', { name: /tab 1/i });
    const tab2 = canvas.getByRole('tab', { name: /tab 2/i });
    const tab3 = canvas.getByRole('tab', { name: /tab 3/i });

    await step(
      'Default tab "Tab 1" is active and shows "content 1"',
      async () => {
        expect(tab1).toHaveAttribute('aria-selected', 'true');
        const panel1 = canvas.getByText(/innhold for tab 1/i);
        expect(panel1).toBeVisible();
        const panel2 = canvas.queryByText(/innhold for tab 2/i);
        expect(panel2).not.toBeVisible();
        const panel3 = canvas.queryByText(/innhold for tab 3/i);
        expect(panel3).not.toBeVisible();
      },
    );

    await step(
      'Clicking tabs changes the active tab and displays the corresponding content',
      async () => {
        await userEvent.click(tab2);
        expect(tab2).toHaveAttribute('aria-selected', 'true');

        const panel2 = canvas.getByText(/innhold for tab 2/i);
        expect(panel2).toBeVisible();

        await userEvent.click(tab3);
        expect(tab3).toHaveAttribute('aria-selected', 'true');

        const panel3 = canvas.getByText(/innhold for tab 3/i);
        expect(panel3).toBeVisible();

        await userEvent.click(tab1);
        expect(tab1).toHaveAttribute('aria-selected', 'true');

        const panel1 = canvas.getByText(/innhold for tab 1/i);
        expect(panel1).toBeVisible();
      },
    );

    await step('Can navigate tabs with the keyboard', async () => {
      expect(tab1).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(tab2).toHaveFocus();
      await userEvent.keyboard('{enter}');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      const panel2 = canvas.getByText(/innhold for tab 2/i);
      expect(panel2).toBeVisible();

      await userEvent.keyboard('{arrowleft}');
      expect(tab1).toHaveFocus();
      await userEvent.keyboard(' ');
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      const panel1 = canvas.getByText(/innhold for tab 1/i);
      expect(panel1).toBeVisible();
    });
  },
};

export const OnlyText: Story = {
  args: {
    defaultValue: 'oversikt',
  },
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Tab value="oversikt">Oversikt</Tabs.Tab>
          <Tabs.Tab value="prøver">Prøver</Tabs.Tab>
          <Tabs.Tab value="prøvesvar">Prøvesvar</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
  },
};

export const IconsWithText: Story = {
  args: {
    defaultValue: 'barnehage',
  },
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Tab value="barnehage">
            <ChildEyesIcon aria-hidden="true" />
            Barnehage
          </Tabs.Tab>
          <Tabs.Tab value="grunnskole">
            <CalculatorIcon aria-hidden="true" />
            Grunnskole
          </Tabs.Tab>
          <Tabs.Tab value="videregående">
            <HatSchoolIcon aria-hidden="true" />
            Videregående
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
  },
};

export const OnlyIcons: Story = {
  args: {
    defaultValue: 'profile',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tooltip content="Galleri">
          <Tabs.Tab value="gallery">
            <ImageIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content="Profilen din">
          <Tabs.Tab value="profile">
            <PersonIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content="Varsler">
          <Tabs.Tab value="notifications">
            <BellIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
        <Tooltip content="Innstillinger">
          <Tabs.Tab value="settings">
            <CogIcon aria-hidden />
          </Tabs.Tab>
        </Tooltip>
      </Tabs.List>
    </Tabs>
  ),
};

export const Controlled: StoryFn<TabsProps> = (args) => {
  const [tab, setTab] = useState('users');
  return (
    <Tabs {...args} value={tab} onChange={setTab}>
      <Tabs.List>
        <Tabs.Tab value="users">
          <PersonGroupIcon aria-hidden />
          Brukere
        </Tabs.Tab>
        <Tabs.Tab value="profile">
          <PersonIcon aria-hidden />
          Din profil
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="users">
        <List.Unordered
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          <List.Item
            style={{
              display: 'flex',
            }}
          >
            <Button variant="secondary" onClick={() => setTab('profile')}>
              <Avatar aria-label="Bruker 1" data-color="accent" /> Hilde Hansen
              (deg)
            </Button>
          </List.Item>
          <List.Item
            style={{
              display: 'flex',
            }}
          >
            <Link
              href="#"
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 'var(--ds-size-2)',
              }}
            >
              <Avatar aria-label="Bruker 2" data-color="support1" />
              Stian Stølan
            </Link>
          </List.Item>
          <List.Item
            style={{
              display: 'flex',
            }}
          >
            <Link
              href="#"
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 'var(--ds-size-2)',
              }}
            >
              <Avatar aria-label="Bruker 3" data-color="support2" />
              Lina Larsen
            </Link>
          </List.Item>
        </List.Unordered>
      </Tabs.Panel>
      <Tabs.Panel value="profile">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-size-2)',
          }}
        >
          <Avatar aria-label="Bruker 1" data-color="accent" /> Hilde Hansen
        </div>

        <Heading
          level={3}
          style={{
            marginBottom: 'var(--ds-size-2)',
            marginTop: 'var(--ds-size-4)',
          }}
        >
          Detaljer
        </Heading>
        <Paragraph>34 år</Paragraph>
        <Paragraph>Mysen, Norge</Paragraph>
        <Paragraph>Lærer</Paragraph>
        <Paragraph>Mysen Videregående skole</Paragraph>
      </Tabs.Panel>
    </Tabs>
  );
};

Controlled.parameters = {
  customStyles: {
    width: '500px',
  },
  docs: { source: { type: 'code', transform: formatReactSource } },
};
