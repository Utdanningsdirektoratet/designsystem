// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { IllustrationGallery } from './IllustrationGallery';
import { fixtureCatalog } from './gallery.fixtures';
import { illustrationAssetUrl } from './gallery.utils';

afterEach(cleanup);

const filterLabel = 'Filtrer på stikkord';

const taggedCatalog = {
  ...fixtureCatalog,
  families: [
    { ...fixtureCatalog.families[0], tags: ['lekeplass'] },
    { ...fixtureCatalog.families[1], tags: ['bøker'] },
  ],
};

// Typing the exact label and pressing Enter is how the combobox commits an option.
function chooseOption(label: string) {
  const input = screen.getByRole('combobox', { name: filterLabel });
  fireEvent.change(input, { target: { value: label } });
  fireEvent.keyDown(input, { key: 'Enter' });
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

  it('offers name prefixes and tags as options, current category first', () => {
    render(
      <IllustrationGallery
        catalog={{
          ...fixtureCatalog,
          families: [
            { ...fixtureCatalog.families[0], tags: ['lekeplass', 'syntetisk'] },
            {
              ...fixtureCatalog.families[1],
              categoryId: 'internbruk',
              tags: ['bøker'],
            },
          ],
        }}
      />,
    );
    const options = [...document.querySelectorAll('u-option')]
      .map((option) => option.getAttribute('value'))
      .filter(Boolean);
    expect(options).toEqual(['lekeplass', 'syntetisk', 'annen', 'bøker']);
    expect(screen.getAllByText('Treff i andre kategorier')).toHaveLength(2);
  });

  it('filters families on a chosen name prefix and clears the filter', () => {
    render(<IllustrationGallery catalog={fixtureCatalog} />);
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(2);

    chooseOption('syntetisk');
    expect(
      screen.getByText('Viser 1 treff for «syntetisk» i Barnehage').ariaLive,
    ).toBe('polite');
    expect(
      screen.getByRole('button', { name: 'Fjern valget syntetisk' }),
    ).toBeTruthy();
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
    expect(
      screen.getByRole('button', { name: 'Syntetisk testfamilie' }),
    ).toBeTruthy();

    const clear = document.querySelector('button[type="reset"]');
    if (!clear) throw new Error('No clear button');
    fireEvent.click(clear);
    expect(screen.getByText('Viser 2 illustrasjoner i Barnehage')).toBeTruthy();
  });

  it('clears the filter from the chip in the results summary', async () => {
    render(<IllustrationGallery catalog={fixtureCatalog} />);
    expect(screen.queryByRole('button', { name: /^Fjern valget/ })).toBeNull();

    chooseOption('syntetisk');
    fireEvent.click(
      screen.getByRole('button', { name: 'Fjern valget syntetisk' }),
    );

    expect(screen.getByText('Viser 2 illustrasjoner i Barnehage')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /^Fjern valget/ })).toBeNull();
    await waitFor(() =>
      expect(
        (
          screen.getByRole('combobox', {
            name: filterLabel,
          }) as HTMLInputElement
        ).value,
      ).toBe(''),
    );
    expect(document.activeElement).toBe(
      screen.getByRole('combobox', { name: filterLabel }),
    );
  });

  it('filters families on a chosen tag', () => {
    render(<IllustrationGallery catalog={taggedCatalog} />);
    chooseOption('bøker');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
    expect(
      screen.getByRole('button', { name: 'Annen syntetisk familie' }),
    ).toBeTruthy();
  });

  it('keeps the filter and shows hit badges when switching category', () => {
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
    const countOf = (name: string | RegExp) =>
      screen
        .getByRole('radio', { name })
        .closest('label')
        ?.querySelector('[data-count]')
        ?.getAttribute('data-count');
    expect(countOf('Internbruk')).toBeUndefined();

    chooseOption('annen');
    expect(countOf(/Internbruk/)).toBe('1');
    expect(countOf('Barnehage')).toBeUndefined();

    fireEvent.click(screen.getByRole('radio', { name: /Internbruk/ }));
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
  });

  it('links to hits in other categories and keeps the filter', () => {
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
    chooseOption('annen');
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(0);

    fireEvent.click(
      screen.getByRole('button', { name: '1 treff i Internbruk' }),
    );
    expect(
      (screen.getByRole('radio', { name: 'Internbruk' }) as HTMLInputElement)
        .checked,
    ).toBe(true);
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
  });

  it('filters on a tag when it is clicked in the details dialog', async () => {
    render(<IllustrationGallery catalog={taggedCatalog} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Syntetisk testfamilie' }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'lekeplass', hidden: true }),
    );
    await waitFor(() =>
      expect(
        (
          screen.getByRole('combobox', {
            name: filterLabel,
          }) as HTMLInputElement
        ).value,
      ).toBe('lekeplass'),
    );
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
