import { cleanup, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { FileUploadDownloadButton } from './FileUploadDownloadButton';
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

  const buttonIn = (name: string, kind: 'delete' | 'download') =>
    screen
      .getByText(name)
      .closest('li')
      ?.querySelector<HTMLElement>(`.uds-file-upload__${kind}-button`);

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

  describe('removing the last file with the keyboard', () => {
    function LastFile({ inForm = true, slow = false }) {
      const [removed, setRemoved] = useState(false);
      const [busy, setBusy] = useState(false);
      // Hidden when empty, as a consumer may do.
      const list = !removed && (
        <ul>
          <FileUploadItem
            file={{ name: 'a.pdf' }}
            loading={busy}
            onRemove={() => {
              if (!slow) return setRemoved(true);
              // Deleted on a server, which takes a while.
              setBusy(true);
              setTimeout(() => setRemoved(true), 200);
            }}
          />
        </ul>
      );
      return (
        <>
          <button type="button">Utenfor</button>
          {inForm ? (
            <form>
              <input type="file" aria-label="Last opp" />
              <button type="button" disabled>
                Deaktivert
              </button>
              <button type="button" hidden>
                Skjult
              </button>
              {list}
            </form>
          ) : (
            list
          )}
        </>
      );
    }

    const remove = async () => {
      buttonIn('a.pdf', 'delete')?.focus();
      await userEvent.keyboard('{Enter}');
      await vi.waitFor(() =>
        expect(screen.queryByText('a.pdf')).not.toBeInTheDocument(),
      );
    };

    it('moves focus to the nearest element before the list in its form that can take focus', async () => {
      render(<LastFile />);

      await remove();

      await vi.waitFor(() =>
        expect(screen.getByLabelText('Last opp')).toHaveFocus(),
      );
    });

    it('moves focus there too once a file that was `loading` is removed', async () => {
      render(<LastFile slow />);

      await remove();

      await vi.waitFor(() =>
        expect(screen.getByLabelText('Last opp')).toHaveFocus(),
      );
    });

    it('leaves focus on the page when the list is not in a form', async () => {
      render(<LastFile inForm={false} />);

      await remove();

      expect(document.body).toHaveFocus();
    });
  });

  describe('while `loading` hides the focused button', () => {
    /* Loading lasts long enough to be seen before it ends. */
    const later = (done: () => void) => setTimeout(done, 200);

    function Files() {
      const [names, setNames] = useState(['a.pdf', 'b.pdf']);
      const [busy, setBusy] = useState<string>();
      return (
        <>
          <button type="button">Utenfor</button>
          <ul>
            {names.map((name) => (
              <FileUploadItem
                key={name}
                file={{ name }}
                loading={busy === name}
                actions={
                  <FileUploadDownloadButton
                    fileName={name}
                    onClick={() => {
                      setBusy(name);
                      later(() => setBusy(undefined));
                    }}
                  />
                }
                // Deleted on a server, which takes a while.
                onRemove={() => {
                  setBusy(name);
                  later(() =>
                    setNames((prev) => prev.filter((n) => n !== name)),
                  );
                }}
              />
            ))}
          </ul>
        </>
      );
    }

    const press = async (name: string, kind: 'delete' | 'download') => {
      buttonIn(name, kind)?.focus();
      await userEvent.keyboard('{Enter}');
      await vi.waitFor(() =>
        expect(screen.getByText(name).closest('li')).toHaveAttribute(
          'aria-busy',
          'true',
        ),
      );
    };

    it('keeps focus away from the other files', async () => {
      render(<Files />);

      await press('a.pdf', 'download');

      expect(buttonIn('b.pdf', 'download')).not.toHaveFocus();
      expect(document.body).toHaveFocus();
    });

    it('gives focus back to the button when loading ends', async () => {
      render(<Files />);

      await press('a.pdf', 'download');

      await vi.waitFor(() =>
        expect(buttonIn('a.pdf', 'download')).toHaveFocus(),
      );
    });

    it('leaves focus where the user moved it while loading', async () => {
      render(<Files />);
      const outside = screen.getByRole('button', { name: 'Utenfor' });

      await press('a.pdf', 'download');
      outside.focus();

      await vi.waitFor(() =>
        expect(buttonIn('a.pdf', 'download')).toBeInTheDocument(),
      );
      expect(outside).toHaveFocus();
    });

    it("moves focus to the next file's delete button once the file is removed", async () => {
      render(<Files />);

      await press('a.pdf', 'delete');

      await vi.waitFor(() => expect(buttonIn('b.pdf', 'delete')).toHaveFocus());
    });
  });

  describe('a custom `FileUpload.ItemButton`', () => {
    function Files() {
      const [names, setNames] = useState(['a.pdf', 'b.pdf']);
      return (
        <ul>
          {names.map((name) => (
            <FileUploadItem
              key={name}
              file={{ name }}
              actions={
                <>
                  <FileUploadItemButton
                    icon={<svg aria-hidden />}
                    tooltip="Beskriv filen"
                    fileName={name}
                    onClick={() => {}}
                  />
                  <FileUploadItemButton
                    icon={<svg aria-hidden />}
                    tooltip="Flytt filen"
                    fileName={name}
                    onClick={() =>
                      setNames((prev) => prev.filter((n) => n !== name))
                    }
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
        await screen.findByRole('button', { name: 'Flytt filen a.pdf' }),
      ).toBeInTheDocument();
    });

    it('hands focus to the button with the same tooltip on the next file', async () => {
      render(<Files />);

      (
        await screen.findByRole('button', { name: 'Flytt filen a.pdf' })
      ).focus();
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(() =>
        expect(
          screen.getByRole('button', { name: 'Flytt filen b.pdf' }),
        ).toHaveFocus(),
      );
    });
  });

  describe('removing a file with its delete button', () => {
    function Files({ initial, slow }: { initial: string[]; slow?: boolean }) {
      const [names, setNames] = useState(initial);
      const [busy, setBusy] = useState<string>();
      const remove = (name: string) =>
        setNames((prev) => prev.filter((n) => n !== name));
      // Hidden when empty, as a consumer may do.
      return names.length > 0 ? (
        <ul>
          {names.map((name) => (
            <FileUploadItem
              key={name}
              file={{ name }}
              loading={busy === name}
              actions={
                <FileUploadItemButton
                  icon={<svg aria-hidden />}
                  tooltip="Flytt filen"
                  fileName={name}
                  onClick={() => remove(name)}
                />
              }
              onRemove={() => {
                if (!slow) return remove(name);
                // Deleted on a server, which takes a while.
                setBusy(name);
                setTimeout(() => remove(name), 1000);
              }}
            />
          ))}
        </ul>
      ) : null;
    }

    const status = () =>
      document.body.querySelector(':scope > [role="status"]');

    // The region outlives each test, and keeps its text for a few seconds.
    afterEach(() => status()?.replaceChildren());

    /* Longer than the announcement waits before it is set. Earlier tests may
       still have one on its way, so the files here have names of their own,
       and a test that expects nothing only looks for those. */
    const pastTheWait = () => new Promise((done) => setTimeout(done, 700));

    it('announces that the file is removed', async () => {
      render(<Files initial={['x.pdf', 'y.pdf']} />);

      await userEvent.click(buttonIn('y.pdf', 'delete') as HTMLElement);

      // The test page is in English.
      await vi.waitFor(
        () => expect(status()).toHaveTextContent('y.pdf removed'),
        { timeout: 2000 },
      );
    });

    it('announces it once a file that is `loading` meanwhile is gone, along with its list', async () => {
      render(<Files initial={['x.pdf']} slow />);

      await userEvent.click(buttonIn('x.pdf', 'delete') as HTMLElement);
      await vi.waitFor(() =>
        expect(screen.getByRole('listitem')).toHaveAttribute(
          'aria-busy',
          'true',
        ),
      );
      await pastTheWait();
      expect(status()).not.toHaveTextContent('x.pdf');

      await vi.waitFor(
        () => expect(status()).toHaveTextContent('x.pdf removed'),
        { timeout: 3000 },
      );
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('announces nothing when the file leaves another way', async () => {
      render(<Files initial={['x.pdf', 'y.pdf']} />);

      await userEvent.click(
        await screen.findByRole('button', { name: 'Flytt filen x.pdf' }),
      );

      await vi.waitFor(() =>
        expect(screen.queryByText('x.pdf')).not.toBeInTheDocument(),
      );
      await pastTheWait();
      expect(status()).not.toHaveTextContent('x.pdf');
    });
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
