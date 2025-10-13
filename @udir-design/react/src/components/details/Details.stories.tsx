import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { createElement, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Stack } from '.storybook/docs/components';
import { ChevronDownUpIcon, ChevronUpDownIcon } from '@udir-design/icons';
import { Details } from './Details';
import { List } from '../list/List';
import { Card, CardProps } from '../card/Card';
import { Link } from '../link/Link';
import { Fieldset } from '../fieldset/Fieldset';
import { ToggleGroup } from '../toggleGroup/ToggleGroup';
import { Button } from '../button/Button';
import { Label } from '../typography/label/Label';

export default {
  component: Details,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
} as Meta<typeof Details>;

type Story = StoryObj<typeof Details>;

const previewSummary = 'Kva er nasjonale prøver?';
const previewContent =
  'Føremålet med nasjonale prøver er å gi skolane kunnskap om elevane sine grunnleggjande ferdigheiter i lesing, rekning og engelsk. Informasjonen frå prøvene skal danne grunnlag for undervegsvurdering og kvalitetsutvikling på alle nivå i skolesystemet.';

export const Preview: Story = {
  render: (args) => {
    return (
      <Details {...args}>
        <Details.Summary>{previewSummary}</Details.Summary>
        <Details.Content data-testid="details-content">
          {previewContent}
        </Details.Content>
      </Details>
    );
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
          <Details.Content>
            <List.Unordered>
              <List.Item>
                Vedlegg 1:{' '}
                <Link href="#" target="_blank">
                  Regler og retningslinjer.pdf
                </Link>{' '}
              </List.Item>
              <List.Item>
                Vedlegg 2:{' '}
                <Link href="#" target="_blank">
                  Brevmal.docx
                </Link>{' '}
              </List.Item>
              <List.Item>
                Vedlegg 3:{' '}
                <Link href="#" target="_blank">
                  Illustrasjoner.zip
                </Link>
              </List.Item>
            </List.Unordered>
          </Details.Content>
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
        data-size="sm"
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
    const isOpen = [open1, open2, open3].every(Boolean);
    const toggleOpen = () => {
      setOpen1(!isOpen);
      setOpen2(!isOpen);
      setOpen3(!isOpen);
    };
    return (
      <>
        <Button variant="tertiary" onClick={toggleOpen} data-size="sm">
          {isOpen ? (
            <>
              <ChevronDownUpIcon aria-hidden />
              Lukk alle
            </>
          ) : (
            <>
              <ChevronUpDownIcon aria-hidden />
              Åpne alle
            </>
          )}
        </Button>
        <br />
        <Details open={open1} onToggle={() => setOpen1(!open1)}>
          <Details.Summary>Hva er Feide?</Details.Summary>
          <Details.Content>
            <p>
              Feide er den nasjonale løsningen for trygg innlogging og
              datadeling i utdanning og forskning.
            </p>
            <p>
              Svært mange av de digitale læremidlene og tjenestene som er i bruk
              i norsk utdanning, har Feide som innloggingsløsning.
            </p>
            <p>
              Med en Feide-bruker bruker elever, studenter, forskere og
              undervisere ett og samme brukernavn og passord til å logge inn på
              alle tjenester som har Feide som innloggingsløsning. De slipper
              med andre ord å huske ulike brukernavn og passord for ulike
              tjenester.
            </p>
          </Details.Content>
        </Details>
        <Details open={open2} onToggle={() => setOpen2(!open2)}>
          <Details.Summary>Hva er UIDP?</Details.Summary>
          <Details.Content>
            <p>
              UIDP er Udirs nye løsning for identitets- og tilgangskontroll.
            </p>
            <p>
              Løsningen har som formål å sørge for sikker og lettfattelig
              pålogging for brukere til Utdanningsdirektoratets tjenester og å
              sørge for sikker maskintilgang til Utdanningsdirektoratets API-er.
              UIDP benyttes av over 30 systemer i Utdanningsdirektoratet og en
              betydelig mengde brukere fra sektor er registrert i systemet. I
              2019 hadde UIDP over 3 millioner pålogginger.
            </p>
            <p>
              Brukere kan logge inn med tre forskjellige identitetsleverandører:
              Feide, ID-porten og en lokal løsning der brukerne bare ligger i
              UIDP. Den lokale løsningen benyttes av elever og kandidater som
              ikke bruker Feide.
            </p>
            <p>
              UIDP er også integrert med Udir sin gamle påloggingsløsning UBAS.
            </p>
          </Details.Content>
        </Details>
        <Details open={open3} onToggle={() => setOpen3(!open3)}>
          <Details.Summary>Hva er UBAS?</Details.Summary>
          <Details.Content>
            <p>
              UBAS er Udirs gamle løsning for identitets- og tilgangskontroll.
              Fra 2022 blir UBAS gradvis faset ut og erstattet med nyere
              fellesløsninger (UIDP, Feide, ID-porten, Altinn Autorisasjon).
            </p>
            <p>
              Etter overgang til nye løsninger vil tildeling av roller og
              tjenestetilganger som hovedregel gjøres i Altinn, og ikke lenger i
              UBAS.
            </p>
          </Details.Content>
        </Details>
      </>
    );
  },
};

export const PseudoStates: Story = makePseudoStatesStory(Preview);

function makePseudoStatesStory(originalStory: Story): Story {
  return {
    render: (args, ctx) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-4)',
        }}
      >
        <Label data-size="sm">Default</Label>
        {originalStory.render?.(args, ctx)}
        <Label data-size="sm">Hover</Label>
        {originalStory.render?.({ ...args, className: 'hover' }, ctx)}
        <Label data-size="sm">Focused</Label>
        {originalStory.render?.({ ...args, className: 'focusVisible' }, ctx)}
      </div>
    ),
    args: originalStory.args,
    parameters: {
      ...originalStory.parameters,
      pseudo: {
        hover: ['.hover > u-summary'],
        focusVisible: ['.focusVisible > u-summary'],
      },
    },
  };
}
