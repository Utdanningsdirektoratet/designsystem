import { cleanup, render, screen } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { FileUploadDropzone } from './FileUploadDropzone';

afterEach(cleanup);

const pdf = (name = 'eksempel.pdf') =>
  new File([new Uint8Array(64)], name, { type: 'application/pdf' });

const Dropzone = ({
  onDropAccepted,
  error,
  readOnly,
}: {
  onDropAccepted?: (files: File[]) => void;
  error?: string;
  readOnly?: boolean;
}) => {
  const { getRootProps, getInputProps, isDragActive, isDragGlobal } =
    useDropzone({ onDropAccepted });

  return (
    <FileUploadDropzone
      label="Last opp dokumentasjon"
      description="Filer kan være opptil 25 MB."
      error={error}
      cardProps={getRootProps()}
      inputProps={getInputProps({ readOnly })}
      isDragActive={isDragActive}
      isDragGlobal={isDragGlobal}
    />
  );
};

/** The file input is the control, so `ds-field` can associate the field texts with it. */
describe('FileUpload.Dropzone', () => {
  it('exposes the file input as the labelled control', () => {
    render(<Dropzone />);

    const input = screen.getByLabelText('Last opp dokumentasjon');
    expect(input).toHaveAttribute('type', 'file');
    // Asserted on the computed name, not just the association: an `aria-label`
    // on the input would win over the label element and go unnoticed.
    expect(input).toHaveAccessibleName('Last opp dokumentasjon');
  });

  it('associates the description with the input', () => {
    render(<Dropzone />);

    const input = screen.getByLabelText('Last opp dokumentasjon');
    expect(input).toHaveAccessibleDescription('Filer kan være opptil 25 MB.');
  });

  it('marks the input invalid and describes it with the error first', () => {
    render(<Dropzone error="Filen er for stor" />);

    const input = screen.getByLabelText('Last opp dokumentasjon');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const [firstId] = input.getAttribute('aria-describedby')!.split(/\s+/);
    expect(document.getElementById(firstId)).toHaveTextContent(
      'Filen er for stor',
    );
  });

  it('keeps the label as the accessible name over an aria-label', () => {
    render(
      <FileUploadDropzone
        label="Last opp dokumentasjon"
        inputProps={{ 'aria-label': 'file upload' }}
      />,
    );

    expect(
      screen.getByLabelText('Last opp dokumentasjon'),
    ).toHaveAccessibleName('Last opp dokumentasjon');
  });

  it('renders no presentational button in the accessibility tree', () => {
    render(<Dropzone />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('keeps the input as the only tab stop', () => {
    render(<Dropzone />);

    const input = screen.getByLabelText('Last opp dokumentasjon');
    expect(input).not.toHaveAttribute('tabindex');
    expect(document.querySelectorAll('[tabindex="0"]')).toHaveLength(0);
  });

  it('processes a selection exactly once', async () => {
    const onDropAccepted = vi.fn();
    render(<Dropzone onDropAccepted={onDropAccepted} />);

    await userEvent.upload(screen.getByLabelText('Last opp dokumentasjon'), [
      pdf(),
    ]);

    await vi.waitFor(() => expect(onDropAccepted).toHaveBeenCalledTimes(1));
  });

  it('cancels the native file assignment for drops on the input', () => {
    render(<Dropzone />);
    const input = screen.getByLabelText(
      'Last opp dokumentasjon',
    ) as HTMLInputElement;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(pdf());
    const drop = new DragEvent('drop', {
      dataTransfer,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(drop);

    // react-dropzone's root handler preventDefaults the bubbled drop, so the
    // input never receives the files and no duplicate `change` fires.
    expect(drop.defaultPrevented).toBe(true);
    expect(input.files).toHaveLength(0);
  });

  it('carries the class the readonly lock icon hangs off', () => {
    // Designsystemet shows a lock before the label of a readonly field, keyed
    // on `.ds-input[readonly]` inside `.ds-field`. Without the class the field
    // is readonly with nothing to show for it.
    render(<Dropzone readOnly />);

    expect(screen.getByLabelText('Last opp dokumentasjon')).toHaveClass(
      'ds-input',
    );
  });

  it('does not open the file dialog when readOnly', () => {
    render(<Dropzone readOnly />);
    const input = screen.getByLabelText(
      'Last opp dokumentasjon',
    ) as HTMLInputElement;

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    input.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
  });
});

const WithFiles = ({
  files,
  onChange,
}: {
  files?: File[];
  onChange?: () => void;
}) => {
  const { getRootProps, getInputProps } = useDropzone({ multiple: true });

  return (
    <form>
      <FileUploadDropzone
        label="Last opp dokumentasjon"
        cardProps={getRootProps()}
        inputProps={getInputProps({ name: 'doc', required: true, onChange })}
        files={files}
      />
    </form>
  );
};

const input = () =>
  screen.getByLabelText('Last opp dokumentasjon') as HTMLInputElement;

/**
 * `input.files` is what assistive technology announces as the control's value,
 * and what native form submission sends, so it has to match the visible list.
 */
describe('FileUpload.Dropzone attached files', () => {
  it('mirrors the attached files into the input', () => {
    render(<WithFiles files={[pdf('a.pdf'), pdf('b.pdf')]} />);

    expect(Array.from(input().files ?? [], (file) => file.name)).toEqual([
      'a.pdf',
      'b.pdf',
    ]);
  });

  it('mirrors without re-entering the change handler', () => {
    const onChange = vi.fn();
    render(<WithFiles files={[pdf()]} onChange={onChange} />);

    expect(input().files).toHaveLength(1);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('lets required and native submission see files the dialog never saw', () => {
    const { rerender } = render(<WithFiles files={[]} />);
    expect(input().checkValidity()).toBe(false);

    rerender(<WithFiles files={[pdf('a.pdf')]} />);

    expect(input().checkValidity()).toBe(true);
    const submitted = new FormData(input().form!).getAll('doc') as File[];
    expect(submitted.map((file) => file.name)).toEqual(['a.pdf']);
  });

  it('clears the value after a selection when files is not given', async () => {
    render(<WithFiles />);

    await userEvent.upload(input(), [pdf()]);

    // Consistently empty beats intermittently stale: the input cannot reflect
    // drops or removals, so it must not claim a selection it may have lost.
    await vi.waitFor(() => expect(input().files).toHaveLength(0));
    expect(input().value).toBe('');
  });

  it('leaves an async getFilesFromEvent intact if it reads before awaiting', async () => {
    const onDrop = vi.fn();
    const Async = () => {
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        getFilesFromEvent: async (event) => {
          const files = Array.from(
            (event as ChangeEvent<HTMLInputElement>).target?.files ?? [],
          );
          await Promise.resolve();
          return files;
        },
      });

      return (
        <FileUploadDropzone
          label="Last opp dokumentasjon"
          cardProps={getRootProps()}
          inputProps={getInputProps()}
        />
      );
    };
    render(<Async />);

    await userEvent.upload(input(), [pdf()]);

    await vi.waitFor(() => expect(onDrop).toHaveBeenCalled());
    expect(onDrop.mock.calls[0][0]).toHaveLength(1);
  });
});
