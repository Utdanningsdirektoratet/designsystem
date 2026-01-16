import { Heading, ValidationMessage } from '@digdir/designsystemet-react';
import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import { FileUpload } from 'src/components/fileUpload';
import type { FormValues, PageProps } from '../FormDemo';

export const DocumentationPage = ({
  showErrors,
  isSubmitSuccessful,
}: PageProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const removeRejected = (rejectedToRemove: FileWithPath) => {
    setRejected((prev) =>
      prev.filter(({ file }) => file.name !== rejectedToRemove.name),
    );
  };

  return (
    <>
      <Heading level={2} data-size="sm">
        Dokumentasjon
      </Heading>

      <Controller
        name="documentation"
        control={control}
        render={({ field }) => {
          const files: File[] = field.value ?? [];

          const { getRootProps, getInputProps } = useDropzone({
            multiple: true,
            maxSize: 25_000_000,
            accept: { 'application/pdf': [] },

            onDropAccepted: (acceptedFiles) => {
              field.onChange([...files, ...acceptedFiles]);
            },

            onDropRejected: (rej) => {
              setRejected((prev) => [...prev, ...rej]);
            },
          });

          const removeFile = (fileToRemove: File) => {
            field.onChange(files.filter((file) => file !== fileToRemove));
          };

          return (
            <>
              <FileUpload.Dropzone
                id="dokumentasjon-dropzone"
                label="Last opp dokumentasjon"
                description="Du kan laste opp filer i PDF-format. Filer kan være opptil 25 MB."
                multiple
                {...getRootProps()}
                inputProps={getInputProps()}
                aria-invalid={!!errors.documentation}
                readOnly={isSubmitSuccessful}
              />

              {showErrors && errors.documentation && (
                <ValidationMessage>
                  {errors.documentation.message}
                </ValidationMessage>
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
        }}
      />
    </>
  );
};

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
  ['too-many-files', 'Du har lastet opp for mange filer'],
]);
