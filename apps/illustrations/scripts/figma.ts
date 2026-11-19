import { setTimeout } from 'node:timers/promises';
import { z } from 'zod';

export type Fetch = typeof fetch;

/** How many times a failed request is retried. */
const MAX_RETRIES = 3;
/** The longest `Retry-After` the scripts wait for before giving up. */
const MAX_RETRY_DELAY = 60_000;
/** How long one request may take. */
const REQUEST_TIMEOUT = 120_000;
/** How many node ids go in one request, which bounds the URL length. */
export const ID_BATCH_SIZE = 25;

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
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let response: Response;
    try {
      response = await fetcher(url, {
        headers: token ? { 'X-Figma-Token': token } : {},
        redirect: 'error',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      });
    } catch {
      // Do not relay fetch errors: they can include a signed asset URL.
      if (attempt < MAX_RETRIES) {
        console.warn(
          `Figma network error or timeout, retry ${attempt + 1}/${MAX_RETRIES}.`,
        );
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
        `Figma HTTP ${response.status}${await figmaMessage(response)}: token expired, invalid, or lacks file access. Renew FIGMA_TOKEN and verify access. No sources were replaced.`,
      );
    }
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === MAX_RETRIES)
      throw new Error(
        `Figma HTTP ${response.status}${rateLimitDetails(response)}${await figmaMessage(response)}; retry limit reached or request not retryable. No sources were replaced.`,
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
        `Figma HTTP ${response.status}${rateLimitDetails(response)}${await figmaMessage(response)}; Retry-After exceeds the ${MAX_RETRY_DELAY / 1000} second retry bound or is invalid. Retry manually later.`,
      );
    }
    await response.body?.cancel();
    console.warn(
      `Figma HTTP ${response.status}, retry ${attempt + 1}/${MAX_RETRIES} in ${Math.round(Math.max(0, delay) / 1000)}s.`,
    );
    await wait(Math.max(0, delay));
  }
  throw new Error('Figma retry limit reached.');
}

const figmaErrorSchema = z.union([
  z.object({ err: z.string() }),
  z.object({ message: z.string() }),
]);

/**
 * Figma's explanation from a JSON error response, quoted, such as ` "Invalid token"`, or
 * nothing for other responses.
 */
async function figmaMessage(response: Response) {
  // Only JSON from the API: the XML errors from the storage behind a download URL can repeat
  // the URL's signature.
  if (!response.headers.get('Content-Type')?.includes('application/json'))
    return '';
  // The status is the error; an unreadable explanation must not replace it.
  const body = await response.json().catch(() => undefined);
  const parsed = figmaErrorSchema.safeParse(body);
  if (!parsed.success) return '';
  return ` "${'err' in parsed.data ? parsed.data.err : parsed.data.message}"`;
}

/**
 * For a rate-limited response (429), how long Figma asks to wait and which limit was hit, or
 * nothing for other responses.
 */
function rateLimitDetails(response: Response) {
  if (response.status !== 429) return '';
  const header = (name: string) => response.headers.get(name) ?? 'unknown';
  return ` (Retry-After: ${header('Retry-After')} s, X-Figma-Rate-Limit-Type: ${header('X-Figma-Rate-Limit-Type')}, X-Figma-Plan-Tier: ${header('X-Figma-Plan-Tier')})`;
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

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  absoluteBoundingBox?: { width: number; height: number };
  children?: FigmaNode[];
  componentId?: string;
  componentPropertyDefinitions?: Record<
    string,
    z.infer<typeof propertyDefinitionSchema>
  >;
  componentProperties?: Record<string, z.infer<typeof propertySchema>>;
}

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
const pageSchema = z.object({
  nodes: z.record(
    z.string(),
    z
      .object({
        document: nodeSchema,
        // Names of referenced components, including ones outside the fetched depth.
        components: z
          .record(z.string(), z.object({ name: z.string() }))
          .optional(),
        // Descriptions live here, not on the nodes themselves.
        componentSets: z
          .record(z.string(), z.object({ description: z.string() }))
          .optional(),
      })
      .nullable(),
  ),
});

export function parsePage(value: unknown, pageNodeId: string) {
  const page = pageSchema.parse(value).nodes[pageNodeId];
  if (!page)
    throw new Error('Intended Figma page node is missing from hierarchy.');
  return {
    root: page.document,
    components: page.components ?? {},
    descriptions: Object.fromEntries(
      Object.entries(page.componentSets ?? {}).map(([id, set]) => [
        id,
        set.description,
      ]),
    ),
  };
}

export function* walk(node: FigmaNode): Generator<FigmaNode> {
  yield node;
  for (const child of node.children ?? []) yield* walk(child);
}

export async function getHierarchy(
  token: string,
  source: { fileKey: string; pageNodeId: string },
) {
  const response = await request(
    `https://api.figma.com/v1/files/${source.fileKey}/nodes?ids=${encodeURIComponent(source.pageNodeId)}&depth=3`,
    token,
  );
  return parsePage(await response.json(), source.pageNodeId);
}

const imagesSchema = z.object({
  err: z.string().nullable().optional(),
  images: z.record(z.string(), z.string().nullable()),
});

/**
 * Asks Figma for URLs to download up to `ID_BATCH_SIZE` nodes as SVG, by node id. The URLs
 * expire, so download them before asking for the next batch.
 */
export async function exportSvgUrls(
  ids: string[],
  token: string,
  fileKey: string,
  fetcher: Fetch = fetch,
) {
  if (ids.length > ID_BATCH_SIZE)
    throw new Error(
      `Cannot export ${ids.length} nodes in one request; the limit is ${ID_BATCH_SIZE}.`,
    );
  const query = new URLSearchParams({
    ids: ids.join(','),
    format: 'svg',
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
      `Figma SVG export reported an error: "${result.err}". No sources were replaced.`,
    );
  return new Map(
    ids.map((id) => {
      const value = result.images[id];
      if (!value)
        throw new Error(
          `Figma SVG export is missing node ${id}. No sources were replaced.`,
        );
      // URL.parse, not new URL: the latter's error keeps the signed URL in its `input` property,
      // which Node prints for an uncaught error.
      const url = URL.parse(value);
      if (
        !url ||
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
      return [id, value] as const;
    }),
  );
}
