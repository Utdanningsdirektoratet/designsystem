import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { expect, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Heading } from '../typography/heading/Heading';
import { FileUpload } from './index';

const meta = preview.meta({
  component: FileUpload.Trigger,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
      details: 'Deler av implementasjonen er inspirert av Navs designsystem.',
    },
  },
});

export const Preview = meta.story({
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
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-size-18)',
          justifyContent: 'center',
        }}
      >
        <FileUpload.Trigger
          {...args}
          inputProps={{ ...args.inputProps, id: 'trigger' }}
        />
        <FileUpload.Dropzone
          {...getRootProps(args)}
          inputProps={getInputProps({ ...args.inputProps, id: 'dropzone' })}
          isDragGlobal={isDragGlobal}
          isDragActive={isDragActive}
        />
      </div>
    );
  },
});

export const Readonly = meta.story({
  render: (args) => {
    return (
      <div
        style={{
          background: 'var(--ds-color-neutral-surface-tinted)',
          display: 'flex',
          gap: 'var(--ds-size-12)',
          justifyContent: 'center',
          padding: 'var(--ds-size-8)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <FileUpload.Trigger
          {...args}
          inputProps={{ readOnly: true, id: 'readonly-trigger' }}
          label="Lesemodus"
          description="Beskrivelse for Trigger"
        />
        <FileUpload.Dropzone
          {...args}
          inputProps={{ readOnly: true, max: 2, id: 'readonly-dropzone' }}
          label="Lesemodus"
          description="Beskrivelse for Dropzone"
        />
      </div>
    );
  },
});

export const ExampleDropZone = meta.story({
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
        <FileUpload.Dropzone
          label="Last opp dokumentasjon"
          description="Du kan laste opp filer i PDF-format. Filer kan være opptil 0.5 MB."
          inputProps={{
            ...getInputProps({ multiple: true }),
            id: 'dokumentasjon',
          }}
          isDragGlobal={isDragGlobal}
          isDragActive={isDragActive}
          data-testid="dropzone"
          error={files.length > 2 && 'Du har lastet opp for mange filer.'}
          {...getRootProps()}
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
      </div>
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

export const TooManyFiles = meta.story({
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
        <FileUpload.Dropzone
          label="Last opp dokumentasjon"
          description="Du kan kun laste opp 2 filer."
          data-testid="dropzone"
          error={
            files.length > 2 &&
            'Du har lastet opp for mange filer. Fjern noen for å kunne sende inn skjemaet.'
          }
          inputProps={{ ...getInputProps(), id: 'dokumentasjon-for-mange' }}
          {...getRootProps()}
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
    );
  },
});

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
]);

export const ExampleTrigger = meta.story({
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
        <FileUpload.Trigger
          inputProps={{
            accept: 'image/png, image/jpeg',
            id: 'profilbilde',
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
  render: () => {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
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
                key={index}
                file={file}
                onRemove={() => removeRejected(file)}
                error={'Filformatet støttes ikke'}
              />
            ))}
          </>
        )}
      </div>
    );
  },
});

export const Upload = meta.story({
  render: () => {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-3)',
        }}
      >
        <FileUpload.Trigger
          label="Last opp rapport"
          description="Du kan legge ved 1 fil."
          onChange={handleOnChange}
          inputProps={{ id: 'rapport' }}
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
    );
  },
});
