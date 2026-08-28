import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FileUploadTrigger } from './FileUploadTrigger';

afterEach(cleanup);

const Trigger = ({
  label = 'Last opp dokumentasjon',
  inputProps,
}: {
  label?: string | null;
  inputProps?: Record<string, unknown>;
}) => (
  <FileUploadTrigger
    label={label ?? undefined}
    inputProps={{ name: 'doc', ...inputProps }}
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
});
