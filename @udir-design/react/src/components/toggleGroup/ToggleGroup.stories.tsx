import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowRightIcon,
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  NotePencilIcon,
  TasklistIcon,
  XMarkOctagonIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { demoChromaticModes } from 'src/demo/demoParameters';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Fieldset } from '../fieldset/Fieldset';
import { Table } from '../table';
import { Tooltip } from '../tooltip/Tooltip';
import { Heading } from '../typography/heading/Heading';
import { ToggleGroup } from './';

const meta = preview.meta({
  component: ToggleGroup,
  subcomponents: {
    'ToggleGroup.Item': ToggleGroup.Item,
  },
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
});

export const Preview = meta.story({
  args: {
    defaultValue: 'innboks',
    onChange: fn(),
  },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Velg epostboks">
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const innboksInput = canvas.getByRole('radio', { name: /innboks/i });
    const utkastInput = canvas.getByRole('radio', { name: /utkast/i });
    const arkivInput = canvas.getByRole('radio', { name: /arkiv/i });

    await step('Default selection is "Innboks"', async () => {
      expect(innboksInput).toBeChecked();
    });

    await step('Only one ToggleGroup item is active initially', async () => {
      const inputs = canvas.getAllByRole('radio');
      const activeButtons = inputs.filter(
        (input) => (input as HTMLInputElement).checked,
      );
      expect(activeButtons).toHaveLength(1);
    });

    await step('User can navigate with arrow keys', async () => {
      await userEvent.tab();
      expect(innboksInput).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(utkastInput).toHaveFocus();

      await userEvent.keyboard('{arrowright}');
      expect(arkivInput).toHaveFocus();

      await userEvent.keyboard('{arrowleft}');
      expect(utkastInput).toHaveFocus();
    });

    await step(
      'Selecting a different option updates the active state and calls onChange',
      async () => {
        expect(utkastInput).not.toBeChecked();
        await userEvent.keyboard('{Enter}');
        expect(utkastInput).toBeChecked();
        expect(innboksInput).not.toBeChecked();
      },
    );

    await step(
      'Selecting an already active option keeps it active',
      async () => {
        expect(utkastInput).toBeChecked();
        await userEvent.keyboard('{Enter}');
        expect(utkastInput).toBeChecked();
      },
    );
  },
});

export const Primary = meta.story({
  args: { defaultValue: 'innboks', variant: 'primary' },
  render: Preview.input.render,
});

export const Secondary = meta.story({
  args: { defaultValue: 'innboks', variant: 'secondary' },
  render: Preview.input.render,
});

// TODO: this example should use `aria-labelledby` when supported by Digdir
export const OnlyText = meta.story({
  args: {},
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Filtrering av skjema</Fieldset.Legend>
      <ToggleGroup defaultValue="personlig" aria-label="Filtrering av skjema">
        <ToggleGroup.Item value="personlig">Personlig</ToggleGroup.Item>
        <ToggleGroup.Item value="generelt">Generelt</ToggleGroup.Item>
        <ToggleGroup.Item value="tilleggsinformasjon">
          Tilleggsinformasjon
        </ToggleGroup.Item>
      </ToggleGroup>
    </Fieldset>
  ),
});

export const TextAndIcons = meta.story({
  args: {
    defaultValue: 'option-1',
  },
  render: () => (
    <ToggleGroup aria-label="Filtrer på status" defaultValue="aktiv">
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
});

export const OnlyIcons = meta.story({
  args: {
    defaultValue: 'venstrestilt',
  },
  render: (args) => (
    <ToggleGroup {...args} aria-label="Tekstjustering">
      <Tooltip content="Venstrestilt">
        <ToggleGroup.Item value="venstrestilt">
          <AlignLeftIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Midtstilt">
        <ToggleGroup.Item value="midtstilt">
          <AlignCenterIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content="Høyrestilt">
        <ToggleGroup.Item value="høyrestilt" icon>
          <AlignRightIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup>
  ),
});

export const SecondaryOnlyIcons = meta.story({
  args: { ...OnlyIcons.input.args, variant: 'secondary' },
  render: OnlyIcons.input.render,
});

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

export const Controlled = meta.story({
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
        icon: <NotePencilIcon aria-hidden />,
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
        <ToggleGroup
          aria-label="Filtrer på status"
          value={value}
          onChange={setValue}
          {...args}
        >
          <ToggleGroup.Item value="answers">
            <TasklistIcon aria-hidden />
            Ikke påbegynt
          </ToggleGroup.Item>
          <ToggleGroup.Item value="drafts">
            <NotePencilIcon aria-hidden />
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
                    <Button variant="tertiary" icon>
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
});

export const ToggleGroupInColorContext = meta.story({
  args: Preview.input.args,
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      {Preview.input.render(args)}
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const firstInput = within(canvasElement).getAllByRole('radio')[0];
        const firstButton =
          firstInput.closest('label') ?? firstInput.parentElement;

        const expectedColor = getComputedStyle(
          firstButton as Element,
        ).getPropertyValue('--ds-color-neutral-base-default');
        await expect(firstButton).toHaveStyle(
          `background-color: ${expectedColor}`,
        );
      },
    );
  },
});
