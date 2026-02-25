import './demoSizing.css';
import preview from '.storybook/preview';
import { TableDemo } from '../../demo-pages/table-demo/TableDemo';
import { demoParameters } from './demoParameters';
import type { DemoProps } from './demoProps';

const meta = preview.meta({
  title: 'demo/Table Demo',
  component: TableDemo as React.FC<DemoProps>,
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
