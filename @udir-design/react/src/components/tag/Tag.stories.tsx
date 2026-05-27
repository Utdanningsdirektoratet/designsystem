import { expect, within } from 'storybook/test';
import { ParagraphIcon, RobotIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { Avatar } from '../avatar/Avatar';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import type { TagProps } from './Tag';
import { Tag } from './Tag';

const meta = preview.meta({
  component: Tag,
  tags: ['digdir'],
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
});

export const Preview = meta.story({
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
});

const sizes: TagProps['data-size'][] = ['sm', 'md', 'lg'];
export const Sizes = meta.story({
  render: (args) => (
    <>
      {sizes.map((size) => (
        <Tag key={size} data-size={size} {...args}>
          {size}
        </Tag>
      ))}
    </>
  ),
});

export const Icon = meta.story({
  render: (args) => (
    <>
      <style>
        {`
.example-tag {
  paddingInlineStart: 'var(--ds-size-1)
}
.example-icon {
  marginInlineEnd: 'var(--ds-size-1)'
}`}
      </style>
      <Tag className="example-tag" {...args}>
        <RobotIcon aria-hidden className="example-icon" />
        Teksten er KI-generert
      </Tag>
      <Tag data-color="support1" className="example-tag" {...args}>
        <ParagraphIcon aria-hidden className="example-icon" />
        Privatskoleloven
      </Tag>
    </>
  ),
});

const colorStatusVariants = ['success', 'warning', 'danger', 'info'];
const colorVariants = ['neutral', 'accent', 'support1', 'support2'];

export const Colors = meta.story({
  render: (args) => (
    <>
      {colorVariants.map((color) => (
        <Tag key={color} data-color={color as TagProps['data-color']} {...args}>
          {color}
        </Tag>
      ))}
    </>
  ),
});

export const Status = meta.story({
  render: (args) => (
    <>
      {colorStatusVariants.map((color) => (
        <Tag key={color} data-color={color as TagProps['data-color']} {...args}>
          {color}
        </Tag>
      ))}
    </>
  ),
});

const electricianImage =
  'https://images.unsplash.com/photo-1635335874521-7987db781153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Article = meta.story({
  render: (args) => (
    <>
      <style>
        {`
.example-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
.example-div {
  display: flex;
  gap: 10px;
  margin-top: var(--ds-size-4);
  margin-bottom: var(--ds-size-3);
}
.example-div-2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: var(--ds-size-2);
}
.example-list {
    list-style: none;
    display: flex;
    gap: 10px;
    padding: 0;
    margin: 0;
}`}
      </style>
      <div>
        <img
          src={electricianImage}
          alt="Bøker på et bord"
          className="example-img"
        />
        <div className="example-div">
          <Heading>Rådgivning for lærlinger</Heading>
          <ul className="example-list">
            <li>
              <Tag data-color="accent" data-size="sm" {...args}>
                Videregående
              </Tag>
            </li>
            <li>
              <Tag data-color="support1" data-size="sm" {...args}>
                Lærling
              </Tag>
            </li>
          </ul>
        </div>
        <div className="example-div-2">
          <Avatar data-size="xs" initials="ON" aria-label={'Kari Nordmann'} />
          <Paragraph>Ola Nordmann | 19.06.2025</Paragraph>
        </div>
        <Paragraph>
          Fylkeskommunen har plikt til å sørge for at både elever og de som har
          læretid i bedrift skal ha tilgang til rådgivning om utdannings- og
          yrkesvalg, samt rådgiving om sosiale og personlige forhold. Dette står
          i opplæringsloven §§ 16-1 og 16-2.
        </Paragraph>
      </div>
    </>
  ),
});

export const VariantOutline = meta.story({
  parameters: {
    customStyles: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, max-content)',
      gap: 'var(--ds-size-2)',
      height: '100%',
      width: '100%',
      placeItems: 'left',
    },
  },
  render: (args) => {
    return (
      <>
        {colorVariants.concat(colorStatusVariants).map((color) => (
          <Tag
            key={color}
            data-color={color as TagProps['data-color']}
            variant="outline"
            {...args}
          >
            {color}
          </Tag>
        ))}
      </>
    );
  },
});
