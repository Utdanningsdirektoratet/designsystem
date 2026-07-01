import {
  ArrowsUpDownIcon,
  FilterIcon,
  PlusCircleIcon,
} from '@udir-design/icons';
import preview from '.storybook/preview';
import { Avatar } from 'src/components/avatar';
import { Button } from 'src/components/button';
import { Card } from 'src/components/card';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import { Prose } from 'src/components/typography/prose';
import { Skeleton } from './Skeleton';

const meta = preview.meta({
  component: Skeleton,
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
    a11y: {
      config: {
        // Disable a11y empty heading rule as we intentionally set aria-hidden="true" on the Skeleton component inside Headings
        rules: [{ id: 'empty-heading', selector: ':has(.ds-skeleton)' }],
      },
    },
  },
});

export const Preview = meta.story({
  args: {
    width: 200,
    height: 100,
  },
});

export const Components = meta.story({
  args: {
    height: 50,
  },
  render: (args) => {
    return (
      <>
        <style>
          {`
.skeleton-components-main {
  display: flex;
  align-items: center;
  gap: 20px;
}`}
        </style>
        <div className="skeleton-components-main">
          <Skeleton variant="circle" width="50px" {...args} />
          <Skeleton variant="rectangle" width="100px" {...args} />
          <Paragraph>
            <Skeleton variant="text" width="10" {...args} />
          </Paragraph>
        </div>
      </>
    );
  },
});

const StudentData = [
  {
    id: 0,
    name: 'Rita Nordmann',
    birthday: '12.09.2010',
    class: '5.-7. trinn',
    teacher: 'Nanna Arnestad',
  },
  {
    id: 1,
    name: 'Ola Nordmann',
    birthday: '11.03.2010',
    class: '5.-7. trinn',
    teacher: 'Nanna Arnestad',
  },
  {
    id: 2,
    name: 'Kari Nordmann',
    birthday: '04.12.2010',
    class: '5.-7. trinn',
    teacher: 'Nanna Arnestad',
  },
  {
    id: 3,
    name: 'Juliane Nordmann',
    birthday: '24.04.2010',
    class: '5.-7. trinn',
    teacher: 'Nanna Arnestad',
  },
  {
    id: 4,
    name: 'Mateo Nordmann',
    birthday: '01.05.2010',
    class: '5.-7. trinn',
    teacher: 'Nanna Arnestad',
  },
  {
    id: 5,
    name: 'Kai Nordmann',
    birthday: '17.05.2010',
    class: '5.-7. trinn',
    teacher: 'Nanna Arnestad',
  },
];

export const Cards = meta.story({
  render: (args) => {
    return (
      <>
        <style>
          {`
.skeleton-cards-main {
  margin: var(--ds-size-12);
  display: flex;
  flex-direction: column;
  gap: var(--ds-size-6);
}
.skeleton-cards-button__group {
  display: flex;
  justify-content: end;
}
.skeleton-cards-card__group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--ds-size-6);
}
.skeleton-cards-card-block {
  display: flex;
  flex-direction: column;
}`}
        </style>
        <div className="skeleton-cards-main">
          <Heading level={3} data-size="lg">
            Elever
          </Heading>
          <div className="skeleton-cards-button__group">
            <Button variant="tertiary">
              <PlusCircleIcon aria-hidden /> Legg til elev
            </Button>
            <Button variant="tertiary">
              <ArrowsUpDownIcon aria-hidden /> Sorter
            </Button>
            <Button variant="tertiary">
              <FilterIcon aria-hidden /> Filter
            </Button>
          </div>
          <div className="skeleton-cards-card__group">
            {StudentData.map((student) => (
              <Card key={student.id}>
                <Card.Block>
                  <Skeleton variant="text" {...args}>
                    {student.name}
                  </Skeleton>
                </Card.Block>
                <Card.Block className="skeleton-cards-card-block">
                  <Skeleton variant="text" {...args}>
                    Fødselsdato: {student.birthday}
                  </Skeleton>
                  <Skeleton variant="text" {...args}>
                    Trinn: {student.class}
                  </Skeleton>
                  <Skeleton variant="text" {...args}>
                    Lærer: {student.teacher}
                  </Skeleton>
                  <Skeleton variant="text" {...args}>
                    Vurdert: 23.04.2023
                  </Skeleton>
                </Card.Block>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  },
});

const schoolImage =
  'https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=2374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const UsageExample = meta.story({
  render: (args) => {
    return (
      <>
        <style>
          {`
.skeleton-usage-example-main {
  display: flex;
  gap: var(--ds-size-12);
  margin: var(--ds-size-12);
}
.skeleton-usage-example-section {
  flex: 1 1 200px;
}
.skeleton-usage-example-meta {
  display: flex;
  gap: var(--ds-size-2);
  align-items: center;
  padding-block: var(--ds-size-1);
}
.skeleton-usage-example-image {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}`}
        </style>
        <div className="skeleton-usage-example-main">
          <Prose className="skeleton-usage-example-section">
            <Skeleton height="200px" {...args} />
            <Heading>
              <Skeleton variant="text" width="15" />
            </Heading>
            <div className="skeleton-usage-example-meta">
              <Skeleton variant="circle" width="40px" height="40px" {...args} />
              <Skeleton variant="text" {...args}>
                Forfatter | sist endret
              </Skeleton>
            </div>
            <Skeleton variant="text" width="260" />
          </Prose>
          <Prose className="skeleton-usage-example-section">
            <img
              src={schoolImage}
              alt="Bøker på et bord"
              className="skeleton-usage-example-image"
            />
            <Heading>Undersøke</Heading>
            <div className="skeleton-usage-example-meta">
              <Avatar
                data-size="xs"
                initials="KN"
                aria-label={'Kari Nordmann'}
              />
              <Paragraph>Kari Nordmann | 27.06.2025</Paragraph>
            </div>
            <Paragraph>
              Barnehagen er pliktig til å gjennomføre undersøkelser som med
              rimelighet kan forventes. Barnehagen må innhente nok informasjon
              til å avdekke hva som er problemet og hva som gjør at barnet ikke
              har det trygt og godt.
            </Paragraph>
          </Prose>
        </div>
      </>
    );
  },
});

export const Children = meta.story({
  args: {
    variant: 'rectangle',
  },
  render: (args) => (
    <Skeleton {...args}>
      <Paragraph>
        Her er en tekst som blir sendt inn som barn av en Skeleton.
      </Paragraph>
      <Paragraph>
        Se hvordan Skeleton da dekker den samlede bredden og høyden til barna.
      </Paragraph>
      <Button>Knapp</Button>
    </Skeleton>
  ),
});

export const Text = meta.story({
  args: {
    variant: 'text',
  },
  render: (args) => (
    <>
      <style>
        {`
.skeleton-text-main {
  display: flex;
  gap: var(--ds-size-12);
  margin: var(--ds-size-12);
}
.skeleton-text-section {
  flex: 1 1 200px;
}`}
      </style>
      <div className="skeleton-text-main">
        <Prose className="skeleton-text-section">
          <Heading>Den kjekkaste leiken</Heading>
          <Paragraph data-size="sm">
            Det er verken dyrt eller komplisert å leggje til rette for den
            leiken barna liker best. Når viser barna mest trivsel i uteleiken?
            Det ønskte forskarar i forskingsprosjektet «EnCompetence» å finne
            ut, og dei ville spesielt sjå på situasjonar med fysisk aktivitet.
          </Paragraph>
        </Prose>
        <Prose className="skeleton-text-section">
          <Heading>
            <Skeleton {...args}>Den kjekkaste leiken</Skeleton>
          </Heading>
          <Paragraph data-size="sm">
            <Skeleton width={275} {...args} />
          </Paragraph>
        </Prose>
      </div>
    </>
  ),
});
