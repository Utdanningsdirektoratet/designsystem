import { cleanup, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { FileUploadDownloadButton } from './FileUploadDownloadButton';
import { FileUploadItem } from './FileUploadItem';
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

  describe('removing a file with the keyboard', () => {
    /* Every row has a download button before the delete button, so landing on
       the first button in the next row would be the wrong one. */
    function Files({ onRemove }: { onRemove?: () => void }) {
      const [names, setNames] = useState(['a.pdf', 'b.pdf', 'c.pdf']);
      return (
        <>
          <button type="button">Utenfor</button>
          <ul>
            {names.map((name) => (
              <FileUploadItem
                key={name}
                file={{ name }}
                actions={
                  <FileUploadDownloadButton
                    fileName={name}
                    onClick={() => {}}
                  />
                }
                onRemove={() => {
                  setNames((prev) => prev.filter((n) => n !== name));
                  onRemove?.();
                }}
              />
            ))}
          </ul>
        </>
      );
    }

    const buttonIn = (name: string, kind: 'delete' | 'download') =>
      screen
        .getByText(name)
        .closest('li')
        ?.querySelector<HTMLElement>(`.uds-file-upload__${kind}-button`);

    const remove = async (name: string) => {
      buttonIn(name, 'delete')?.focus();
      await userEvent.keyboard('{Enter}');
    };

    it("moves focus to the next file's delete button", async () => {
      render(<Files />);

      await remove('b.pdf');

      await vi.waitFor(() => expect(buttonIn('c.pdf', 'delete')).toHaveFocus());
    });

    it("moves focus to the previous file's delete button when the last file is removed", async () => {
      render(<Files />);

      await remove('c.pdf');

      await vi.waitFor(() => expect(buttonIn('b.pdf', 'delete')).toHaveFocus());
    });

    it('leaves focus where `onRemove` moved it', async () => {
      render(
        <Files
          onRemove={() =>
            screen.getByRole('button', { name: 'Utenfor' }).focus()
          }
        />,
      );

      await remove('b.pdf');

      await vi.waitFor(() =>
        expect(screen.queryByText('b.pdf')).not.toBeInTheDocument(),
      );
      expect(screen.getByRole('button', { name: 'Utenfor' })).toHaveFocus();
    });
  });

  it("moves focus to the next file's download button when loading hides the focused one", async () => {
    function Downloads() {
      const [busy, setBusy] = useState<string>();
      return (
        <ul>
          {['a.pdf', 'b.pdf'].map((name) => (
            <FileUploadItem
              key={name}
              file={{ name }}
              loading={busy === name}
              actions={
                <FileUploadDownloadButton
                  fileName={name}
                  onClick={() => setBusy(name)}
                />
              }
            />
          ))}
        </ul>
      );
    }
    render(<Downloads />);
    const [first, second] = screen.getAllByRole('button');

    first.focus();
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(second).toHaveFocus());
  });

  describe('the tooltip of a removed delete button', () => {
    function OneFile() {
      const [removed, setRemoved] = useState(false);
      return (
        <ul>
          {!removed && (
            <FileUploadItem
              file={{ name: 'a.pdf' }}
              onRemove={() => setRemoved(true)}
            />
          )}
        </ul>
      );
    }

    const tooltipOpen = () =>
      Boolean(document.querySelector('.ds-tooltip')?.matches(':popover-open'));

    it('closes when there is no file left to move focus to', async () => {
      render(<OneFile />);
      screen.getByRole('button').focus();
      await vi.waitFor(() => expect(tooltipOpen()).toBe(true));

      await userEvent.keyboard('{Enter}');

      await vi.waitFor(() =>
        expect(screen.queryByRole('button')).not.toBeInTheDocument(),
      );
      await vi.waitFor(() => expect(tooltipOpen()).toBe(false));
    });

    it('closes when the button was under the mouse without having focus', async () => {
      render(<OneFile />);
      const button = screen.getByRole('button');
      await userEvent.hover(button);
      await vi.waitFor(() => expect(tooltipOpen()).toBe(true));

      // As in Safari, where clicking a button does not focus it.
      button.click();

      await vi.waitFor(() =>
        expect(screen.queryByRole('button')).not.toBeInTheDocument(),
      );
      await vi.waitFor(() => expect(tooltipOpen()).toBe(false));
    });
  });
});
