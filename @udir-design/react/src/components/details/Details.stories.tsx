import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { createElement, useState } from 'react';
import {
  Button,
  Card,
  CardProps,
  Details,
  Fieldset,
  List,
  ToggleGroup,
} from '@udir-design/react/alpha';
import { expect, userEvent, within } from '@storybook/test';
import { Stack } from '.storybook/docs-components';

export default {
  component: Details,
  tags: ['alpha'],
} as Meta<typeof Details>;

type Story = StoryObj<typeof Details>;

const previewSummary = 'Kva er nasjonale prøver?';
const previewContent =
  'Føremålet med nasjonale prøver er å gi skolane kunnskap om elevane sine grunnleggjande ferdigheiter i lesing, rekning og engelsk. Informasjonen frå prøvene skal danne grunnlag for undervegsvurdering og kvalitetsutvikling på alle nivå i skolesystemet.';

export const Preview: Story = {
  args: {
    children: [
      <Details.Summary>{previewSummary}</Details.Summary>,
      <Details.Content data-testid="details-content">
        {previewContent}
      </Details.Content>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const details = canvasElement.querySelector('u-details');
    const summary = canvas.getByRole('button');
    const content = canvas.getByTestId('details-content');

    await step('Check that details are rendered', async () => {
      expect(details).toBeTruthy();
    });

    await step('Summary text is correct', async () => {
      expect(summary).toHaveTextContent(previewSummary);
    });

    await step('Content text is correct', async () => {
      expect(content).toHaveTextContent(previewContent);
    });

    await step('Initial state: details is closed', async () => {
      expect(details).not.toHaveAttribute('open');
    });

    await step('Click summary to open details', async () => {
      await userEvent.click(summary);
      expect(details).toHaveAttribute('open');
    });

    await step('Click summary to close details', async () => {
      await userEvent.click(summary);
      expect(details).not.toHaveAttribute('open');
    });

    await step('Keyboard interaction toggles details', async () => {
      summary.focus();
      await userEvent.keyboard('{Enter}');
      expect(details).toHaveAttribute('open');

      await userEvent.keyboard('{Enter}');
      expect(details).not.toHaveAttribute('open');
    });
    await userEvent.keyboard('{Tab}');
  },
};

export const InCard: Story = {
  render: (args) => {
    return (
      <Card data-color="neutral">
        <Details {...args}>
          <Details.Summary>Vedlegg</Details.Summary>
          <Details.Content>Vedlegg 1, vedlegg 2, vedlegg 3</Details.Content>
        </Details>
      </Card>
    );
  },
};

const detailsColorDecorator: Decorator = (Story) => {
  const [card, setCard] = useState<Required<CardProps>['variant'] | 'none'>(
    'tinted',
  );
  const cardChoices: Record<typeof card, string> = {
    tinted: 'Tinted Card',
    default: 'Card',
    none: 'Ingen',
  };

  const [color, setColor] =
    useState<Required<CardProps>['data-color']>('accent');
  const colorChoices: Record<typeof color, string> = {
    accent: 'Accent',
    support1: 'Support 1',
    support2: 'Support 2',
    neutral: 'Neutral',
  };

  return (
    <div>
      <Stack
        direction="row"
        data-size="xs"
        style={{ marginBottom: 'var(--ds-size-5)' }}
      >
        <Fieldset>
          <Fieldset.Legend>Farge</Fieldset.Legend>
          <ToggleGroup
            value={color}
            onChange={(val) => setColor(val as typeof color)}
          >
            {Object.entries(colorChoices).map(([value, label]) => (
              <ToggleGroup.Item key={value} value={value}>
                {label}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup>
        </Fieldset>
        <Fieldset>
          <Fieldset.Legend>Foreldreelement</Fieldset.Legend>
          <ToggleGroup
            value={card}
            onChange={(val) => setCard(val as typeof card)}
          >
            {Object.entries(cardChoices).map(([value, label]) => (
              <ToggleGroup.Item key={value} value={value}>
                {label}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup>
        </Fieldset>
      </Stack>
      <div data-storybook-decorator>
        {createElement(card === 'none' ? 'div' : Card, {
          variant: card !== 'none' ? card : undefined,
          'data-color': color,
          children: <Story />,
        })}
      </div>
    </div>
  );
};

export const InCardWithColor: Story = {
  decorators: [detailsColorDecorator],
  render: (args) => {
    return (
      <>
        <Details {...args}>
          <Details.Summary>{previewSummary}</Details.Summary>
          <Details.Content>{previewContent}</Details.Content>
        </Details>
        <Details>
          <Details.Summary>
            Korleis skal nasjonale prøver brukast?
          </Details.Summary>
          <Details.Content>
            <List.Unordered>
              <List.Item>
                Lærarane skal bruke resultata for å følgje opp elevane sine og i
                arbeidet med undervegsvurdering og tilpassa opplæring.
              </List.Item>
              <List.Item>
                Kommunar og skolar skal bruke resultata som grunnlag for
                kvalitetsutvikling i opplæringa.
              </List.Item>
              <List.Item>
                Forskarar kan søkje om å få utlevert resultat frå nasjonale
                prøver til bruk i forsking.
              </List.Item>
            </List.Unordered>
          </Details.Content>
        </Details>
      </>
    );
  },
};

export const Controlled: Story = {
  render() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const toggleOpen = () => {
      const isOpen = [open1, open2, open3].every(Boolean);
      setOpen1(!isOpen);
      setOpen2(!isOpen);
      setOpen3(!isOpen);
    };
    return (
      <>
        <Button onClick={toggleOpen}>Toggle Details</Button>
        <br />
        <Details open={open1} onToggle={() => setOpen1(!open1)}>
          <Details.Summary>Feide</Details.Summary>
          <Details.Content>
            Feide er en nasjonal fellesløsning for sikker identifisering i
            utdanningssektoren.
          </Details.Content>
        </Details>
        <Details open={open2} onToggle={() => setOpen2(!open2)}>
          <Details.Summary>UIDP</Details.Summary>
          <Details.Content>
            UIDP er Udirs nye løsning for identitets- og tilgangskontroll.
          </Details.Content>
        </Details>
        <Details open={open3} onToggle={() => setOpen3(!open3)}>
          <Details.Summary>UBAS</Details.Summary>
          <Details.Content>
            UBAS styrer brukertilgang til flere av våre nettjenester. UBAS vil
            gradvis bli faset ut og erstattet av nyere påloggingsløsninger.
          </Details.Content>
        </Details>
      </>
    );
  },
};
