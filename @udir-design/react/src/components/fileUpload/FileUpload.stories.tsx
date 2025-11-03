import type { Meta, StoryObj } from '@storybook/react-vite';
import { UploadIcon } from '@udir-design/icons';
import { Button } from '../button/Button';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Preview: Story = {
  render: (args) => {
    return (
      <FileUpload {...args}>
        <Button
          variant="secondary"
          onSelect={() => console.log('Du har lagt til en fil')}
        >
          <UploadIcon aria-hidden />
          Velg filer
        </Button>
      </FileUpload>
    );
  },
};
