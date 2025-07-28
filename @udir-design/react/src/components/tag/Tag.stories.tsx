import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Tag, TagProps } from './Tag';
import { Heading, Paragraph } from '../alpha';
import { Avatar } from '../beta';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['beta'],
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--ds-size-4)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Preview: Story = {
  args: {
    children: 'Ferdig',
    'data-color': 'success',
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText(args.children as string);
    await step('Element with expected text should exist', async () => {
      expect(tag).toBeTruthy();
    });
  },
};

const sizes: TagProps['data-size'][] = ['sm', 'md', 'lg'];
export const Sizes: Story = {
  render: (args) => (
    <>
      {sizes.map((size) => (
        <Tag key={size} data-size={size} {...args}>
          {size}
        </Tag>
      ))}
    </>
  ),
};

const colorStatusVariants = ['neutral', 'success', 'warning', 'danger', 'info'];
const colorVariants = ['neutral', 'accent', 'support1', 'support2'];

export const Colors: Story = {
  render: (args) => (
    <>
      {colorVariants.map((color) => (
        <Tag key={color} data-color={color as TagProps['data-color']} {...args}>
          {color}
        </Tag>
      ))}
    </>
  ),
};

export const Status: Story = {
  render: (args) => (
    <>
      {colorStatusVariants.map((color) => (
        <Tag key={color} data-color={color as TagProps['data-color']} {...args}>
          {color}
        </Tag>
      ))}
    </>
  ),
};

const schoolImage =
  'https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=2374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const electicianImage =
  'https://images.unsplash.com/photo-1635335874521-7987db781153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Article: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 'var(--ds-size-2)',
      }}
    >
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
      <div style={{ display: 'flex', gap: '10px' }}>
        <Heading>Undersøke</Heading>
        <Tag data-color="accent">Barnehage</Tag>
        <Tag data-color="support1">Regelverk</Tag>
        <Tag data-color="support2">Trygghet</Tag>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar data-size="xs" initials="KN" aria-label={'Kari Nordmann'} />
        <Paragraph>Kari Nordmann | 27.06.2025</Paragraph>
      </div>
      <Paragraph>
        Barnehagen er pliktig til å gjennomføre undersøkelser som med rimelighet
        kan forventes. Barnehagen må innhente nok informasjon til å avdekke hva
        som er problemet og hva som gjør at barnet ikke har det trygt og godt.
      </Paragraph>
      <img
        src={electicianImage}
        alt="Bøker på et bord"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: 10,
          marginTop: 'var(--ds-size-8)',
        }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Heading>Rådgivning for lærlinger</Heading>
        <Tag data-color="accent">Videregående</Tag>
        <Tag data-color="support1">Lærling</Tag>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Avatar data-size="xs" initials="ON" aria-label={'Kari Nordmann'} />
        <Paragraph>Ola Nordmann | 19.06.2025</Paragraph>
      </div>
      <Paragraph>
        Fylkeskommunen har plikt til å sørge for at både elever og de som har
        læretid i bedrift skal ha tilgang til rådgivning om utdannings- og
        yrkesvalg, samt rådgiving om sosiale og personlige forhold. Dette står i
        opplæringsloven §§ 16-1 og 16-2.
      </Paragraph>
    </div>
  ),
};
