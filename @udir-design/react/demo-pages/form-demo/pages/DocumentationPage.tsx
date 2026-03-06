import { useState } from 'react';
import type { FileRejection, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/field/Field';
import { FieldNecessity } from 'src/components/fieldNecessity';
import { FileUpload } from 'src/components/fileUpload';
import { Textarea } from 'src/components/textarea/Textarea';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import type { FormValues, PageProps } from '../FormDemo';

export const DocumentationPage = ({
  isSubmitSuccessful,
  showErrors,
}: PageProps) => {
  const { register, setValue, watch, formState } = useFormContext<FormValues>();

  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const uploadedFiles = watch('documentation');
  const errors = showErrors ? formState.errors : {};

  const removeFile = (fileToRemove: File) => {
    setValue('documentation', [
      ...uploadedFiles.filter((file) => file.name === fileToRemove.name),
    ]);
  };

  const removeRejected = (rejectedToRemove: FileWithPath) => {
    setRejected((prevFile) =>
      prevFile.filter(({ file }) => file.name !== rejectedToRemove.name),
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (file) => {
      setValue('documentation', [...uploadedFiles, ...file], {
        shouldValidate: true,
      });
    },
    onDropRejected: (rej) => {
      setRejected((prev) => [...prev, ...rej]);
    },
    maxSize: 25000000,
    multiple: true,
    accept: {
      'application/pdf': [],
    },
  });

  return (
    <>
      <Heading level={2} data-size="sm">
        Dokumentasjon
      </Heading>
      <FieldNecessity.Summary />
      <FileUpload.Dropzone
        id="dokumentasjon-dropzone"
        label={<span>Last opp dokumentasjon</span>}
        description="Du kan laste opp filer i PDF-format. Filer kan være opptil 25 MB."
        {...getRootProps()}
        error={errors.documentation?.message}
        inputProps={getInputProps({
          required: true,
          readOnly: isSubmitSuccessful,
        })}
        aria-invalid={!!errors.documentation}
      />
      {uploadedFiles.length > 0 && (
        <>
          <Heading level={3} data-size="2xs">
            Vedlegg ({uploadedFiles.length}):
          </Heading>

          {uploadedFiles.map((file, index) => (
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
      <Field>
        <Label>
          <span>Kommentarer til dokumentasjon</span>
        </Label>
        <Field.Description>
          Ytterlige kommentarer til dokumentasjonen du har lastet opp.
        </Field.Description>
        <Textarea
          id="addition"
          readOnly={isSubmitSuccessful}
          {...register('addition')}
        />
      </Field>
    </>
  );
};

const ErrorMessages = new Map<string, string>([
  ['file-invalid-type', 'Filformatet støttes ikke'],
  ['file-too-large', 'Filen er for stor'],
  ['file-too-small', 'Filen er for liten'],
  ['too-many-files', 'Du har lastet opp for mange filer'],
]);
