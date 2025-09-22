import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from 'src/components/alert';
import { Details } from 'src/components/details/Details';
import { Divider } from 'src/components/divider/Divider';
import { List } from 'src/components/list/List';
import { Table } from 'src/components/table';
import { TableOfContents } from 'src/components/tableOfContents/TableOfContents';
import { useTableOfContents } from 'src/utilities/hooks/useTableOfContents/useTableOfContents';
import { Heading } from '../heading/Heading';
import { Paragraph } from '../paragraph/Paragraph';
import { Prose } from './Prose';

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Prose style={{ maxWidth: '50rem' }}>
          <Alert>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Alert>
          <Heading data-size="lg" level={1}>
            Sidetittel (h1)
          </Heading>
          <Paragraph data-size="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            vitae lacus ullamcorper, malesuada risus sed, consequat est. Donec
            lobortis leo et condimentum consequat.
          </Paragraph>
          <div>
            <Divider />
            Lorem ipsum | Sist endret: 29.05.2024
            <Divider />
          </div>
          <TableOfContents
            {...useTableOfContents()}
            data-color="accent"
            variant="tinted"
          />
          <Heading data-size="md" id="first-heading" level={2}>
            Første overskrift (h2)
          </Heading>
          <Paragraph>
            Aenean vehicula leo et euismod rutrum. Donec eget orci est. Vivamus
            sapien magna, dictum at velit quis, mattis molestie eros. Vivamus
            vitae purus purus. Maecenas mollis elementum aliquam. Donec
            efficitur urna sed ante consectetur, in scelerisque lectus
            tristique. Ut et nunc turpis. Mauris faucibus sagittis est nec
            mollis. Pellentesque sollicitudin nisl mauris, at dapibus mi
            vestibulum non.
          </Paragraph>
          <Heading data-size="sm" id="first-subheading" level={3}>
            Første underoverskrift (h3)
          </Heading>
          <Paragraph>
            Maecenas nibh justo, lobortis in volutpat eget, tempor et tortor.
            Curabitur tristique tellus at ligula congue, a tincidunt turpis
            tincidunt. Aliquam erat volutpat. Ut ac semper neque.
          </Paragraph>
          <Heading level={3} id="second-subheading" data-size="sm">
            Andre underoverskrift (h3)
          </Heading>
          <Paragraph>
            In quis fermentum enim, a rhoncus dui. Quisque in placerat nisi.
            Praesent sollicitudin ante eu lacus sagittis aliquet. Cras ut
            gravida nisi. In sed sapien eu nulla rhoncus fringilla. Mauris nec
            orci mollis, tincidunt purus a, tempor mauris. Integer faucibus nisi
            a sem laoreet dapibus sed a tellus. Proin sit amet velit vel lacus
            faucibus laoreet. Vivamus in rutrum enim. Fusce nulla nisl, iaculis
            vitae quam sit amet, vehicula semper sem.
          </Paragraph>
          <Table tintedColumnHeader data-color="accent" zebra>
            <caption>Tabelloverskrift</caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Radoverskrift</Table.HeaderCell>
                <Table.HeaderCell>Radoverskrift</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {dummyData.map((item) => (
                <Table.Row>
                  <Table.Cell>{item.kommune}</Table.Cell>
                  <Table.Cell>{item.tildeling}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Heading level={2} id="second-heading" data-size="md">
            Andre overskrift (h2)
          </Heading>
          <Paragraph>
            Suspendisse lobortis nunc vitae nisi volutpat, vitae interdum sem
            faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse turpis nisi, blandit ut gravida sed, efficitur ac
            ligula.
          </Paragraph>
          <List.Unordered>
            <List.Item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </List.Item>
            <List.Item>
              Phasellus sit amet mauris ac massa convallis egestas at eu sapien.
            </List.Item>
            <List.Item>
              Nullam ac eros vulputate, tempus tellus cursus, volutpat nisi.
            </List.Item>
            <List.Item>
              Nullam consectetur nunc a pretium pellentesque.
            </List.Item>
            <List.Item>Aliquam cursus sapien nec tincidunt porta.</List.Item>
          </List.Unordered>
          <Heading data-size="md" id="third-heading" level={2}>
            Tredje overskrift (h2)
          </Heading>
          <Paragraph>
            Praesent eros elit, aliquet at auctor vel, pulvinar id augue.
            Suspendisse eu orci sit amet turpis mattis blandit sit amet ut
            massa. Aenean vel consequat ex. Nunc luctus nulla a diam iaculis
            iaculis. Aliquam suscipit arcu vel luctus posuere.
          </Paragraph>
          <Paragraph>
            Ut sit amet scelerisque odio, a ullamcorper quam. Praesent ornare
            diam sit amet magna feugiat, nec aliquet arcu pharetra. Cras
            condimentum tempus augue, in posuere dolor fermentum quis.
          </Paragraph>
          <div>
            <Details>
              <Details.Summary>Første details</Details.Summary>
              <Details.Content>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus vitae lacus ullamcorper, malesuada risus sed,
                  consequat est. Donec lobortis leo et condimentum consequat.
                  Aenean vehicula leo et euismod rutrum. Donec eget orci est.
                </Paragraph>
                <Paragraph style={{ marginTop: 'var(--ds-size-5)' }}>
                  Vivamus sapien magna, dictum at velit quis, mattis molestie
                  eros. Vivamus vitae purus purus. Maecenas mollis elementum
                  aliquam. Donec efficitur urna sed ante consectetur, in
                  scelerisque lectus tristique.
                </Paragraph>
              </Details.Content>
            </Details>
            <Details>
              <Details.Summary>Andre details</Details.Summary>
              <Details.Content>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus vitae lacus ullamcorper, malesuada risus sed,
                  consequat est. Donec lobortis leo et condimentum consequat.
                  Aenean vehicula leo et euismod rutrum. Donec eget orci est.
                </Paragraph>
              </Details.Content>
            </Details>
          </div>
        </Prose>
      </div>
    );
  },
};

const dummyData = [
  {
    id: 1,
    kommune: 'Lorem ipsum',
    tildeling: '330 000',
  },
  {
    id: 2,
    kommune: 'Lorem ipsum',
    tildeling: '750 000',
  },
  {
    id: 3,
    kommune: 'Lorem ipsum',
    tildeling: '150 000',
  },
  {
    id: 4,
    kommune: 'Lorem ipsum',
    tildeling: '550 000',
  },
];

export const Headings: Story = {
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Prose style={{ maxWidth: '50rem' }}>
          <Heading level={1} data-size="2xl">
            Heading xxl
          </Heading>
          <Paragraph data-size="xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
          <Heading level={2} data-size="xl">
            Heading xl
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
          <Heading level={3} data-size="lg">
            Heading lg
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
          <Heading level={4} data-size="md">
            Heading md
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
          <Heading level={5} data-size="sm">
            Heading sm
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
          <Heading level={6} data-size="xs">
            Heading xs
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
          <Heading level={6} data-size="2xs">
            Heading xxs
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt eleifend nulla vel aliquam. Vestibulum semper in dolor vel
            scelerisque. Cras justo sapien, ultricies a pretium ac, porta vitae
            lorem. Suspendisse tortor nisl, porttitor eget cursus quis,
            facilisis et lacus. Sed sit amet laoreet orci.
          </Paragraph>
        </Prose>
      </div>
    );
  },
};
