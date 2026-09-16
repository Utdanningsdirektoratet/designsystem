import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FileUploadItem } from './FileUploadItem';

afterEach(cleanup);

describe('FileUpload.Item', () => {
  it('renders a link when `href` is set', () => {
    render(
      <ul>
        <FileUploadItem
          href={'/eksempel.txt'}
          file={new File([new Uint8Array(1024)], 'eksempel.txt')}
          onRemove={() => {}}
        />
      </ul>,
    );

    expect(screen.getByRole('link'));
  });

  it('does not render a link when `href` is unset', () => {
    render(
      <ul>
        <FileUploadItem
          file={new File([new Uint8Array(1024)], 'eksempel.txt')}
          onRemove={() => {}}
        />
      </ul>,
    );

    const name = screen.getByText('eksempel.txt');
    expect(name.tagName).toBe('SPAN');
    expect(name).not.toHaveClass('ds-link');
  });

  it('names the file in the announced error', () => {
    // The error is announced on its own, so the message alone would not say
    // which file it belongs to.
    render(
      <ul>
        <FileUploadItem
          file={new File([new Uint8Array(1024)], 'eksempel.txt')}
          error="Filformatet støttes ikke"
          onRemove={() => {}}
        />
      </ul>,
    );

    const region = screen
      .getByText('Filformatet støttes ikke')
      .closest('[aria-live]');

    expect(region).toHaveTextContent('eksempel.txt: Filformatet støttes ikke');
    // Without this the file name drops out when one error replaces another.
    expect(region).toHaveAttribute('aria-atomic', 'true');
  });

  it('announces an accepted file the same way as a rejected one', () => {
    // The verdict is what the user has been waiting for, so it has to reach
    // the same live region rather than sit silently in the row.
    render(
      <ul>
        <FileUploadItem
          file={new File([new Uint8Array(1024)], 'eksempel.txt')}
          success="Filen er godkjent"
          onRemove={() => {}}
        />
      </ul>,
    );

    const region = screen.getByText('Filen er godkjent').closest('[aria-live]');

    expect(region).toHaveTextContent('eksempel.txt: Filen er godkjent');
    expect(region).toHaveAttribute('aria-atomic', 'true');
    expect(screen.getByRole('listitem')).toHaveAttribute('data-valid');
  });

  it('keeps the error when a file is both rejected and accepted', () => {
    // One slot, and being turned away is the fact the user has to act on.
    render(
      <ul>
        <FileUploadItem
          file={new File([new Uint8Array(1024)], 'eksempel.txt')}
          error="Filformatet støttes ikke"
          success="Filen er godkjent"
          onRemove={() => {}}
        />
      </ul>,
    );

    expect(screen.getByText('Filformatet støttes ikke')).toBeInTheDocument();
    expect(screen.queryByText('Filen er godkjent')).not.toBeInTheDocument();

    const item = screen.getByRole('listitem');
    expect(item).toHaveAttribute('data-invalid');
    expect(item).not.toHaveAttribute('data-valid');
  });

  it('renders file size when description is unset', () => {
    render(
      <ul>
        <FileUploadItem
          file={new File([new Uint8Array(1024)], 'eksempel')}
          onRemove={() => {}}
        />
      </ul>,
    );

    expect(screen.getByText('1 KB'));
  });
});
