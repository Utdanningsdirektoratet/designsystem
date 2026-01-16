import { Heading, ValidationMessage } from '@digdir/designsystemet-react';
import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { FileUpload } from 'src/components/fileUpload';
import type { FormValues, PageProps } from '../FormDemo';

export const DocumentationPage = ({
  showErrors,
  isSubmitSuccessful,
}: PageProps) => {
  const { register, formState } = useFormContext<FormValues>();
  const errors = showErrors ? formState.errors : {};

  console.log('Feil: ', errors.documentation?.message);

  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const removeFile = (fileToRemove: File) => {
    setFiles((prevItems) => prevItems.filter((file) => file !== fileToRemove));
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
    maxSize: 25000000,
    accept: {
      'application/pdf': [],
    },
  });
  return (
    <>
      <Heading level={2} data-size="sm">
        Dokumentasjon
      </Heading>
      <FileUpload.Dropzone
        id="dokumentasjon-dropzone"
        label="Last opp dokumentasjon"
        description="Du kan laste opp filer i PDF-format. Filer kan være opptil 25 MB."
        multiple
        inputProps={getInputProps()}
        {...getRootProps()}
        {...register('documentation')}
        aria-invalid={!!errors.documentation}
        readOnly={!isSubmitSuccessful}
      />
      {errors.educationLevel && (
        <ValidationMessage>{errors.documentation?.message}</ValidationMessage>
      )}
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
};

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
  ['too-many-files', 'Du har lastet opp for mange filer'],
]);
