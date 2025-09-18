import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  TableOfContents,
  Heading,
  Paragraph,
  usePopulateToc,
} from '@udir-design/react/alpha';
import styles from './TableOfContents.module.css';

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
      { level: 2, name: 'Seksjon 1', id: 'seksjon-1' },
      { level: 3, name: 'Seksjon 2', id: 'seksjon-2' },
      { level: 2, name: 'Seksjon 3', id: 'seksjon-3' },
    ],
    'data-color': 'neutral',
  },
  render: (args) => {
    return <TableOfContents {...args} />;
  },
};

export const Sticky: Story = {
  args: {
    headings: [
      { level: 2, name: 'Hvem har ansvaret?', id: 'hvem-har-ansvaret' },
      { level: 2, name: 'Hvor gjelder forbudet?', id: 'hvem-gjelder-forbudet' },
      {
        level: 2,
        name: 'Hvem skal forbudet verne?',
        id: 'hvem-skal-forbudet-verne',
      },
      {
        level: 2,
        name: 'Innholdet i reklameforbudet',
        id: 'innholdet-i-reklameforbudet',
      },
    ],
    'data-color': 'support1',
  },
  render: (args) => (
    <div
      style={{ maxHeight: '500px', overflow: 'auto' }}
      className={styles.prose}
    >
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
      <Heading level={2} id="hvor-gjelder-forbudet" data-size="lg">
        Hvor gjelder forbudet?
      </Heading>
      <Paragraph>
        I opplæringsloven går det frem at reklameforbudet blant annet gjelder
        skolen sitt område, lærebøker og læremidler. Vi omtaler disse områdene
        særskilt under. Dette er ikke en uttømmende opplisting av hvor
        reklameforbudet gjelder, men områder som er trukket frem som sentrale
        deler av skolehverdagen for elevene. Det betyr at reklameforbudet også
        kan gjelde for andre områder enn det som er nevnt i loven, se
        forarbeidene til § 27-1.
      </Paragraph>
      <Heading level={2} id="innholdet-i-reklameforbudet" data-size="lg">
        Innholdet i reklameforbudet
      </Heading>
      <Paragraph>
        Reklame kan ha mange uttrykksformer - både tradisjonelle og mer subtile
        eller utradisjonelle. Uttrykksformene brukes av kommersielle aktører for
        å selge varer eller tjenester, samt påvirke holdninger og verdier. Det
        inkluderer både reklame i tradisjonell forstand, sponsing og andre
        former for salgsfremmende tiltak, for eksempel fra aktører innen
        russeindustrien. Forbudet er også ment å ramme reklame som innebærer
        kommersiell utnyttelse av elevenes personopplysninger, og redusere
        reklamepresset i tjenestene skolene bruker i undervisningen.
      </Paragraph>
    </div>
  ),
};

export const Automatic: Story = {
  args: {
    'data-color': 'accent',
  },
  render: (args) => (
    <div id="populate-area" className={styles.prose}>
      <Heading level={1} id="heading-1" data-size="xl">
        Heading 1
      </Heading>
      <Paragraph data-size="lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui nunc,
        maximus vitae finibus ut, consequat sit amet metus. Suspendisse nisl
        massa, egestas eu justo eu, luctus volutpat ante. Aliquam congue
        consectetur arcu, at pharetra nunc ultricies in. Sed aliquam mi a odio
        varius, in eleifend orci elementum.
      </Paragraph>
      <TableOfContents
        {...args}
        headings={usePopulateToc({
          container: document.getElementById('populate-area') ?? undefined,
        })}
      />
      <Heading level={2} id="heading-2" data-size="lg">
        Heading 2
      </Heading>
      <Paragraph>
        Vestibulum ut mauris quis elit hendrerit luctus. Curabitur sit amet
        mauris id nisi vehicula accumsan. Curabitur lobortis dolor sed nunc
        consectetur, vel lobortis felis rhoncus. Etiam elit dolor, convallis id
        felis in, vulputate condimentum turpis. Morbi faucibus lacinia leo, sit
        amet eleifend purus. In vulputate velit velit, ut euismod lorem semper
        ac. Maecenas dapibus est in odio volutpat mattis.
      </Paragraph>
      <Paragraph>
        Vestibulum volutpat augue sed dui tristique, eget accumsan massa
        laoreet. Sed consequat, ex ullamcorper tempus faucibus, nibh quam
        dignissim augue, iaculis vestibulum arcu magna id mauris. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Duis sollicitudin massa id
        leo auctor viverra vel vitae felis. Mauris vehicula porttitor congue.
      </Paragraph>
      <Heading level={3} id="heading-3" data-size="md">
        Heading 3
      </Heading>
      <Paragraph>
        Suspendisse in vulputate dui, sed rutrum arcu. Nunc vitae fermentum
        nunc, ut dignissim quam. Fusce at dolor venenatis nulla gravida ornare.
        Proin pulvinar tincidunt nisl, eu venenatis elit consequat et.
        Suspendisse blandit felis quis ante hendrerit, vitae aliquet odio
        lobortis. Vivamus at ex id magna cursus consectetur id luctus elit.
        Vivamus vitae ex vel sapien convallis commodo in quis eros. Nunc a
        volutpat urna. Nulla neque massa, commodo at maximus et, mollis ac
        mauris. Aenean ultrices lobortis libero et mattis. Etiam in urna vel
        sapien efficitur maximus id sed leo. Nunc at leo elit. Maecenas pretium
        maximus dolor in molestie.
      </Paragraph>
      <Heading level={4} id="heading-4" data-size="sm">
        Heading 4
      </Heading>
      <Paragraph>
        Donec at pellentesque lacus. Integer pretium, nulla vitae tincidunt
        tincidunt, mauris augue facilisis sapien, eget pulvinar odio ex accumsan
        nulla. Proin venenatis rhoncus suscipit. Proin ac ex viverra, laoreet
        enim at, tempor elit. Nunc diam eros, congue pharetra ligula in, luctus
        molestie nibh. Donec placerat ac lacus a feugiat. Sed justo elit,
        vestibulum id iaculis fermentum, ornare a nisi. Aliquam luctus dolor
        nunc, vitae posuere purus pretium a. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Nam sit amet
        risus venenatis, imperdiet nulla vitae, consectetur augue. Ut et est ac
        urna suscipit sodales non eget nibh.
      </Paragraph>
      <Heading level={2} id="heading-5" data-size="lg">
        Heading 5
      </Heading>
      <Paragraph>
        Quisque lacinia sodales purus non lobortis. Quisque bibendum, nulla ut
        viverra tempor, nisl nibh dictum tellus, ac dapibus quam est non dui.
        Integer fringilla commodo lectus ut suscipit. Nulla at porttitor eros.
        Cras consequat ex nec pellentesque pharetra. Vivamus facilisis consequat
        velit sit amet pretium. Ut posuere id lectus sit amet consectetur. Nam
        faucibus malesuada ipsum eu tincidunt. Sed orci nibh, condimentum et
        consequat ut, tristique nec ligula. Mauris tempor neque vehicula neque
        facilisis, a mattis risus luctus. Donec et ligula lobortis, congue ex
        vitae, facilisis ante.
      </Paragraph>
    </div>
  ),
};
