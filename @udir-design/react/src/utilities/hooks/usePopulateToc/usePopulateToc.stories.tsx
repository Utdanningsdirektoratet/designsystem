import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Heading,
  Paragraph,
  TableOfContents,
  usePopulateToc,
} from '@udir-design/react/alpha';
import type { UsePopulateTocProps } from './usePopulateToc';

export default {
  title: 'Utilities/usePopulateToc',
  parameters: {
    chromatic: { disableSnapshot: true },
    tags: ['alpha', 'udir'],
    componentOrigin: {
      originator: 'self',
    },
  },
} as Meta;

type Story = StoryObj<UsePopulateTocProps>;

export const Default: Story = {
  args: {},
  render(args, context) {
    return (
      <div id="hei">
        <Heading level={1} id="heading-1" data-size="xl">
          Heading 1
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui
          nunc, maximus vitae finibus ut, consequat sit amet metus. Suspendisse
          nisl massa, egestas eu justo eu, luctus volutpat ante. Aliquam congue
          consectetur arcu, at pharetra nunc ultricies in. Sed aliquam mi a odio
          varius, in eleifend orci elementum.
        </Paragraph>
        <TableOfContents
          {...args}
          headings={usePopulateToc({
            container: document.getElementById('hei') ?? undefined,
          })}
        />
        <Heading level={2} id="heading-2" data-size="lg">
          Heading 2
        </Heading>
        <Paragraph>
          Vestibulum ut mauris quis elit hendrerit luctus. Curabitur sit amet
          mauris id nisi vehicula accumsan. Curabitur lobortis dolor sed nunc
          consectetur, vel lobortis felis rhoncus. Etiam elit dolor, convallis
          id felis in, vulputate condimentum turpis. Morbi faucibus lacinia leo,
          sit amet eleifend purus. In vulputate velit velit, ut euismod lorem
          semper ac. Maecenas dapibus est in odio volutpat mattis.
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
          Heading 3
        </Heading>
        <Paragraph>
          Suspendisse in vulputate dui, sed rutrum arcu. Nunc vitae fermentum
          nunc, ut dignissim quam. Fusce at dolor venenatis nulla gravida
          ornare. Proin pulvinar tincidunt nisl, eu venenatis elit consequat et.
          Suspendisse blandit felis quis ante hendrerit, vitae aliquet odio
          lobortis. Vivamus at ex id magna cursus consectetur id luctus elit.
          Vivamus vitae ex vel sapien convallis commodo in quis eros. Nunc a
          volutpat urna. Nulla neque massa, commodo at maximus et, mollis ac
          mauris. Aenean ultrices lobortis libero et mattis. Etiam in urna vel
          sapien efficitur maximus id sed leo. Nunc at leo elit. Maecenas
          pretium maximus dolor in molestie.
        </Paragraph>
        <Heading level={4} id="heading-4" data-size="sm">
          Heading 4
        </Heading>
        <Paragraph>
          Donec at pellentesque lacus. Integer pretium, nulla vitae tincidunt
          tincidunt, mauris augue facilisis sapien, eget pulvinar odio ex
          accumsan nulla. Proin venenatis rhoncus suscipit. Proin ac ex viverra,
          laoreet enim at, tempor elit. Nunc diam eros, congue pharetra ligula
          in, luctus molestie nibh. Donec placerat ac lacus a feugiat. Sed justo
          elit, vestibulum id iaculis fermentum, ornare a nisi. Aliquam luctus
          dolor nunc, vitae posuere purus pretium a. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam
          sit amet risus venenatis, imperdiet nulla vitae, consectetur augue. Ut
          et est ac urna suscipit sodales non eget nibh.
        </Paragraph>
        <Heading level={2} id="heading-5" data-size="lg">
          Heading 5
        </Heading>
        <Paragraph>
          Quisque lacinia sodales purus non lobortis. Quisque bibendum, nulla ut
          viverra tempor, nisl nibh dictum tellus, ac dapibus quam est non dui.
          Integer fringilla commodo lectus ut suscipit. Nulla at porttitor eros.
          Cras consequat ex nec pellentesque pharetra. Vivamus facilisis
          consequat velit sit amet pretium. Ut posuere id lectus sit amet
          consectetur. Nam faucibus malesuada ipsum eu tincidunt. Sed orci nibh,
          condimentum et consequat ut, tristique nec ligula. Mauris tempor neque
          vehicula neque facilisis, a mattis risus luctus. Donec et ligula
          lobortis, congue ex vitae, facilisis ante.
        </Paragraph>
      </div>
    );
  },
};
