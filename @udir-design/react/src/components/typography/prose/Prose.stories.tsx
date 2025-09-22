import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from './Prose';
import { Paragraph, Heading } from '../index';

const meta: Meta<typeof Prose> = {
  component: Prose,
  tags: ['alpha', '!autodocs', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  title: 'Components/Typography/Prose',
};

export default meta;
type Story = StoryObj<typeof Prose>;

export const Preview: Story = {
  render: () => {
    return (
      <Prose>
        <Heading level={1} data-size="2xl">
          Heading
        </Heading>
        <Paragraph data-size="xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={2} data-size="xl">
          Heading
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={3} data-size="lg">
          Heading
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={4} data-size="md">
          Heading
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={5} data-size="sm">
          Heading
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={6} data-size="xs">
          Heading
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={6} data-size="2xs">
          Heading
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Heading level={3} data-size="lg">
          Paragraph size
        </Heading>
        <Paragraph data-size="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Paragraph data-size="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Paragraph data-size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
        <Paragraph data-size="xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
          scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
          lorem. Suspendisse tortor nisl, porttitor eget cursus quis, facilisis
          et lacus. Sed sit amet laoreet orci.
        </Paragraph>
      </Prose>
    );
  },
};
