import type { Meta, StoryObj } from '@storybook/react-vite';
import { mergeDeepRight } from 'ramda';
import { expect, within } from 'storybook/test';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { useTableOfContents } from 'src/utilities/hooks/useTableOfContents/useTableOfContents';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Prose } from '../typography/prose/Prose';
import { TableOfContents } from './TableOfContents';

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [withScrollHashBehavior],
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

export const Preview: Story = {
  args: {
    headings: [
      {
        level: 2,
        name: 'Første overskrift (h2)',
        id: 'forste-overskrift',
      },
      {
        level: 3,
        name: 'Første underoverskrift (h3)',
        id: 'forste-underoverskrift',
      },
      {
        level: 3,
        name: 'Andre underoverskrift (h3)',
        id: 'andre-underoverskrift',
      },
      { level: 2, name: 'Andre overskrift (h2)', id: 'andre-overskrift' },
      { level: 2, name: 'Tredje overskrift (h2)', id: 'tredje-overskrift' },
    ],
    'data-color': 'neutral',
  },
  render: (args) => {
    return (
      <div
        style={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-5)',
        }}
      >
        <TableOfContents
          {...args}
          style={{ width: '450px' }}
          data-testid="table-of-contents"
        />
        <Heading id="forste-overskrift" level={2} data-size="md">
          Første overskrift (h2)
        </Heading>
        <Heading id="forste-underoverskrift" level={3} data-size="sm">
          Første underoverskrift (h3)
        </Heading>
        <Heading id="andre-underoverskrift" level={3} data-size="sm">
          Andre underoverskrift (h3)
        </Heading>
        <Heading id="andre-overskrift" level={2} data-size="md">
          Andre overskrift (h2)
        </Heading>
        <Heading id="tredje-overskrift" level={2} data-size="md">
          Tredje overskrift (h2)
        </Heading>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toc = canvas.getByTestId('table-of-contents');
    const links = within(toc).getAllByRole('link');
    const linkData = links.map((link) => ({
      href: link.getAttribute('href'),
      text: link.textContent?.trim(),
    }));

    await step('TableOfContents is rendered', async () => {
      await expect(toc).toBeInTheDocument();
    });

    await step('All expected links in toc', async () => {
      expect(linkData).toEqual([
        { href: '#forste-overskrift', text: 'Første overskrift (h2)' },
        {
          href: '#forste-underoverskrift',
          text: 'Første underoverskrift (h3)',
        },
        { href: '#andre-underoverskrift', text: 'Andre underoverskrift (h3)' },
        { href: '#andre-overskrift', text: 'Andre overskrift (h2)' },
        { href: '#tredje-overskrift', text: 'Tredje overskrift (h2)' },
      ]);
    });

    await step('Link navigation works as expected', async () => {
      links[4].click();
      const targetHeading = canvas.getByRole('heading', {
        name: 'Tredje overskrift (h2)',
      });
      await expect(document.activeElement).toBe(targetHeading);
    });
  },
};

export const Automatic: Story = {
  args: {
    variant: 'tinted',
    'data-color': 'accent',
  },
  render: (args) => {
    return (
      <Prose>
        <Heading level={1} id="heading-1" data-size="lg">
          Sidetittel (h1)
        </Heading>
        <Paragraph data-size="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui
          nunc, maximus vitae finibus ut, consequat sit amet metus. Suspendisse
          nisl massa, egestas eu justo eu, luctus volutpat ante. Aliquam congue
          consectetur arcu, at pharetra nunc ultricies in. Sed aliquam mi a odio
          varius, in eleifend orci elementum.
        </Paragraph>
        <TableOfContents {...args} {...useTableOfContents()} />
        <Heading level={2} id="heading-2" data-size="md">
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
        <Heading level={3} id="heading-3" data-size="sm">
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
        <Heading level={4} id="heading-4" data-size="xs">
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
        <Heading level={2} id="heading-5" data-size="md">
          Andre overskrift (h2)
        </Heading>
        <Paragraph>
          Quisque lacinia sodales purus non lobortis. Quisque bibendum, nulla ut
          viverra tempor, nisl nibh dictum tellus, ac dapibus quam est non dui.
          Integer fringilla commodo lectus ut suscipit. Nulla at porttitor eros.
          Cras consequat ex nec pellentesque pharetra. Vivamus facilisis
          consequat velit sit amet pretium.
        </Paragraph>
      </Prose>
    );
  },
};

export const Manual: Story = {
  args: {
    headings: [
      { level: 2, name: 'Første overskrift (h2)', id: 'forste' },
      { level: 2, name: 'Andre overskrift (h2)', id: 'andre' },
    ],
    'data-color': 'support1',
  },
  render: (args) => (
    <Prose>
      <Heading level={1} data-size="lg">
        Sidetittel (h1)
      </Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui nunc,
        maximus vitae finibus ut, consequat sit amet metus.
      </Paragraph>
      <TableOfContents {...args} />
      <Heading level={2} id="forste" data-size="md">
        Første overskrift (h2)
      </Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui nunc,
        maximus vitae finibus ut, consequat sit amet metus. Suspendisse nisl
        massa, egestas eu justo eu, luctus volutpat ante. Aliquam congue
        consectetur arcu, at pharetra nunc ultricies in. Sed aliquam mi a odio
        varius, in eleifend orci elementum.
      </Paragraph>
      <Heading level={2} id="andre" data-size="md">
        Andre overskrift (h2)
      </Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui nunc,
        maximus vitae finibus ut, consequat sit amet metus. Suspendisse nisl
        massa, egestas eu justo eu, luctus volutpat ante.
      </Paragraph>
      <Paragraph>
        Aliquam congue consectetur arcu, at pharetra nunc ultricies in. Sed
        aliquam mi a odio varius, in eleifend orci elementum. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Donec dui nunc, maximus vitae
        finibus ut, consequat sit amet metus. Suspendisse nisl massa, egestas eu
        justo eu, luctus volutpat ante.
      </Paragraph>
    </Prose>
  ),
};

export const DefaultClosed: Story = mergeDeepRight(Automatic, {
  args: { defaultClosed: true },
});
