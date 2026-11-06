import type {
  GetFileComponentsResponse,
  GetImagesResponse,
  PublishedComponent,
} from '@figma/rest-api-spec';
import * as R from 'ramda';

/* https://www.figma.com/developers/api#library-items */
const FIGMA_FILE_KEY = 'SSdGSjSYPDSyX2IfHLfmEL';

/** How many requests to split the node ids into when asking for image URLs. */
const IMAGE_URL_REQUESTS = 5;

export const fetchSymbols = async (): Promise<PublishedComponent[]> => {
  console.group('Fetching list of published symbols from Figma...');
  const data = await fetchFigmaApi(
    `files/${FIGMA_FILE_KEY}/components`,
    'the list of published symbols',
  );
  const components = (data as GetFileComponentsResponse | null)?.meta
    ?.components;
  if (!Array.isArray(components) || !components.every(hasExpectedFields)) {
    throw new Error(
      'Unexpected list of published symbols from Figma: expected meta.components to list components with node_id, name, description and created_at',
    );
  }

  /* Filters out any 'random' symbols not meant for the symbol-library */
  const [validSymbols, ignoredSymbols] = R.partition(hasMetadata, components);
  for (const symbol of ignoredSymbols) {
    console.warn(`Ignoring symbol '${symbol.name}' as it is missing metadata`);
  }
  if (validSymbols.length === 0) {
    throw new Error('No published symbols found');
  }

  console.info(
    `Found ${validSymbols.length} published symbols in Figma. ${ignoredSymbols.length} symbols were ignored due to missing metadata.`,
  );
  console.groupEnd();

  return validSymbols;
};

/**
 * Asks Figma for URLs to download the given nodes as SVG, and returns them by
 * node id. Warns about nodes Figma has no image for.
 */
export const fetchDownloadUrls = async (
  nodeIds: string[],
): Promise<Record<string, string>> => {
  // Split the ids into IMAGE_URL_REQUESTS parts, and ask for one part at a time.
  const idParts = R.splitEvery(
    Math.ceil(nodeIds.length / IMAGE_URL_REQUESTS),
    nodeIds,
  );
  const responses = await Array.fromAsync(idParts, fetchImageUrls);
  const [found, missing] = R.partition(
    hasUrl,
    responses.flatMap((images) => Object.entries(images)),
  );
  for (const [nodeId] of missing) {
    console.warn(`No image found for ${nodeId}`);
  }
  return Object.fromEntries(found);
};

/** Downloads a symbol from a URL from `fetchDownloadUrls`, and returns the SVG. */
export const downloadSvg = (url: string) =>
  fetchFromFigma(url, `the symbol at ${url}`);

/** Asks Figma for URLs to download the given nodes as SVG. */
async function fetchImageUrls(nodeIds: string[]) {
  /* Figma accepts a comma-separated list of ids: GET /v1/images/:key?ids=1:2,1:3,1:4 */
  const data = await fetchFigmaApi(
    `images/${FIGMA_FILE_KEY}/?ids=${nodeIds.join(',')}&format=svg`,
    `the download URLs for ${nodeIds.length} symbols`,
  );
  const images = (data as GetImagesResponse | null)?.images;
  if (
    typeof images !== 'object' ||
    !images ||
    !Object.values(images).every(
      (url) => url === null || typeof url === 'string',
    )
  ) {
    throw new Error(
      'Unexpected download URLs from Figma: expected images to map node ids to URLs',
    );
  }
  return images;
}

/** Fetches from the Figma REST API, and returns the parsed JSON. */
async function fetchFigmaApi(path: string, what: string): Promise<unknown> {
  // Fail before any request, rather than sending an empty token.
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    throw new Error(
      'FIGMA_TOKEN is not set. Add a Figma personal access token to .env.local in the repository root.',
    );
  }
  const body = await fetchFromFigma(`https://api.figma.com/v1/${path}`, what, {
    'X-FIGMA-TOKEN': token,
  });
  try {
    return JSON.parse(body);
  } catch (cause) {
    throw new Error(`Figma sent ${what} as invalid JSON`, { cause });
  }
}

/**
 * Fetches `what` from a Figma URL, and returns the response body. Throws if
 * the request fails or Figma answers with an error status.
 */
async function fetchFromFigma(
  url: string,
  what: string,
  headers?: Record<string, string>,
): Promise<string> {
  try {
    const response = await fetch(url, { headers });
    const body = await response.text();
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status} ${response.statusText}${rateLimitDetails(response)}: ${body}`,
      );
    }
    return body;
  } catch (cause) {
    throw new Error(`Failed to fetch ${what} from Figma`, { cause });
  }
}

/**
 * For a rate-limited response (429), how long Figma asks to wait and which
 * limit was hit, so the cause shows in the error. Empty for other responses.
 */
function rateLimitDetails(response: Response) {
  if (response.status !== 429) return '';
  const header = (name: string) => response.headers.get(name) ?? 'unknown';
  return ` (Retry-After: ${header('Retry-After')} s, X-Figma-Rate-Limit-Type: ${header('X-Figma-Rate-Limit-Type')}, X-Figma-Plan-Tier: ${header('X-Figma-Plan-Tier')})`;
}

/** Whether a component from Figma has the fields the symbol update reads. */
function hasExpectedFields(component: PublishedComponent) {
  return (['node_id', 'name', 'description', 'created_at'] as const).every(
    (field) => typeof component?.[field] === 'string',
  );
}

/** Whether a symbol has the page and frame names that its category comes from. */
function hasMetadata(symbol: PublishedComponent) {
  return !!symbol.containing_frame?.pageName && !!symbol.containing_frame?.name;
}

function hasUrl(
  entry: [nodeId: string, url: string | null],
): entry is [nodeId: string, url: string] {
  return !!entry[1];
}
