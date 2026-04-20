import preview from '.storybook/preview';
import { Label } from './Label';

const meta = preview.meta({
  component: Label,
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
  title: 'Components/Typography/Label',
});

export const Preview = meta.story({
  args: {
    children: 'Vennligst skriv inn fødselsnummer. 11 tegn',
    weight: 'medium',
  },
});
