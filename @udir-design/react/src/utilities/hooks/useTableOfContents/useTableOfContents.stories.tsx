import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Heading,
  Paragraph,
  TableOfContents,
  useTableOfContents,
} from '@udir-design/react/alpha';
import type { useTableOfContentsProps } from './useTableOfContents';
import styles from './docs/UseTableOfContents.module.css';
import { useRef } from 'react';

export default {
  title: 'Utilities/useTableOfContents',
  parameters: {
    chromatic: { disableSnapshot: true },
    tags: ['alpha', 'udir'],
    componentOrigin: {
      originator: 'self',
    },
  },
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
        <TableOfContents {...useTableOfContents()} />
        <Heading level={2} id="overskrift">
          Overskrift
        </Heading>
      </div>
    );
  },
};

export const Container: Story = {
  render() {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div ref={containerRef} className={styles.prose}>
        <Heading level={1} id="heading-1" data-size="xl">
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
        <Heading level={2} id="heading-2" data-size="lg">
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
        <Heading level={3} id="heading-3" data-size="md">
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
        <Heading level={4} id="heading-4" data-size="sm">
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
        <Heading level={2} id="heading-5" data-size="lg">
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
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div ref={containerRef} className={styles.prose}>
        <TableOfContents {...useTableOfContents({ containerRef })} />
        <Heading id="inkluder-overskrift-1">Inkluder første overskrift</Heading>
        <Heading id="utelat-overskrift-2" data-toc-ignore>
          Utelat andre overskrift
        </Heading>
        <Heading id="inkluder-overskrift-3">Inkluder tredje overskrift</Heading>
      </div>
    );
  },
};
