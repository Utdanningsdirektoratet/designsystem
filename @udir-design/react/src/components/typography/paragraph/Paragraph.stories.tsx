import preview from '.storybook/preview';
import { Paragraph } from './Paragraph';

const meta = preview.meta({
  component: Paragraph,
  tags: ['beta', '!autodocs', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
  argTypes: {
    'data-size': {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
  },
  title: 'Components/Typography/Paragraph',
});

export const Preview = meta.story({
  args: {
    children:
      'Personvernerklæringen gir informasjon om hvilke personopplysninger vi behandler, hvordan disse blir behandlet og hvilke rettigheter du har.',
    variant: 'default',
  },
});
