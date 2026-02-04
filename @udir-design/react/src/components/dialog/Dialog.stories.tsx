import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Field } from '../field/Field';
import { Fieldset } from '../fieldset/Fieldset';
import { List } from '../list/List';
import { Radio } from '../radio/Radio';
import { Suggestion } from '../suggestion/Suggestion';
import { Textarea } from '../textarea/Textarea';
import { Textfield } from '../textfield/Textfield';
import { Heading } from '../typography/heading/Heading';
import { Label } from '../typography/label/Label';
import { Paragraph } from '../typography/paragraph/Paragraph';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';
import styles from './dialog.stories.module.scss';

async function defaultPlay(canvasElement: HTMLElement) {
  // When not in Docs mode, automatically open the dialog
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);
  // Wait for dialog to fade in before running tests
  const dialog = canvas.getByRole('dialog');
  await new Promise<void>((resolve) => {
    dialog.addEventListener('animationend', () => {
      resolve();
    });
  });
}

const meta = preview.meta({
  component: Dialog,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
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
  play: async (ctx) => defaultPlay(ctx.canvasElement),
});

export const Preview = meta.story({
  args: { closedby: 'any' },
  render: (args) => (
    <div className={styles.disableStorybookScale}>
      <Dialog.TriggerContext>
        <Dialog.Trigger data-size={args['data-size']}>
          Åpne Dialog
        </Dialog.Trigger>
        <Dialog {...args} style={{ zIndex: 10 }}>
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
    </div>
  ),
  play: async (ctx) => {
    await defaultPlay(ctx.canvasElement);
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
});

export const WithoutDialogTriggerContext = meta.story({
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
});

export const DialogWithOpenProp = meta.story({
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
});

export const BackdropClosedbyAny = meta.story({
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
});

export const WithHeaderAndFooter = meta.story({
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
});

export const DialogWithForm = meta.story({
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
            <Button variant="secondary" data-command="close">
              Avbryt
            </Button>
          </div>
        </Dialog>
      </Dialog.TriggerContext>
    );
  },
});

export const DialogWithMaxWidth = meta.story({
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
});

const DATA_PLACES = [
  'Sogndal',
  'Oslo',
  'Brønnøysund',
  'Stavanger',
  'Trondheim',
  'Bergen',
  'Lillestrøm',
];

export const DialogWithSuggestion = meta.story({
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
            <Button variant="secondary" data-command="close">
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
});

export const DialogNonModal = meta.story({
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
            <List.Item>intro til prosjektet</List.Item>
            <List.Item>oversikt over hva som er gjort i prosjektet</List.Item>
            <List.Item>beskrivelse av prosjektmålene</List.Item>
            <List.Item>metode for å oppnå prosjektmålene</List.Item>
            <List.Item>leveranse</List.Item>
          </List.Unordered>
        </Dialog>
      </>
    );
  },
  play: async (ctx) => {
    await defaultPlay(ctx.canvasElement);
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
});

export const Drawer = meta.story({
  render() {
    const [placement, setPlacement] =
      useState<DialogProps['placement']>('bottom');
    const [modal, setModal] = useState(true);
    return (
      <div
        className={styles.disableStorybookScale}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Checkbox
          label="Modal"
          checked={modal}
          id="modal-checkbox"
          style={{ marginBottom: 'var(--ds-size-4)' }}
          onChange={(e) => setModal(e.target.checked)}
        />
        <Fieldset
          onChange={(e: ChangeEvent<HTMLFieldSetElement>) => {
            const target = e.target as unknown as HTMLInputElement;
            setPlacement(target.value as DialogProps['placement']);
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--ds-size-5)',
              marginBottom: 'var(--ds-size-8)',
            }}
          >
            <Radio
              name="drawer"
              label="Midten"
              value="center"
              id="center-radio"
            />
            <Radio name="drawer" label="Topp" value="top" id="top-radio" />
            <Radio
              name="drawer"
              label="Bunn"
              value="bottom"
              id="bottom-radio"
            />
            <Radio name="drawer" label="Venstre" value="left" id="left-radio" />
            <Radio name="drawer" label="Høyre" value="right" id="right-radio" />
          </div>
        </Fieldset>
        <Dialog.TriggerContext>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog
            modal={modal}
            closedby="any"
            placement={placement}
            style={{ zIndex: '10' }}
          >
            <Dialog.Block>
              <Paragraph>
                This is a {modal ? 'modal' : 'non-modal'} Dialog with{' '}
                <code>placement="{placement}"</code>
              </Paragraph>
            </Dialog.Block>
          </Dialog>
        </Dialog.TriggerContext>
      </div>
    );
  },
});
