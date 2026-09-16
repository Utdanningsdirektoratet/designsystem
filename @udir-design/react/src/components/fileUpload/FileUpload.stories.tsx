import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { expectLanguageVariables } from '.storybook/utils/expectLanguageVariables';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Checkbox } from 'src/components/checkbox';
import { Heading } from 'src/components/typography/heading';
import { useFileUpload } from 'src/hooks/useFileUpload';
import { Prose } from '../typography/prose';
import { FileUploadDropzone } from './docs/FakeFileUploadDropzone';
import { FileUploadItem } from './docs/FakeFileUploadItem';
import { FileUploadList } from './docs/FakeFileUploadList';
import { FileUploadTrigger } from './docs/FakeFileUploadTrigger';
import { FileMeta } from './types';
import { FileUpload, FileUploadFileSize } from './index';

const meta = preview.meta({
  component: FileUploadTrigger,
  subcomponents: {
    'FileUpload.Dropzone': FileUploadDropzone,
    'FileUpload.List': FileUploadList,
    'FileUpload.Item': FileUploadItem,
    'FileUpload.FileSize': FileUploadFileSize,
  },
  tags: ['udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
      details: 'Deler av implementasjonen er inspirert av Navs designsystem.',
    },
  },
});

export const Preview = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: {
    'data-size': 'md',
    label: 'Label',
    description: 'Beskrivelse',
  },
  render: (args) => {
    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        onDropAccepted: (files) => {
          window.alert(
            `Accepted dropped file(s):\n  - ${files.map((x) => x.name).join(',\n  - ')}`,
          );
        },
        onDropRejected: (rej) => {
          window.alert(
            `Rejected dropped file(s):\n  - ${rej.map((x) => `${x.file.name} (reason: ${x.errors.map((err) => err.message).join(', ')})`).join(',\n  - ')}`,
          );
        },
        multiple: false,
        accept: {
          'application/pdf': [],
        },
      });
    return (
      <>
        <style>
          {`
        .file-upload-preview-main {
          display: flex;
          gap: var(--ds-size-18);
          justify-content: center;
        }`}
        </style>
        <div className="file-upload-preview-main">
          <FileUpload.Trigger {...args} inputProps={{ ...args.inputProps }} />
          <FileUpload.Dropzone
            {...args}
            inputProps={getInputProps({ ...args.inputProps })}
            isDragGlobal={isDragGlobal}
            isDragActive={isDragActive}
            cardProps={getRootProps()}
          />
        </div>
      </>
    );
  },
});

export const Readonly = meta.story({
  render: (args) => {
    return (
      <>
        <style>
          {`
.file-upload-readonly-main {
  background: var(--ds-color-neutral-surface-tinted);
  display: flex;
  gap: var(--ds-size-12);
  justify-content: center;
  padding: var(--ds-size-8);
  border-radius: var(--ds-border-radius-md);
}`}
        </style>
        <div className="file-upload-readonly-main">
          <FileUpload.Trigger
            {...args}
            inputProps={{ readOnly: true }}
            label="Lesemodus"
            description="Beskrivelse for Trigger"
          />
          <FileUpload.Dropzone
            {...args}
            inputProps={{ readOnly: true, max: 2 }}
            label="Lesemodus"
            description="Beskrivelse for Dropzone"
          />
        </div>
      </>
    );
  },
});

/** One row in the attachment list, whatever happened to it. */
type Entry = { id: string; file: File; loading?: boolean; error?: string };

export const ExampleDropZone = meta.story({
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-3)',
    },
    docs: advancedCodeDocs,
  },
  render: (args) => {
    // Accepted and rejected files go in the same list: to the user they are
    // both files that were dropped, and one of them did not work. The id is per
    // attempt rather than per file, since the same file can be dropped twice.
    const [entries, setEntries] = useState<Entry[]>([]);

    const removeEntry = (idToRemove: string) => {
      setEntries((prev) => prev.filter(({ id }) => id !== idToRemove));
    };

    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        onDropAccepted: (files) =>
          setEntries((prev) => [
            ...prev,
            ...files.map((file) => ({ id: crypto.randomUUID(), file })),
          ]),
        onDropRejected: (rejections) =>
          setEntries((prev) => [
            ...prev,
            ...rejections.map(({ file, errors }) => ({
              id: crypto.randomUUID(),
              file,
              error: ErrorMessages.get(errors[0].code),
            })),
          ]),
        maxSize: 524288, // 0.5 MB, as described below
        accept: {
          'application/pdf': [],
        },
      });

    const valid = entries.filter(({ error }) => !error);

    // The field is the only part of this that a screen reader reads out, and
    // there is one slot, so the messages have to share it.
    const fieldError =
      (entries.some(({ error }) => error) &&
        'Noen av vedleggene har feil. Feilen står på vedlegget det gjelder.') ||
      (valid.length > 2 && 'Du har lastet opp for mange filer.');

    return (
      <>
        <FileUpload.Dropzone
          label="Last opp dokumentasjon"
          description="Du kan laste opp filer i PDF-format. Filer kan være opptil 0.5 MB."
          inputProps={getInputProps({ multiple: true })}
          files={valid.map(({ file }) => file)}
          isDragGlobal={isDragGlobal}
          isDragActive={isDragActive}
          data-testid="dropzone"
          error={fieldError}
          cardProps={getRootProps()}
          {...args}
        />
        {entries.length > 0 && (
          <>
            <Heading level={3} data-size="2xs">
              {`Vedlegg (${entries.length}):`}
            </Heading>
            <FileUpload.List>
              {entries.map(({ id, file, error }) => (
                <FileUpload.Item
                  key={id}
                  file={file}
                  error={error}
                  onRemove={() => removeEntry(id)}
                />
              ))}
            </FileUpload.List>
          </>
        )}
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const dropzone = canvas.querySelector('input') as HTMLInputElement;
    // must be a File object, not FileMeta
    const dummyFile = new File(['abc'.repeat(100000)], 'eksempel1.pdf', {
      type: 'application/pdf',
    });

    await step('Elements should exist', async () => {
      await expect(dropzone).toBeTruthy();
    });

    await step('Input covers the card, so the whole card is clickable', () => {
      const card = canvas.querySelector('.ds-card') as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const inputRect = dropzone.getBoundingClientRect();
      const border = parseFloat(getComputedStyle(card).borderTopWidth);

      // `inset: 0` resolves against the padding box, so the overlay is inset by
      // the card's border on each side.
      expect(inputRect.height).toBeGreaterThanOrEqual(
        cardRect.height - border * 2,
      );
      expect(inputRect.width).toBeGreaterThanOrEqual(
        cardRect.width - border * 2,
      );
    });

    await step('File can be uploaded', async () => {
      await userEvent.upload(dropzone, dummyFile);

      await expect(dropzone.files).toHaveLength(1);
      await expect(dropzone.files?.[0].name).toBe(dummyFile.name);

      await expect(
        await within(canvasElement).findByText(dummyFile.name),
      ).toBeInTheDocument();
    });

    // Reset file input so uploads work. Without this, every subsequent
    // uploaded file will be replaced by the dummyFile used in the test
    dropzone.value = '';
  },
});

export const ExampleDropzoneWithExplicitSize = ExampleDropZone.extend({
  decorators: [
    (Story) => (
      <>
        <style>{`.uds-file-upload { height: 600px; width: 100%; }`}</style>
        <Story />
      </>
    ),
  ],
});

export const TooManyFiles = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: (args) => {
    const [files, setFiles] = useState<FileMeta[]>([
      { size: 300000, name: 'eksempel1.pdf' },
      { size: 9000, name: 'eksempel2.docx' },
      { size: 3000000, name: 'eksempel3.png' },
    ]);

    const removeFile = (fileToRemove: FileMeta) => {
      setFiles((prevItems) =>
        prevItems.filter((file) => file !== fileToRemove),
      );
    };

    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        onDropAccepted: (files) => setFiles((prev) => [...prev, ...files]),
        multiple: true,
      });

    return (
      <>
        <style>
          {`
        .file-upload-too-many-files-main {
          display: flex;
          flex-direction: column;
          gap: var(--ds-size-3);
        }`}
        </style>
        <div className="file-upload-too-many-files-main">
          <FileUpload.Dropzone
            label="Last opp dokumentasjon"
            description="Du kan kun laste opp 2 filer."
            data-testid="dropzone"
            error={
              files.length > 2 &&
              'Du har lastet opp for mange filer. Fjern noen for å kunne sende inn skjemaet.'
            }
            inputProps={getInputProps()}
            cardProps={getRootProps()}
            isDragGlobal={isDragGlobal}
            isDragActive={isDragActive}
            style={{ maxWidth: '450px', width: '100%' }}
            {...args}
          />
          {files.length > 0 && (
            <>
              <Heading level={3} data-size="2xs">
                {`Vedlegg (${files.length}):`}
              </Heading>
              <FileUpload.List>
                {files.map((file) => (
                  <FileUpload.Item
                    key={fileId(file)}
                    file={file}
                    onRemove={() => removeFile(file)}
                  />
                ))}
              </FileUpload.List>
            </>
          )}
        </div>
      </>
    );
  },
});

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
]);

export const ExampleTrigger = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: {
    label: 'Last opp profilbilde',
    description: 'Du kan laste opp filer i PNG- og JPEG-format.',
  },
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLElement>) => {
      const input = e.target as HTMLInputElement;
      if (input.files) {
        setFile(input.files[0]);
        input.value = '';
      }
    };

    return (
      <>
        <style>
          {`
        .file-upload-example-trigger-main {
          display: flex;
          flex-direction: column;
          gap: var(--ds-size-3);
        }`}
        </style>
        <div className="file-upload-example-trigger-main">
          <FileUpload.Trigger
            inputProps={{
              accept: 'image/png, image/jpeg',
            }}
            files={file ? [file] : []}
            onChange={(e) => handleOnChange(e)}
            data-testid="trigger"
            {...args}
          />
          {file && (
            <>
              <Heading level={3} data-size="2xs">
                Vedlegg (1):
              </Heading>
              <FileUpload.List>
                <FileUpload.Item file={file} onRemove={() => setFile(null)} />
              </FileUpload.List>
            </>
          )}
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const trigger = canvas.querySelector('input') as HTMLInputElement;
    // must be a File object, not FileMeta
    const dummyFile = new File(['abc'.repeat(100000)], 'eksempel1.png', {
      type: 'image/png',
    });

    await step('Elements should exist', async () => {
      await expect(trigger).toBeTruthy();
    });

    await step('File can be uploaded', async () => {
      await userEvent.upload(trigger, dummyFile);
      await expect(
        await within(canvasElement).findByText(dummyFile.name),
      ).toBeInTheDocument();
    });
  },
});

export const ExampleItems = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: () => {
    type FileInfo = FileMeta & {
      id: string;
      href?: string;
      readonly?: boolean;
      loading?: boolean;
      description?: string;
      error?: string;
    };
    const dummyFiles: FileInfo[] = [
      {
        size: 300000,
        name: 'eksempel1.pdf',
        id: 'eksempel1',
        description: 'Filopplasting 1',
      },
      {
        size: 30000,
        name: 'eksempel2.docx',
        id: 'eksempel2',
        description: 'Filopplasting 2',
      },
      {
        size: 3000000,
        name: 'eksempel3.png',
        id: 'eksempel3',
        href: '/eksempel3.png',
        description: 'Filopplasting 3',
        readonly: true,
      },
      {
        size: 369000,
        name: 'eksempel4.pdf',
        id: 'eksempel4',
        description: 'Filopplasting 4',
        loading: true,
      },
      {
        size: 864000,
        name: 'eksempel5.tsx',
        id: 'eksempel5',
        description: 'Filopplasting 5',
        error: 'Filformatet støttes ikke',
      },
    ];

    const [files, setFiles] = useState<FileInfo[]>(dummyFiles);

    const removeFile = (fileToRemove: FileMeta) => {
      setFiles((prevItems) =>
        prevItems.filter((file) => file !== fileToRemove),
      );
    };

    return (
      <>
        <style>
          {`
        .file-upload-example-items-main {
          display: flex;
          flex-direction: column;
          gap: var(--ds-size-3);
        }`}
        </style>
        <div className="file-upload-example-items-main">
          {files.length > 0 && (
            <>
              <Heading level={3} data-size="2xs">
                {`Vedlegg (${files.length}):`}
              </Heading>
              <FileUpload.List>
                {files.map((file) => (
                  <FileUpload.Item
                    key={file.id}
                    file={file}
                    href={file.href}
                    description={
                      file.description ? (
                        <>
                          <span>{file.description}</span> (
                          <FileUpload.FileSize size={file.size} />)
                        </>
                      ) : undefined
                    }
                    readonly={file.readonly}
                    loading={file.loading}
                    error={file.error}
                    onRemove={() => removeFile(file)}
                  />
                ))}
              </FileUpload.List>
            </>
          )}
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All file items are rendered', async () => {
      await expect(canvas.getByText('eksempel1.pdf')).toBeInTheDocument();
      await expect(canvas.getByText('eksempel2.docx')).toBeInTheDocument();
      await expect(canvas.getByText('eksempel3.png')).toBeInTheDocument();
      await expect(canvas.getByText('eksempel4.pdf')).toBeInTheDocument();
      await expect(canvas.getByText('eksempel5.tsx')).toBeInTheDocument();
    });

    await step('Error message is shown for rejected file', async () => {
      await expect(
        canvas.getByText('Filformatet støttes ikke'),
      ).toBeInTheDocument();
    });

    await step('Readonly and loading items have no remove button', async () => {
      const removeButtons = canvas.getAllByRole('button');
      await expect(removeButtons).toHaveLength(3);
    });

    await step('Loading item shows a spinner', async () => {
      await expect(
        canvas.getByRole('img', { name: 'spinner' }),
      ).toBeInTheDocument();
    });

    await step('Loading item has aria-busy set', async () => {
      const busyItem = canvasElement.querySelector('[aria-busy="true"]');
      await expect(busyItem).toBeInTheDocument();
    });

    await step('Error item is marked as invalid', async () => {
      const invalidItem = canvasElement.querySelector('[data-invalid]');
      await expect(invalidItem).toBeInTheDocument();
    });

    await step('Description is shown for normal items', async () => {
      await expect(canvas.getByText('Filopplasting 1')).toBeInTheDocument();
    });

    await step('Files are exposed as one list of cards', async () => {
      // Files that failed sit alongside the rest: to the user they are all
      // files that were attached, and one of them has something wrong with it.
      const files = canvas.getByRole('list');
      await expect(within(files).getAllByRole('listitem')).toHaveLength(5);

      /* Both variants render the same cards; the compact variant only
         collapses them together in CSS. */
      await expect(files).not.toHaveClass('ds-card');
      for (const item of within(files).getAllByRole('listitem')) {
        await expect(item).toHaveClass('ds-card');
      }
    });

    await step('Clicking remove deletes the file from the list', async () => {
      const removeButtons = canvas.getAllByRole('button');
      await userEvent.click(removeButtons[0]);
      await expect(canvas.queryByText('eksempel1.pdf')).not.toBeInTheDocument();
    });
  },
});

export const Upload = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnChange = (e: ChangeEvent<HTMLElement>) => {
      const input = e.target as HTMLInputElement;
      const files = input.files; // safe

      if (files) {
        setFile(files[0]);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          input.value = '';
        }, 2000);
      }
    };
    return (
      <>
        <style>
          {`
        .file-upload-upload-main {
          display: flex;
          flex-direction: column;
          gap: var(--ds-size-3);
        }`}
        </style>
        <div className="file-upload-upload-main">
          <FileUpload.Trigger
            label="Last opp rapport"
            description="Du kan legge ved 1 fil."
            onChange={handleOnChange}
            {...args}
          />
          {file && (
            <>
              <Heading level={3} data-size="2xs">
                Vedlegg (1):
              </Heading>
              <FileUpload.List>
                <FileUpload.Item
                  loading={loading}
                  file={file}
                  onRemove={() => setFile(null)}
                />
              </FileUpload.List>
            </>
          )}
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const fileInput = canvasElement.querySelector('input') as HTMLInputElement;
    // must be a File object, not FileMeta
    const dummyFile = new File(['abc'.repeat(100000)], 'rapport.pdf', {
      type: 'application/pdf',
    });

    await step('Trigger input exists', async () => {
      await expect(fileInput).toBeTruthy();
    });

    await step('No file item shown before upload', async () => {
      await expect(canvas.queryByText('rapport.pdf')).not.toBeInTheDocument();
    });

    await step('File item appears after upload', async () => {
      await userEvent.upload(fileInput, dummyFile);
      await expect(await canvas.findByText('rapport.pdf')).toBeInTheDocument();
    });

    await step('A single file is still exposed as a list', async () => {
      const list = canvas.getByRole('list');
      await expect(within(list).getAllByRole('listitem')).toHaveLength(1);
    });

    await step('Item shows loading spinner after upload', async () => {
      await expect(
        canvas.getByRole('img', { name: 'spinner' }),
      ).toBeInTheDocument();
    });
  },
});

export const CompactList = meta.story({
  parameters: { docs: advancedCodeDocs },
  args: {
    'data-size': 'md',
  },
  render: (args) => {
    type FileInfo = FileMeta & { id: string; error?: string };
    const dummyFiles: FileInfo[] = [
      { size: 300000, name: 'kandidat-12.pdf', id: 'kandidat-12' },
      { size: 300000, name: 'kandidat-13.pdf', id: 'kandidat-13' },
      { size: 300000, name: 'kandidat-14.pdf', id: 'kandidat-14' },
      { size: 300000, name: 'kandidat-15.pdf', id: 'kandidat-15' },
      {
        size: 864000,
        name: 'kandidat-16.tsx',
        id: 'kandidat-16',
        error: 'Filformatet støttes ikke',
      },
    ];

    const [files, setFiles] = useState(dummyFiles);

    const removeFile = (fileToRemove: FileMeta) => {
      setFiles((prev) => prev.filter((file) => file !== fileToRemove));
    };

    return (
      <Prose>
        <Heading level={3} data-size="2xs">
          {`Vedlegg (${files.length}):`}
        </Heading>
        <FileUpload.List variant="compact" data-size={args['data-size']}>
          {files.map((file) => (
            <FileUpload.Item
              key={file.id}
              file={file}
              error={file.error}
              onRemove={() => removeFile(file)}
            />
          ))}
        </FileUpload.List>
      </Prose>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Files are exposed as a list', async () => {
      const list = canvas.getByRole('list');
      await expect(list.tagName).toBe('UL');
      await expect(within(list).getAllByRole('listitem')).toHaveLength(5);
    });

    await step(
      'Compact variant renders one card with the files as blocks',
      async () => {
        const list = canvas.getByRole('list');
        await expect(list).not.toHaveClass('ds-card');

        const [first, second] = within(list).getAllByRole('listitem');
        await expect(first).toHaveClass('ds-card');
        await expect(second).toHaveClass('ds-card');

        /* Every item keeps its own card border, but the border between two
           items is dropped so they read as one card divided by lines. */
        await expect(getComputedStyle(first).borderBlockStartWidth).not.toBe(
          '0px',
        );
        await expect(getComputedStyle(second).borderBlockStartWidth).toBe(
          '0px',
        );
      },
    );

    await step('Only the file name breaks mid-word', async () => {
      /* A long file name has nowhere to break; a message is prose and should
         not be chopped in the middle of a word. */
      const wordBreak = (el: Element) => getComputedStyle(el).wordBreak;

      await expect(wordBreak(canvas.getByText('kandidat-16.tsx'))).toBe(
        'break-all',
      );
      await expect(
        wordBreak(canvas.getByText('Filformatet støttes ikke')),
      ).not.toBe('break-all');
    });

    await step('A file with an error is named as invalid', async () => {
      /* The text is generated content, so it is invisible to Chromatic and
         absent from the dom snapshot. A screen reader reads it with the file
         name, which is the only way to tell a failed row apart while browsing
         the list, so it has to sit inside the name element. */
      const markerIn = (name: string) =>
        canvas.getByText(name).querySelector('.uds-file-upload__item-invalid');

      const marker = markerIn('kandidat-16.tsx');
      await expect(marker).not.toBeNull();
      await expect(
        getComputedStyle(marker as Element, '::before').content,
      ).toContain('ugyldig');

      await expect(markerIn('kandidat-12.pdf')).toBeNull();
    });

    await step('Clicking remove deletes the file from the list', async () => {
      const [removeButton] = canvas.getAllByRole('button');
      await userEvent.click(removeButton);
      await expect(
        canvas.queryByText('kandidat-12.pdf'),
      ).not.toBeInTheDocument();
    });
  },
});

/** Stands in for a server that takes its time. */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const UploadAndValidate = meta.story({
  parameters: { docs: advancedCodeDocs },
  render: function UploadAndValidate() {
    const { entries, files, add, addRejected, update, remove, hasErrors } =
      useFileUpload();
    const [reject, setReject] = useState(false);
    const [validatingId, setValidatingId] = useState<string>();
    const [approvedId, setApprovedId] = useState<string>();
    /* What the first check read out of the file. The second check repeats it
       in its own text, so the row keeps saying it while that one runs. */
    const [found, setFound] = useState<{ id: string; text: string }>();

    const rejectRef = useRef(reject);
    rejectRef.current = reject;
    const handled = useRef(new Set<string>());

    const handle = useCallback(
      async (id: string) => {
        update(id, { loading: true });

        // Two waits, because the user is told a different thing during each:
        // first the file is on its way, then the server is reading it.
        // The cheap check first: is this the right shape of file at all.
        await delay(500);

        // What it found stays on the row while the slower check runs, so the
        // user is not left watching a spinner that says nothing.
        setFound({ id, text: 'Antall elever: 412' });
        setValidatingId(id);
        await delay(700);
        setValidatingId(undefined);

        if (rejectRef.current) {
          update(id, {
            loading: undefined,
            error: 'Filen mangler kolonnen "kandidatnummer".',
          });
        } else {
          update(id, { loading: undefined });
          setApprovedId(id);
        }
      },
      [update],
    );

    /* Only a file that is on its own is worth sending: with more than one
       attached the user has to settle which it is first. Removing the others
       later brings the one that is left here. `handled` is what ends the
       effect: it runs on a change to `entries` and itself changes `entries`. */
    useEffect(() => {
      const [only] = entries;
      if (entries.length !== 1 || handled.current.has(only.id)) return;
      handled.current.add(only.id);
      void handle(only.id);
    }, [entries, handle]);

    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        multiple: false,
        accept: { 'text/csv': ['.csv'] },
        onDropAccepted: (accepted) => add(accepted),
        onDropRejected: (rejections) => {
          const isSurplus = (codes: string[]) =>
            codes.includes('too-many-files');

          // `multiple: false` turns away a whole group of files. They are
          // still files the user attached, so they go in the list and the
          // field says there are too many.
          add(
            rejections
              .filter(({ errors }) => isSurplus(errors.map((e) => e.code)))
              .map(({ file }) => file),
          );

          // A file that fails on its own merits carries its own reason.
          addRejected(
            rejections
              .filter(({ errors }) => !isSurplus(errors.map((e) => e.code)))
              .map(({ file, errors }) => ({
                file,
                error:
                  errors[0].code === 'file-invalid-type'
                    ? 'Filformatet støttes ikke'
                    : errors[0].message,
              })),
          );
        },
      });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
        {/* Stands in for the server's verdict, which a real page does not get
            to decide. */}
        <Checkbox
          label={<span>La valideringen avvise filen</span>}
          checked={reject}
          disabled={entries.length > 0}
          onChange={(e) => setReject(e.target.checked)}
        />

        {/* The field stays where it is once a file is attached, rather than
            being hidden or set readonly. It is still the field the user
            wants, and what it says follows from the list. */}
        <FileUpload.Dropzone
          label="Last opp kandidatliste"
          description="Du kan laste opp én fil i CSV-format."
          cardProps={getRootProps()}
          inputProps={getInputProps()}
          files={files}
          isDragActive={isDragActive}
          isDragGlobal={isDragGlobal}
          /* Both are read off the list, so neither can outlive what it says.
             An attempt that was turned away does not make the field invalid
             when the file already attached is perfectly good. */
          error={
            (entries.length > 1 &&
              'Du kan bare legge ved én fil. Fjern dem du ikke vil bruke.') ||
            (hasErrors && 'Noe må rettes. Feilen står på filen det gjelder.')
          }
        />

        {entries.length > 0 && (
          <FileUpload.List>
            {entries.map(({ id, file, loading, error }) => {
              const read = id === found?.id ? found.text : undefined;

              return (
                <FileUpload.Item
                  key={id}
                  file={file}
                  loading={loading}
                  error={error}
                  onRemove={() => {
                    remove(id);
                    if (id === approvedId) setApprovedId(undefined);
                    if (id === found?.id) setFound(undefined);
                  }}
                  description={read}
                  /* The default says the file is on its way, which stops being
                     true once the server has it. The busy text also carries
                     what the first check found, so the row does not drop it
                     for the length of the second one. */
                  loadingText={
                    read && id === validatingId
                      ? `${read}, sjekker innholdet…`
                      : undefined
                  }
                  success={id === approvedId ? 'Filen er godkjent' : undefined}
                />
              );
            })}
          </FileUpload.List>
        )}
      </div>
    );
  },
});

export const UploadAndValidateInteractions = UploadAndValidate.extend({
  tags: ['!dev'], // hides the story from the sidebar
  parameters: {
    // The flow is timed, so neither snapshot would be stable; the assertions
    // are what this story is for.
    chromatic: { disableSnapshot: true },
    snapshot: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = () =>
      canvasElement.querySelector('input[type="file"]') as HTMLInputElement;
    const rows = () => canvas.queryAllByRole('listitem');
    const message = () =>
      rows()[0].querySelector('.uds-file-upload__item-message > p') as Element;
    const busyText = () =>
      rows()[0].querySelector('.uds-file-upload__item-description') as Element;
    const csv = (name = 'kandidater.csv') =>
      new File(['kandidatnummer\n1'], name, { type: 'text/csv' });
    const tooMany =
      'Du kan bare legge ved én fil. Fjern dem du ikke vil bruke.';
    const remove = (index: number) =>
      userEvent.click(
        canvas.getAllByRole('button', { name: 'Fjern filen' })[index],
      );

    await step('Two files at once both land in the list', async () => {
      // `multiple: false` makes react-dropzone turn away the whole drop, so
      // without `onDropRejected` the files would vanish without a word.
      const data = new DataTransfer();
      data.items.add(csv('kandidater-a.csv'));
      data.items.add(csv('kandidater-b.csv'));
      // `DragEvent.dataTransfer` is readonly, so it has to be built with the
      // event rather than assigned onto a fired one.
      canvasElement.querySelector('.uds-file-upload .ds-card')?.dispatchEvent(
        new DragEvent('drop', {
          bubbles: true,
          cancelable: true,
          dataTransfer: data,
        }),
      );

      await waitFor(() => expect(rows()).toHaveLength(2));
      await expect(canvas.getByText(tooMany)).toBeVisible();
      // Neither is worth sending until the user has settled which it is.
      await expect(rows()[0]).not.toHaveAttribute('aria-busy');
      await expect(rows()[1]).not.toHaveAttribute('aria-busy');
    });

    await step('Removing one starts the file that is left', async () => {
      await remove(0);

      await expect(rows()).toHaveLength(1);
      await expect(canvas.queryByText(tooMany)).not.toBeInTheDocument();
      // Longer than the whole flow, which outlasts waitFor's default.
      // What the first check read is carried by the second one's text, so
      // the row keeps saying it rather than going blank for the duration.
      await waitFor(
        () =>
          expect(busyText()).toHaveTextContent(
            'Antall elever: 412, sjekker innholdet…',
          ),
        { timeout: 3000 },
      );
      await waitFor(
        () => expect(canvas.getByText('Filen er godkjent')).toBeVisible(),
        { timeout: 3000 },
      );
      await expect(rows()[0]).toHaveAttribute('data-valid');
      // The hook the card border hangs off, mirroring `data-invalid`.
      const card = getComputedStyle(rows()[0]);
      await expect(card.getPropertyValue('--dsc-card-border-color')).toBe(
        card.getPropertyValue('--ds-color-success-border-strong'),
      );
      // Drives the icon and the colour of the message.
      await expect(message()).toHaveAttribute('data-color', 'success');
    });

    await step('A file too many leaves the approved one alone', async () => {
      await userEvent.upload(input(), csv('kandidater-c.csv'));

      await expect(rows()).toHaveLength(2);
      await expect(canvas.getByText(tooMany)).toBeVisible();
      // The verdict already given still stands.
      await expect(canvas.getByText('Filen er godkjent')).toBeVisible();
    });

    await step('And removing it settles the field again', async () => {
      await remove(1);

      await expect(rows()).toHaveLength(1);
      await expect(canvas.queryByText(tooMany)).not.toBeInTheDocument();
      // Not sent a second time: it was handled when it was first alone.
      await expect(rows()[0]).not.toHaveAttribute('aria-busy');
      await expect(canvas.getByText('Filen er godkjent')).toBeVisible();
    });

    await step('A rejected file gives the reason on the file', async () => {
      await remove(0);
      await userEvent.click(canvas.getByRole('checkbox'));
      await userEvent.upload(input(), csv());

      await waitFor(
        () =>
          expect(
            canvas.getByText('Filen mangler kolonnen "kandidatnummer".'),
          ).toBeVisible(),
        { timeout: 3000 },
      );
      // The field says that something needs looking at, the file says what.
      await expect(
        canvas.getByText('Noe må rettes. Feilen står på filen det gjelder.'),
      ).toBeVisible();
      // No `data-color` is the danger default.
      await expect(message()).not.toHaveAttribute('data-color');
    });
  },
});

export const Translations = Preview.extend({
  tags: ['!dev'], // hides the story from the sidebar
  parameters: { chromatic: { disableSnapshot: true }, snapshot: false },
  play: async ({ canvasElement }) => {
    await expectLanguageVariables(
      canvasElement,
      () => canvasElement.querySelector('.uds-file-upload'),
      [
        '--udsc-fileUpload-chooseFile-text',
        '--udsc-fileUpload-chooseFiles-text',
        '--udsc-fileUpload-dropFile-text',
        '--udsc-fileUpload-dropFiles-text',
        '--udsc-fileUpload-dropFile-active-text',
        '--udsc-fileUpload-dropFiles-active-text',
        '--udsc-fileUpload-or-text',
        '--udsc-fileUpload-loading-text',
        '--udsc-fileUpload-removeFile-text',
        '--udsc-fileUpload-invalid-text',
        '--udsc-fileUpload-disabled-text-line-one',
        '--udsc-fileUpload-disabled-text-line-two',
      ],
    );
  },
});

function fileId(file: FileMeta & { lastModified?: number }) {
  return `${file.name}-${file.size}-${file.lastModified ?? ''}`;
}
