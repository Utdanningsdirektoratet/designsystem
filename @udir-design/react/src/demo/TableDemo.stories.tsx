import './demoSizing.css';
import preview from '.storybook/preview';
import { demoParameters } from './demoParameters';
import { TableDemo } from './pages/table-demo/TableDemo';

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
    'data-color-scheme': 'light',
  },
  render(args) {
    return <TableDemo {...args} />;
  },
});
