import type { DSErrorSummaryElement } from '@digdir/designsystemet-web';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import type { DecoratorType } from '.storybook/types';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button';
import { ErrorSummary } from 'src/components/errorSummary';
import { FileUpload } from 'src/components/fileUpload';
import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import { focusFormField } from 'src/utilities/form/focus';
import type { UseFileUploadProps } from './useFileUpload';
import { useFileUpload } from './useFileUpload';

const meta = preview.meta<
  UseFileUploadProps,
  DecoratorType,
  Partial<UseFileUploadProps>
>({
  title: 'Hooks/useFileUpload',
  tags: ['udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

/** The texts are the consumer's: the hook holds no messages of its own. */
const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
]);

export const SubmittingWithErrors = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: () => {
    const [receipt, setReceipt] = useState<string>();
    const [attempted, setAttempted] = useState(false);
    const summary = useRef<DSErrorSummaryElement>(null);
    const {
      entries,
      files,
      add,
      addRejected,
      update,
      remove,
      hasErrors,
      uploading,
    } = useFileUpload();

    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        multiple: true,
        accept: { 'application/pdf': [] },
        maxSize: 524288,
        onDropAccepted: (accepted) => {
          setReceipt(undefined);
          const { duplicates } = add(accepted, { loading: true });
          addRejected(
            duplicates.map((file) => ({
              file,
              error: 'Filen er allerede lagt til',
            })),
          );
        },
        // Rejected files go in the same list. To the user they are the same
        // thing: a file they tried to attach that did not make it.
        onDropRejected: (rejections) => {
          setReceipt(undefined);
          addRejected(
            rejections.map(({ file, errors }) => ({
              file,
              error: ErrorMessages.get(errors[0].code) ?? errors[0].message,
            })),
          );
        },
      });

    // The field is the only part of this a screen reader reads out, and there
    // is one slot, so the messages have to share it.
    const fieldError =
      (hasErrors &&
        'Noen av vedleggene har feil. Feilen står på vedlegget det gjelder.') ||
      (uploading && 'Vent til opplastingen er ferdig.');

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setAttempted(true);
          if (fieldError) {
            /* The field message is only read out to someone standing on the
               field. The summary is what tells a user who pressed the button
               what stopped them, and takes them to it. */
            summary.current?.focus();
            return;
          }
          setReceipt(`Sendt inn med ${files.length} vedlegg.`);
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
          alignItems: 'flex-start',
        }}
      >
        <FileUpload.Dropzone
          label="Last opp dokumentasjon"
          description="Du kan laste opp filer i PDF-format. Filer kan være opptil 0.5 MB."
          cardProps={getRootProps()}
          // The id is what the summary links to.
          inputProps={getInputProps({
            name: 'dokumentasjon',
            id: 'dokumentasjon',
          })}
          // Only the files that will actually be submitted.
          files={files}
          isDragActive={isDragActive}
          isDragGlobal={isDragGlobal}
          error={fieldError}
        />

        {entries.length > 0 && (
          <>
            <Heading level={3} data-size="2xs">
              {`Vedlegg (${entries.length}):`}
            </Heading>
            <FileUpload.List>
              {entries.map(({ id, file, loading, error }) => (
                <FileUpload.Item
                  key={id}
                  file={file}
                  loading={loading}
                  error={error}
                  onRemove={() => remove(id)}
                />
              ))}
            </FileUpload.List>
          </>
        )}

        {/* Stands in for the server, which a real form would be waiting on. */}
        {uploading && (
          <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
            <Button
              variant="secondary"
              onClick={() =>
                entries
                  .filter(({ loading }) => loading)
                  .forEach(({ id }) => update(id, { loading: undefined }))
              }
            >
              Fullfør opplastingen
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                entries
                  .filter(({ loading }) => loading)
                  .forEach(({ id }) =>
                    update(id, {
                      loading: undefined,
                      error: 'Serveren kunne ikke lese filen.',
                    }),
                  )
              }
            >
              La serveren avvise filen
            </Button>
          </div>
        )}

        {attempted && fieldError && (
          <ErrorSummary ref={summary}>
            <ErrorSummary.Heading>
              For å sende inn må du rette opp følgende:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              {/* One entry for the field, not one per file: the field message
                  says what to do, and the list of files is right beside it. */}
              <ErrorSummary.Item>
                <ErrorSummary.Link
                  href="#dokumentasjon"
                  onClick={(event) => {
                    event.preventDefault();
                    focusFormField('dokumentasjon');
                  }}
                >
                  {fieldError}
                </ErrorSummary.Link>
              </ErrorSummary.Item>
            </ErrorSummary.List>
          </ErrorSummary>
        )}

        <Button type="submit">Send inn</Button>
        {receipt && <Paragraph>{receipt}</Paragraph>}
      </form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvasElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const pdf = (name: string, bytes = 1024) =>
      new File([new Uint8Array(bytes)], name, { type: 'application/pdf' });

    const send = () =>
      userEvent.click(canvas.getByRole('button', { name: 'Send inn' }));
    /* The summary repeats the field message, so the field has to be asked
       for it by name rather than the page at large. */
    const field = () =>
      within(canvasElement.querySelector('ds-field') as HTMLElement);
    const receipt = (count: number) =>
      canvas.queryByText(`Sendt inn med ${count} vedlegg.`);

    await step(
      'Form cannot be submitted while a file is uploading',
      async () => {
        await userEvent.upload(input, pdf('rapport.pdf'));

        await expect(
          canvas.getByText('Vent til opplastingen er ferdig.'),
        ).toBeInTheDocument();
        await send();
        await expect(receipt(1)).toBeNull();
      },
    );

    await step('A finished attachment can be submitted', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Fullfør opplastingen' }),
      );

      await send();
      await expect(receipt(1)).toBeInTheDocument();
    });

    await step('A refused file goes in the same list', async () => {
      await userEvent.upload(input, pdf('for-stor.pdf', 600000));

      // Same list, so the row is counted, and submission stops.
      await expect(canvas.getByText('Vedlegg (2):')).toBeInTheDocument();
      await expect(canvas.getByText('Filen er for stor')).toBeInTheDocument();
      await expect(
        field().getByText(
          'Noen av vedleggene har feil. Feilen står på vedlegget det gjelder.',
        ),
      ).toBeInTheDocument();

      await send();
      await expect(receipt(1)).toBeNull();
    });

    await step('Being stopped is said where the user pressed', async () => {
      // The field message alone reaches nobody standing at the button.
      const box = canvasElement.querySelector(
        'ds-error-summary',
      ) as HTMLElement;
      await expect(box).toBeVisible();
      await expect(box).toHaveFocus();

      const link = within(box).getByRole('link');
      await expect(link).toHaveTextContent(
        'Noen av vedleggene har feil. Feilen står på vedlegget det gjelder.',
      );

      // And it takes the user to the field rather than only naming it.
      await userEvent.click(link);
      await expect(input).toHaveFocus();
    });

    await step('Submission goes through once the row is removed', async () => {
      const list = canvas.getAllByRole('list')[0];
      const rows = within(list).getAllByRole('listitem');
      await userEvent.click(
        within(rows[1]).getByRole('button', { name: 'Fjern filen' }),
      );

      await send();
      await expect(receipt(1)).toBeInTheDocument();
    });

    await step(
      'A file the server rejects stays in the list the same way',
      async () => {
        await userEvent.upload(input, pdf('rapport-2.pdf'));
        await userEvent.click(
          canvas.getByRole('button', { name: 'La serveren avvise filen' }),
        );

        await expect(canvas.getByText('Vedlegg (2):')).toBeInTheDocument();
        await expect(
          canvas.getByText('Serveren kunne ikke lese filen.'),
        ).toBeInTheDocument();

        // The same field message as a file that was refused on arrival.
        await expect(
          field().getByText(
            'Noen av vedleggene har feil. Feilen står på vedlegget det gjelder.',
          ),
        ).toBeInTheDocument();

        await send();
        await expect(receipt(1)).toBeNull();
      },
    );
  },
});
