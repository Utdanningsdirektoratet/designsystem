import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Tag, TagProps } from './Tag';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Avatar } from '../avatar/Avatar';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
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

const colorStatusVariants = ['success', 'warning', 'danger', 'info'];
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

const electricianImage =
  'https://images.unsplash.com/photo-1635335874521-7987db781153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Article: Story = {
  render: () => (
    <div>
      <img
        src={electricianImage}
        alt="Bøker på et bord"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: 10,
        }}
      />
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: 'var(--ds-size-4)',
          marginBottom: 'var(--ds-size-3)',
        }}
      >
        <Heading>Rådgivning for lærlinger</Heading>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '10px',
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <Tag data-color="accent" data-size="sm">
              Videregående
            </Tag>
          </li>
          <li>
            <Tag data-color="support1" data-size="sm">
              Lærling
            </Tag>
          </li>
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: 'var(--ds-size-2)',
        }}
      >
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
