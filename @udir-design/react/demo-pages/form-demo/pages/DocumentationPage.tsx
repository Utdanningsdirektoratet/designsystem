import { useState } from 'react';
import type { FileRejection } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/field';
import { FieldNecessity } from 'src/components/fieldNecessity';
import { FileUpload } from 'src/components/fileUpload';
import { Textarea } from 'src/components/textarea';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label';
import type { FormValues, PageProps } from '../FormDemo';

export const DocumentationPage = ({
  isSubmitSuccessful,
  showErrors,
}: PageProps) => {
  const { register, setValue, watch, formState } = useFormContext<FormValues>();

  // For rejected files we need an id per upload attempt rather than per file
  type Rejection = FileRejection & { id: string };
  const [rejected, setRejected] = useState<Rejection[]>([]);
  const uploadedFiles = watch('documentation');
  const errors = showErrors ? formState.errors : {};

  const removeFile = (fileToRemove: File) => {
    setValue(
      'documentation',
      uploadedFiles.filter((file) => file !== fileToRemove),
      { shouldValidate: true },
    );
  };

  const removeRejected = (idToRemove: string) => {
    setRejected((prev) => prev.filter(({ id }) => id !== idToRemove));
  };

  const { getRootProps, getInputProps, isDragGlobal, isDragActive } =
    useDropzone({
      validator: (file) =>
        uploadedFiles.some((uploaded) => fileId(uploaded) === fileId(file))
          ? {
              code: 'file-already-added',
              message: 'Filen er allerede lagt til',
            }
          : null,
      onDropAccepted: (files) => {
        setValue('documentation', [...uploadedFiles, ...files], {
          shouldValidate: true,
        });
      },
      onDropRejected: (rejections) => {
        const entries = rejections.map((rejection) => ({
          ...rejection,
          id: crypto.randomUUID(),
        }));
        setRejected((prev) => [...prev, ...entries]);
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
        label={<span>Last opp dokumentasjon</span>}
        description="Du kan laste opp filer i PDF-format. Filer kan være opptil 25 MB."
        cardProps={getRootProps()}
        inputProps={{
          ...getInputProps({
            required: true,
            readOnly: isSubmitSuccessful,
          }),
          id: 'dokumentasjon-dropzone',
        }}
        files={uploadedFiles}
        isDragActive={isDragActive}
        isDragGlobal={isDragGlobal}
        error={errors.documentation?.message}
      />
      {uploadedFiles.length > 0 && (
        <>
          <Heading level={3} data-size="2xs">
            Vedlegg ({uploadedFiles.length}):
          </Heading>

          <FileUpload.List>
            {uploadedFiles.map((file) => (
              <FileUpload.Item
                key={fileId(file)}
                file={file}
                onRemove={() => removeFile(file)}
              />
            ))}
          </FileUpload.List>
        </>
      )}

      {rejected.length > 0 && (
        <>
          <Heading level={3} data-size="2xs">
            Vedlegg med feil:
          </Heading>

          <FileUpload.List>
            {rejected.map(({ id, file, errors }) => (
              <FileUpload.Item
                key={id}
                file={file}
                onRemove={() => removeRejected(id)}
                error={ErrorMessages.get(errors[0].code) ?? errors[0].message}
              />
            ))}
          </FileUpload.List>
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

function fileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}
