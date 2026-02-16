import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
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
    a11y: {
      // Axe reports that buttons have no accessible name when the label is provided via CSS.
      // Disable this rule until the issue have been resolved in axe-core and propagated to @storybook/addon-a11y.
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: false,
          },
        ],
      },
    },
  },
});

export const Preview = meta.story({
  args: {
    'data-size': 'md',
    label: 'Label',
    description: 'Beskrivelse',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-size-18)',
        justifyContent: 'center',
      }}
    >
      <FileUpload.Trigger {...args} id="trigger" />
      <FileUpload.Dropzone {...args} id="dropzone" />
    </div>
  ),
});

export const ExampleDropZone = meta.story({
  args: {
    id: 'dokumentasjon-dropzone',
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

    const { getRootProps, getInputProps } = useDropzone({
      onDropAccepted: (file) => {
        setFiles((prev) => [...prev, ...file]);
      },
      onDropRejected: (rej) => {
        setRejected((prev) => [...prev, ...rej]);
      },
      maxSize: 524288,
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
          multiple
          inputProps={getInputProps()}
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
});

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
  ['too-many-files', 'Du har lastet opp for mange filer'],
]);

export const ExampleTrigger = meta.story({
  args: {
    label: 'Last opp profilbilde',
    description: 'Du kan laste opp filer i PNG- og JPEG-format.',
    id: 'profilbilde',
  },
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
        e.target.value = '';
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
          inputProps={{ accept: 'image/png, image/jpeg' }}
          onChange={(e) => handleOnChange(e)}
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
});

export const ExampleItems = meta.story({
  render: () => {
    const dummyFiles: File[] = [
      new File(['abc'.repeat(100000)], 'eksempel1.pdf'),
      new File(['abc'.repeat(10000)], 'eksempel2.docx'),
      new File(['abc'.repeat(1000000)], 'eksempel3.png'),
    ];
    const dummyRejected: File[] = [
      new File(['abc'.repeat(288000)], 'eksempel4.tsx'),
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
                loading={index === 2 && true}
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files; // safe

      if (files) {
        setFile(files[0]);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          e.target.value = '';
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
          id="rapport"
          onChange={handleOnChange}
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
