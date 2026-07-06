import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Heading } from 'src/components/typography/heading';
import { FileUploadDropzone } from './docs/FakeFileUploadDropzone';
import { FileUploadItem } from './docs/FakeFileUploadItem';
import { FileUploadTrigger } from './docs/FakeFileUploadTrigger';
import { FileUpload } from './index';

const meta = preview.meta({
  component: FileUploadTrigger,
  subcomponents: {
    'FileUpload.Dropzone': FileUploadDropzone,
    'FileUpload.Item': FileUploadItem,
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
    const [files, setFiles] = useState<File[]>([]);
    const [rejected, setRejected] = useState<FileRejection[]>([]);

    const removeFile = (fileToRemove: File) => {
      setFiles((prevItems) =>
        prevItems.filter((file) => file !== fileToRemove),
      );
    };

    const removeRejected = (rejectedToRemove: FileWithPath) => {
      setRejected((prevFile) =>
        prevFile.filter(({ file }) => file.name !== rejectedToRemove.name),
      );
    };

    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        onDropAccepted: (file) => {
          setFiles((prev) => [...prev, ...file]);
        },
        onDropRejected: (rej) => {
          setRejected((prev) => [...prev, ...rej]);
        },
        maxSize: 5242880,
        accept: {
          'application/pdf': [],
        },
      });

    return (
      <>
        <FileUpload.Dropzone
          label="Last opp dokumentasjon"
          description="Du kan laste opp filer i PDF-format. Filer kan være opptil 0.5 MB."
          inputProps={getInputProps({ multiple: true })}
          isDragGlobal={isDragGlobal}
          isDragActive={isDragActive}
          data-testid="dropzone"
          error={files.length > 2 && 'Du har lastet opp for mange filer.'}
          cardProps={getRootProps()}
          {...args}
        />
        {files.length > 0 && (
          <>
            <Heading level={3} data-size="2xs">
              Vedlegg ({files.length}):
            </Heading>
            {files.map((file, index) => (
              <FileUpload.Item
                key={index}
                file={file}
                onRemove={() => removeFile(file)}
              />
            ))}
          </>
        )}
        {rejected.length > 0 && (
          <>
            <Heading level={3} data-size="2xs">
              Vedlegg med feil:
            </Heading>
            {rejected.map(({ file, errors }, index) => (
              <FileUpload.Item
                key={index}
                file={file}
                onRemove={() => removeRejected(file)}
                error={ErrorMessages.get(errors[0].code)}
              />
            ))}
          </>
        )}
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const dropzone = canvas.querySelector('input') as HTMLInputElement;
    const dummyFile = new File(['abc'.repeat(100000)], 'eksempel1.pdf', {
      type: 'application/pdf',
    });

    await step('Elements should exist', async () => {
      await expect(dropzone).toBeTruthy();
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
    const [files, setFiles] = useState<File[]>([
      new File(['abc'.repeat(100000)], 'eksempel1.pdf'),
      new File(['abc'.repeat(10000)], 'eksempel2.docx'),
      new File(['abc'.repeat(1000000)], 'eksempel3.png'),
    ]);

    const removeFile = (fileToRemove: File) => {
      setFiles((prevItems) =>
        prevItems.filter((file) => file !== fileToRemove),
      );
    };

    const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
      useDropzone({
        onDropAccepted: (file) => {
          setFiles((prev) => [...prev, ...file]);
        },
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
                Vedlegg ({files.length}):
              </Heading>
              {files.map((file, index) => (
                <FileUpload.Item
                  key={index}
                  file={file}
                  onRemove={() => removeFile(file)}
                />
              ))}
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
            onChange={(e) => handleOnChange(e)}
            data-testid="trigger"
            {...args}
          />
          {file && (
            <>
              <Heading level={3} data-size="2xs">
                Vedlegg (1):
              </Heading>
              <FileUpload.Item file={file} onRemove={() => setFile(null)} />
            </>
          )}
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = canvasElement as HTMLElement;
    const trigger = canvas.querySelector('input') as HTMLInputElement;
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
  render: (args) => {
    const dummyFiles: File[] = [
      new File(['abc'.repeat(100000)], 'eksempel1.pdf'),
      new File(['abc'.repeat(10000)], 'eksempel2.docx'),
      new File(['abc'.repeat(1000000)], 'eksempel3.png'),
      new File(['abc'.repeat(123000)], 'eksempel4.pdf'),
    ];
    const dummyRejected: File[] = [
      new File(['abc'.repeat(288000)], 'eksempel5.tsx'),
    ];

    const [files, setFiles] = useState<File[]>(dummyFiles);
    const [rejected, setRejected] = useState<File[]>(dummyRejected);

    const removeFile = (fileToRemove: File) => {
      setFiles((prevItems) =>
        prevItems.filter((file) => file !== fileToRemove),
      );
    };

    const removeRejected = (rejectedToRemove: File) => {
      setRejected((prevFile) =>
        prevFile.filter((file) => file.name !== rejectedToRemove.name),
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
                Vedlegg ({files.length}):
              </Heading>
              {files.map((file, index) => (
                <FileUpload.Item
                  key={index}
                  file={file}
                  readonly={index === 2 && true}
                  loading={index === 3 && true}
                  onRemove={() => removeFile(file)}
                />
              ))}
            </>
          )}
          {rejected.length > 0 && (
            <>
              <Heading
                level={3}
                data-size="2xs"
                style={{ marginBlockStart: 'var(--ds-size-3)' }}
              >
                Vedlegg med feil:
              </Heading>
              {rejected.map((file, index) => (
                <FileUpload.Item
                  {...args}
                  key={index}
                  file={file}
                  onRemove={() => removeRejected(file)}
                  error={'Filformatet støttes ikke'}
                />
              ))}
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

    await step('Error item has aria-invalid set', async () => {
      const invalidItem = canvasElement.querySelector('[aria-invalid="true"]');
      await expect(invalidItem).toBeInTheDocument();
    });

    await step('File size is shown for normal items', async () => {
      // eksempel1.pdf = 300 000 bytes = 0.29 MB
      await expect(canvas.getByText('0.29 MB')).toBeInTheDocument();
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
              <FileUpload.Item
                loading={loading}
                file={file}
                onRemove={() => setFile(null)}
              />
            </>
          )}
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const fileInput = canvasElement.querySelector('input') as HTMLInputElement;
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

    await step('Item shows loading spinner after upload', async () => {
      await expect(
        canvas.getByRole('img', { name: 'spinner' }),
      ).toBeInTheDocument();
    });
  },
});
