# Illustrations backend foundation

Private Vite React app (`@udir-design/apps-illustrations`, folder
`apps/illustrations`) that serves the illustration gallery and owns
the asset and metadata pipeline. No npm publication, automatic refresh, or
fabricated illustration assets. Run it with
`pnpm turbo run dev --filter=@udir-design/apps-illustrations` (port 4400,
preview 4500).

## Current status: artwork imported

The source is the [Barnehage page in Figma](https://www.figma.com/design/QeYBL9fzDCk87WNWcDSQi7/01-Illustrasjoner---barnehage?node-id=243-57165),
file `QeYBL9fzDCk87WNWcDSQi7`, page node `243:57165`. The reviewed mapping and
canonical catalog now contain **36 real illustration families and 1,296 SVG
variants**: Aktivitet has 17 families (612 variants), Miljø has 5 (180), and Lek
has 14 (504). Each imported family has 18 base components and 18 linked instances,
36 variants in total. These are observed export nodes, not generated permutations.

The page contained 37 component sets. The remaining set, **læring-31**
(`4118:87550`), is an empty template: every observed base and linked instance has
explicitly hidden children (safezone/guides), and its reference export showed only
a plain background. The planning report explicitly excludes the set and its 36
versions as `empty template (background and hidden guides only)`; they are not
canonical artwork. Missing or depth-truncated children alone never establish that
a template is empty. The reviewed report has no unmatched nodes or repeated
complete appearance signatures.

All imported bases use the `Geometric shape` BOOLEAN default `true`; linked
instances override it to `false`. Exact component-name VARIANT assignments supply
`Format`, `Color theme` and `Background`. aktivitet-1 also exposes
`Character#46:7` (`INSTANCE_SWAP`), referencing `38:54613`. Inspection resolves
that actual component through the API as **`Object=Guitar`**, stored in
`referenceComponents` evidence and mapped to `Karakter: Object: Guitar`. No Figma
nodes were renamed, and no alternative character versions were invented.

The final manual fidelity proof compared nine artwork-only SVG-derived 2x PNG
samples against Figma PNG references. All had matching bounds and mean
premultiplied channel error of **0.010–0.029/255**. This is representative evidence,
not a pixel comparison of every imported variant. All 1,296 generated PNGs were
checked for exact 2x dimensions. Reference images and reports remain ignored inventory.

Canonical SVG sources currently occupy about **116 MiB**; generated PNGs about
**351 MiB**. Both formats are served as static assets, not embedded in the React
library or loaded in full when opening the gallery. PNGs are ignored build outputs.
The assets are generated into ignored `public/illustrations-assets/` and served
under `<base>/illustrations-assets/`.

## Metadata API

`src/metadata.ts` exports `metadata`, `families` and the types
`IllustrationCatalog`, `IllustrationFamily`, `IllustrationVariant`, validated at
runtime with Zod. The app imports it directly; there is no package export.

- Catalog: `{ schemaVersion: 1, state: 'pending-import' | 'imported', figma, families }`
- `figma`: `{ fileKey, pageNodeId }` (fixed to the intended source)
- Family: `{ id, nodeId, name, variants }`
- Variant: `{ id, nodeId, name, width, height, properties: Record<string, string>, svg }`

IDs are explicit lowercase kebab-case, globally unique within families/variants;
variant filenames are exactly `<variant-id>.svg`. Display-name changes do not
rename assets. Existing IDs cannot be assigned to different Figma nodes/families.
Width and height come from export-frame bounds, never from guessed names.
Properties are explicitly reviewed strings. The planner translates observed axes
to `Format`, `Fargetema`, `Bakgrunn`, `Geometrisk form` and `Karakter`; formats to
`Landskap (16:9)`, `Portrett (4:5)`, `Kvadrat (1:1)`; booleans to `Ja`/`Nei`.
`Fargetema` is translated from Figma's `alt 1`/`alt 2`/`alt 3` to `grønn`/`blå`/`brun`;
unknown color labels block approval. Other non-internal BOOLEAN, TEXT and
INSTANCE_SWAP appearance properties are retained, not expanded into permutations.

## Manual refresh

Every Figma script requires `--category=<id>` (for example
`pnpm run inspect:figma --category=barnehage`) and fails before any request if the
category has no configured source. Imports replace only that category; other
categories' metadata and SVGs are carried over unchanged, and `--allow-removals`
applies only to the selected category. Inventory lives in
`inventory/<category>/`. Adding a category means adding its reviewed `sources`
entry (file key, page node and `idPrefix`) first.

Run package scripts from this directory. `inspect:figma`, `verify:figma` and `import:figma`
load the **workspace-root** ignored `.env.local` using Node's env-file support, or
use an existing `FIGMA_TOKEN` environment variable. Never commit or log tokens.
Node 24 is the repository runtime, matching the symbols refresh convention.

1. When a refresh is needed, run `pnpm run inspect:figma`. This retrieves the
   intended page hierarchy at depth 3 into ignored inventory, retaining raw node
   properties, visibility and bounds. This is an export-root inventory, not a
   complete geometry tree or proof of artwork fidelity. Inspection additionally
   resolves INSTANCE_SWAP component names via the API into `referenceComponents`.
   The current inventory already exists; no network access is required for planning.
2. Run `pnpm run plan:figma` to write offline candidates and a complete report to
   ignored inventory. Review [inventory/map-candidate.json](inventory/map-candidate.json)
   and [inventory/map-report.json](inventory/map-report.json): all families/counts,
   property definitions/values, duplicate-signature node IDs, exclusions and
   unmatched nodes are reported. Duplicate signatures are retained and block
   approval, since identical properties alone do not establish identical art.
   Run `pnpm run plan:figma --approve` only after review. It writes
   [source/import-map.json](source/import-map.json) with `state: reviewed` only if
   the actual inventory is unambiguous and valid against prior catalog identity.
   Unknown export nodes, unresolved swap labels, property conflicts and duplicate
   signatures block approval without changing the source map. There is no bypass.
   Alternatively, explicitly review a manual map, resolving the reported evidence
   gaps without omitting meaningful versions.

   Families use the stable actual COMPONENT_SET `nodeId`, with IDs formed from
   the family-name slug plus node-ID suffix. Variants use the family-name slug
   plus their actual export-node ID. Each variant specifies `id`, `nodeId`, `name`
   and `properties`. The mapping schema additionally allows optional `componentId`
   for instances outside the set's ancestry: the export must be an INSTANCE in
   the intended page, its actual reference must match, and the referenced COMPONENT
   must belong to that family's COMPONENT_SET. An arbitrary frame, foreign-page
   node or foreign-set reference is not admitted. `componentId` is import evidence
   only; it is not added to the public catalog schema.

3. Run `pnpm run verify:figma` for a manual representative fidelity check. It selects
   observed format, background, geometric-shape and color values, plus category
   samples, from the reviewed mapping. It downloads fresh SVGs and Figma 2x PNG
   references, renders the SVGs at 2x and saves images plus a bounds/premultiplied
   channel-error report to ignored inventory. Review the images; this command does
   not import assets or run as part of offline tests/builds. It rejects mismatched
   bounds or mean error above 3/255. Reruns use the current mapping, so the excluded
   læring template is no longer selected.
4. Run `pnpm run import:figma`. Valid inventory evidence and a reviewed nonempty
   mapping are mandatory. The script re-fetches the hierarchy to validate current
   ancestry/references/bounds, then exports only mapped IDs in sequential batches
   of at most 25. Each batch is downloaded immediately in groups of at most four
   workers, before requesting the next batch, to limit concurrency and signed-URL
   expiry. `Promise.allSettled` waits for each group before failure can roll back
   the staging transaction. Requests time out after 120 seconds; 429/5xx
   responses allow three retries, honoring Retry-After up to 60 seconds.
   Authentication failures identify expired/invalid tokens or missing access
   without logging response bodies, tokens, or signed download URLs.
5. Any removed family/variant requires the explicit `--allow-removals` argument:
   `pnpm run import:figma --allow-removals`. Identity reassignment remains forbidden.
   Every SVG is checked and rendered before the canonical directory is replaced.
   Failed requests/validation leave previous committed sources intact. Review
   the canonical metadata/SVG diff and commit it; inventory remains ignored.

The canonical source unit is [source/catalog/metadata.json](source/catalog/metadata.json)
and its adjacent SVG directory, now imported. Generated PNGs are ignored build
output, not canonical sources; downloaded reference PNGs are ignored inventory.
A same-filesystem staging/backup
rename with rollback and a writer lock protects replacement against ordinary
partial failures. A heartbeat keeps the shared writer lock alive; concurrent
builds/imports wait for up to roughly two minutes, and locks abandoned by killed
processes recover automatically after ten seconds. Do not manually delete a live
lock. This is not crash-proof filesystem journaling: after a killed process,
inspect ignored `.catalog-*`/`.dist-*` backup directories and recover the previous
directory if needed. Never delete a backup blindly. Source edits and import-map
edits should not run concurrently.

## What happens during development

Turbo's `dev` task for this app first runs upstream builds and `build:assets`,
then starts Vite on port 4400. `build:assets` copies committed SVGs and renders all PNGs offline; it never contacts Figma
or needs a token. An uncached build currently takes about a minute. Turbo reuses
cached build output when inputs are unchanged, so subsequent starts normally skip
rendering. Stopping an uncached build may leave a partial ignored staging directory;
the next build recovers its abandoned lock and prepares a complete replacement.

## Offline tasks

- `build:assets`: validates committed metadata, copies standalone SVG unchanged into
  ignored `public/illustrations-assets/svg`, and renders `png/<variant-id>.png` with Sharp at exactly
  `round(width * 2)` by `round(height * 2)`. Uniform sizing preserves aspect ratio;
  any rounding padding is transparent. Existing SVG backgrounds are retained;
  no background is added. Also writes `metadata.json`. Empty pending catalogs
  build successfully without a token, inventory, or any network request.
- `build`: Vite production build into `dist/`, after `build:assets`.
- `dev`: Vite dev server.
- `typecheck`: strict TypeScript check using the root configuration.
- `lint`: root Oxlint conventions.
- `test:unit`: schema, identity, missing IDs, unsafe SVG, exact PNG sizing/alpha,
  bounded retries/exports, sibling-instance validation, appearance defaults/overrides,
  gallery utilities and component behavior (jsdom),
  planning ambiguities, explicit hidden-template evidence and partial-failure
  preservation tests. A synthetic empty catalog covers pending state independently
  of production data. Imported-source coverage validates schema, every reviewed
  family/variant identity and property, and exact correspondence with existing safe
  canonical SVGs, without freezing current inventory counts. Synthetic SVG geometry
  exists only inside tests, not in the asset catalog. Tests never access Figma.
- `inspect:figma` / `verify:figma` / `import:figma`: explicit manual network tasks only.
- `plan:figma`: explicit offline manual task; never reads a token or fetches art.
  Only `--approve` can replace the source mapping, and only with unambiguous evidence.

Workspace offline tasks may be run with
`pnpm turbo run <task> --filter=@udir-design/apps-illustrations`.
Normal builds never invoke Figma. Install workspace dependencies before running
these tasks; package scripts do not install dependencies.

SVG safety checks fail closed on scripts, active content, event attributes,
external href/CSS URLs, entities and CSS escapes. This is validation, not
sanitization: unsupported exports must be reviewed rather than silently rewritten.
Local fragment references and the standard SVG/xlink namespaces are supported.
