import type { Color } from '@digdir/designsystemet-react/colors';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { PlusIcon, TrashFillIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Field } from '../field/Field';
import { Link } from '../link/Link';
import { Select } from '../select/Select';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import { Label } from '../typography/label/Label';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Card } from './Card';

const studentsImg =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const schoolSuppliesImg =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1644&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const meta = preview.meta({
  component: Card,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    customStyles: {
      width: '100%',
      maxWidth: 800,
      alignItems: 'center',
      display: 'grid',
      gap: 'var(--ds-size-4)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px , 320px))',
    },
  },
  args: {
    // Children is required in Card props, so we must set something
    children: undefined,
  },
});

export const Preview = meta.story({
  args: {
    'data-color': 'neutral',
    children: [
      <Heading>Tittel</Heading>,
      <Paragraph>Innhold</Paragraph>,
      <Paragraph data-size="sm">Fotnote</Paragraph>,
    ],
  },
});

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

export const Variants = meta.story({
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
});

export const Media = meta.story({
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
});

export const Video = meta.story({
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
});

const options = [
  { value: 'lærer', label: 'Lærer' },
  { value: 'elev', label: 'Elev' },
  { value: 'forelder', label: 'Forelder' },
];

export const Composed = meta.story({
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
});

export const WithLink = meta.story({
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
});

export const WithMultipleLinks = meta.story({
  render: (args) => {
    const cardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const cleanup: Array<() => void> = [];
      if (cardRef.current) {
        cardRef.current
          .querySelectorAll<HTMLElement>(':is(a, button)')
          .forEach((el) => {
            const listener = (e: PointerEvent): void => e.stopPropagation();
            el.addEventListener('click', listener);
            cleanup.push(() => el.removeEventListener('click', listener));
          });
      }
      return () => cleanup.forEach((fn) => fn());
    }, []);
    return (
      <Card data-color="support1" {...args} ref={cardRef}>
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
          <Paragraph>
            Hvis det er noe du lurer på om privatisteksamen skal du kontakte
            fylkeskommunen.{' '}
            <Link href="https://www.udir.no/eksamen-og-prover/eksamen/privatist/sporsmal-om-privatisteksamen/">
              Fylkeskommunen har ansvar for gjennomføring av privatisteksamen.
            </Link>
          </Paragraph>
          <Paragraph data-size="sm">Privatisteksamen</Paragraph>
        </Card.Block>
      </Card>
    );
  },
});

export const Horizontal = meta.story({
  render: () => {
    const url =
      'https://www.udir.no/contentassets/0ae1c5846c254b9f8800c59c393fd03d/skolemiljo.png';
    return (
      <Card
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          width: '700px',
        }}
      >
        <Card.Block>
          <img
            src={url}
            alt="Barn som spiser lunsj"
            style={{
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a
              href="https://www.udir.no/laring-og-trivsel/skolemiljo/slik-kan-skolen-handtere-et-utrygt-skolemiljo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hva gjør du når en elev ikke har det trygt og godt på skolen?
            </a>
          </Heading>
          <Paragraph>
            Hvis dere mistenker eller kjenner til at en elev ikke har det trygt
            og godt, skal dere snarest undersøke saken. Vi har laget råd om hva
            dere kan gjøre.
          </Paragraph>
        </Card.Block>
      </Card>
    );
  },
});
