import { act, cleanup, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileUploadItem } from './FileUploadItem';
import { FileUploadItemButton } from './FileUploadItemButton';
import './fileUpload.css';

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

  it('lets the loading text be replaced', () => {
    // The default sits in css on the empty element, so a `loadingText` has to
    // take its place rather than land beside it.
    const file = new File([new Uint8Array(1024)], 'eksempel.txt');
    const item = (loadingText?: string) => (
      <ul>
        <FileUploadItem
          file={file}
          loading
          loadingText={loadingText}
          onRemove={() => {}}
        />
      </ul>
    );
    const description = () =>
      document.querySelector('.uds-file-upload__item-description') as Element;

    const { rerender } = render(item());

    expect(description()).toBeEmptyDOMElement();
    // Every language ends the default the same way.
    expect(getComputedStyle(description(), '::before').content).toContain(
      '...',
    );

    rerender(item('Validerer…'));

    expect(description()).toHaveTextContent('Validerer…');
    expect(getComputedStyle(description(), '::before').content).toBe('none');
  });

  it('announces its loading text, which is heard without the file having focus', async () => {
    const file = new File([new Uint8Array(1024)], 'eksempel.txt');
    const item = (loading: boolean, loadingText?: string) => (
      <ul>
        <FileUploadItem
          file={file}
          loading={loading}
          loadingText={loadingText}
          onRemove={() => {}}
        />
      </ul>
    );
    const region = () =>
      screen.getByRole('listitem').querySelector('[aria-live]') as Element;

    const { rerender } = render(item(false));
    rerender(item(true));

    // The default comes from css, in the language of the page.
    await vi.waitFor(() =>
      expect(region()).toHaveTextContent('eksempel.txt: Uploading...'),
    );

    rerender(item(true, 'Validerer…'));

    await vi.waitFor(() =>
      expect(region()).toHaveTextContent('eksempel.txt: Validerer…'),
    );

    rerender(item(false));

    expect(region()).toBeEmptyDOMElement();
  });

  it('lets the announced loading text go after a while, so reading the page finds it once', () => {
    // NVDA in Chrome read both the visible loading text and the announced one.
    vi.useFakeTimers();
    try {
      const file = new File([new Uint8Array(1024)], 'eksempel.txt');
      const item = (loading: boolean) => (
        <ul>
          <FileUploadItem
            file={file}
            loading={loading}
            loadingText="Validerer…"
            onRemove={() => {}}
          />
        </ul>
      );
      const region = () =>
        screen.getByRole('listitem').querySelector('[aria-live]') as Element;

      const { rerender } = render(item(false));
      rerender(item(true));
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(region()).toHaveTextContent('eksempel.txt: Validerer…');

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(region()).toBeEmptyDOMElement();
      expect(screen.getByRole('listitem')).toMatchTextContent('Validerer…');
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not announce the loading text a file has as the page loads, until it changes', () => {
    // The screen reader reads it along with the page.
    vi.useFakeTimers();
    try {
      const file = new File([new Uint8Array(1024)], 'eksempel.txt');
      const item = (loadingText: string) => (
        <ul>
          <FileUploadItem
            file={file}
            loading
            loadingText={loadingText}
            onRemove={() => {}}
          />
        </ul>
      );
      const region = () =>
        screen.getByRole('listitem').querySelector('[aria-live]') as Element;

      const { rerender } = render(item('Laster opp…'));
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(region()).toBeEmptyDOMElement();

      rerender(item('Sjekker innholdet…'));
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(region()).toHaveTextContent('eksempel.txt: Sjekker innholdet…');
    } finally {
      vi.useRealTimers();
    }
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

  describe('actions', () => {
    const file = new File([new Uint8Array(1024)], 'eksempel.txt');

    it('come before the delete button', () => {
      render(
        <ul>
          <FileUploadItem
            file={file}
            onRemove={() => {}}
            actions={<button type="button">Last ned</button>}
          />
        </ul>,
      );

      const [first, last] = screen.getAllByRole('button');
      expect(first).toHaveTextContent('Last ned');
      expect(last).toHaveClass('uds-file-upload__delete-button');
    });

    it('stay in a readonly item, where the delete button does not', () => {
      render(
        <ul>
          <FileUploadItem
            file={file}
            onRemove={() => {}}
            readonly
            actions={<button type="button">Last ned</button>}
          />
        </ul>,
      );

      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(screen.getByRole('button')).toHaveTextContent('Last ned');
    });

    it('are hidden while loading, along with the delete button', () => {
      render(
        <ul>
          <FileUploadItem
            file={file}
            loading
            onRemove={() => {}}
            actions={<button type="button">Last ned</button>}
          />
        </ul>,
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('a custom `FileUpload.ItemButton`', () => {
    function Files() {
      const [busy, setBusy] = useState<string>();
      return (
        <ul>
          {['a.pdf', 'b.pdf'].map((name) => (
            <FileUploadItem
              key={name}
              file={{ name }}
              loading={busy === name}
              actions={
                <>
                  <FileUploadItemButton
                    icon={<svg aria-hidden />}
                    tooltip="Forhåndsvis filen"
                    fileName={name}
                    onClick={() => {}}
                  />
                  <FileUploadItemButton
                    icon={<svg aria-hidden />}
                    tooltip="Del filen"
                    fileName={name}
                    onClick={() => setBusy(name)}
                  />
                </>
              }
            />
          ))}
        </ul>
      );
    }

    it('is named by its tooltip and the file it acts on', async () => {
      render(<Files />);

      expect(
        await screen.findByRole('button', { name: 'Del filen a.pdf' }),
      ).toBeInTheDocument();
    });
  });
});
