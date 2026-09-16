import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/field';
import { FieldNecessity } from 'src/components/fieldNecessity';
import { FileUpload } from 'src/components/fileUpload';
import { Textarea } from 'src/components/textarea';
import { Heading } from 'src/components/typography/heading';
import { Label } from 'src/components/typography/label';
import type { FileUploadEntry } from 'src/hooks/useFileUpload';
import { useFileUpload } from 'src/hooks/useFileUpload';
import type { FormValues, PageProps } from '../FormDemo';

export const DocumentationPage = ({
  isSubmitSuccessful,
  showErrors,
}: PageProps) => {
  const { register, setValue, getValues, formState } =
    useFormContext<FormValues>();
  const errors = showErrors ? formState.errors : {};

  // The whole list lives in the form, so validation can see the files that
  // failed and the user still has them after visiting another page.
  const onEntriesChange = useCallback(
    (entries: FileUploadEntry[]) =>
      setValue(
        'documentation',
        // Whether a file is uploading right now is not something the form
        // should remember; see the schema.
        entries.map(({ loading: _, ...entry }) => entry),
        { shouldValidate: true },
      ),
    [setValue],
  );
  const { entries, files, add, addRejected, remove } = useFileUpload({
    initialEntries: getValues('documentation'),
    onEntriesChange,
  });

  const { getRootProps, getInputProps, isDragGlobal, isDragActive } =
    useDropzone({
      onDropAccepted: (accepted) => {
        const { duplicates } = add(accepted);
        // The hook spots them; the wording is ours.
        addRejected(
          duplicates.map((file) => ({
            file,
            error: 'Filen er allerede lagt til',
          })),
        );
      },
      onDropRejected: (rejections) =>
        addRejected(
          rejections.map(({ file, errors }) => ({
            file,
            error: ErrorMessages.get(errors[0].code) ?? errors[0].message,
          })),
        ),
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
        files={files}
        isDragActive={isDragActive}
        isDragGlobal={isDragGlobal}
        error={errors.documentation?.message}
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
                onRemove={() => remove(id)}
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
