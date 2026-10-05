// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { IllustrationGallery } from './IllustrationGallery';
import { emptyFixturePreview, fixtureCatalog } from './gallery.fixtures';
import { illustrationAssetUrl } from './gallery.utils';

afterEach(cleanup);

const searchLabel = 'Søk';

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
    expect(screen.getByText('Viser 0 av 0 illustrasjoner')).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: 'Ingen illustrasjoner å vise' }),
    ).toBeTruthy();
  });

  it('scopes the gallery by category', () => {
    render(
      <IllustrationGallery
        catalog={fixtureCatalog}
        previewUrl={emptyFixturePreview}
      />,
    );
    expect(
      (screen.getByRole('radio', { name: 'Barnehage' }) as HTMLInputElement)
        .checked,
    ).toBe(true);
    fireEvent.click(screen.getByRole('radio', { name: 'Internbruk' }));
    expect(screen.getByText('Viser 0 av 0 illustrasjoner')).toBeTruthy();
    expect(
      screen.getByText(
        'Det er ikke importert illustrasjoner for Internbruk ennå.',
      ),
    ).toBeTruthy();
  });

  it('filters families by search and clears the query', () => {
    render(
      <IllustrationGallery
        catalog={fixtureCatalog}
        previewUrl={emptyFixturePreview}
      />,
    );
    const list = screen.getByRole('list');
    expect(list.querySelectorAll('button')).toHaveLength(2);

    const search = screen.getByRole('searchbox', { name: searchLabel });
    fireEvent.change(search, { target: { value: 'INGEN TREFF' } });
    expect(
      screen.getByRole('heading', { name: 'Ingen illustrasjoner å vise' }),
    ).toBeTruthy();
    expect(screen.getByText('Viser 0 av 2 illustrasjoner').ariaLive).toBe(
      'polite',
    );

    fireEvent.change(search, { target: { value: 'TESTFAMILIE' } });
    expect(screen.getByRole('list').querySelectorAll('button')).toHaveLength(1);
  });

  it('exposes download links for the selected variant', () => {
    render(
      <IllustrationGallery
        catalog={fixtureCatalog}
        previewUrl={emptyFixturePreview}
      />,
    );
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
