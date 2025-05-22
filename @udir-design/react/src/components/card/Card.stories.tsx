import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon, TrashFillIcon } from '@navikt/aksel-icons';
import {
  Button,
  Card,
  Field,
  Heading,
  Label,
  Paragraph,
  Select,
  Textfield,
} from '@udir-design/react/alpha';
import { Color } from '@digdir/designsystemet-react/colors';
import { Fragment } from 'react/jsx-runtime';

const studentsImg =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const schoolSuppliesImg =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1644&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['alpha'],
  parameters: {
    customStyles: {
      width: '100%',
      maxWidth: 800,
      alignItems: 'center',
      display: 'grid',
      gap: 'var(--ds-size-4)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px , 320px))',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Preview: Story = {
  args: {
    'data-color': 'neutral',
    children: [
      <Heading>Tittel</Heading>,
      <Paragraph>Innhold</Paragraph>,
      <Paragraph data-size="sm">Fotnote</Paragraph>,
    ],
  },
};

const VariantsMap: Record<
  string,
  { 'data-color': Color; variant: 'default' | 'tinted' }
> = {
  neutralDefault: {
    'data-color': 'neutral',
    variant: 'default',
  },
  neutralTinted: {
    'data-color': 'neutral',
    variant: 'tinted',
  },
  accentDefault: {
    'data-color': 'accent',
    variant: 'default',
  },
  accentTinted: {
    'data-color': 'accent',
    variant: 'tinted',
  },
  support1Default: {
    'data-color': 'support1',
    variant: 'default',
  },
  support1Tinted: {
    'data-color': 'support1',
    variant: 'tinted',
  },
  support2Default: {
    'data-color': 'support2',
    variant: 'default',
  },
  support2Tinted: {
    'data-color': 'support2',
    variant: 'tinted',
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      {Object.entries(VariantsMap).map(([key, value]) => (
        <Card key={key} {...args} {...value}>
          <Card.Block>
            <Paragraph>
              {Object.entries(value).map(([v, k]) => (
                <Fragment key={v}>
                  {v}: {k}
                  <br />
                </Fragment>
              ))}
            </Paragraph>
          </Card.Block>
        </Card>
      ))}
    </>
  ),
};

export const Media: Story = {
  render: (args) => (
    <>
      <Card {...args}>
        <Card.Block>
          <img
            src={schoolSuppliesImg}
            alt="Fotografi av forskjellig skoleutstyr"
          />
        </Card.Block>
        <Card.Block>
          <Heading>Skoleutstyr</Heading>
          <Paragraph>
            Fylkeskommunen skal sørge for at elevene i videregående skole får
            gratis lærebøker og andre trykte og digitale læremidler og digitalt
            utstyr.
          </Paragraph>
        </Card.Block>
      </Card>
      <Card {...args}>
        <Card.Block>
          <Heading>Skoleutstyr</Heading>
          <Paragraph>
            Fylkeskommunen skal sørge for at elevene i videregående skole får
            gratis lærebøker og andre trykte og digitale læremidler og digitalt
            utstyr.
          </Paragraph>
        </Card.Block>
        <Card.Block>
          <img
            src={schoolSuppliesImg}
            alt="Fotografi av forskjellig skoleutstyr"
          />
        </Card.Block>
      </Card>
    </>
  ),
};

export const Video: Story = {
  args: {
    'data-color': 'neutral',
    children: [
      <Card.Block>
        <iframe
          data-chromatic="ignore"
          src="https://player.vimeo.com/video/992000551?h=03734e8f67"
          width="320px"
          height="179px"
          allow="autoplay; fullscreen; picture-in-picture"
          title="30 år med digitalt innsyn"
        ></iframe>
      </Card.Block>,
      <Card.Block>
        <Heading>
          <a
            href="https://www.udir.no/regelverk-og-tilsyn/skole-og-opplaring/filmer/"
            target="_blank"
            rel="noreferrer"
          >
            Ny opplæringslov
          </a>
        </Heading>
        <Paragraph>
          Kunnskapsminister Kari Nessa Nordtun om den nye opplæringsloven.
        </Paragraph>
      </Card.Block>,
    ],
  },
};

const options = [
  { value: 'lærer', label: 'Lærer' },
  { value: 'elev', label: 'Elev' },
  { value: 'forelder', label: 'Forelder' },
];

export const Composed: Story = {
  render: (args, context) => (
    <Card {...args}>
      <Card.Block>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Heading>Rolle 1</Heading>
          <Button variant="secondary" data-color="danger" data-size="sm">
            <TrashFillIcon aria-hidden />
            Fjern
          </Button>
        </div>
      </Card.Block>
      <Card.Block>
        <Field>
          <Label>Velg rolle</Label>
          <Select id={context.id + '-role'}>
            {options.map(({ value, label }, index) => (
              <Select.Option key={index} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Field>
        <Textfield
          id={context.id + '-nationality-number'}
          label="Fødselsnummer"
        />
        <Textfield id={context.id + '-last-name'} label="Etternavn" />
      </Card.Block>
      <Card.Block>
        <Button variant="secondary" data-size="sm">
          Legg til rolle
          <PlusIcon aria-hidden />
        </Button>
      </Card.Block>
    </Card>
  ),
};

export const WithLink: Story = {
  render: (args) => (
    <>
      <Card data-color="support1" {...args}>
        <Card.Block>
          <img src={studentsImg} alt="" />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a
              href="https://www.udir.no/eksamen-og-prover/eksamen/ta-fag-som-privatist/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Påmelding til eksamen
            </a>
          </Heading>
          <Paragraph>
            Du må melde deg på innen 1. februar for våreksamen og 15. september
            for høsteksamen.
          </Paragraph>
          <Paragraph data-size="sm">Privatisteksamen</Paragraph>
        </Card.Block>
      </Card>
      <Card {...args} data-color="neutral">
        <Card.Block>
          <Heading>
            <a
              href="https://www.udir.no/eksamen-og-prover/eksamen/ta-fag-som-privatist/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Påmelding til eksamen
            </a>
          </Heading>
          <Paragraph>
            Du må melde deg på innen 1. februar for våreksamen og 15. september
            for høsteksamen.
          </Paragraph>
          <Paragraph data-size="sm">Privatisteksamen</Paragraph>
        </Card.Block>
        <Card.Block>
          <img src={studentsImg} alt="" />
        </Card.Block>
      </Card>
    </>
  ),
};

export const Horizontal: Story = {
  parameters: {
    customStyles: {
      gridTemplateColumns: 'repeat(1fr)',
    },
  },
  args: {
    style: { display: 'grid', gridTemplateColumns: '1fr 1fr' },
    children: [
      <Card.Block>
        <Heading>Card med grid</Heading>
      </Card.Block>,
      <Card.Block>
        <Paragraph>
          Eksempel på hvordan du kan bruke et Card horisontalt ved bruk av grid.
        </Paragraph>
      </Card.Block>,
    ],
  },
};
