import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { Heading } from '../typography/heading/Heading';
import { FileUpload } from './index';

export type Story = StoryObj<typeof FileUpload.Trigger>;

const meta: Meta<typeof FileUpload.Trigger> = {
  component: FileUpload.Trigger,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
};

export default meta;

export const Preview: Story = {
  args: {
    'data-size': 'md',
  },
  render: (args) => (
    <>
      <FileUpload.Trigger {...args} />
      <FileUpload.Dropzone {...args} />
    </>
  ),
};

export const ExampleDropZone: Story = {
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
        <div {...getRootProps()} style={{ width: 'fit-content' }}>
          <FileUpload.Dropzone
            label="Dokumentasjon"
            description="Du kan laste opp pdf-filer. Maks 0.5 MB."
            multiple
            inputProps={getInputProps()}
            {...args}
          />
        </div>
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
};

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
  ['too-many-files', 'Du har lastet opp for mange filer'],
]);

export const ExampleTrigger: Story = {
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
          label="Profilbilde"
          description="Du kan laste opp png- og jpeg-filer."
          accept="image/png, image/jpeg"
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
};

export const ExampleItems: Story = {
  render: () => {
    const dummyFiles: File[] = [
      new File(['abc'.repeat(100000)], 'eksempel1.pdf'),
      new File(['abc'.repeat(1000000)], 'eksempel2.pdf'),
    ];
    const dummyRejected: File[] = [
      new File(['abc'.repeat(288000)], 'eksempel3.png'),
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
};

export const Loading: Story = {
  render: () => (
    <>
      <FileUpload.Trigger
        loading
        style={{ marginBlockEnd: 'var(--ds-size-3)' }}
      />
      <FileUpload.Dropzone loading />
    </>
  ),
};
