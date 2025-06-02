import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Heading,
  Paragraph,
  Textfield,
  Dialog,
  Field,
  Label,
  Suggestion,
} from '@udir-design/react/alpha';
import { expect, userEvent, within } from 'storybook/test';
import { useRef, useState } from 'react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['alpha'],
  parameters: {
    customStyles: {
      display: 'grid',
      alignItems: 'start',
      justifyItems: 'center',
      story: {
        boxSizing: 'border-box',
        height: '100cqh',
        width: '100cqw',
      },
    },
    chromatic: {
      modes: {
        desktop: {
          viewport: { height: 1080 },
        },
      },
    },
  },
  play: async (ctx) => {
    // When not in Docs mode, automatically open the dialog
    const canvas = within(ctx.canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    // Wait for dialog to fade in before running tests
    const dialog = canvas.getByRole('dialog');
    await new Promise<void>((resolve) => {
      dialog.addEventListener('animationend', () => {
        resolve();
      });
    });

    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute('open');
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Preview: Story = {
  render: (args) => (
    <Dialog.TriggerContext>
      <Dialog.Trigger
        data-color={args['data-color']}
        data-size={args['data-size']}
      >
        Open Dialog
      </Dialog.Trigger>
      <Dialog {...args}>
        <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
          Dialog header
        </Heading>
        <Paragraph style={{ marginBottom: 'var(--ds-size-2)' }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          doloremque obcaecati assumenda odio ducimus sunt et.
        </Paragraph>
        <Paragraph data-size="sm">Dialog footer</Paragraph>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

export const WithoutDialogTriggerContext: Story = {
  render(args) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return (
      <>
        <Button onClick={() => dialogRef.current?.showModal()}>
          Open Dialog
        </Button>
        <Dialog {...args} ref={dialogRef}>
          <Paragraph data-size="sm">Dialog subtittel</Paragraph>
          <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
            Dialog header
          </Heading>
          <Paragraph style={{ marginBottom: 'var(--ds-size-2)' }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
          Dialog footer
        </Dialog>
      </>
    );
  },
};

export const DialogWithOpenProp: Story = {
  render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen((prev) => !prev)}>
          Open Dialog with prop
        </Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <Paragraph data-size="sm">Dialog subtittel</Paragraph>
          <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
            Dialog header
          </Heading>
          <Paragraph style={{ marginBottom: 'var(--ds-size-2)' }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
          Dialog footer
        </Dialog>
      </>
    );
  },
};

export const BackdropClosedbyAny: Story = {
  render() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <Dialog.TriggerContext>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog ref={dialogRef} closedby="any">
          <Heading>
            Dialog med <code>closedby="any"</code> og en veldig lang tittel
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
          <Paragraph data-size="sm">Dialog footer</Paragraph>
        </Dialog>
      </Dialog.TriggerContext>
    );
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog>
        <Dialog.Block>
          <Paragraph data-size="sm">Her er det også divider</Paragraph>
          <Heading>Vi kan legge divider under header</Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph style={{ marginBottom: 'var(--ds-size-2)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sodales eros justo. Aenean non mi ipsum. Cras viverra elit nec
            vulputate mattis. Nunc placerat euismod pulvinar. Sed nec fringilla
            nulla, sit amet ultricies ante. Morbi egestas venenatis massa, eu
            interdum leo rutrum eu. Nulla varius, mi ac feugiat lacinia, magna
            eros ullamcorper arcu, vel tincidunt erat leo nec tortor. Sed ut dui
            arcu. Morbi commodo ipsum hendrerit est imperdiet imperdiet. Etiam
            sed maximus nisi. Quisque posuere posuere orci, non egestas risus
            facilisis a. Vivamus non tempus felis, in maximus lorem. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </Paragraph>
          <Paragraph>
            Etiam nec tincidunt est. Integer semper sodales efficitur.
            Pellentesque pellentesque varius leo id congue. Integer lacinia
            porttitor massa id euismod. Maecenas porta, magna nec interdum
            eleifend, risus magna condimentum neque, a gravida nisl risus a
            elit. Donec accumsan metus et lectus placerat varius. Donec
            tristique odio arcu. Donec cursus leo a dui auctor pulvinar. Sed in
            elit urna. Nunc vitae magna sed nibh elementum dignissim et ut
            massa.
          </Paragraph>
        </Dialog.Block>
        <Dialog.Block>Og over footer</Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

export const DialogWithForm: Story = {
  render(args, context) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [input, setInput] = useState('');

    return (
      <Dialog.TriggerContext>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog
          ref={dialogRef}
          onClose={() => setInput('')}
          closedby="any"
          {...args}
        >
          <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
            Dialog med skjema
          </Heading>
          <Textfield
            // @ts-expect-error We want the native "autofocus" and Reacts onMount smartness (see https://react.dev/reference/react-dom/components/input#input)
            autofocus="true"
            label="Navn"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id={context.id}
          />
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-4)',
              marginTop: 'var(--ds-size-4)',
            }}
          >
            <Button
              onClick={() => {
                window.alert(`Du har sendt inn skjema med navn: ${input}`);
                dialogRef.current?.close();
              }}
            >
              Send inn skjema
            </Button>
            <Button
              variant="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Avbryt
            </Button>
          </div>
        </Dialog>
      </Dialog.TriggerContext>
    );
  },
};

export const DialogWithMaxWidth: Story = {
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog style={{ maxWidth: 1200 }}>
        <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
          Dialog med en veldig lang bredde
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          doloremque obcaecati assumenda odio ducimus sunt et.
        </Paragraph>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

const DATA_PLACES = [
  'Sogndal',
  'Oslo',
  'Brønnøysund',
  'Stavanger',
  'Trondheim',
  'Bergen',
  'Lillestrøm',
];

export const DialogWithSuggestion: Story = {
  render(args, ctx) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <Dialog.TriggerContext>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog style={{ overflow: 'visible' }} ref={dialogRef}>
          <Dialog.Block>
            <Heading>Dialog med suggestion</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Field>
              <Label>Velg en destinasjon</Label>
              <Suggestion>
                <Suggestion.Input id={`${ctx.id}-input`} />
                <Suggestion.Clear />
                <Suggestion.List>
                  <Suggestion.Empty>Tomt</Suggestion.Empty>
                  {DATA_PLACES.map((place) => (
                    <Suggestion.Option key={place} value={place}>
                      {place}
                      <div>Kommune</div>
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            </Field>
          </Dialog.Block>
          <Dialog.Block>
            <Button
              variant="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Avbryt
            </Button>
          </Dialog.Block>
        </Dialog>
      </Dialog.TriggerContext>
    );
  },
  parameters: {
    a11y: {
      // TODO: these rules should be enabled after figuring out why they occur.
      // for some reason it says `aria-expanded` is not allowed
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: false,
          },
          /* It does not like role="combobox" either */
          {
            id: 'aria-allowed-role',
            enabled: false,
          },
        ],
      },
    },
  },
};

export const DialogNonModal: Story = {
  parameters: {
    customStyles: {
      padding: 'var(--ds-size-18)',
    },
  },
  render() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <>
        <Button onClick={() => dialogRef.current?.show()}>Open Dialog</Button>
        <Dialog ref={dialogRef} modal={false}>
          <Heading>Non-modal dialog</Heading>
          <Paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            doloremque obcaecati assumenda odio ducimus sunt et.
          </Paragraph>
        </Dialog>
      </>
    );
  },
};
