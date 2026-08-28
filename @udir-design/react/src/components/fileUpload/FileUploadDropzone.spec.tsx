import { cleanup, render, screen } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { FileUploadDropzone } from './FileUploadDropzone';

afterEach(cleanup);

const pdf = () =>
  new File([new Uint8Array(64)], 'eksempel.pdf', { type: 'application/pdf' });

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
