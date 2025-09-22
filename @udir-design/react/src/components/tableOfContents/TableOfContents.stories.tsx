import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  TableOfContents,
  Heading,
  Paragraph,
  useTableOfContents,
} from '@udir-design/react/alpha';
import styles from './docs/TableOfContents.module.css';
import { useRef } from 'react';

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

export const Preview: Story = {
  args: {
    headings: [
      { level: 2, name: 'Første overskrift (h2)', id: 'forste-overskrift' },
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
      { level: 2, name: 'Fjerde overskrift (h2)', id: 'fjerde-overskrift' },
    ],
    'data-color': 'neutral',
  },
  render: (args) => {
    return <TableOfContents {...args} />;
  },
};

export const Manual: Story = {
  args: {
    headings: [
      { level: 2, name: 'Hvem har ansvaret?', id: 'hvem-har-ansvaret' },
      {
        level: 2,
        name: 'Hvem skal forbudet verne?',
        id: 'hvem-skal-forbudet-verne',
      },
    ],
    variant: 'tinted',
    'data-color': 'support1',
  },
  render: (args) => (
    <div className={styles.prose}>
      <Heading level={1} data-size="xl">
        Veileder om reklameforbudet i skolen
      </Heading>
      <Paragraph>
        Barn og unge møter et stadig økende kommersielt press. Skolen skal være
        en trygg og ikke-kommersialisert arena for barn og unge.
      </Paragraph>
      <TableOfContents {...args} />
      <Heading level={2} id="hvem-har-ansvaret" data-size="lg">
        Hvem har ansvaret?
      </Heading>
      <Paragraph>
        Opplæringsloven pålegger kommuner og fylkeskommuner å hindre at alle
        elever utsettes for reklame som er egnet til å skape kommersielt press
        eller som er egnet til å påvirke elevenes holdninger, oppførsel og
        verdier.
      </Paragraph>
      <Paragraph>
        Kommunen og fylkeskommunen kan delegere oppgaven med å overholde
        reklameforbudet til skolene, men kommunen og fylkeskommunen kan ikke
        delegere ansvaret. De må sikre at skolene ivaretar oppgaven i tråd med
        regelverket. Kommunen og fylkeskommunen skal uansett ha internkontroll
        med administrasjonens virksomhet for å sikre at regelverket følges.
      </Paragraph>
      <Heading level={2} id="hvem-skal-forbudet-verne" data-size="lg">
        Hvem skal forbudet verne?
      </Heading>
      <Paragraph>
        Reklameforbudet skal skjerme elever mot ulovlig reklame. Det er ikke
        eksplisitt fastsatt at reklameforbudet gjelder for barn i
        skolefritidsordningen (SFO) eller for barn og unge kulturskolen, men vi
        anbefaler at kommunen også praktiserer et tilsvarende reklameforbud her.
      </Paragraph>
      <Paragraph>
        Reklameforbudet gjelder ikke for de som har tegnet kontrakt om opplæring
        i bedrift etter kapittel 7 i opplæringsloven. Det gjelder heller ikke
        for voksne som mottar opplæring etter opplæringsloven kapittel 18 flg.
      </Paragraph>
    </div>
  ),
};

export const Automatic: Story = {
  args: {
    variant: 'tinted',
    'data-color': 'accent',
  },
  render: (args) => {
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
        <TableOfContents {...args} {...useTableOfContents({ containerRef })} />
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
