import preview from '.storybook/preview';
import { demoParameters } from '../demoParameters';
import { TableDemo } from './TableDemo';

const meta = preview.meta({
  title: 'demo/Table Demo',
  component: TableDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const TableStory = meta.story({
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  render(args) {
    return <TableDemo {...args} />;
  },
});
