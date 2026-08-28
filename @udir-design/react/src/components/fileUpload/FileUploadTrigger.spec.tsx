import type { DSFieldElement } from '@digdir/designsystemet-web';
import { cleanup, render, screen } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { FileUploadTrigger } from './FileUploadTrigger';

afterEach(cleanup);

const pdf = (name = 'eksempel.pdf') =>
  new File([new Uint8Array(64)], name, { type: 'application/pdf' });

const Trigger = ({
  files,
  onChange,
  label = 'Last opp dokumentasjon',
  inputProps,
}: {
  files?: File[];
  onChange?: (event: ChangeEvent<DSFieldElement>) => void;
  label?: string | null;
  inputProps?: Record<string, unknown>;
}) => (
  <FileUploadTrigger
    label={label ?? undefined}
    inputProps={{ name: 'doc', ...inputProps }}
    files={files}
    onChange={onChange}
  />
);

const input = () =>
  screen.getByLabelText('Last opp dokumentasjon') as HTMLInputElement;

/**
 * The trigger has no card to overlay, so the input covers the button instead.
 * It is driven by plain `inputProps` and `onChange`; drag and drop is
 * `FileUpload.Dropzone`.
 */
describe('FileUpload.Trigger', () => {
  it('exposes the file input as the labelled control', () => {
    render(<Trigger />);

    expect(input()).toHaveAttribute('type', 'file');
    expect(input()).toHaveAccessibleName('Last opp dokumentasjon');
  });

  it('carries the class the readonly lock icon hangs off', () => {
    // Designsystemet shows a lock before the label of a readonly field, keyed
    // on `.ds-input[readonly]` inside `.ds-field`. Without the class the field
    // is readonly with nothing to show for it.
    render(<Trigger inputProps={{ readOnly: true }} />);

    expect(input()).toHaveClass('ds-input');
  });

  it('renders no presentational button in the accessibility tree', () => {
    render(<Trigger />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('keeps the input as the tab stop', () => {
    // The input is the only focusable control here, so it must stay in the tab
    // order even if `inputProps` says otherwise.
    render(<Trigger inputProps={{ tabIndex: -1 }} />);

    expect(input()).not.toHaveAttribute('tabindex');
  });

  it('keeps the label as the accessible name over an aria-label', () => {
    render(<Trigger inputProps={{ 'aria-label': 'file upload' }} />);

    expect(input()).toHaveAccessibleName('Last opp dokumentasjon');
  });

  it('falls back to an aria-label when there is no label', () => {
    render(
      <Trigger
        label={null}
        inputProps={{ 'aria-label': 'Last opp vedlegg' }}
      />,
    );

    expect(screen.getByLabelText('Last opp vedlegg')).toHaveAccessibleName(
      'Last opp vedlegg',
    );
  });

  it('mirrors the attached files into the input', () => {
    render(<Trigger files={[pdf('a.pdf'), pdf('b.pdf')]} />);

    expect(Array.from(input().files ?? [], (file) => file.name)).toEqual([
      'a.pdf',
      'b.pdf',
    ]);
  });

  it('clears the value after a selection when files is not given', async () => {
    render(<Trigger />);

    await userEvent.upload(input(), [pdf()]);

    expect(input().files).toHaveLength(0);
    expect(input().value).toBe('');
  });

  it('lets a change handler on the root see the selected files', async () => {
    const seen = vi.fn();
    render(
      <Trigger
        onChange={(event) =>
          seen(
            Array.from(
              (event.target as unknown as HTMLInputElement).files ?? [],
              (file) => file.name,
            ),
          )
        }
      />,
    );

    await userEvent.upload(input(), [pdf('a.pdf')]);

    // The clear must not race handlers further up the tree.
    expect(seen).toHaveBeenCalledWith(['a.pdf']);
  });
});
