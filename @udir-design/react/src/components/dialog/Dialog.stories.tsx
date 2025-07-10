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
  List,
  Textarea,
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
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Preview: Story = {
  args: { closedby: 'any' },
  render: (args) => (
    <Dialog.TriggerContext>
      <Dialog.Trigger data-size={args['data-size']}>Åpne Dialog</Dialog.Trigger>
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
  play: async (ctx) => {
    await meta.play?.(ctx);
    const canvas = within(ctx.canvasElement);
    const dialog = canvas.getByRole('dialog');
    const button = canvas.getByRole('button', {
      name: /åpne dialog/i,
    });

    await ctx.step('Dialog is open', async () => {
      await expect(dialog).toBeInTheDocument();
      await expect(dialog).toHaveAttribute('open');
    });

    await ctx.step('Dialog has content', async () => {
      const heading = within(dialog).getByRole('heading', {
        name: /dialog header/i,
      });
      const paragraph = within(dialog).getByText(
        /lorem ipsum dolor sit, amet consectetur adipisicing elit/i,
      );
      const footer = within(dialog).getByText(/dialog footer/i);
      await expect(heading).toBeInTheDocument();
      await expect(paragraph).toBeInTheDocument();
      await expect(footer).toBeInTheDocument();
    });

    await ctx.step('Close with blur', async () => {
      await userEvent.click(document.body);
      // Dialog has open="" when closed by blur
      await expect(dialog).toHaveAttribute('open', '');
    });

    await userEvent.click(button);
    await ctx.step('Close with close button', async () => {
      const closeButton = within(dialog).getByRole('button');
      await userEvent.click(closeButton);
      // Dialog does not have open attribute when closed by close button
      await expect(dialog).not.toHaveAttribute('open');
    });
    await userEvent.click(button);
  },
};

export const WithoutDialogTriggerContext: Story = {
  render(args) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => dialogRef.current?.showModal()}
        >
          Åpne Dialog
        </Button>
        <Dialog {...args} ref={dialogRef}>
          <Paragraph data-size="sm">Dialog subtittel</Paragraph>
          <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
            Her bruker vi <code>ref</code> for å åpne dialogen
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
        <Dialog.Trigger variant="secondary">Åpne Dialog</Dialog.Trigger>
        <Dialog ref={dialogRef} closedby="any">
          <Heading>
            Dialog med <code>closedby="any"</code>
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
      <Dialog.Trigger>Gå til neste</Dialog.Trigger>
      <Dialog>
        <Dialog.Block>
          <Paragraph data-size="sm">Undertittel</Paragraph>
          <Heading>Dette må du vite før du går videre</Heading>
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
        <Dialog.Block>Footer</Dialog.Block>
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
        <Dialog.Trigger>Send inn skjema</Dialog.Trigger>
        <Dialog
          ref={dialogRef}
          onClose={() => setInput('')}
          closedby="any"
          {...args}
        >
          <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
            Skjemainnsending
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
              gap: 'var(--ds-size-2)',
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
      <Dialog.Trigger variant="secondary">Åpne Dialog</Dialog.Trigger>
      <Dialog style={{ maxWidth: 1200 }}>
        <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
          Dialog som er veldig bred
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
  render(ctx) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return (
      <Dialog.TriggerContext>
        <Dialog.Trigger variant="secondary">Åpne Dialog</Dialog.Trigger>
        <Dialog style={{ overflow: 'visible' }} ref={dialogRef}>
          <Dialog.Block>
            <Heading>Dialog med innhold utenfor</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Field>
              <Label>Velg en kommune</Label>
              <Suggestion>
                <Suggestion.Chips />
                <Suggestion.Input id={`${ctx.id}-input`} />
                <Suggestion.Clear />
                <Suggestion.List>
                  <Suggestion.Empty>Tomt</Suggestion.Empty>
                  {DATA_PLACES.map((place) => (
                    <Suggestion.Option key={place} label={place} value={place}>
                      {place}
                      <div>Kommune</div>
                    </Suggestion.Option>
                  ))}
                </Suggestion.List>
              </Suggestion>
            </Field>
          </Dialog.Block>
          <Dialog.Block
            style={{
              display: 'flex',
              gap: 'var(--ds-size-2)',
            }}
          >
            <Button
              onClick={() => {
                window.alert(`Skjema er sendt inn`);
                dialogRef.current?.close();
              }}
            >
              Send inn
            </Button>
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
      display: 'flex',
      height: '400px',
      alignItems: 'center',
      gap: 'var(--ds-size-4)',
    },
  },
  render(context) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return (
      <>
        <Field style={{ width: '400px' }}>
          <Label>Besvarelse</Label>
          <Textarea id={'textarea' + context.id} rows={8} />
        </Field>
        <Button variant="secondary" onClick={() => dialogRef.current?.show()}>
          Åpne skrivetips
        </Button>
        <Dialog
          ref={dialogRef}
          modal={false}
          style={{
            width: '300px',
            left: '80%',
          }}
        >
          <Heading style={{ marginBottom: 'var(--ds-size-2)' }}>
            Hva besvarelsen burde inneholde
          </Heading>
          <List.Unordered>
            <List.Item>Intro til prosjektet</List.Item>
            <List.Item>Oversikt over hva som er gjort i prosjektet</List.Item>
            <List.Item>Beskrivelse av prosjektmålene</List.Item>
            <List.Item>Metode for å oppnå prosjektmålene</List.Item>
            <List.Item>Leveranse</List.Item>
          </List.Unordered>
        </Dialog>
      </>
    );
  },
  play: async (ctx) => {
    await meta.play?.(ctx);
    const canvas = within(ctx.canvasElement);
    const dialog = canvas.getByRole('dialog');

    await ctx.step('Dialog is open', async () => {
      await expect(dialog).toBeInTheDocument();
      await expect(dialog).toHaveAttribute('open');
    });

    await ctx.step(
      'Interaction outside dialog when dialog is open',
      async () => {
        await userEvent.click(document.body);
        await expect(dialog).toHaveAttribute('open');
      },
    );
  },
};
