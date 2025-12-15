import preview from '.storybook/preview';
import { ValidationMessage } from './ValidationMessage';

const meta = preview.meta({
  component: ValidationMessage,
  tags: ['beta', '!autodocs', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
  title: 'Components/Typography/ValidationMessage',
});

export const Preview = meta.story({
  args: {
    children: 'Dette er en valideringsmelding.',
  },
});
