import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Size } from '@digdir/designsystemet-react';
import { Controls } from '../controls/Controls';
import { ArticleDemo } from './ArticleDemo';

const meta: Meta<typeof ArticleDemo> = {
  title: 'demo/Article Demo',
  component: ArticleDemo,
};

export default meta;
type Story = StoryObj<typeof ArticleDemo>;

export const ArticleStory: Story = {
  parameters: {
    customStyles: {
      padding: 0,
    },
  },
  render(args) {
    const [size, setSize] = useState<Size>('sm');
    const [colorMode, setColorMode] = useState('auto');
    return (
      <div>
        <Controls
          size={size}
          colorMode={colorMode}
          setSize={setSize}
          setColorMode={setColorMode}
        />
        <ArticleDemo {...args} data-size={size} data-color-scheme={colorMode} />
      </div>
    );
  },
};
