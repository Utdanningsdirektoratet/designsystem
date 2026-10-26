// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IllustrationGallery } from './IllustrationGallery';
import { fixtureCatalog } from './gallery.fixtures';
import { illustrationAssetUrl } from './gallery.utils';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const searchLabel = 'Søk';

// Filtering is debounced, so flush the timer after typing.
function typeSearch(search: HTMLElement, value: string) {
  fireEvent.change(search, { target: { value } });
  act(() => {
    vi.advanceTimersByTime(300);
  });
}

describe('IllustrationGallery', () => {
  it('shows a pending state without controls', () => {
    render(
      <IllustrationGallery
        catalog={{ ...fixtureCatalog, state: 'pending-import', families: [] }}
      />,
    );
    expect(
      screen.getByRole('heading', {
        name: 'Illustrasjonene er ikke importert ennå',
      }),
    ).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('shows an empty state for an empty catalog', () => {
    render(
      <IllustrationGallery catalog={{ ...fixtureCatalog, families: [] }} />,
    );
    expect(screen.getByText('Ingen illustrasjoner i Barnehage')).toBeTruthy();
    expect(
      screen.getByRole('heading', {
        name: 'Ingen illustrasjoner å vise i denne kategorien',
      }),
    ).toBeTruthy();
  });

  it('scopes the gallery by category', () => {
    render(<IllustrationGallery catalog={fixtureCatalog} />);
    expect(
      (screen.getByRole('radio', { name: 'Barnehage' }) as HTMLInputElement)
        .checked,
    ).toBe(true);
    expect(screen.getByText('Viser 2 illustrasjoner i Barnehage')).toBeTruthy();
    fireEvent.click(screen.getByRole('radio', { name: 'Internbruk' }));
    expect(screen.getByText('Ingen illustrasjoner i Internbruk')).toBeTruthy();
    expect(
      screen.getByText(
        'Det er ikke importert illustrasjoner for Internbruk ennå.',
      ),
    ).toBeTruthy();
  });

  it('filters families by search and clears the query', () => {
    render(<IllustrationGallery catalog={fixtureCatalog} />);
    const list = screen.getByRole('list');
    expect(list.querySelectorAll('button')).toHaveLength(2);

    const search = screen.getByRole('searchbox', { name: searchLabel });
    typeSearch(search, 'INGEN TREFF');
    expect(
      screen.getByRole('heading', {
        name: 'Ingen illustrasjoner å vise i denne kategorien',
      }),
    ).toBeTruthy();
    expect(
      screen.getByText('Ingen treff for «INGEN TREFF» i Barnehage').ariaLive,
    ).toBe('polite');

    typeSearch(search, 'TESTFAMILIE');
    expect(
      screen.getByText('Viser 1 treff for «TESTFAMILIE» i Barnehage'),
    ).toBeTruthy();
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
  });

  it('keeps the query and shows hit badges when switching category', () => {
    render(
      <IllustrationGallery
        catalog={{
          ...fixtureCatalog,
          families: [
            fixtureCatalog.families[0],
            { ...fixtureCatalog.families[1], categoryId: 'internbruk' },
          ],
        }}
      />,
    );
    const search = screen.getByRole('searchbox', { name: searchLabel });
    expect(screen.getByRole('radio', { name: 'Internbruk' })).toBeTruthy();

    typeSearch(search, 'a');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
    expect(
      screen
        .getByRole('radio', { name: 'Internbruk' })
        .closest('label')
        ?.querySelector('[data-count]'),
    ).toBeNull();

    typeSearch(search, 'annen');
    const countOf = (name: string | RegExp) =>
      screen
        .getByRole('radio', { name })
        .closest('label')
        ?.querySelector('[data-count]')
        ?.getAttribute('data-count');
    expect(countOf(/Internbruk/)).toBe('1');
    expect(countOf('Barnehage')).toBeUndefined();

    fireEvent.click(screen.getByRole('radio', { name: /Internbruk/ }));
    expect((search as HTMLInputElement).value).toBe('annen');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
  });

  it('links to hits in other categories and keeps the query', () => {
    render(
      <IllustrationGallery
        catalog={{
          ...fixtureCatalog,
          families: [
            fixtureCatalog.families[0],
            { ...fixtureCatalog.families[1], categoryId: 'internbruk' },
          ],
        }}
      />,
    );
    const search = screen.getByRole('searchbox', { name: searchLabel });
    typeSearch(search, 'annen');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(0);

    fireEvent.click(
      screen.getByRole('button', { name: '1 treff i Internbruk' }),
    );
    expect(
      (screen.getByRole('radio', { name: 'Internbruk' }) as HTMLInputElement)
        .checked,
    ).toBe(true);
    expect((search as HTMLInputElement).value).toBe('annen');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
  });

  it('searches for a tag when it is clicked in the details dialog', () => {
    render(
      <IllustrationGallery
        catalog={{
          ...fixtureCatalog,
          families: [
            { ...fixtureCatalog.families[0], tags: ['lekeplass'] },
            { ...fixtureCatalog.families[1], tags: ['bøker'] },
          ],
        }}
      />,
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Syntetisk testfamilie' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'lekeplass', hidden: true }),
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    const search = screen.getByRole('searchbox', {
      name: searchLabel,
    }) as HTMLInputElement;
    expect(search.value).toBe('lekeplass');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
    expect(document.querySelector('dialog')?.hasAttribute('open')).toBe(false);
  });

  it('exposes download links for the selected variant', () => {
    render(<IllustrationGallery catalog={fixtureCatalog} />);
    const family = fixtureCatalog.families[0];
    fireEvent.click(
      screen.getByRole('button', { name: 'Syntetisk testfamilie' }),
    );
    const first = family.variants[0];
    const svg = screen.getByRole('link', {
      name: 'Last ned SVG',
      hidden: true,
    });
    const png = screen.getByRole('link', {
      name: 'Last ned PNG',
      hidden: true,
    });
    expect(svg.getAttribute('href')).toBe(illustrationAssetUrl(first, 'svg'));
    expect(svg.getAttribute('download')).toBe(first.svg);
    expect(png.getAttribute('href')).toBe(illustrationAssetUrl(first, 'png'));
    expect(png.getAttribute('download')).toBe(`${first.id}.png`);
  });
});
