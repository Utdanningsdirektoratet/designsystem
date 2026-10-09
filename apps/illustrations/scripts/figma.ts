import { setTimeout } from 'node:timers/promises';
import { z } from 'zod';

export type Fetch = typeof fetch;
const MAX_RETRY_DELAY = 60_000;

export function getToken() {
  const token = process.env.FIGMA_TOKEN;
  if (!token)
    throw new Error(
      'FIGMA_TOKEN is missing. Set it in the environment or root .env.local; never commit it.',
    );
  return token;
}

// Fixed endpoints and no redirects: credentials cannot be forwarded to another host.
export async function request(
  url: string,
  token?: string,
  fetcher: Fetch = fetch,
  wait: (delay: number) => Promise<void> = setTimeout,
): Promise<Response> {
  for (let attempt = 0; attempt < 4; attempt++) {
    let response: Response;
    try {
      response = await fetcher(url, {
        headers: token ? { 'X-Figma-Token': token } : {},
        redirect: 'error',
        signal: AbortSignal.timeout(120_000),
      });
    } catch {
      // Do not relay fetch errors: they can include a signed asset URL.
      if (attempt < 3) {
        console.warn(`Figma network error or timeout, retry ${attempt + 1}/3.`);
        await wait(1000 * 2 ** attempt);
        continue;
      }
      throw new Error(
        'Figma network request failed or timed out; no sources were replaced.',
      );
    }
    if (response.ok) return response;
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `Figma HTTP ${response.status}: token expired, invalid, or lacks file access. Renew FIGMA_TOKEN and verify access. No sources were replaced.`,
      );
    }
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 3)
      throw new Error(
        `Figma HTTP ${response.status}; retry limit reached or request not retryable. No sources were replaced.`,
      );
    const header = response.headers.get('Retry-After');
    const seconds = header === null ? NaN : Number(header);
    const delay =
      header === null
        ? 1000 * 2 ** attempt
        : Number.isFinite(seconds)
          ? seconds * 1000
          : Date.parse(header) - Date.now();
    if (!Number.isFinite(delay) || delay > MAX_RETRY_DELAY) {
      throw new Error(
        'Figma Retry-After exceeds the 60 second retry bound or is invalid. Retry manually later.',
      );
    }
    await response.body?.cancel();
    console.warn(
      `Figma HTTP ${response.status}, retry ${attempt + 1}/3 in ${Math.round(Math.max(0, delay) / 1000)}s.`,
    );
    await wait(Math.max(0, delay));
  }
  throw new Error('Figma retry limit reached.');
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  absoluteBoundingBox?: { width: number; height: number };
  children?: FigmaNode[];
  componentId?: string;
  componentPropertyDefinitions?: Record<string, FigmaPropertyDefinition>;
  componentProperties?: Record<string, FigmaProperty>;
}

export interface FigmaPropertyDefinition {
  type: string;
  defaultValue: string | boolean;
  variantOptions?: string[];
}

export interface FigmaProperty {
  type: string;
  value: string | boolean;
}

const propertyDefinitionSchema = z.object({
  type: z.string(),
  defaultValue: z.union([z.string(), z.boolean()]),
  variantOptions: z.array(z.string()).optional(),
});
const propertySchema = z.object({
  type: z.string(),
  value: z.union([z.string(), z.boolean()]),
});

const nodeSchema: z.ZodType<FigmaNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    visible: z.boolean().optional(),
    absoluteBoundingBox: z
      .object({ width: z.number(), height: z.number() })
      .optional(),
    children: z.array(nodeSchema).optional(),
    componentId: z.string().optional(),
    componentPropertyDefinitions: z
      .record(z.string(), propertyDefinitionSchema)
      .optional(),
    componentProperties: z.record(z.string(), propertySchema).optional(),
  }),
);
const hierarchySchema = z.object({
  nodes: z.record(z.string(), z.object({ document: nodeSchema }).nullable()),
});

export function parseHierarchy(value: unknown, pageNodeId: string): FigmaNode {
  const root = hierarchySchema.parse(value).nodes[pageNodeId]?.document;
  if (!root || root.id !== pageNodeId)
    throw new Error('Intended Figma page node is missing from hierarchy.');
  return root;
}

export async function getHierarchy(
  token: string,
  source: { fileKey: string; pageNodeId: string },
) {
  const response = await request(
    `https://api.figma.com/v1/files/${source.fileKey}/nodes?ids=${encodeURIComponent(source.pageNodeId)}&depth=3`,
    token,
  );
  const raw: unknown = await response.json();
  parseHierarchy(raw, source.pageNodeId);
  return raw;
}

const imagesSchema = z.object({
  err: z.string().nullable().optional(),
  images: z.record(z.string(), z.string().nullable()),
});

export async function exportSvgUrls(
  ids: string[],
  token: string,
  fileKey: string,
  fetcher: Fetch = fetch,
  format: 'svg' | 'png' = 'svg',
) {
  const urls = new Map<string, string>();
  // Sequential batches and sequential downloads bound concurrency and URL length.
  for (let offset = 0; offset < ids.length; offset += 25) {
    const batch = ids.slice(offset, offset + 25);
    const query = new URLSearchParams({
      ids: batch.join(','),
      format,
      scale: '2',
      svg_include_id: 'false',
      use_absolute_bounds: 'true',
    });
    const response = await request(
      `https://api.figma.com/v1/images/${fileKey}?${query}`,
      token,
      fetcher,
    );
    const result = imagesSchema.parse(await response.json());
    if (result.err)
      throw new Error(
        'Figma SVG export reported an error. No sources were replaced.',
      );
    for (const id of batch) {
      const value = result.images[id];
      if (!value)
        throw new Error(
          `Figma SVG export is missing node ${id}. No sources were replaced.`,
        );
      const url = new URL(value);
      if (
        url.protocol !== 'https:' ||
        url.username ||
        url.password ||
        url.port ||
        !(
          url.hostname.endsWith('.amazonaws.com') ||
          url.hostname.endsWith('.figma.com')
        )
      ) {
        throw new Error(`Untrusted SVG download host for node ${id}.`);
      }
      urls.set(id, value);
    }
  }
  return urls;
}
