// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AssetImage } from './AssetImage';
import { AssetContext, AssetError, useAssetLinkProps } from './assets';
import type { AssetSource } from './assets';
import { fixtureCatalog } from './gallery.fixtures';
import { createStorageSource } from './storage';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const variant = fixtureCatalog.families[0].variants[0];
const config = {
  storageAccount: 'stillustrations',
  container: 'illustrations',
  version: 'abc123',
};

describe('storage source', () => {
  it('sends the bearer token and types the blob explicitly', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response('<svg/>'));
    vi.stubGlobal('fetch', fetcher);
    const source = createStorageSource(config, async () => 'token-1');

    const blob = await source.blob(variant, 'svg');

    expect(blob.type).toBe('image/svg+xml');
    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe(
      `https://stillustrations.blob.core.windows.net/illustrations/abc123/svg/${variant.svg}`,
    );
    expect(new Headers(init?.headers).get('Authorization')).toBe(
      'Bearer token-1',
    );
  });

  it('requests each file once and retries after a failure', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValue(new Response('png'));
    vi.stubGlobal('fetch', fetcher);
    const source = createStorageSource(config, async () => 'token');

    await expect(source.blob(variant, 'png')).rejects.toMatchObject({
      status: 500,
    });
    await source.blob(variant, 'png');
    await source.blob(variant, 'png');

    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('reports missing access with the HTTP status', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(new Response(null, { status: 403 })),
    );
    const source = createStorageSource(config, async () => 'token');

    const error = await source.catalog().catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(AssetError);
    expect((error as AssetError).status).toBe(403);
  });
});

describe('authenticated assets in components', () => {
  const source: AssetSource = {
    url: vi.fn(async () => 'blob:mock-url'),
    blob: vi.fn(async () => new Blob()),
    catalog: vi.fn(),
  };

  function Link() {
    const props = useAssetLinkProps(variant, 'png');
    return <a {...props}>Last ned</a>;
  }

  it('loads images through the source', async () => {
    render(
      <AssetContext value={source}>
        <AssetImage variant={variant} alt="Forhåndsvisning" />
      </AssetContext>,
    );
    await waitFor(() =>
      expect(screen.getByRole('img').getAttribute('src')).toBe('blob:mock-url'),
    );
  });

  it('downloads through the source instead of following the link', async () => {
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    render(
      <AssetContext value={source}>
        <Link />
      </AssetContext>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Last ned' }));

    await waitFor(() => expect(click).toHaveBeenCalledTimes(1));
    click.mockRestore();
  });
});
