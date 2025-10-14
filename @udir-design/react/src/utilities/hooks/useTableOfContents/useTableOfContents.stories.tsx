import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { expect, within } from 'storybook/test';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { TableOfContents } from 'src/components/tableOfContents/TableOfContents';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './docs/UseTableOfContents.module.css';
import {
  useTableOfContents,
  type useTableOfContentsProps,
} from './useTableOfContents';

export default {
  title: 'Utilities/useTableOfContents',
  parameters: {
    chromatic: { disableSnapshot: true },
    tags: ['alpha', 'udir'],
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [withScrollHashBehavior],
  argTypes: {
    containerRef: {
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: 'Document' },
      },
      description: 'The RefObject of the element to extract headings from',
    },
    headingSelector: {
      description: 'Which headings to include in the TableOfContents',
      table: {
        defaultValue: { summary: 'h2,h3' },
        type: { summary: 'h2|h2,h3' },
      },
    },
  },
} as Meta;

type Story = StoryObj<useTableOfContentsProps>;

export const Default: Story = {
  render() {
    return (
      <div className={styles.prose}>
        <TableOfContents {...useTableOfContents()} data-testid="toc" />
        <Heading
          level={2}
          id="first-heading"
          data-size="md"
          data-testid="first-heading"
        >
          Første overskrift (h2)
        </Heading>
        <Heading level={3} id="first-subheading" data-size="sm">
          Første underoverskrift (h3)
        </Heading>
        <Heading level={2} id="second-heading" data-size="md">
          Andre overskrift (h2)
        </Heading>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toc = canvas.getByTestId('toc');
    const links = within(toc).getAllByRole('link');

    const linkData = links.map((link) => ({
      href: link.getAttribute('href'),
      text: link.textContent?.trim(),
    }));

    await step('All three headings should be part of toc', async () => {
      expect(linkData).toEqual([
        { href: '#first-heading', text: 'Første overskrift (h2)' },
        { href: '#first-subheading', text: 'Første underoverskrift (h3)' },
        { href: '#second-heading', text: 'Andre overskrift (h2)' },
      ]);
    });
  },
};

export const Container: Story = {
  render() {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div ref={containerRef} className={styles.prose}>
        <Heading level={1} id="sidetittel" data-size="lg">
          Sidetittel (h1)
        </Heading>
        <Paragraph data-size="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui
          nunc, maximus vitae finibus ut, consequat sit amet metus. Suspendisse
          nisl massa, egestas eu justo eu, luctus volutpat ante. Aliquam congue
          consectetur arcu, at pharetra nunc ultricies in. Sed aliquam mi a odio
          varius, in eleifend orci elementum.
        </Paragraph>
        <TableOfContents {...useTableOfContents({ containerRef })} />
        <Heading level={2} id="forste-overskrift" data-size="md">
          Første overskrift (h2)
        </Heading>
        <Paragraph>
          Vestibulum ut mauris quis elit hendrerit luctus. Curabitur sit amet
          mauris id nisi vehicula accumsan. Curabitur lobortis dolor sed nunc
          consectetur, vel lobortis felis rhoncus. Etiam elit dolor, convallis
          id felis in, vulputate condimentum turpis.
        </Paragraph>
        <Paragraph>
          Vestibulum volutpat augue sed dui tristique, eget accumsan massa
          laoreet. Sed consequat, ex ullamcorper tempus faucibus, nibh quam
          dignissim augue, iaculis vestibulum arcu magna id mauris. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Duis sollicitudin massa
          id leo auctor viverra vel vitae felis. Mauris vehicula porttitor
          congue.
        </Paragraph>
        <Heading level={3} id="forste-underoverskrift" data-size="sm">
          Første underoverskrift (h3)
        </Heading>
        <Paragraph>
          Suspendisse in vulputate dui, sed rutrum arcu. Nunc vitae fermentum
          nunc, ut dignissim quam. Fusce at dolor venenatis nulla gravida
          ornare. Proin pulvinar tincidunt nisl, eu venenatis elit consequat et.
          Suspendisse blandit felis quis ante hendrerit, vitae aliquet odio
          lobortis. Vivamus at ex id magna cursus consectetur id luctus elit.
          Vivamus vitae ex vel sapien convallis commodo in quis eros. Nunc a
          volutpat urna.
        </Paragraph>
        <Heading level={4} id="forste-underunderoverskrift" data-size="xs">
          Første underunderoverskrift (h4)
        </Heading>
        <Paragraph>
          Donec at pellentesque lacus. Integer pretium, nulla vitae tincidunt
          tincidunt, mauris augue facilisis sapien, eget pulvinar odio ex
          accumsan nulla. Proin venenatis rhoncus suscipit. Proin ac ex viverra,
          laoreet enim at, tempor elit. Nunc diam eros, congue pharetra ligula
          in, luctus molestie nibh. Donec placerat ac lacus a feugiat. Sed justo
          elit, vestibulum id iaculis fermentum, ornare a nisi.
        </Paragraph>
        <Heading level={2} id="andre-overskrift" data-size="md">
          Andre overskrift (h2)
        </Heading>
        <Paragraph>
          Quisque lacinia sodales purus non lobortis. Quisque bibendum, nulla ut
          viverra tempor, nisl nibh dictum tellus, ac dapibus quam est non dui.
          Integer fringilla commodo lectus ut suscipit. Nulla at porttitor eros.
          Cras consequat ex nec pellentesque pharetra. Vivamus facilisis
          consequat velit sit amet pretium.
        </Paragraph>
      </div>
    );
  },
};

export const TocIgnore: Story = {
  render() {
    return (
      <div className={styles.prose}>
        <TableOfContents {...useTableOfContents()} />
        <Heading level={2} id="inkluder-overskrift-1" data-size="md">
          Inkluder første overskrift (h2)
        </Heading>
        <Heading
          level={2}
          id="utelat-overskrift-2"
          data-toc-ignore
          data-size="md"
        >
          Utelat andre overskrift (h2)
        </Heading>
        <Heading level={2} id="inkluder-overskrift-3" data-size="md">
          Inkluder tredje overskrift (h2)
        </Heading>
      </div>
    );
  },
};
