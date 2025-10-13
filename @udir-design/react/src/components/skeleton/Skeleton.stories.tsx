import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ArrowsUpDownIcon,
  FilterIcon,
  PlusCircleIcon,
} from '@udir-design/icons';
import { Skeleton } from './Skeleton';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Heading } from '../typography/heading/Heading';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Avatar } from '../avatar/Avatar';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  tags: ['beta', 'digdir'],
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
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Preview: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

export const Components: Story = {
  args: {
    height: 50,
  },
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Skeleton variant="circle" width="50px" {...args} />
        <Skeleton variant="rectangle" width="100px" {...args} />
        <Paragraph>
          <Skeleton variant="text" width="10" {...args} />
        </Paragraph>
      </div>
    );
  },
};

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

export const Cards: Story = {
  render: (args) => {
    return (
      <div
        style={{
          margin: 'var(--ds-size-12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-6)',
        }}
      >
        <Heading level={3} data-size="lg">
          Elever
        </Heading>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--ds-size-6)',
          }}
        >
          {StudentData.map((student) => (
            <Card key={student.id}>
              <Card.Block>
                <Skeleton variant="text">{student.name}</Skeleton>
              </Card.Block>
              <Card.Block style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text">
                  Fødselsdato: {student.birthday}
                </Skeleton>
                <Skeleton variant="text">Trinn: {student.class}</Skeleton>
                <Skeleton variant="text">Lærer: {student.teacher}</Skeleton>
                <Skeleton variant="text">Vurdert: 23.04.2023</Skeleton>
              </Card.Block>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

const schoolImage =
  'https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=2374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const UsageExample: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-size-12)',
          margin: 'var(--ds-size-12)',
        }}
      >
        <div style={{ flex: '1 1 200px' }}>
          <Skeleton height="200px" {...args} />
          <Heading>
            <Skeleton variant="text" width="15" />
          </Heading>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              padding: '5px 0 5px 0',
            }}
          >
            <Skeleton variant="circle" width="40px" height="40px" {...args} />
            <Skeleton variant="text" {...args}>
              Forfatter| sist endret
            </Skeleton>
          </div>
          <Skeleton variant="text" width="200" />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <img
            src={schoolImage}
            alt="Bøker på et bord"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: 10,
            }}
          />
          <Heading>Undersøke</Heading>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar data-size="xs" initials="KN" aria-label={'Kari Nordmann'} />
            <Paragraph>Kari Nordmann | 27.06.2025</Paragraph>
          </div>
          <Paragraph>
            Barnehagen er pliktig til å gjennomføre undersøkelser som med
            rimelighet kan forventes. Barnehagen må innhente nok informasjon til
            å avdekke hva som er problemet og hva som gjør at barnet ikke har
            det trygt og godt.
          </Paragraph>
        </div>
      </div>
    );
  },
};

export const Children: Story = {
  args: {
    variant: 'rectangle',
    children: [
      <Paragraph>
        Her er en tekst som blir sendt inn som barn av en Skeleton.
      </Paragraph>,
      <Paragraph>
        Se hvordan Skeleton da dekker den samlede bredden og høyden til barna.
      </Paragraph>,
      <Button>Knapp</Button>,
    ],
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-size-12)',
        margin: 'var(--ds-size-12)',
      }}
    >
      <div style={{ flex: '1 1 200px' }}>
        <Heading>Den kjekkaste leiken</Heading>
        <Paragraph data-size="sm">
          Det er verken dyrt eller komplisert å leggje til rette for den leiken
          barna liker best. Når viser barna mest trivsel i uteleiken? Det ønskte
          forskarar i forskingsprosjektet «EnCompetence» å finne ut, og dei
          ville spesielt sjå på situasjonar med fysisk aktivitet.
        </Paragraph>
      </div>
      <div style={{ flex: '1 1 200px' }}>
        <Heading>
          <Skeleton {...args}>Den kjekkaste leiken</Skeleton>
        </Heading>
        <Paragraph data-size="sm">
          <Skeleton width={262} {...args} />
        </Paragraph>
      </div>
    </div>
  ),
};
