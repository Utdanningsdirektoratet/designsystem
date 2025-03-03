import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon, TrashFillIcon } from '@navikt/aksel-icons';
import {
  Button,
  Card,
  Field,
  Heading,
  Label,
  Paragraph,
  Select,
  Textfield,
} from '../../alpha';

const IllustrativeImg = () => (
  <img
    src={
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
    alt="studenter"
  />
);

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['alpha'],
  parameters: {
    customStyles: {
      width: '100%',
      maxWidth: 800,
      alignItems: 'center',
      display: 'grid',
      gap: 'var(--ds-size-4)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px , 320px))',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Preview: Story = {
  args: {
    'data-color': 'neutral',
    children: [
      <Heading>Card Neutral</Heading>,
      <Paragraph>
        Most provide as with carried business are much better more the perfected
        designer. Writing slightly explain desk unable at supposedly about this
      </Paragraph>,
      <Paragraph data-size="sm">Footer text</Paragraph>,
    ],
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      <Card data-color="neutral" {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Card Neutral
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
      </Card>
      <Card data-color="accent" {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Card Accent
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
      </Card>
      <Card data-color="subtle" {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Card Subtle
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
      </Card>
      <Card data-color="support1" {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Card Support1
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
      </Card>
      <Card data-color="support2" {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Card Support2
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
      </Card>
    </>
  ),
};

export const Media: Story = {
  render: (args) => (
    <>
      <Card {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>Card Neutral</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
      </Card>
      <Card {...args}>
        <Card.Block>
          <Heading>Card Neutral</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
        </Card.Block>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
      </Card>
    </>
  ),
};

export const Video: Story = {
  args: {
    'data-color': 'neutral',
    children: [
      <Card.Block>
        <iframe
          data-chromatic="ignore"
          src="https://player.vimeo.com/video/863563441?app_id=122963&amp;title=0&amp;byline=0&amp;portrait=0&amp;dnt=1"
          width="320px"
          height="179px"
          allow="autoplay; fullscreen; picture-in-picture"
          title="30 år med digitalt innsyn"
        ></iframe>
      </Card.Block>,
      <Card.Block>
        <Heading>
          <a
            href="https://www.digdir.no/felleslosninger/30-ar-med-digitalt-innsyn/5015"
            target="_blank"
            rel="noreferrer"
          >
            Vi feira 30 år med digitalt innsyn
          </a>
        </Heading>
        <Paragraph>
          Det er i år 30 år sidan dei første forsøka med elektronisk postjournal
          i Noreg. Sjå opptak frå feiringa på Pressens Hus der det både var
          historiske tilbakeblikk og debatt om innsyn og openheit i
          forvaltninga.
        </Paragraph>
      </Card.Block>,
    ],
  },
};

const options = [
  { value: 'daglig leder', label: 'Dalig leder' },
  { value: 'forretningsfører', label: 'Forretningsfører' },
];

export const Composed: Story = {
  render: (args, context) => (
    <div
      style={{
        display: 'grid', // Used to test Card.Block border logic
        gap: 'var(--ds-size-4)',
        gridColumn: '1 / -1',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px , 1fr))',
        width: '100%',
      }}
    >
      <Card {...args}>
        <Card.Block>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Heading>Rolle 1</Heading>
            <Button variant="secondary" data-color="danger" data-size="sm">
              <TrashFillIcon aria-hidden />
              Fjern
            </Button>
          </div>
        </Card.Block>
        <Card.Block>
          <Field>
            <Label>Velg rolle</Label>
            <Select id={context.id + '-role'}>
              {options.map(({ value, label }, index) => (
                <Select.Option key={index} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Field>
          <Textfield
            id={context.id + '-nationality-number'}
            label="Fødsels- eller d-nummer"
          />
          <Textfield id={context.id + '-last-name'} label="Etternavn" />
        </Card.Block>
        <Card.Block>
          <Button variant="secondary" data-color="accent" data-size="sm">
            Legg til rolle
            <PlusIcon aria-hidden />
          </Button>
        </Card.Block>
      </Card>
      <Card {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>Card Neutral</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this.
          </Paragraph>
        </Card.Block>
      </Card>
    </div>
  ),
};

export const WithLink: Story = {
  render: (args) => (
    <>
      <Card data-color="support1" {...args}>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Link Card
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
          <Paragraph data-size="sm">Footer text</Paragraph>
        </Card.Block>
      </Card>
      <Card {...args} data-color="neutral">
        <Card.Block>
          <Heading>
            <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
              Link Card
            </a>
          </Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer. Writing slightly explain desk unable at
            supposedly about this
          </Paragraph>
          <Paragraph data-size="sm">Footer text</Paragraph>
        </Card.Block>
        <Card.Block>
          <IllustrativeImg />
        </Card.Block>
      </Card>
    </>
  ),
};

export const AsLink: Story = {
  render: (args) => (
    <>
      <Card {...args} data-color="support1" asChild>
        <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
          <Card.Block>
            <Heading>Link Card with blocks</Heading>
          </Card.Block>
          <Card.Block>
            <Paragraph>
              Most provide as with carried business are much better more the
              perfected designer.
            </Paragraph>
          </Card.Block>
        </a>
      </Card>
      <Card {...args} data-color="neutral" asChild>
        <a href="https://udir.no" target="_blank" rel="noopener noreferrer">
          <Heading>Link Card</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer.
          </Paragraph>
        </a>
      </Card>
    </>
  ),
};

export const AsButton: Story = {
  render: (args) => (
    <>
      <Card {...args} data-color="support1" asChild>
        <button type="button">
          <Card.Block>
            <Heading>Button Card with blocks</Heading>
          </Card.Block>
          <Card.Block>
            <Paragraph>
              Most provide as with carried business are much better more the
              perfected designer.
            </Paragraph>
          </Card.Block>
        </button>
      </Card>
      <Card {...args} data-color="neutral" asChild>
        <button type="button">
          <Heading>Link Card</Heading>
          <Paragraph>
            Most provide as with carried business are much better more the
            perfected designer.
          </Paragraph>
        </button>
      </Card>
    </>
  ),
};

export const AsGrid: Story = {
  args: {
    style: { display: 'grid', gridTemplateColumns: '1fr 1fr' },
    children: [
      <Card.Block>
        <Heading>Button Card with blocks</Heading>
      </Card.Block>,
      <Card.Block>
        <Paragraph>
          Most provide as with carried business are much better more the
          perfected designer.
        </Paragraph>
      </Card.Block>,
    ],
  },
};
