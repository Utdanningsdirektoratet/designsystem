import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowRightIcon,
  CheckmarkCircleIcon,
  DocPencilIcon,
  ExclamationmarkTriangleIcon,
  NotePencilDashIcon,
  NotePencilIcon,
  TasklistIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons';
import { demoChromaticModes } from 'src/demo/demoParameters';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Table } from '../table';
import { Tooltip } from '../tooltip/Tooltip';
import { Heading } from '../typography/heading/Heading';
import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Preview: Story = {
  args: {
    defaultValue: 'innboks',
    onChange: fn(),
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const innboksButton = canvas.getByRole('radio', { name: /innboks/i });
    const utkastButton = canvas.getByRole('radio', { name: /utkast/i });
    const arkivButton = canvas.getByRole('radio', { name: /arkiv/i });

    await step('Default selection is "Innboks"', async () => {
      expect(innboksButton).toHaveAttribute('aria-checked', 'true');
    });

    await step('Only one ToggleGroup item is active initially', async () => {
      const buttons = canvas.getAllByRole('radio');
      const activeButtons = buttons.filter(
        (btn) => btn.getAttribute('aria-checked') === 'true',
      );
      expect(activeButtons).toHaveLength(1);
    });

    await step('User can navigate with arrow keys', async () => {
      await userEvent.tab();
      expect(innboksButton).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(utkastButton).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(arkivButton).toHaveFocus();

      await userEvent.keyboard('{arrowleft}');
      expect(utkastButton).toHaveFocus();
    });

    await step(
      'Clicking a different option updates the active state and calls onChange',
      async () => {
        expect(utkastButton).toHaveAttribute('aria-checked', 'false');
        await userEvent.click(utkastButton);
        expect(args.onChange).toHaveBeenCalledWith('utkast');
        expect(utkastButton).toHaveAttribute('aria-checked', 'true');
        expect(innboksButton).toHaveAttribute('aria-checked', 'false');
      },
    );

    await step(
      'Clicking an already active option keeps it active',
      async () => {
        expect(utkastButton).toHaveAttribute('aria-checked', 'true');
        await userEvent.click(utkastButton);
        expect(utkastButton).toHaveAttribute('aria-checked', 'true');
      },
    );
  },
};

export const Primary: Story = {
  args: { defaultValue: 'innboks', variant: 'primary' },
  render: Preview.render,
};

export const Secondary: Story = {
  args: { defaultValue: 'innboks', variant: 'secondary' },
  render: Preview.render,
};

export const OnlyText: Story = {
  args: {},
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: () => (
    <>
      <label>Filtrering av skjema</label>
      <ToggleGroup defaultValue="personlig">
        <ToggleGroup.Item value="personlig">Personlig</ToggleGroup.Item>
        <ToggleGroup.Item value="generelt">Generelt</ToggleGroup.Item>
        <ToggleGroup.Item value="tilleggsinformasjon">
          Tilleggsinformasjon
        </ToggleGroup.Item>
      </ToggleGroup>
    </>
  ),
};

export const TextAndIcons: Story = {
  args: {
    defaultValue: 'option-1',
  },
  render: () => (
    <ToggleGroup defaultValue="aktiv">
      <ToggleGroup.Item value="aktiv">
        <CheckmarkCircleIcon aria-hidden />
        Aktiv
      </ToggleGroup.Item>
      <ToggleGroup.Item value="advarsel">
        <ExclamationmarkTriangleIcon aria-hidden />
        Advarsel
      </ToggleGroup.Item>
      <ToggleGroup.Item value="kritisk">
        <XMarkOctagonIcon aria-hidden />
        Kritisk
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const OnlyIcons: Story = {
  args: {
    defaultValue: 'venstrestilt',
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <Tooltip content="Venstrestilt">
        <ToggleGroup.Item value="venstrestilt" icon aria-label="Venstrestilt">
          <AlignLeftIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Midtstilt">
        <ToggleGroup.Item value="midtstilt" icon aria-label="Midtstilt">
          <AlignCenterIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Høyrestilt">
        <ToggleGroup.Item value="høyrestilt" icon aria-label="Høyrestilt">
          <AlignRightIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup>
  ),
};

const testsData: Record<
  string,
  Array<{ name: string; subject: string; grade?: string; delivered?: Date }>
> = {
  answers: [
    {
      name: 'Ola Nordmann',
      subject: 'Matematikk',
      delivered: new Date('2023-10-01'),
    },
    {
      name: 'Kari Nordmann',
      subject: 'Engelsk',
      delivered: new Date('2023-10-02'),
    },
    {
      name: 'Per Hansen',
      subject: 'Naturfag',
      delivered: new Date('2023-10-03'),
    },
    {
      name: 'Stian Berg',
      subject: 'Norsk',
      delivered: new Date('2023-10-04'),
    },
  ],
  drafts: [
    {
      name: 'Stian Berg',
      subject: 'Matematikk',
      grade: '4',
    },
    {
      name: 'Kari Nordmann',
      subject: 'Norsk',
      grade: '5',
    },
    {
      name: 'Per Hansen',
      subject: 'Norsk',
      grade: '4',
    },
  ],
  correctedAnswers: [
    {
      name: 'Per Hansen',
      subject: 'Naturfag',
      grade: '6',
    },

    { name: 'Ola Nordmann', subject: 'Engelsk', grade: '4' },
    { name: 'Kari Nordmann', subject: 'Engelsk', grade: '5' },
  ],
};

export const Controlled: Story = {
  parameters: {
    chromatic: {
      modes: {
        minimum: demoChromaticModes.minimum,
        desktop: demoChromaticModes.desktop,
      },
    },
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '750px',
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('correctedAnswers');
    const isAnswers = value === 'answers';
    const actionData = {
      answers: { text: 'Start retting', icon: <NotePencilIcon aria-hidden /> },
      drafts: {
        text: 'Rediger utkast',
        icon: <NotePencilDashIcon aria-hidden />,
      },
      correctedAnswers: {
        text: 'Se retting',
        icon: <ArrowRightIcon aria-hidden />,
      },
    } as const;
    const actionText = (currentValue: string): string =>
      actionData[currentValue as keyof typeof actionData]?.text || '';
    const actionValue = (currentValue: string) =>
      actionData[currentValue as keyof typeof actionData]?.icon || null;
    return (
      <>
        <Heading level={1}>Retting av prøver</Heading>
        <ToggleGroup value={value} onChange={setValue} {...args}>
          <ToggleGroup.Item value="answers">
            <TasklistIcon aria-hidden />
            Ikke påbegynt
          </ToggleGroup.Item>
          <ToggleGroup.Item value="drafts">
            <DocPencilIcon aria-hidden />
            Under arbeid
          </ToggleGroup.Item>
          <ToggleGroup.Item value="correctedAnswers">
            <CheckmarkCircleIcon aria-hidden />
            Ferdig
          </ToggleGroup.Item>
        </ToggleGroup>

        <Table style={{ tableLayout: 'fixed' }}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Fag</Table.HeaderCell>
              <Table.HeaderCell>
                {isAnswers ? 'Innlevert' : 'Karakter'}
              </Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: 'right' }}>
                {actionText(value)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {testsData[value].map((item) => (
              <Table.Row key={item.name}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.subject}</Table.Cell>
                <Table.Cell>
                  {isAnswers
                    ? item.delivered?.toLocaleDateString()
                    : item.grade}
                </Table.Cell>
                <Table.Cell
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Tooltip content={actionText(value)}>
                    <Button
                      variant="tertiary"
                      icon
                      aria-label={actionText(value)}
                    >
                      {actionValue(value)}
                    </Button>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {!isAnswers && (
          <Button
            style={{ width: 'fit-content', marginTop: 'var(--ds-size-4)' }}
            variant="secondary"
            onClick={() => setValue('answers')}
          >
            Se ikke påbegynt
          </Button>
        )}
      </>
    );
  },
};

export const ToggleGroupInColorContext: Story = {
  args: Preview.args,
  render: (args, context) => (
    <Card data-color="accent" variant="tinted">
      {Preview.render?.(args, context)}
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const firstButton = within(canvasElement).getAllByRole('radio')[0];
        const expectedColor = getComputedStyle(firstButton).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        await expect(firstButton).toHaveStyle(
          `background-color: ${expectedColor}`,
        );
      },
    );
  },
};
