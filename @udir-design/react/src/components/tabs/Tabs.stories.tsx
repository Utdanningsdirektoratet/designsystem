import { useState } from 'react';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
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
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Avatar } from 'src/components/avatar';
import { Button } from 'src/components/button';
import { Link } from 'src/components/link';
import { List } from 'src/components/list';
import { Tooltip } from 'src/components/tooltip';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import { Prose } from '../typography/prose';
import { Tabs } from './Tabs';
import { Tabs as FakeTabs } from './docs/FakeTabs';
import { TabsList } from './docs/FakeTabsList';
import { TabsPanel } from './docs/FakeTabsPanel';
import { TabsTab } from './docs/FakeTabsTab';

const meta = preview.meta({
  component: FakeTabs,
  subcomponents: {
    'Tabs.List': TabsList,
    'Tabs.Tab': TabsTab,
    'Tabs.Panel': TabsPanel,
  },
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
    /* a11y complains about aria-controls on tabs when there is no tab panel, which is the case in several examples */
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-valid-attr-value',
            enabled: false,
          },
        ],
      },
    },
  },
});

export const Preview = meta.story({
  args: {
    defaultValue: 'value1',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="value1">Innhold for Tab 1</Tabs.Panel>
      <Tabs.Panel value="value2">Innhold for Tab 2</Tabs.Panel>
      <Tabs.Panel value="value3">Innhold for Tab 3</Tabs.Panel>
    </Tabs>
  ),
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
      tab1.focus();
      await waitFor(() => {
        expect(tab1).toHaveFocus();
      });
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });
      await waitFor(() => {
        expect(tab2).toHaveFocus();
      });
      fireEvent.keyDown(tab2, { key: 'Enter' });
      await waitFor(() => {
        expect(tab2).toHaveAttribute('aria-selected', 'true');
      });
      await waitFor(() => {
        expect(canvas.getByText(/innhold for tab 2/i)).toBeVisible();
      });
      fireEvent.keyDown(tab2, { key: 'ArrowLeft' });
      await waitFor(() => {
        expect(tab1).toHaveFocus();
      });
      fireEvent.keyDown(tab1, { key: ' ' });
      await waitFor(() => {
        expect(tab1).toHaveAttribute('aria-selected', 'true');
      });
      await waitFor(() => {
        expect(canvas.getByText(/innhold for tab 1/i)).toBeVisible();
      });
    });
  },
});

export const OnlyText = meta.story({
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
        <Tabs.Panel value="oversikt">Innhold for oversikt</Tabs.Panel>
        <Tabs.Panel value="prøver">Innhold for prøver</Tabs.Panel>
        <Tabs.Panel value="prøvesvar">Innhold for prøvesvar</Tabs.Panel>
      </Tabs>
    );
  },
});

export const IconsWithText = meta.story({
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
        <Tabs.Panel value="barnehage">Innhold for barnehage</Tabs.Panel>
        <Tabs.Panel value="grunnskole">Innhold for grunnskole</Tabs.Panel>
        <Tabs.Panel value="videregående">Innhold for videregående</Tabs.Panel>
      </Tabs>
    );
  },
});

export const OnlyIcons = meta.story({
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
      <Tabs.Panel value="gallery">Innhold for galleri</Tabs.Panel>
      <Tabs.Panel value="profile">Innhold for profilen din</Tabs.Panel>
      <Tabs.Panel value="notifications">Innhold for varsler</Tabs.Panel>
      <Tabs.Panel value="settings">Innhold for innstillinger</Tabs.Panel>
    </Tabs>
  ),
});

export const Controlled = meta.story({
  parameters: {
    customStyles: {
      width: '500px',
    },
    docs: advancedCodeDocs,
  },
  render: (args) => {
    const [tab, setTab] = useState('users');
    return (
      <>
        <style>
          {`
          .example-list-unordered {
            list-style: none;
            padding: 0;
          }
          .example-list-item {
            display: flex;
           }
          .example-list-content {
            align-items: center;
            display: flex;
            gap: var(--ds-size-2);
          }
          .example-list-header {
            margin-bottom: var(--ds-size-2);
            margin-top: var(--ds-size-4);
          }`}
        </style>
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
            <List.Unordered className="example-list-unordered">
              <List.Item className="example-list-item">
                <Button variant="secondary" onClick={() => setTab('profile')}>
                  <Avatar aria-label="Bruker 1" data-color="accent" /> Hilde
                  Hansen (deg)
                </Button>
              </List.Item>
              <List.Item className="example-list-item">
                <Link href="#" className="example-list-content">
                  <Avatar aria-label="Bruker 2" data-color="support1" />
                  Stian Stølan
                </Link>
              </List.Item>
              <List.Item className="example-list-item">
                <Link href="#" className="example-list-content">
                  <Avatar aria-label="Bruker 3" data-color="support2" />
                  Lina Larsen
                </Link>
              </List.Item>
            </List.Unordered>
          </Tabs.Panel>
          <Tabs.Panel value="profile">
            <div className="example-list-content">
              <Avatar aria-label="Bruker 1" data-color="accent" /> Hilde Hansen
            </div>

            <Heading level={3} className="example-list-header">
              Detaljer
            </Heading>
            <Paragraph>34 år</Paragraph>
            <Paragraph>Mysen, Norge</Paragraph>
            <Paragraph>Lærer</Paragraph>
            <Paragraph>Mysen Videregående skole</Paragraph>
          </Tabs.Panel>
        </Tabs>
      </>
    );
  },
});

export const CardVariant = meta.story({
  args: {
    defaultValue: 'value1',
    variant: 'card',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="value1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="value2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="value3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="value1">Innhold for tab 1</Tabs.Panel>
      <Tabs.Panel value="value2">Innhold for tab 2</Tabs.Panel>
      <Tabs.Panel value="value3">Innhold for tab 3</Tabs.Panel>
    </Tabs>
  ),
});

export const CardPanel = meta.story({
  args: {
    defaultValue: 'value1',
    variant: 'card',
  },
  render: (args) => (
    <>
      <style>
        {`
        .tabs {
          max-width: 40rem;
          margin-top: var(--ds-size-4);
        }
      `}
      </style>
      <Heading level={2}>Designtokens</Heading>
      <Tabs {...args} className="tabs">
        <Tabs.List>
          <Tabs.Tab value="value1">Farger</Tabs.Tab>
          <Tabs.Tab value="value2">Størrelser</Tabs.Tab>
          <Tabs.Tab value="value3">Responsivitet</Tabs.Tab>
          <Tabs.Tab value="value4">Spacing</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel variant="card" value="value1">
          <Prose>
            <Paragraph>
              Fargene for brukergrensesnitt er delt opp i underkategorier for
              identitetsfarger og varselfarger. Disse fargene er testet for
              kontrast og tilgjengelighet, og de gir forutsigbarhet og
              konsistens på tvers av komponenter og plattformer. Når du bruker
              fargene skal du alltid referere til design tokens, ikke hardkodede
              verdier.
            </Paragraph>
            <Paragraph>
              Farger i denne gruppen brukes for eksempel på komponenter som
              knapper, bakgrunner, lenker, ikoner og lignende.
            </Paragraph>
          </Prose>
        </Tabs.Panel>
        <Tabs.Panel variant="card" value="value2">
          <Prose>
            <Paragraph>
              Vi bruker størrelsesvariabler (design tokens) for å definere
              spacing (mellomrom), sizing (bredder og høyder) og fontstørrelser
              på en konsistent måte. Verdien til størrelsesvariabler avhenger av
              hvilken størrelsesmodus som er aktiv. Du kan endre størrelsesmodus
              ved å sette data-size-attributtet i kode eller size mode i Figma.
            </Paragraph>
          </Prose>
        </Tabs.Panel>
        <Tabs.Panel variant="card" value="value3">
          <Prose>
            <Paragraph>
              For å styre størrelsesmodus i kode kan man sette{' '}
              <code>{`data-size='sm'`}</code>, <code>{`data-size='md'`}</code>{' '}
              eller <code>{`data-size='lg'`}</code>, typisk på et rot-element,
              men det er ofte lurt å sette størrelsesmodus basert på brukerens
              skjermstørrelse.
            </Paragraph>
          </Prose>
        </Tabs.Panel>
        <Tabs.Panel variant="card" value="value4">
          <Prose>
            <Paragraph>
              Størrelsesvariablene kan brukes til avstander slik som for
              eksempel marger og avstand mellom avsnitt i tekst. De kan også
              brukes til å sette bredder og høyder på elementer, for eksempel
              knapper og input-felt. Det er viktig å bruke størrelsesvariablene
              riktig for å sikre konsistens i designet ditt.
            </Paragraph>
          </Prose>
        </Tabs.Panel>
      </Tabs>
    </>
  ),
});
